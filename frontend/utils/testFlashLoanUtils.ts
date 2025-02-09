import { 
    fetchUniswapData, 
    fetchSushiData, 
    fetchAaveData, 
    fetchBinancePrice,
    calculatePriceInUSDT,
    calculateCollateralDebtHealthFactor 
  } from './flashLoanUtils';
  
  async function runTests() {
    console.log('🏃 Starting API Tests...\n');
  
    try {
      // // Test 1: Uniswap Data
      // console.log('📊 Testing Uniswap API...');
      // const uniswapData = await fetchUniswapData();
      // console.log('Uniswap Price Data:', {
      //   UNI: uniswapData.yourToken.symbol,
      //   'Price in ETH': uniswapData.yourToken.derivedETH,
      //   'Price in USDT': calculatePriceInUSDT(uniswapData)
      // });
      // console.log('✅ Uniswap test passed\n');
  
      // // Test 2: Sushi Data
      // console.log('🍣 Testing Sushiswap API...');
      // const sushiData = await fetchSushiData();
      // console.log('Sushi Token Data:', {
      //   Symbol: sushiData.token.symbol,
      //   Name: sushiData.token.name,
      //   Decimals: sushiData.token.decimals
      // });
      // console.log('✅ Sushiswap test passed\n');
  
      // Test 3: Aave Data
      console.log('🏦 Testing Aave API...');
      const aaveData = await fetchAaveData() as { users: { id: string, reserves: any[] }[] };
      console.log('Found', aaveData.users.length, 'users with borrowed positions');
      console.log("aaveData", aaveData.users[0].reserves);
      aaveData.users.forEach((user) => {
        const healthFactor = calculateCollateralDebtHealthFactor(user as any);
        console.log(`\nUser ${user.id}`);
        console.log(`Health Factor: ${healthFactor.healthFactor}`);
        console.log(`Status: ${healthFactor.healthFactor < 1 ? '⚠️ Liquidatable' : '✅ Safe'}`);
      });
      console.log('✅ Aave test passed\n');
  
      // Test 4: Binance Price
      // console.log('💰 Testing Binance API...');
      // const binanceData = await fetchBinancePrice();
      // console.log('Current ETH/USDT Price:', binanceData.price);
      // console.log('✅ Binance test passed\n');
  
      // console.log('🎉 All tests completed successfully!');
  
    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  }
  
  // Run the tests
  runTests();