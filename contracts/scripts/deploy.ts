import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-verify";

async function main() {

  // key value store for node -> resolver address
  // const registry = await ethers.deployContract("ENSRegistry", [], { });
  // await registry.waitForDeployment();
  // console.log(
  //   `registry deployed to ${registry.target}`
  // );

  // // to wrap (sub)domains as transferable NFT
  // const nameWrapper = await ethers.deployContract("NameWrapper", [], { });
  // await nameWrapper.waitForDeployment();
  // console.log(
  //   `namewrapper deployed to ${nameWrapper.target}`
  // );

  // const controller = await ethers.deployContract("ETHRegistrarController", [], {});
  // await controller.waitForDeployment();
  // console.log(
  //   `controller deployed to ${controller.target}`
  // );

  // OKE .. je moet wel heel veel bolierplate opzetten .. wellicht een testnet gebruiken waar de rest al geinstalleerd is ?

  // hoe doe je dat met die forking ??? 
  // sepolia -- checkm for addresses under deployments/sepolia/*.json

  // sepolia addresses: 
  const REGISTRY = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
  const NAMEWRAPPER = "0x0635513f179D50A207757E05759CbD106d7dFcE8"
  const ETHREGISTRARCONROLLER = "0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72"
  const REVERSEREGISTRAR = "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6"

  const resolver = await ethers.deployContract("PublicResolver", [
        REGISTRY,
        NAMEWRAPPER,
        ETHREGISTRARCONROLLER,
        REVERSEREGISTRAR
  ], { });

  await resolver.waitForDeployment();

  console.log(
    `resolver deployed to ${resolver.target}`

    // 0xb444302e35E8F1B0A0355c6B0bA8d0196723C3D8
  );



  // deploy 

  // set node record 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
