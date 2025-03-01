import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks/deploySC";
import "./tasks/verifySC";

const DEFAULT_MNEMONIC = "test test test test test test test test test test test junk";
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("private key not found");
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      initialDate: "0",
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: 0,
      accounts: {
        mnemonic: process.env.MNEMONIC || DEFAULT_MNEMONIC,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    biteigenTestnet: {
      url: "https://rpc-testnet.biteigen.xyz",
      chainId: 1022,
      accounts: [`0x${privateKey}`]
    },
  },
  etherscan: {
    apiKey: {
      biteigenTestnet: "apikey",
    },
    customChains: [
      {
        network: "biteigenTestnet",
        chainId: 1022,
        urls: {
          apiURL: "https://explorer-testnet.biteigen.xyz/api",
          browserURL: "https://explorer-testnet.biteigen.xyz/",
        }
      }
    ],
  },
};

export default config;
