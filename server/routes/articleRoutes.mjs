import { Router } from "express";
import { createNewEntry, getJSONData, UpdateDB } from "../functions/DBHandler.mjs";
import { validateEntry } from "../functions/validator.mjs";
const router = Router();



// Get All Articles
router.get('/articles', async (req, res) =>  {
    const data = await getJSONData();
    res.status(200).send(data);
});

// Access a Specific Article
router.get('/articles/:id', async (req, res) => {

    const { params : {id} } = req;

    // Parse & Validate Id
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    // Retrieve Database and find ID by index
    const data = await getJSONData();
    const entryIndex = data.findIndex((entry) => entry.id === parsedId);

    // Validate
    if (entryIndex === -1 ) return res.sendStatus(404);

    res.status(200).send(data[entryIndex]);
});

// Create New Article
router.post('/articles', validateEntry, async (req, res) => {
    const {body} = req;

    console.log(body);

    const data = await getJSONData();
    const entry = await createNewEntry(data, body);

    if (entry == null) res.sendStatus(400);

    data.push(entry);

    if (UpdateDB(data)) return res.status(201).send(data);
    else return res.sendStatus(400);
});

// Update an article
router.patch('/articles/:id', validateEntry, async (req, res) => {
    const { 
        params : {id},
        body
     } = req;

    // Parse & Validate Id
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    // Retrieve Database and find ID by index
    let data = await getJSONData();
    const entryIndex = data.findIndex((entry) => entry.id === parsedId);

    // Validate
    if (entryIndex === -1 ) return res.sendStatus(404);

    // Update
    data[entryIndex] = { ...data[entryIndex], ...body};

    if (UpdateDB(data)) return res.status(200).send({mssg: 'OK'});
    else return res.sendStatus(400);

    
});

// Delete an article
router.delete('/articles/:id', async (req, res) => {
    const { 
        params : {id},
     } = req;

    // Parse & Validate Id
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    // Retrieve Database and find ID by index
    let data = await getJSONData();
    const entryIndex = data.findIndex((entry) => entry.id === parsedId);

    // Validate
    if (entryIndex === -1 ) return res.sendStatus(404);

    // Update
    data[entryIndex].deleted = true;

    if (UpdateDB(data)) return res.status(200).send({mssg: 'OK'});
    else return res.sendStatus(400);
});

export default router;
