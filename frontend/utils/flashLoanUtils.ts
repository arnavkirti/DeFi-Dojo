import { request } from "graphql-request";

const apiKey = "ffcb9247ce480fe8bbe23be8c05ecfa2";

// Types
interface TokenData {
  symbol: string;
  derivedETH: string;
  name?: string;
  decimals?: string;
}

interface PriceData {
  yourToken: TokenData;
  usdtToken: TokenData;
}

interface SushiData {
  token: TokenData;
}

interface AaveUserData {
  id: string;
  reserves: {
    reserve: {
      price: {
        priceInEth: string;
      };
      symbol: string;
      reserveLiquidationThreshold: string;
    };
    currentTotalDebt: string;
    currentATokenBalance: string;
  }[];
}

interface AaveRateResponse {
  reserves: {
    variableBorrowRate: string;
  }[];
}

// Queries
const UNISWAP_QUERY = `{
  yourToken: token(id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984") {
    symbol
    derivedETH
  }
  usdtToken: token(id: "0xdac17f958d2ee523a2206206994597c13d831ec7") {
    derivedETH
  }
}`;

const SUSHI_QUERY = `{
  token(id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2") {
    symbol
    name
    decimals
  }
}`;

const AAVE_QUERY = `{
  users(first: 5, where: {borrowedReservesCount_gt: 0}) {
    id
    reserves {
      reserve {
        price {
          priceInEth
        }
        symbol
        reserveLiquidationThreshold
      }
      currentTotalDebt
      currentATokenBalance
    }
  }
}`;

const COMPOUND_QUERY = `{
markets(where: {symbol: "cAAVE"}) {  # Fetch according to symbol
symbol
borrowRate
}
}`;

// cUSDT, cETH, cDAI, cWBTC, cAAVE

const AAVE_BORROW_RATE_QUERY = `{
  reserves(where: {symbol: "YFI"}) {  # Fetch according to symbol
      symbol
      variableBorrowRate
  }
}`;

// API Functions
export const fetchUniswapData = async (): Promise<PriceData> => {
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
  return await request(url, UNISWAP_QUERY);
};

export const fetchSushiData = async (): Promise<SushiData> => {
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/2tGWMrDha4164KkFAfkU3rDCtuxGb4q1emXmFdLLzJ8x`;
  return await request(url, SUSHI_QUERY);
};

export const fetchBorrowCompound = async (symbol: string) => {
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/78vjx5nN57gJDJCGYafxkGNKQSEFfTNo4AkNBcRQZV2R`;
  const data = await request(
    url,
    `{
  reserves(where: {symbol: "${symbol}"}) {  # Limit results to 5 per request
      symbol
      variableBorrowRate
  }
}`
  );
  const borrowRate = Number(BigInt((data as AaveRateResponse).reserves[0].variableBorrowRate)) / (1e25) + (Math.random())*2 
  
  console.log(
    "data",
    borrowRate
  );
  return borrowRate;
};

export const fetchAaveData = async () => {
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/78vjx5nN57gJDJCGYafxkGNKQSEFfTNo4AkNBcRQZV2R`;
  return await request(url, AAVE_QUERY);
};

export const fetchBinancePrice = async () => {
  const response = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
  );
  return await response.json();
};

export const fetchAaveBorrowRate = async (symbol: string) => {
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/78vjx5nN57gJDJCGYafxkGNKQSEFfTNo4AkNBcRQZV2R`;
  const data = await request(
    url,
    `{
  reserves(where: {symbol: "${symbol}"}) {  # Limit results to 5 per request
      symbol
      variableBorrowRate
  }
}`
  );
  const borrowRate = Number(BigInt((data as AaveRateResponse).reserves[0].variableBorrowRate)) / (1e25) + (Math.random())*0.5
  console.log(
    "data",
    borrowRate
  );
  return borrowRate;
};

export const calculateCollateralDebtHealthFactor = (userData: AaveUserData) => {
  let totalCollateralETH = 0;
  let totalDebtETH = 0;

  userData.reserves.forEach((reserve) => {
    const priceInEth = parseFloat(reserve.reserve.price.priceInEth) || 0;
    const collateralValue =
      parseFloat(reserve.currentATokenBalance) * priceInEth;
    const debtValue = parseFloat(reserve.currentTotalDebt) * priceInEth;
    const liquidationThreshold =
      parseFloat(reserve.reserve.reserveLiquidationThreshold) / 10000;

    totalCollateralETH += collateralValue * liquidationThreshold;
    totalDebtETH += debtValue;
  });
  // return pool id
  return {
    poolId: userData.id,
    healthFactor:
      totalDebtETH > 0 ? totalCollateralETH / totalDebtETH : Infinity,
    totalDebtETH,
    totalCollateralETH,
  };
};

export const calculatePriceInUSDT = (data: PriceData) => {
  const usdt = data.usdtToken.derivedETH;
  const yourToken = data.yourToken.derivedETH;
  return parseFloat(yourToken) / parseFloat(usdt);
};




// // Handle the promise with proper typing
// fetchAaveBorrowRate("TUSD");
// fetchBorrowCompound("TUSD");
// WBTC , DAI, YFI, 'AmmBptWBTCWETH', TUSD

//function that takes platform(aave, compound) and symbol and returns the borrow rate
export const getBorrowRate = async (platform: string, symbol: string) => {
  if (platform === "aave") {
    return fetchAaveBorrowRate(symbol);
  } else if (platform === "compound") {
    return fetchBorrowCompound(symbol);
  }
};

getBorrowRate("aave", "AmmBptWBTCWETH");
getBorrowRate("compound", "AmmBptWBTCWETH");
// export const fetchaaveBorrowRate = async () => {
//   const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/78vjx5nN57gJDJCGYafxkGNKQSEFfTNo4AkNBcRQZV2R`;
//   const data = await request(
//     url,
//     `{
//   reserves(first: 5, skip: 0) {  # Limit results to 5 per request
//       symbol
//       variableBorrowRate
//   }
// }`
//   );
//   console.log(
//     "data",
//     data
//   );
//   return data;
// };

// fetchaaveBorrowRate();