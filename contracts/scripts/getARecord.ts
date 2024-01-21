import { ethers } from "hardhat";
import { Signer, Wallet} from 'ethers';
import 'dotenv/config'
import "@nomicfoundation/hardhat-verify";
import bytes from 'bytes';
import { aRecordToWire, domainToWire, parseARecordFromWire, wireToRecord } from "./dns.service";
import { keccak256Hash, remove0xPrefix } from "./encode.service";


async function main() {

const provider = ethers.provider;
const privKey = process.env['PRIVATE_KEY'];

if (privKey != undefined){
   
    const signer_wallet = new Wallet(privKey);
    const signer = await signer_wallet.connect(provider);
    // should be 0xf0E304b7Fe717834a165D313197974634CF491F7
    // console.log(signer);

    const RESOLVER = "0x3F9664bEF6F0fDc834CaA9b1b4E49aD451B35Eec";

    const domain: string = "joera.eth";

    const node = ethers.namehash(domain);

    // console.log(node);
    // 0xfdf4b3a6df2cddff74e39730faea88aeeef79264c3195859a06cedc19c600baf

    const resolver = await ethers.getContractAt("PublicResolver", RESOLVER);
    const domainAsWire: Uint8Array = domainToWire("@");
    const hash = keccak256Hash(domainAsWire);  
    let query =  await resolver.dnsRecord(node, hash, BigInt(1));

    console.log(query);

// reverse-engineer deze shit 
    let hexString = remove0xPrefix(query);
    const byteArray = Buffer.from(hexString, 'hex');
    const uint8Array = new Uint8Array(byteArray);
    const record = parseARecordFromWire(uint8Array);
    console.log(record);


    

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
