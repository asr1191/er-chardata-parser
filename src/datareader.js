class DataReader {
    constructor(data) {
        this.data = new Uint8Array(data);
        this.view = new DataView(data);
        this.offset = 0;
    }

    read(len, consume = true) {
        let data = this.data.slice(this.offset, this.offset + len);
        if (consume)
            this.offset += len;
        return data;
    }

    readInt32(consume = true) {
        let ret = this.view.getInt32(this.offset, true);

        if (consume)
            this.offset += 4;
        return ret;
    }

    readUint32(consume = true) {
        let ret = this.view.getUint32(this.offset, true);

        if (consume)
            this.offset += 4;
        return ret;
    }

    seek(offset, relative = false) {
        if (relative) {
            this.offset += offset;
        } else {
            this.offset = offset;
        }
    }

    skipLookupEntry() {
        let bytes = this.read(0x8, false);
        if ((bytes[3] == 0xC0 || bytes[3] == 0x80 || bytes[3] == 0x90)) {
            this.seek(0x8, true) // DOGE SKIP SHIT

            if (bytes[3] == 0x80) { // Weapon
                this.seek(0xD, true) // DOGE SKIP SHIT

            } else if (bytes[3] == 0x90) { // Armor
                this.seek(0x8, true) // DOGE SKIP SHIT

            } else if (bytes[3] == 0xC0) { // Ash of War
                // No extra bytes to read
            }
        } else {
            this.seek(0x8, true) // DOGE SKIP SHIT
        }
    }
}

export { DataReader };