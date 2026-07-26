import express  from 'express'
import articleRouters from './routes/articleRoutes.mjs'
import cors from 'cors'

const PORT = 3000 || 3000;

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api',articleRouters);

app.listen( PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});