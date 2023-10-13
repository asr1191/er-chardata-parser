class DataReader {
    constructor(data) {
        this.offset = 0;
        if (data instanceof ArrayBuffer) {
            this.data = new Uint8Array(data);
            this.view = new DataView(data);
            this.isBuffer = false;
        }
        if (data instanceof Buffer) {
            this.data = data;
            this.isBuffer = true;
        }
    }

    read(length, consume = true) {
        if (!this.isBuffer) {
            let data = this.data.slice(this.offset, this.offset + length);
            if (consume)
                this.offset += length;
            return data;
        } else {
            const result = this.data.subarray(this.offset, this.offset + length);
            if (consume) {
                this.offset += length;
            }
            return result;
        }
    }

    readInt32(consume = true) {
        if (!this.isBuffer) {
            let ret = this.view.getInt32(this.offset, true);
            if (consume)
                this.offset += 4;
            return ret;
        } else {
            const result = this.data.readInt32LE(this.offset);
            if (consume) {
                this.offset += 4;
            }
            return result;
        }
    }

    readUint32(consume = true) {
        if (!this.isBuffer) {
            let ret = this.view.getUint32(this.offset, true);
            if (consume)
                this.offset += 4;
            return ret;
        } else {
            const result = this.data.readUInt32LE(this.offset);
            if (consume) {
                this.offset += 4;
            }
            return result;
        }
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