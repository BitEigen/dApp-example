import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
  * usage: npx hardhat deploySC --network biteigenTestnet
  */

async function deploySC(_taskArgs: {}, hre: HardhatRuntimeEnvironment) {
  const factory = await hre.ethers.getContractFactory("Counter")
  const tx = await factory.deploy();
  await tx.waitForDeployment();
  console.log(
    `Counter contract deployed to https://explorer-testnet.biteigen.xyz/address/${tx.target}`
  );
}

task('deploySC', 'deploy Counter contract')
  .setAction(deploySC);
