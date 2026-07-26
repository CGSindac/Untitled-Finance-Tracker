import { Router } from "express";
import { getJSONData } from "../functions/DBHandler.mjs";
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
router.post('/articles', (req, res) => {
    res.send("CREATE ARTICLE");
});

// Update an article
router.put('/articles/:id', (req, res) => {
    res.send("UPDATE SPECIFIC ARTICLE");
});

// Delete an article
router.delete('/articles/:id', (req, res) => {
    res.send("DELETE SPECIFIC ARTICLE");
});

export default router;
