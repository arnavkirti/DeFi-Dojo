export const tutorials = {
    1: {
      title: "Understanding Uniswap",
      description:
        "Learn the basics of Uniswap and how decentralized exchanges work.",
      content: `
          Welcome to your first lesson! Today we'll learn about Uniswap, one of the most popular
          decentralized exchanges in the DeFi ecosystem.
    
          Uniswap is an automated market maker (AMM) that allows users to trade tokens without
          the need for a traditional order book. Instead, it uses liquidity pools and a mathematical
          formula to determine prices.
        `,
      levels: [
        {
          title: "Level 1",
          description: "",
          tasks: [
            {
              text: "Connect your wallet to Uniswap",
              type: "CONNECT_WALLET",
              completed: false,
              AiPrompt:
                "Explain the purpose of connecting a wallet to Uniswap and provide a step-by-step guide to securely linking a MetaMask or WalletConnect-compatible wallet, also use a lots of emojis",
            },
            {
              text: "Select tokens for a swap (ETH to USDC)",
              type: "SELECT_TOKENS",
              completed: false,
              AiPrompt:
                "Describe the token swapping process on Uniswap, explaining slippage, liquidity pools, and price impact, also use a lots of emojis",
            },
            {
              text: "Enter an amount and review the swap details",
              type: "REVIEW_SWAP",
              completed: false,
              AiPrompt:
                "Guide users through entering a trade amount, reviewing fees, and understanding transaction confirmation steps, also use a lots of emojis",
            },
          ],
        },
      ],
      textForAI:
        "Explain how Uniswap's automated market maker (AMM) works, focusing on its liquidity pools, token swaps, and the concept of impermanent loss. Provide an in-depth example of a trade execution on Uniswap.",
    },
    3: {
      title: "Understanding Dao",
      description: "Learn the basics of DAOs and how they work.",
      content: `
          DAOs (Decentralized Autonomous Organizations) are innovative organizational structures
          that leverage blockchain technology to enable collective decision-making without centralized leadership.
          In a DAO, community members can propose, debate, and vote on decisions that affect the entire organization.
          This model promotes transparency, inclusivity, and community governance.
        `,
      levels: [
        {
          title: "Level 1",
          description: "",
          tasks: [
            {
              text: "Join a DAO community platform",
              type: "JOIN_DAO",
              completed: false,
              AiPrompt:
                "Explain what a DAO is and how community platforms like Discord and governance forums help DAO members stay engaged. Provide a step-by-step guide to joining a DAO community, also use a lots of emojis",
            },
            {
              text: "Review recent DAO proposals",
              type: "REVIEW_PROPOSALS",
              completed: false,
              AiPrompt:
                "Explain how DAO proposals work and how they impact governance. Guide users on where to find and review recent proposals, and analyze their potential impact on the community, also use a lots of emojis",
            },
            {
              text: "Participate in a DAO vote",
              type: "VOTE_ON_PROPOSAL",
              completed: false,
              AiPrompt:
                "Guide users on how DAO voting works, including different voting mechanisms like token-based voting and quadratic voting. Explain how to cast a vote on a proposal, also use a lots of emojis",
            },
            {
              text: "Discuss DAO governance on the community forum",
              type: "DISCUSS_GOVERNANCE",
              completed: false,
              AiPrompt:
                "Encourage discussion about DAO governance. Explain the importance of community involvement and how users can contribute by debating proposals and sharing ideas, also use a lots of emojis",
            },
          ],
        },
      ],
  
      textForAI:
        "Explain how Decentralized Autonomous Organizations (DAOs) work, focusing on the principles of decentralized governance, the proposal and voting mechanisms, token-based decision making, and how community consensus is achieved. Provide an in-depth example of how a proposal is submitted, debated, and executed within a DAO.",
    },
    2: {
      title: "Understanding Yield Farming",
      description: "Learn the basics of Yield Farming and how it works.",
      content: `
          Yield farming is a strategy in DeFi that involves staking or locking up digital assets in a smart contract to generate passive income.
          It typically involves providing liquidity to a decentralized exchange (DEX) or participating in a yield-generating protocol.
          The goal is to maximize returns by earning interest or rewards from the assets.
        `,
      levels: [
        {
          title: "Level 1: Liquidity Provider",
          description:
            "Learn the fundamentals of providing liquidity to a DeFi protocol.",
          tasks: [
            {
              text: "Connect your wallet to a liquidity pool platform",
              type: "CONNECT_WALLET",
              completed: false,
              AiPrompt:
                "Explain how liquidity pools work and why connecting a wallet is the first step. Provide a guide on securely connecting a wallet to a DeFi protocol, also use a lots of emojis",
            },
            {
              text: "Deposit assets into a liquidity pool",
              type: "DEPOSIT_LIQUIDITY",
              completed: false,
              AiPrompt:
                "Guide users through the process of providing liquidity, explaining impermanent loss, pool ratios, and potential rewards, also use a lots of emojis",
            },
            {
              text: "Monitor your pool share and the fees you earn",
              type: "MONITOR_POOL",
              completed: false,
              AiPrompt:
                "Explain how users can track their share of a liquidity pool and understand the fees and rewards generated over time, also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 2: Borrowing",
          description:
            "Understand how to use your crypto as collateral to borrow assets.",
          tasks: [
            {
              text: "Select a DeFi lending platform",
              type: "SELECT_PLATFORM",
              completed: false,
              AiPrompt:
                "Explain how to choose a DeFi lending platform, highlighting key factors like interest rates, security, and token support, also use a lots of emojis",
            },
            {
              text: "Deposit collateral and simulate a borrowing transaction",
              type: "DEPOSIT_COLLATERAL",
              completed: false,
              AiPrompt:
                "Walk users through depositing collateral and borrowing against it. Explain LTV ratios and risk management strategies, also use a lots of emojis",
            },
            {
              text: "Review loan terms and risk factors",
              type: "REVIEW_LOAN_TERMS",
              completed: false,
              AiPrompt:
                "Provide insights into loan terms, including interest rates, liquidation risks, and repayment strategies, also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 3: Lending",
          description:
            "Explore how lending your crypto can generate passive income.",
          tasks: [
            {
              text: "Provide assets for lending on a chosen platform",
              type: "PROVIDE_LENDING",
              completed: false,
              AiPrompt:
                "Explain how to provide assets for lending on a chosen platform and the benefits of doing so, also use a lots of emojis",
            },
            {
              text: "Review interest rates and understand lending risks",
              type: "REVIEW_INTEREST_RATES",
              completed: false,
              AiPrompt:
                "Explain the interest rates offered by the lending platform and the associated risks, also use a lots of emojis",
            },
            {
              text: "Simulate a lending transaction and analyze potential returns",
              type: "SIMULATE_LENDING",
              completed: false,
              AiPrompt:
                "Simulate a lending transaction and analyze potential returns, also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 4: Staking",
          description:
            "Learn how staking your tokens can yield additional rewards.",
          tasks: [
            {
              text: "Stake your tokens on a staking platform",
              type: "STAKE_TOKENS",
              completed: false,
              AiPrompt:
                "Explain how to stake your tokens on a staking platform and the benefits of doing so, also use a lots of emojis",
            },
            {
              text: "Review staking rewards and understand lock-up periods",
              type: "REVIEW_STAKING_DETAILS",
              completed: false,
              AiPrompt:
                "Review staking rewards and understand lock-up periods, also use a lots of emojis",
            },
            {
              text: "Monitor your staked tokens and claim rewards when available",
              type: "MONITOR_AND_CLAIM",
              completed: false,
              AiPrompt:
                "Monitor your staked tokens and claim rewards when available, also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 5: Holding",
          description:
            "Understand the long-term strategy of holding assets for passive yield and risk management.",
          tasks: [
            {
              text: "Evaluate the benefits of holding versus active yield strategies",
              type: "EVALUATE_HOLDING",
              completed: false,
              AiPrompt:
                "Evaluate the benefits of holding versus active yield strategies, also use a lots of emojis",
            },
            {
              text: "Set up a dashboard to track your asset performance over time",
              type: "SETUP_TRACKING",
              completed: false,
              AiPrompt:
                "Set up a dashboard to track your asset performance over time, also use a lots of emojis",
            },
            {
              text: "Analyze historical data and market trends for better decision-making",
              type: "ANALYZE_TRENDS",
              completed: false,
              AiPrompt:
                "Analyze historical data and market trends for better decision-making, also use a lots of emojis",
            },
            {
              text: "Visualize your yield farming performance over time",
              type: "VISUALIZE_PERFORMANCE",
              completed: false,
              AiPrompt:
                "Visualize your yield farming performance over time, also use a lots of emojis",
            },
          ],
        },
      ],
      textForAI:
        "Explain how yield farming works, focusing on the different types of yield farming strategies, the benefits of participating in yield farming, and the risks associated with it.",
    },
    4: {
      title: "Understanding Flash Loans",
      description: "Learn the basics of Flash Loans and how they work.",
      content: `
          Flash loans are a type of DeFi loan that allows users to borrow assets without collateral.
          They are typically used for arbitrage opportunities or to quickly respond to market conditions.
        `,
      levels: [
        {
          title: "Level 1: Arbitrage Opportunities",
          description:
            "Explore how to identify and execute arbitrage opportunities using flash loans. Learn to analyze multiple markets, detect pricing inefficiencies, and execute a series of trades that exploit these differences.",
          tasks: [
            {
              text: "Study the price variations across multiple decentralized exchanges (DEXs) to identify potential arbitrage opportunities. Use analytics tools and historical data to spot trends and determine when markets are misaligned.",
              type: "STUDY_PRICE_VARIATIONS",
              completed: false,
              AiPrompt:
                "Explain how price variations occur across decentralized exchanges and how traders identify arbitrage opportunities. Provide an example of a real-time arbitrage trade and tools that can help track price differences. Also include this youtube video link https://www.youtube.com/watch?v=YiF6x193fRk&t=313s&pp=ygUYZmxhc2ggbG9hbiBzY2FmZm9sZCBldGgg , also use a lots of emojis",
            },
            {
              text: "Set up a simulation environment to test arbitrage strategies. Create scenarios where you borrow funds via a flash loan and execute sequential trades across different DEXs to take advantage of price discrepancies.",
              type: "SIMULATE_ARBITRAGE_TRADE",
              completed: false,
              AiPrompt:
                "Walk through a simulation of an arbitrage trade using a flash loan. Explain the step-by-step process, including selecting a DEX, executing a trade, and repaying the loan within one transaction, also use a lots of emojis",
            },
            {
              text: "Calculate the net profit of an arbitrage trade by considering gas fees, slippage, and other transaction costs. Develop a detailed spreadsheet or use a simulation tool to confirm that the profit margin is sufficient before execution.",
              type: "CALCULATE_NET_PROFIT",
              completed: false,
              AiPrompt:
                "Demonstrate how to calculate the net profit of an arbitrage trade by considering slippage, gas fees, and execution time. Provide an example calculation to help users understand profitability, also use a lots of emojis",
            },
            {
              text: "Execute a live arbitrage trade using a flash loan, ensuring you monitor the transaction in real time and adjust parameters dynamically to secure the profit.",
              type: "EXECUTE_ARBITRAGE",
              completed: false,
              AiPrompt:
                "Explain the real-world execution of an arbitrage trade using a flash loan. Detail the steps required to execute the trade securely, manage risks, and ensure successful profit-taking., also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 2: Flash Loan Liquidation Profits",
          description:
            "Learn how flash loans can be used to profit from liquidation events. Understand how to monitor vulnerable positions, analyze collateral ratios, and execute a liquidation strategy to secure discounted assets.",
          tasks: [
            {
              text: "Identify DeFi lending platforms that provide real-time data on positions nearing liquidation. Research the key indicators such as collateral-to-debt ratios and market volatility that signal a liquidation risk.",
              type: "IDENTIFY_LIQUIDATION_OPPORTUNITIES",
              completed: false,
              AiPrompt:
                "Describe how to find DeFi lending platforms that display real-time liquidation risks. Explain how collateral ratios work and what factors signal an upcoming liquidation., also use a lots of emojis",
            },
            {
              text: "Perform a detailed analysis of at-risk positions by calculating their collateral ratios. Use simulation tools to pinpoint the optimal moment when a flash loan can be used to trigger a liquidation event.",
              type: "ANALYZE_RISKY_POSITIONS",
              completed: false,
              AiPrompt:
                "Break down how to analyze an at-risk DeFi position. Explain the collateral-to-debt ratio and how to determine when a flash loan can be used for liquidation., also use a lots of emojis",
            },
            {
              text: "Simulate a flash loan liquidation scenario. Borrow funds via a flash loan to pay off the debt of a vulnerable position, claim the collateral at a discount, and document every step along with the expected profit margin.",
              type: "SIMULATE_LIQUIDATION",
              completed: false,
              AiPrompt:
                "Guide users through a simulated flash loan liquidation. Explain how to borrow funds, repay debt, and claim collateral profitably., also use a lots of emojis",
            },
            {
              text: "Execute a flash loan liquidation in a controlled environment. Initiate the loan, repay the target's debt, and secure the discounted collateral, while continuously monitoring market conditions to optimize profit.",
              type: "EXECUTE_LIQUIDATION",
              completed: false,
              AiPrompt:
                "Provide a step-by-step guide on executing a live flash loan liquidation, including monitoring price fluctuations, executing transactions, and ensuring profitability, also use a lots of emojis",
            },
          ],
        },
        {
          title: "Level 3: Interest Rate Swaps",
          description:
            "Discover how to leverage differences in interest rates using flash loans. This level covers researching interest rate disparities, strategizing a temporary swap, and executing a flash loan to benefit from the spread.",
          tasks: [
            {
              text: "Research and compare interest rates across multiple DeFi lending and borrowing platforms. Identify instances where the borrowing rate on one platform is significantly lower than the lending rate on another.",
              type: "RESEARCH_INTEREST_RATES",
              completed: false,
              AiPrompt:
                "Research and compare interest rates across multiple DeFi lending and borrowing platforms. Identify instances where the borrowing rate on one platform is significantly lower than the lending rate on another., also use a lots of emojis",
            },
            {
              text: "Develop a comprehensive strategy to utilize flash loans for interest rate swaps. Outline the steps for borrowing at a lower rate, repaying at a higher rate, and ensuring the spread generates a net profit.",
              type: "DEVELOP_SWAP_STRATEGY",
              completed: false,
              AiPrompt:
                "Develop a comprehensive strategy to utilize flash loans for interest rate swaps. Outline the steps for borrowing at a lower rate, repaying at a higher rate, and ensuring the spread generates a net profit., also use a lots of emojis",
            },
            {
              text: "Simulate an interest rate swap transaction. Model various market conditions including fluctuating rates, transaction fees, and flash loan durations to evaluate the effectiveness of your strategy.",
              type: "SIMULATE_RATE_SWAP",
              completed: false,
            },
            {
              text: "Execute the interest rate swap using a flash loan. Monitor the transaction closely, adjust parameters as needed during execution, and verify that the swap reduces costs or yields the anticipated profit.",
              type: "EXECUTE_RATE_SWAP",
              completed: false,
              AiPrompt:
                "Execute the interest rate swap using a flash loan. Monitor the transaction closely, adjust parameters as needed during execution, and verify that the swap reduces costs or yields the anticipated profit., also use a lots of emojis",
            },
          ],
        },
      ],
      textForAI:
        "Explain how flash loans work, focusing on the different types of flash loans, the benefits of participating in flash loans, and the risks associated with it.",
    },
  };