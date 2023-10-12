import { DataReader } from './datareader.js'
class SaveData {
    constructor(data) {
        let view = new DataView(data, 0x1901D04, 10);
        this.characters = new Array(10).fill(false);

        for (let i = 0; i < 10; i++) {
            if (view.getInt8(i) == 1) {
                let reader = new DataReader(this.getSlotData(data, i));
                this.characters[i] = new CharacterData(reader);
            }
        }
    }

    getSlotData(data, slot) {
        let slotStart = 0x300;
        let slotLen = 0x280010;
        let start = slotStart + (slot * slotLen);
        return data.slice(start, start + slotLen);
    }
}

class CharacterData {
    constructor(reader) {
        this.reader = reader;
        Object.defineProperty(this, 'reader', { enumerable: false });

        reader.seek(0x10);
        this.version = reader.readInt32();
        reader.seek(0x04, true);
        this.timePlayed = reader.readInt32();
        reader.seek(0x04, true);

        if (this.version > 0x51) { // Newer versions have an extra 16 bytes of padding
            reader.seek(0x10, true);
        }

        for (let i = 0; i < 0x1400; i++) {// Lookup Table
            reader.skipLookupEntry();
        }

        this.internal = {};
        Object.defineProperty(this, 'internal', { enumerable: false });

        reader.seek(0x94, true) // DOGE SKIP SHIT

        let name = new Uint16Array(reader.read(0x22, false).buffer);
        reader.seek(0x20, true);
        this.internal.nameBuffer = name;
        this.internal.name = String.fromCharCode(...name.slice(0, name.indexOf(0)));

        reader.seek(0x9418, true) // DOGE SKIP SHIT

        this.internal.unknownBlockCount = reader.readInt32();
        for (var i = 0; i < this.internal.unknownBlockCount; i++) {
            reader.seek(0x8, true) // DOGE SKIP SHIT
        }

        reader.seek(0x62E7, true) // DOGE SKIP SHIT

        this.internal.playRegionCount = reader.readInt32();
        for (let i = 0; i < this.internal.playRegionCount; i++) {
            reader.seek(0x4, true) // DOGE SKIP SHIT
        }

        reader.seek(0x1CA44, true) // DOGE SKIP SHIT

        this.internal.deathCount = reader.readUint32();

        this.name = this.internal.name;
        this.deathCount = this.internal.deathCount;

    }
}

export { SaveData };