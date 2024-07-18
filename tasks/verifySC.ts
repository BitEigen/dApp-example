import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
  * usage: npx hardhat verifySC --addr 0xCF79A6a817F49cE37e7AE73F49A1A5a90FC28c84 --network biteigenTestnet
  */

async function verifySC(taskArgs: {addr: string}, hre: HardhatRuntimeEnvironment) {
  await hre.run("verify:verify", {
    address: taskArgs.addr,
    construtorArgsParams: [],
  });
}

task('verifySC', 'verify Counter contract')
  .addParam('addr', 'contract address')
  .setAction(verifySC);
