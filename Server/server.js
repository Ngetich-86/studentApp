import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import Routes from "./Routes/routes.js";

const app = express();
dotenv.config();
app.use(cors());


// Middleware
app.use(express.json());


// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,');
    next();
})

// Routes
Routes(app);

app.get('/', (req, res) => {
    res.send("Hello this a Simple CRUD App.!");
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})