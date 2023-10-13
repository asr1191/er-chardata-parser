import fs from 'fs'
import { SaveData } from './src/savedata.js'
import Watcher from 'watcher'

// const saveFilePath = '../tools-and-resources/ER0000-gutter.sl2'
const saveFilePath = `C:/Users/Admin/AppData/Roaming/EldenRing/76561198079103089/ER0000.sl2`

let deathCount = -1;
console.clear();

function printSaveInfo(slotId) {
    console.time('readFileSync time')
    const sl2Buffer = fs.readFileSync(saveFilePath)
    console.timeEnd('readFileSync time')

    console.time('saveData parse time')
    const saveData = new SaveData(sl2Buffer)
    console.timeEnd('saveData parse time')

    console.log(saveData.characters[slotId]);
    if (saveData.characters[slotId].deathCount != deathCount) {
        deathCount = saveData.characters[slotId].deathCount;
        console.clear();
        console.log('ELDEN RING DEATH COUNTER');
        console.log('Name: ', saveData.characters[slotId].name);
        console.log('Deaths: ', deathCount);
    }

}

const watcher = new Watcher(saveFilePath);
watcher.on('ready', (e, t, n) => {
    // console.log('Watcher initialized, ready to process events!');
})
watcher.on('change', (event, targetPath, targetPathNext) => {
    printSaveInfo(1);
})
watcher.on('add', (event, targetPath, targetPathNext) => {
    printSaveInfo(1);
})

