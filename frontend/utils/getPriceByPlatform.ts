import { request } from "graphql-request";

interface TokenPrice {
  symbol: string;
  priceUSD: number;
}

interface UniswapResponse {
  token: {
    derivedETH: string;
  };
  bundle: {
    ethPriceUSD: string;
  };
}

interface SushiResponse {
  tokens: {
    id: string;
    name: string;
    symbol: string;
    tokenDayData: {
      priceUSD: string;
    }[];
  }[];
}

interface BinanceResponse {
  symbol: string;
  price: string;
}

const TOKENS = {
  ETH: {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase(),
    uniswapSymbol: "WETH",
    binanceSymbol: "ETHUSDT"
  },
  BTC: {
    address: "0x2260FAC5E5542a773aa44fbcfedf7c193bc2c599".toLowerCase(),
    uniswapSymbol: "WBTC",
    binanceSymbol: "BTCUSDT"
  },
  LINK: {
    address: "0x514910771af9ca656af840dff83e8264ecf986ca".toLowerCase(),
    uniswapSymbol: "LINK",
    binanceSymbol: "LINKUSDT"
  }
};

const API_KEY = "ffcb9247ce480fe8bbe23be8c05ecfa2";

async function getUniswapPrice(tokenSymbol: string): Promise<number> {
  try {
    const token = TOKENS[tokenSymbol as keyof typeof TOKENS];
    if (!token) throw new Error("Token not supported");

    const query = `{
      token(id: "${token.address}") {
        derivedETH
      }
      bundle(id: "1") {
        ethPriceUSD
      }
    }`;

    const url = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
    const data = await request<UniswapResponse>(url, query);

    if (!data?.token?.derivedETH || !data?.bundle?.ethPriceUSD) {
      throw new Error("Invalid response from Uniswap");
    }

    return parseFloat(data.token.derivedETH) * parseFloat(data.bundle.ethPriceUSD);
  } catch (error) {
    throw new Error(`Uniswap price fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getSushiPrice(tokenSymbol: string): Promise<number> {
  try {
    const token = TOKENS[tokenSymbol as keyof typeof TOKENS];
    if (!token) throw new Error("Token not supported");

    const query = `{
      tokens(where: { id_in: ${JSON.stringify([token.address])} }) {
        id
        symbol
        name
        tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
          priceUSD
        }
      }
    }`;

    const url = `https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/deployments/id/QmQ2h69a3vnE6N3TN7Ys9K1vpjYiJSi8fexnj1pWpRc6uY`;
    const data = await request<SushiResponse>(url, query);

    if (!data?.tokens.length || !data.tokens[0].tokenDayData.length) {
      throw new Error(`No price data available for ${tokenSymbol}`);
    }

    return parseFloat(data.tokens[0].tokenDayData[0].priceUSD);
  } catch (error) {
    console.warn(`SushiSwap price fetch failed for ${tokenSymbol}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return getBinancePrice(tokenSymbol); // Fallback
  }
}

async function getBinancePrice(tokenSymbol: string): Promise<number> {
  try {
    const token = TOKENS[tokenSymbol as keyof typeof TOKENS];
    if (!token) throw new Error("Token not supported");

    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${token.binanceSymbol}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as BinanceResponse;

    if (!data?.price) {
      throw new Error("Invalid response from Binance");
    }

    return parseFloat(data.price);
  } catch (error) {
    throw new Error(`Binance price fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getTokenPrice(platform: 'uniswap' | 'sushiswap' | 'binance', tokenSymbol: string): Promise<number> {
  try {
    switch (platform.toLowerCase()) {
      case 'uniswap':
        return await getUniswapPrice(tokenSymbol);
      case 'sushiswap':
        return await getSushiPrice(tokenSymbol);
      case 'binance':
        return await getBinancePrice(tokenSymbol);
      default:
        throw new Error('Platform not supported');
    }
  } catch (error) {
    console.error(`Error fetching price for ${tokenSymbol} on ${platform}:`, error);
    throw error;
  }
}

// ✅ **Test Function**
async function test() {
  try {
    for (const platform of ['binance', 'uniswap', 'sushiswap'] as const) {
      for (const token of ['ETH', 'BTC', 'LINK'] as const) {
        try {
          const price = await getTokenPrice(platform, token);
          console.log(`${token} price on ${platform}: $${price.toFixed(2)}`);
        } catch (error) {
          console.warn(`Failed to fetch ${token} price from ${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      console.log('-------------------');
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run test
// test();
