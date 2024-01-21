import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@tableland/hardhat";
import 'dotenv/config'

if (process.env.SEPOLIA_API_URL == undefined || process.env.PRIVATE_KEY == undefined) throw Error('missing envs ');

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: `0.8.21`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 15000
          },
          evmVersion: `paris`
        }
      },
    ],
  },
  defaultNetwork: "sepolia", 
  networks: {
    hardhat: {
      forking: {
        url: process.env.SEPOLIA_API_URL,
        blockNumber: 5079618
      }
    },
    sepolia: {     
      url: process.env.SEPOLIA_API_URL,     
      chainId: 11155111, 
      accounts: [`0x${process.env.PRIVATE_KEY}`],  
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      sepolia : "WIRHP12YN15QTZJAUJWPZ82VKFBPVNQB3Y"
    }
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};

export default config;
