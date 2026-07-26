import express  from 'express'
import articleRouters from './routes/articleRoutes.mjs'

const PORT = 3000 || 3000;

const app = express();

app.use(express.json())
app.use(articleRouters);

app.listen( PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});