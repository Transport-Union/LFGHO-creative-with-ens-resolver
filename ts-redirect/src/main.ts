import { ethers } from "ethers";
import { parseARecordFromWire, parseARecordFromWireV2 } from "./dns.service";
import { remove0xPrefix } from "./encode.service";

const main = async () => {

  //  console.log(window.location.hostname)

    // const node = ethers.namehash(window.location.hostname);
    // console.log(node);

    const uriTemplate = `SELECT+json_group_array%28json_object%28%27A%27%2C+arecord%29%29+as+json_array+FROM+host_records_11155111_517+WHERE+name%3D%27${window.location.hostname}%27`;

    const response = await fetch(`https://testnets.tableland.network/api/v1/query?unwrap=true&extract=true&statement=${uriTemplate}`);
    const hosts = await response.json();
    console.log(hosts);

    var Buffer = require('buffer/').Buffer;
    let hexString = remove0xPrefix(hosts[0]["A"]);
    const byteArray = Buffer.from(hexString, 'hex');
    const uint8Array = new Uint8Array(byteArray);

    let ipAddress = parseARecordFromWireV2(uint8Array);

    // console.log(name);
    console.log(ipAddress);


    window.location.href = 'http://' + ipAddress;

    // nah   .. jammert .. dns is te secure voor dit soort gehack.

    // hoe werkt het als je een erkende tld gebruikt ? 

    return true

}

/*

SELECT json_object('node', node, 'domain', domain, 'arecord', arecord) FROM host_records_11155111_509 WHERE node=


      "id integer primary key,"
                "address text,"
                "node text,"
                "domain text,"
                "arecord text," 



*/

main().catch((error) => {
    console.error(error);

  });