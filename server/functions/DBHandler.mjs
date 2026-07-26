import { write } from 'fs';
import { readFile, writeFile } from 'fs/promises'

const DB = "../server/db.json";

async function getJSONData() {
    try {
        const rawJSON =  await readFile(DB, "utf-8");
        const parsedJSON = JSON.parse(rawJSON);
        return parsedJSON;
    }catch (err) {
        console.log(err);
        return null;
    }
}

function UpdateDB(newData){
    try {
        const newJSONData = JSON.stringify(newData, null, 4);
        writeFile(DB, newJSONData, "utf-8");
    } catch (err) { 
        console.log(err);
    }
}

async function createNewEntry( entryList, newEntry){
    if (entryList == null) {
        console.log("NO Database Found");
        return false;
    }

    if (newEntry == null) {
        console.log("Missing Fields");
        return false;
    }
        
    try {
        newEntry = { 
        id: entryList[entryList.length - 1].id + 1,
        ...newEntry
        }

        return newEntry;
    } catch (err) {
        console.log(err);
    }
    
}

export {
    getJSONData,
    UpdateDB,
    createNewEntry
};

//============================TESTING===============================================//

// const data =  await getJSONData();

// if (data) {
//     console.log(data);
// }

// const newData =  await createNewEntry(data, { 
//     title : "Sample Journal Title #4",
//     date : "26-7-2026",
//     entry : "Lorem Ipsum..."
// });


// data.push(newData);




// UpdateDB(data);


