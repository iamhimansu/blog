import run from "./db.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";

const PORT = process.env.PORT;
const API_PATH = process.env.BASE_PATH;
const API_VERSION = process.env.API_VERSION;
const API_URL = API_PATH + '/' + API_VERSION;

const app = express();

// use cors
app.use(cors());
//json
app.use(express.json());

app.get(API_URL + '/welcome', (req, res) => {
    res.status(200).send({ message: 'Hello, Welcome' });
});

app.post(API_URL + '/registration', (req, res) => {
    console.log(req.body);

    // const { username, email, password } = req.body;
    // /**
    //  * Check if the user is already present
    //  */
    // const alreadyExists = User.find({ username: { $exists: true, $eq: username } });
    // console.log(alreadyExists);

    res.status(200).send({ userexists: 0 })
});


app.listen(PORT, () => {
    run().catch(console.dir);
    console.log(`Server started, visit: http://localhost:${PORT}/welcome`);
});