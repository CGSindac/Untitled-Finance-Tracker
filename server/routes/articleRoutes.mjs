import { Router } from "express";

const router = Router();

// Get All Articles
router.get('/articles', (req, res) =>  {
    res.send("HELLO WORLD");
});

// Access a Specific Article
router.get('/articles/:id', (req, res) => {
    res.send("ARTICLE ID");
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
