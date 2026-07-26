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
        return true;
    } catch (err) { 
        console.log(err);
        return false;
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

    const date = new Date().toISOString().split('T')[0];
        
    try {
        let newId;

        if (entryList.length === 0) newId = 1;
        else newId = entryList[entryList.length - 1].id + 1;

        newEntry = { 
        id: newId,
        date : date,
        deleted : false,
        ...newEntry
        }

        return newEntry;
    } catch (err) {
        console.log(err);
        return null;
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


