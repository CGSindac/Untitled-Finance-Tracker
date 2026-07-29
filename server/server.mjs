import express  from 'express'
import articleRouters from './routes/articleRoutes.mjs'
import cors from 'cors'
import { authMiddleWare } from './functions/auth.mjs';

const PORT = 3000 || 3000;

const app = express();

app.use(cors()); // Cors Middleware to allow client-server interaction
app.use(express.json()); // To Parse JSON in the request Bodies
app.use(authMiddleWare); // Implementing Basic Authentication
app.use('/api', articleRouters); // Routes to declutter server.mjs

app.listen( PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});