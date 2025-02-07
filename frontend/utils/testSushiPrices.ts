import { request, gql } from 'graphql-request';

const apiKey = 'ffcb9247ce480fe8bbe23be8c05ecfa2'; // Replace with your actual API key

interface TokenDayData {
  priceUSD: string;
}

interface TokenData {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  tokenDayData: TokenDayData[];
}

interface GraphQLResponse {
  tokens: TokenData[];
}

const TOKENS = {
  ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  AVAX: '0x85f138bfee4ef8e540890cfb48f620571d67eda3',
  MATIC: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
  UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  // Add other tokens as needed
};

const createTokenQuery = (tokens: typeof TOKENS) => {
  const tokenIds = Object.values(tokens).map((address) => address.toLowerCase());
  return gql`
    {
      tokens(where: { id_in: ${JSON.stringify(tokenIds)} }) {
        id
        symbol
        name
        decimals
        tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
          priceUSD
        }
      }
    }
  `;
};

async function fetchSushiPrices() {
  console.log('🍣 Fetching Sushiswap prices...\n');

  try {
    const url = `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/deployments/id/QmQ2h69a3vnE6N3TN7Ys9K1vpjYiJSi8fexnj1pWpRc6uY`;
    const query = createTokenQuery(TOKENS);
    const data = await request<GraphQLResponse>(url, query);

    console.log('💰 Current Token Prices in USD (Sushiswap):\n');
    data.tokens.forEach((token) => {
      const priceUSD = token.tokenDayData[0]?.priceUSD || 'N/A';
      console.log(`${token.symbol.padEnd(5)} : $${parseFloat(priceUSD).toFixed(2)}`);
    });
  } catch (error) {
    console.error('❌ Error fetching Sushiswap prices:', error);
  }
}

// Run the function
fetchSushiPrices();
