require('dotenv').config();
const Web3 = require('web3');
const axios = require('axios');

const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;

const web3 = new Web3(INFURA_URL);
            [WETH_ADDRESS, tokenAddress], // Path: WETH -> Token Address
            WALLET_ADDRESS,
            Math.floor(Date.now() / 1000) + 60 * 10 // Deadline 10 minutes from now
        ).encodeABI(),
        nonce: txCount,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction receipt:', receipt);
}

// Example function to monitor liquidity (this is just a placeholder)
async function monitorLiquidity() {
    const tokenAddress = '0x...'; // Replace with the token address to monitor
    const liquidityPoolAddress = '0x...'; // Replace with the liquidity pool address

    // Check liquidity
    const response = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/ethereum/${liquidityPoolAddress}`);
    const liquidityData = response.data;

    if (liquidityData && liquidityData.pair && liquidityData.pair.liquidity) {
        const liquidity = liquidityData.pair.liquidity;

        if (liquidity > 0) {
            const amountIn = web3.utils.toWei('0.1', 'ether'); // Amount of ETH to use for buying
            await buyToken(tokenAddress, amountIn);
        }
    }
}

// Start monitoring
setInterval(monitorLiquidity, 5000); // Check every 5 seconds
