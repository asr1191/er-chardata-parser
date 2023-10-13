import fs from 'fs'
import { SaveData } from './src/savedata.js'

const readFileSyncPS = performance.now()
const sl2Buffer = fs.readFileSync('../tools-and-resources/ER0000-gutter.sl2')
const readFileSyncPE = performance.now()
console.log('readFileSync time = ' + (readFileSyncPE - readFileSyncPS) + 'ms')

const getSaveDataPS = performance.now()
const saveData = new SaveData(sl2Buffer)
const getSaveDataPE = performance.now()
console.log('getSaveData time = ' + (getSaveDataPE - getSaveDataPS) + 'ms')

console.log(saveData);