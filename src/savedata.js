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

        if (this.version > 0x51) // Newer versions have an extra 16 bytes of padding
            reader.seek(0x10, true);

        for (let i = 0; i < 0x1400; i++) // Lookup Table
            reader.skipLookupEntry();

        reader.seek(0x8, true);

        this.internal = {};

        Object.defineProperty(this, 'internal', { enumerable: false });
        //Character Info
        reader.seek(0x18, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0xC, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x20, true) // DOGE SKIP SHIT

        reader.seek(0xC, true); // Skip

        reader.seek(0xC, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x1C, true) // DOGE SKIP SHIT

        reader.seek(0x8, true); // Skip

        let name = new Uint16Array(reader.read(0x22, false).buffer);
        reader.seek(0x20, true);
        this.internal.nameBuffer = name;
        this.internal.name = String.fromCharCode(...name.slice(0, name.indexOf(0)));
        // this.internal.name = Array.from(name).map(code => String.fromCharCode());
        // this.internal.name = this.internal.name.slice(0, this.internal.name.indexOf('\0')).join('');

        reader.seek(0xFC, true); // Skip the rest for now
        reader.seek(0xD0, true); // Skip padding


        reader.seek(0x28, true) // DOGE SKIP SHIT

        reader.seek(0x8, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x4, true) // DOGE SKIP SHIT

        reader.seek(0x18, true); // Skip

        reader.seek(0x28, true) // DOGE SKIP SHIT

        reader.seek(0x8, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x28, true) // DOGE SKIP SHIT

        reader.seek(0x8, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT
        reader.seek(0x4, true); // Skip

        reader.seek(0x4, true) // DOGE SKIP SHIT

        for (let i = 0; i < 0xA80; i++) { // Inventory
            reader.seek(0xC, true) // DOGE SKIP SHIT
        }

        reader.seek(0x4, true) // DOGE SKIP SHIT
        for (let i = 0; i < 0x180; i++) { // Key Items
            reader.seek(0xC, true) // DOGE SKIP SHIT
        }

        reader.seek(0x8, true); // Skip
        for (var i = 0; i < 0xC; i++) {
            reader.seek(0x4, true) // DOGE SKIP SHIT
            reader.seek(0x4, true); // Skip
        }

        reader.seek(0xB8, true);

        this.internal.unknownBlockCount = reader.readInt32();
        for (var i = 0; i < this.internal.unknownBlockCount; i++) {
            reader.seek(0x8, true) // DOGE SKIP SHIT
        }

        reader.seek(0x28, true) // DOGE SKIP SHIT

        reader.seek(0x8, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x10, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x40, true) // DOGE SKIP SHIT

        reader.seek(0x4, true); // Skip

        reader.seek(0x8, true) // DOGE SKIP SHIT
        reader.seek(0x8, true); // Skip

        reader.read(0x4, true); // FACE

        reader.seek(0x8, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0xB, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0x3, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0x3, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0x3, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0x3, true); // Skip

        reader.seek(0x1, true) // DOGE SKIP SHIT

        reader.seek(0x3, true); // Skip

        reader.seek(0x3, true) // DOGE SKIP SHIT

        reader.seek(0x1, true); // Skip

        reader.seek(0x15, true) // DOGE SKIP SHIT

        reader.seek(0x1, true); // Skip

        reader.seek(0x4, true) // DOGE SKIP SHIT

        reader.seek(0x1, true); // Skip

        reader.seek(0x2, true) // DOGE SKIP SHIT

        reader.seek(0x1, true); // Skip

        reader.seek(0x1E, true) // DOGE SKIP SHIT

        reader.seek(0x40, true); // Skip

        reader.seek(0x2C, true) // DOGE SKIP SHIT

        reader.seek(0x1, true); // Skip

        reader.seek(0x35, true) // DOGE SKIP SHIT

        reader.seek(0x15, true); // Skip
        reader.seek(0x8, true); // Skip

        reader.seek(0x4, true) // DOGE SKIP SHIT

        reader.seek(0x6000, true) // DOGE SKIP SHIT

        reader.seek(0x10C, true); // Not sure what this is

        this.internal.playRegionCount = reader.readInt32();
        for (let i = 0; i < this.internal.playRegionCount; i++) {
            reader.seek(0x4, true) // DOGE SKIP SHIT
        }

        reader.seek(0x1C629, true); // Skip this BS
        // Start of the Event Flag Block
        reader.seek(0x1C, true); // Skip unknown stuff
        reader.seek(0x3FF, true); // Skip unknown stuff
        this.internal.deathCount = reader.readUint32();

        this.name = this.internal.name;
        this.deathCount = this.internal.deathCount;

    }
}

export { SaveData };