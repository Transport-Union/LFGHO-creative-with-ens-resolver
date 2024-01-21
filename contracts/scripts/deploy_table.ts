import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-verify";

async function main() {

  const table = await ethers.deployContract("HostsTable", [], { });

  await table.waitForDeployment();

  console.log(
    `hosts table deployed to ${table.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
