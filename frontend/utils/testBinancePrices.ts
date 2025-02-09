interface BinancePrice {
    symbol: string;
    price: string;
  }
  
  const TOKENS = {
    ETH: "ETHUSDT",
    SOL: "SOLUSDT",
    DAI: "DAIUSDT",
    BTC: "BTCUSDT",
    AVAX: "AVAXUSDT",
    MATIC: "MATICUSDT",
    LINK: "LINKUSDT",
    UNI: "UNIUSDT",
  };
  
  async function fetchBinancePrices() {
    console.log("🔍 Fetching Binance prices...\n");
  
    try {
      // Fetch all prices in parallel
      const promises = Object.entries(TOKENS).map(async ([symbol, pair]) => {
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${pair}`
        );
        const data: BinancePrice = await response.json();
        return { symbol, price: parseFloat(data.price) };
      });
  
      const prices = await Promise.all(promises);
  
      console.log("💰 Current Token Prices in USD (Binance):\n");
      prices.forEach(({ symbol, price }) => {
        console.log(
          `${symbol.padEnd(5)} : $${price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        );
      });
  
    } catch (error) {
      console.error("❌ Error fetching Binance prices:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    }
  }
  
  // Run the test
  fetchBinancePrices(); 