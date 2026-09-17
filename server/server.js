import express from 'express';
import cors from 'cors'; //Allows frontend and backend to communicate across different origins.
import dotenv from 'dotenv/config'; //Loads environment variables from .env.
import connectDB from './config/db.js';
import './config/instrument.js'
import * as Sentry from "@sentry/node"
import { clerkWebHooks } from './controllers/webhooks.js';


//initialize express 
const app = express();

//connect to database
await connectDB();

//Middlewares

app.use(cors())
app.use(express.json()); //Allows the backend to read JSON data coming from the frontend requests


//Routes

app.get('/', (req, res) => res.send("API WORKING"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebHooks)

//Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;