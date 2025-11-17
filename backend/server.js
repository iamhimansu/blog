import run from "./db.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const PORT = process.env.PORT;
const API_PATH = process.env.BASE_PATH;
const API_VERSION = process.env.API_VERSION;
const API_URL = API_PATH + '/' + API_VERSION;
const DEBUG = process.env.DEBUG;

let connection = null;

const app = express();

// use cors
app.use(cors());
//json
app.use(express.json());

app.get(API_URL + '/welcome', (req, res) => {
    res.status(200).send({ message: 'Hello, Welcome' });
});

app.post(API_URL + '/auth/registration', async (req, res) => {

    const { username = undefined, email = undefined, password = undefined } = req.body;
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
        return res.status(200).send({ "status": 200, "message": "User with username or email already exists." });
    }

    if (!password) {
        return res.status(200).send({ "status": 200, "message": "Please provide a password." });
    }

    /**
     * Create user and save
     * Hash the password (Encrypt it)
     */
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return res.status(200).send({ status: 200, "message": "User registration successful!" });
    } catch (error) {
        return res.status(500).send({ status: error.status, "message": "Something went wrong, please try again!" });
    }

});

app.post(API_URL + '/auth/login', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!password) {
            return res.status(200).send({ status: 200, message: "Invalid credentials." });
        }

        /**
         * Check if the user is found in the system
         */
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

        if (!user) {
            return res.status(200).send({ status: 200, message: "Invalid credentials." });
        }

        /**
         * Compare user password, given === saved
         */

        console.log(user, user.password, password);

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(200).send({ status: 200, message: "Invalid credentials." });
        }
        return res.status(200).send({ status: 200, message: "Successfully logged-in." });

    } catch (error) {
        if (DEBUG) {
            throw error;
        }
        return res.status(500).send({ status: 500, message: "Something went wrong, please try again!" });
    }

});

// app.use(() => {
//     connection.disconnect();
//     console.log('Disconnected!');
// });

app.listen(PORT, async () => {
    connection = await run();
    console.log(`Server started, visit: http://localhost:${PORT}/welcome`);
});