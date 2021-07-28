import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "@tenderly/hardhat-tenderly";

import { task } from "hardhat/config";
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const account = accounts[1];
  const balance = await account.getBalance();

  console.log({ account: account.address, balance: balance.toString() });
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      forking: {
        url: process.env.POLYGON_NODE_URL!,
      },
    },
    polygon: {
      url: process.env.POLYGON_NODE_URL!,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
    },
  },
  mocha: {
    timeout: 200000,
  },
  tenderly: {
    username: process.env.TENDERLY_USERNAME!,
    project: process.env.TENDERLY_PROJECT!,
  },
};

export default config;
