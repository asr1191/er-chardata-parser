import { DataReader } from './datareader.js'
import { Buffer } from 'buffer'

class SaveData {
    constructor(data) {
        if (data instanceof ArrayBuffer) {
            let view = new DataView(data, 0x1901D04, 10);
            this.characters = new Array(10).fill(false);

            for (let i = 0; i < 10; i++) {
                if (view.getInt8(i) == 1) {
                    let reader = new DataReader(this.getSlotData(data, i));
                    this.characters[i] = new CharacterData(reader);
                }
            }
        }
        if (data instanceof Buffer) {
            this.characters = new Array(10).fill(false);
            const slotsManifestBuffer = data.subarray(0x1901D04, 0x1901D04 + 10);

            for (let index = 0; index < 10; index++) {
                if (slotsManifestBuffer.readInt8(index) == 1) {
                    const slotBuffer = new DataReader(this.getSlotBuffer(data, index));
                    this.characters[index] = new CharacterData(slotBuffer);

                }
            }
        }
    }

    getSlotBuffer(buffer, index) {
        const slotStart = 0x300;
        const slotLength = 0x280010;
        const start = slotStart + (index * slotLength);

        return buffer.subarray(start, start + slotLength)
    }

    getSlotData(data, slot) {
        let slotStart = 0x300;
        let slotLen = 0x280010;
        let start = slotStart + (slot * slotLen);
        return data.slice(start, start + slotLen);
    }
}

class CharacterData {
    constructor(dataReader) {
        this.dataReader = dataReader;
        Object.defineProperty(this, 'reader', { enumerable: false });
        dataReader.seek(0x10);
        this.version = dataReader.readInt32();
        dataReader.seek(0x04, true);
        this.timePlayed = dataReader.readInt32();
        dataReader.seek(0x04, true);

        if (this.version > 0x51) { // Newer versions have an extra 16 bytes of padding
            dataReader.seek(0x10, true);
        }

        for (let i = 0; i < 0x1400; i++) {// Lookup Table
            dataReader.skipLookupEntry();
        }

        this.internal = {};
        Object.defineProperty(this, 'internal', { enumerable: false });

        dataReader.seek(0x94, true) // DOGE SKIP SHIT

        const nameString = dataReader.read(0x20, true).toString('utf16le');
        this.internal.name = nameString.indexOf('\0') == -1 ? nameString : nameString.slice(0, nameString.indexOf('\0'));

        dataReader.seek(0x9418, true) // DOGE SKIP SHIT

        this.internal.unknownBlockCount = dataReader.readInt32();
        for (var i = 0; i < this.internal.unknownBlockCount; i++) {
            dataReader.seek(0x8, true) // DOGE SKIP SHIT
        }

        dataReader.seek(0x62E7, true) // DOGE SKIP SHIT

        this.internal.playRegionCount = dataReader.readInt32();
        for (let i = 0; i < this.internal.playRegionCount; i++) {
            dataReader.seek(0x4, true) // DOGE SKIP SHIT
        }

        dataReader.seek(0x1CA44, true) // DOGE SKIP SHIT

        this.internal.deathCount = dataReader.readUint32();

        this.name = this.internal.name;
        this.deathCount = this.internal.deathCount;
    }

}

export { SaveData };