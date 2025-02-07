import { request } from "graphql-request";

const apiKey = "ffcb9247ce480fe8bbe23be8c05ecfa2";

interface TokenData {
  symbol: string;
  derivedETH: string;
  totalSupply: string;
}

interface BundleData {
  ethPriceUSD: string;
}

interface GraphQLResponse {
  [key: string]: TokenData | BundleData;
}

const TOKENS = {
  ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase(),
SOL: "0xd31a59c85ae9d8edefec411d448f90841571b89c".toLowerCase(),
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f".toLowerCase(),
  BTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599".toLowerCase(),
  AVAX: "0x85f138bfee4ef8e540890cfb48f620571d67eda3".toLowerCase(),
  MATIC: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0".toLowerCase(),
  LINK: "0x514910771af9ca656af840dff83e8264ecf986ca".toLowerCase(),
  UNI: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984".toLowerCase(),
};

const createTokenQuery = (tokens: typeof TOKENS) => {
  const tokenQueries = Object.entries(tokens)
    .map(
      ([symbol, address]) => `
    ${symbol}: token(id: "${address}") {
      symbol
      derivedETH
      totalSupply
    }
  `
    )
    .join("\n");

  return `{
    ${tokenQueries}
    bundle(id: "1") {
      ethPriceUSD
    }
  }`;
};

async function fetchTokenPrices() {
  console.log("🔍 Fetching token prices...\n");

  try {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
    const data = await request<GraphQLResponse>(url, createTokenQuery(TOKENS));

    console.log("💰 Current Token Prices in USD:\n");
    Object.keys(TOKENS).forEach((symbol) => {
      const tokenData = data[symbol] as TokenData;
      const ethPriceUSD = (data["bundle"] as BundleData).ethPriceUSD;
      const priceUSD = parseFloat(tokenData.derivedETH) * parseFloat(ethPriceUSD);

      console.log(
        `${symbol.padEnd(5)} : $${priceUSD.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      );
    });
  } catch (error) {
    console.error("❌ Error fetching prices:", error);
  }
}

// Run the test
fetchTokenPrices();
