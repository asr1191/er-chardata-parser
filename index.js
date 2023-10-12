import fs from 'fs'
import { SaveData } from './src/savedata.js'

const readFileSyncPS = performance.now()
const sl2Buffer = fs.readFileSync('../tools-and-resources/ER0000-amrt.sl2')
const readFileSyncPE = performance.now()
console.log('readFileSync time = ' + (readFileSyncPE - readFileSyncPS) + 'ms')

function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
}

const toArrayBufferPS = performance.now()
const sl2ArrayBuffer = toArrayBuffer(sl2Buffer)
const toArrayBufferPE = performance.now()
console.log('toArrayBuffer time = ' + (toArrayBufferPE - toArrayBufferPS) + 'ms')

const getSaveDataPS = performance.now()
const saveData = new SaveData(sl2ArrayBuffer)
const getSaveDataPE = performance.now()
console.log('getSaveData time = ' + (getSaveDataPE - getSaveDataPS) + 'ms')

console.log(saveData);