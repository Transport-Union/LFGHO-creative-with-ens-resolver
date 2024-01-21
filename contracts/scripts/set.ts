import { ethers } from "hardhat";
import { Signer, Wallet } from 'ethers';
import 'dotenv/config'
import "@nomicfoundation/hardhat-verify";

async function main() {

const provider = ethers.provider;
const privKey = process.env['PRIVATE_KEY'];

if (privKey != undefined){
   
    const signer_wallet = new Wallet(privKey);
    const signer = await signer_wallet.connect(provider);

 // const namehash = require('eth-ens-namehash').hash;

    const accounts = await ethers.getSigners();

    const REGISTRY = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
    // const NAMEWRAPPER = "0x0635513f179D50A207757E05759CbD106d7dFcE8"
    // const REGISTRAR = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
    // const REVERSEREGISTRAR = "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6"

    const RESOLVER = "0x3F9664bEF6F0fDc834CaA9b1b4E49aD451B35Eec";

  //  const registrar = await ethers.getContractAt("BaseRegistrarImplementation", REGISTRAR);
    const registry = await ethers.getContractAt("ENSRegistry", REGISTRY);
  //  const contract = await ethers.getContractAt("PublicResolver", RESOLVER);

    const node = ethers.namehash("joera.eth");

    console.log(node);

    // 0xfdf4b3a6df2cddff74e39730faea88aeeef79264c3195859a06cedc19c600baf

        // perhaps i really do need to register first!

    // const tx = await registry.setResolver(
    //     node, 
    //     RESOLVER,
    //     { from: signer} 
    //     )

    // console.log(tx);

  }



// i need to register a name first!!! 

  // deploy 

  // set node record 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
