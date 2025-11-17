import run from "./db.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";

const PORT = process.env.PORT;
const API_PATH = process.env.BASE_PATH;
const API_VERSION = process.env.API_VERSION;
const API_URL = API_PATH + '/' + API_VERSION;
let connection = null;

const app = express();

// use cors
app.use(cors());
//json
app.use(express.json());

app.get(API_URL + '/welcome', (req, res) => {
    res.status(200).send({ message: 'Hello, Welcome' });
});

app.post(API_URL + '/registration', async (req, res) => {

    const { username, email, password } = req.body;
    /**
     * Check if the user is already present
     */
    const alreadyExists = await User.findOne({
        $or: [
            { username: { $exists: true, $eq: username } },
            { email: { $exists: true, $eq: email } }
        ]
    });

    if (alreadyExists) {
        res.status(200).send({ "status": 200, "message": "User with username or email already exists." });
    }

    /**
     * 
     */

    res.status(200).send({ "userexists": alreadyExists });
});

// app.use(() => {
//     connection.disconnect();
//     console.log('Disconnected!');
// });

app.listen(PORT, async () => {
    connection = await run();
    console.log(`Server started, visit: http://localhost:${PORT}/welcome`);
});