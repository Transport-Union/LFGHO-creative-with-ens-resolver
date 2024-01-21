import { ethers } from "hardhat";

function encodeTxtRecord(txtData: string): Uint8Array {
    // DNS TXT record wire format: length (1 byte) + data
    // Convert string to Uint8Array
    const txtBytes = new TextEncoder().encode(txtData);
    
    // Length of the TXT data
    const lengthByte = new Uint8Array([txtBytes.length]);
    
    // Concatenate length byte and data bytes
    const bytes = new Uint8Array(lengthByte.length + txtBytes.length);
    bytes.set(lengthByte, 0);
    bytes.set(txtBytes, lengthByte.length);
    
    return bytes;
}

export function keccak256Hash(data: Uint8Array): string {
    const hashArray = ethers.keccak256(data);
    const hashString = ethers.hexlify(hashArray);
    return hashString;
}

export function remove0xPrefix(input: string): string {
    if (input.startsWith("0x")) {
        return input.substring(2);
    }
    return input;
}
