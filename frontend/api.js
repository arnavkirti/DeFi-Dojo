
import {request} from "graphql-request"

const apiKey = "ffcb9247ce480fe8bbe23be8c05ecfa2"

const query = 
`{
  yourToken: token(id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984") {
    symbol
    derivedETH
  }
  usdtToken: token(id: "0xdac17f958d2ee523a2206206994597c13d831ec7") {
    derivedETH
  }
}`

const fetchdata = async () => {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    const data = await request(url, query)
    return data
}

const sushiquery = 
`{
  token(id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2") {
    symbol
    name
    decimals
  }
}`

// const usdt = fetchdata().then(data => {const usdt = data.usdtToken.derivedETH
//     const yourToken = data.yourToken.derivedETH
//     const priceInUsdt = yourToken / usdt
//     console.log(priceInUsdt)
// })

const fetchdataSushi = async () => {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/2tGWMrDha4164KkFAfkU3rDCtuxGb4q1emXmFdLLzJ8x`
    const data = await request(url, sushiquery)
    return data
}

// const usdtsushi = fetchdataSushi().then(data => {const sushi = data.token.decimals  
//     console.log(data)
// })

const Aavequery = 
`{
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
}`

const fetchdataAave = async () => {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/78vjx5nN57gJDJCGYafxkGNKQSEFfTNo4AkNBcRQZV2R`
    const data = await request(url, Aavequery)
    return data
}

fetchdataAave().then(users => {
    users.users.forEach(user => {
        let totalCollateralETH = 0;
        let totalDebtETH = 0;

        console.log("\nUser:", user.id);

        user.reserves.forEach(reserve => {
            const symbol = reserve.reserve.symbol;
            const priceInEth = parseFloat(reserve.reserve.price.priceInEth) || 0;
            const collateralValue = parseFloat(reserve.currentATokenBalance) * priceInEth;
            const debtValue = parseFloat(reserve.currentTotalDebt) * priceInEth;
            const liquidationThreshold = parseFloat(reserve.reserve.reserveLiquidationThreshold) / 10000; // Convert bps to decimal

            totalCollateralETH += collateralValue * liquidationThreshold;
            totalDebtETH += debtValue;

            console.log(`${symbol}:`);
            console.log(`  - Debt: ${debtValue.toFixed(6)} ETH`);
            console.log(`  - Collateral: ${collateralValue.toFixed(6)} ETH`);
            console.log(`  - Liquidation Threshold: ${(liquidationThreshold * 100).toFixed(2)}%`);
        });

        const healthFactor = totalDebtETH > 0 ? totalCollateralETH / totalDebtETH : Infinity;

        console.log(`\n🔴 Health Factor: ${healthFactor.toFixed(2)}`);
        console.log(healthFactor < 1 ? "⚠️ Eligible for Liquidation!" : "✅ Safe Position");
        console.log("---------------------------------------------------");
    });
});

"binance price getting api" = https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT