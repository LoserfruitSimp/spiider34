const fs = require('node:fs');
const path = require('path');

const sources = require('./sources.json');

const dataDirPath = path.join(__dirname, "./data")
if (!fs.existsSync(dataDirPath)) {
    // data does not exists in this directory
    fs.mkdirSync(dataDirPath)
    console.log(`Creating data directory...`)
}

// Create json for each source
for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    const sourcePath = path.join(__dirname, `./data/${source}.json`);

    if (!fs.existsSync(sourcePath)) {
        fs.writeFileSync(sourcePath, "[]", 'utf8')
        console.log(`Writing to file ${source}.json...`)
    }
}

console.log("Setup Complete!")