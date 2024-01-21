function concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    const totalLength: number = arrays.reduce((acc, arr) => acc + arr.length, 0);
    const result: Uint8Array = new Uint8Array(totalLength);

    let offset: number = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }

    return result;
}

export function domainToWire(domain: string): Uint8Array {
    const labels: string[] = domain.split('.');
    let wireFormat: Uint8Array = new Uint8Array(0);

    for (const label of labels) {
        const labelBytes: Uint8Array = new TextEncoder().encode(label);
        const labelLength: Uint8Array = new Uint8Array([labelBytes.length]);
        wireFormat = concatUint8Arrays(wireFormat, labelLength, labelBytes);
    }

    // Append null label (0 byte)
    wireFormat = concatUint8Arrays(wireFormat, new Uint8Array([0]));

    return wireFormat;
}

export function aRecordToWire(name: string, ipAddress: string): Uint8Array {
    const nameWire: Uint8Array = domainToWire(name);
    const typeWire: Uint8Array = new Uint8Array([0, 1]); // A record type (16-bit)
    const classWire: Uint8Array = new Uint8Array([0, 1]); // Class (IN for Internet) (16-bit)
    const ttlWire: Uint8Array = new Uint8Array([0, 0, 0, 10]); // TTL (32-bit), example TTL of 10 seconds
    const dataLengthWire: Uint8Array = new Uint8Array([0, 4]); // Data length (16-bit)

    // Convert IP address to wire format
    const ipWire: Uint8Array = new Uint8Array(ipAddress.split('.').map(byte => parseInt(byte, 10)));

    console.log(nameWire);
    console.log(typeWire);
    console.log(classWire);
    console.log(ttlWire);
    console.log(dataLengthWire);
    console.log(ipWire);


    return concatUint8Arrays(nameWire, typeWire, classWire, ttlWire, dataLengthWire, ipWire);
}

export function parseARecordFromWire(data: Uint8Array): { name: string, ipAddress: string, ttl: number } | null {
    // Minimum length of an A record in wire format
    const minRecordLength = 18;

    if (data.length < minRecordLength) {
        // Invalid data length for an A record
        console.log("1");
        return null;
    }

    // Parse name (domain) from wire format
    const { offset: nameOffset, length: nameLength } = readDomainFromWire(data, 0);

    console.log(nameOffset);
    console.log(nameLength);
    // console.log(data.length);

    var string = new TextDecoder().decode(data.slice(0, nameLength));

    console.log(string)

    // Check if there's enough data for the full A record
    if (data.length < nameOffset + minRecordLength) {
        console.log("2");
        return null;
    }

    // Read type (16-bit)
    const type = readUint16FromWire(data, nameOffset + nameLength);

    // Check if it's an A record (type 1)
    if (type !== 1) {
        console.log("3");
        return null;
    }

    // Read class (16-bit)
    const classValue = readUint16FromWire(data, nameOffset + nameLength + 2);

    // Check if it's an Internet class (class 1)
    if (classValue !== 1) {
        console.log("4");
        return null;
    }

    // Read TTL (32-bit)
    const ttl = readUint32FromWire(data, nameOffset + nameLength + 4);

    // Read data length (16-bit)
    const dataLength = readUint16FromWire(data, nameOffset + nameLength + 8);

    // Check if there's enough data for the full A record
    if (data.length < nameOffset + nameLength + minRecordLength + dataLength) {
        console.log("5");
        return null;
    }

    // Read IP address (4 bytes)
    const ipAddress = Array.from({ length: 4 }, (_, index) => data[nameOffset + nameLength + 10 + index]).join('.');

    return { name: data.slice(0, nameLength).toString(), ipAddress, ttl };
}

// Helper function to read domain from wire format
function readDomainFromWire(data: Uint8Array, offset: number): { offset: number, length: number } {
    let length = 0;
    let currentOffset = offset;
    let labelLength;

    do {
        labelLength = data[currentOffset];
        currentOffset += labelLength + 1;
        length += labelLength + 1;
    } while (labelLength !== 0 && currentOffset < data.length);

    return { offset: currentOffset, length };
}

// Helper function to read 16-bit unsigned integer from wire format
function readUint16FromWire(data: Uint8Array, offset: number): number {
    return (data[offset] << 8) | data[offset + 1];
}

// Helper function to read 32-bit unsigned integer from wire format
function readUint32FromWire(data: Uint8Array, offset: number): number {
    return (data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3];
}

// Example usage:
// const aRecordBytes = aRecordToWire("example.com", "192.168.0.1");
// const parsedARecord = parseARecordFromWire(aRecordBytes);
// console.log(parsedARecord);


