const fileRouter = require('express').Router({ mergeParams: true });
const parseString = require("xml2js").parseString;
const axios = require("axios").default;
const path = require('path');
const fs = require('fs');

const urls = require('../../sources.json');

const mergeAndRemoveDuplicates = (arr1, arr2) => {
    const combinedArray = [...arr1, ...arr2];
    const uniqueMap = new Map(combinedArray.map(item => [item.name, item]));
    return Array.from(uniqueMap.values());
  };

fileRouter.get('/', async function (req, res) {
    const cite = req.query.sourse;
    const tags = req.query.tags

    const tagArray = tags.split(" ").filter(v => v != "")

    let baseURI = "";
    for (var i = 0; i < urls.length; i++) {
        if (urls[i].includes(cite)) {
            baseURI = urls[i];
            break;
        }
    }

    const data = []
    const citeData = JSON.parse(fs.readFileSync(path.join(__dirname, `../../data/${baseURI}.json`), 'utf8'));
    for (let index = 0; index < tagArray.length; index++) {
        const tagElm = tagArray[index];
        const tag = citeData.find((elm) => elm.name == tagElm)

        if (tag) {
            data.push(tag)
        } else {
            try {
                const api = await axios.get(
                    "https://" +
                    baseURI +
                    "/index.php?page=dapi&s=tag&q=index&name=" +
                    tagElm,
                    "text/xml"
                ).catch(e => {
                    console.log(e)
                });
    
                parseString(api.data, function (err, result) {
                    if(err) return
                    if(!result.tags) return
                     
                    if (result.tags.tag) {
                        const newEntry = {
                            name: result.tags.tag[0].$.name,
                            type: Number(result.tags.tag[0].$.type),
                        }
                        citeData.push(newEntry)
                        data.push(newEntry)
    
                        console.log(`NEW ENTRY (${baseURI}): ${result.tags.tag[0].$.name}`)
                    }
                });
            } catch(err) {
                console.log(err.message)
            }
        }
    }

    const array2 = JSON.parse(fs.readFileSync(path.join(__dirname, `../../data/${baseURI}.json`), 'utf8'));
    fs.writeFileSync(path.join(__dirname, `../../data/${baseURI}.json`), JSON.stringify(mergeAndRemoveDuplicates(citeData, array2)))

    res.json(data)
});

module.exports = fileRouter;