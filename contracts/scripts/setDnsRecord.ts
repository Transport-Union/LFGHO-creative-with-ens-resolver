import { ethers } from "hardhat";
import { Signer, Wallet } from 'ethers';
import 'dotenv/config'
import "@nomicfoundation/hardhat-verify";
import bytes from 'bytes';
import { aRecordToWire } from "./dns.service";


async function main() {

const provider = ethers.provider;
const privKey = process.env['PRIVATE_KEY'];

if (privKey != undefined){
   
    const signer_wallet = new Wallet(privKey);
    const signer = await signer_wallet.connect(provider);
    // should be 0xf0E304b7Fe717834a165D313197974634CF491F7
    // console.log(signer);

    const HOSTSTABLE = "0x66fdc9c2f1811a61DDe4cd2b2d1FDd35fF84d9e7";

    const name: string = "p2p-citizen.eth";
    const dealRef: string = "0x123";
    const node = ethers.namehash(name);

    console.log(node);

    const hostsTable = await ethers.getContractAt("HostsTable", HOSTSTABLE);
    const aRecord: Uint8Array = aRecordToWire("@","143.176.14.172");
    const hexedARecord  = "0x" + Buffer.from(aRecord).toString('hex');
    console.log(hexedARecord);

    // let tx =  await hostsTable.insertIntoTable("kip"); // node, name, hexedARecord, dealRef

    // console.log(tx);

  }

  // name: the keccak256() hash of the name of the record in DNS wire format.

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
