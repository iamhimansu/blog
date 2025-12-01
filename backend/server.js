import run from "./db.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "./models/Post.js";
import Uploader from "./middleware/Uploader.js";

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

app.post(API_URL + '/auth/register', async (req, res) => {

    const { username = undefined, email = undefined, password = undefined, confirmPassword = undefined } = req.body;

    if (!password || !confirmPassword) {
        return res.status(200).send({ "status": 400, "message": "Please provide a password." });
    }

    if (password != confirmPassword) {
        return res.status(200).send({ "status": 400, "message": "Passwords do not match." });
    }

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
        return res.status(200).send({ "status": 400, "message": "User with username or email already exists." });
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
        return res.status(500).send({ status: 500, "message": "Something went wrong, please try again!" });
    }

});

app.post(API_URL + '/auth/login', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!password) {
            return res.status(200).send({ status: 401, message: "Invalid credentials." });
        }

        /**
         * Check if the user is found in the system
         */
        console.log(username, email);

        const user = await User.findOne({ $or: [{ username: username }, { email: username }] }).lean();

        if (!user) {
            return res.status(200).send({ status: 401, message: "No account exists." });
        }

        /**
         * Compare user password, given === saved
         */

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(200).send({ status: 401, message: "Invalid credentials." });
        }

        /**
         * Create JWT
         */
        const token = jwt.sign(
            { id: user._id, username: user.username }, // Payload (data inside token)
            process.env.JWT_SECRET,                    // Secret key
            { expiresIn: '1h' }                        // Token expires in 1 hour
        );

        return res.status(200).send({ token: token, user: { id: user._id, username: user.username }, status: 200, message: "Successfully logged-in." });

    } catch (error) {
        if (DEBUG) {
            throw error;
        }
        return res.status(500).send({ status: 500, message: "Something went wrong, please try again!" });
    }

});

app.post(API_URL + '/posts/create', Uploader.single('headerImage'), async (req, res) => {

    const { title = null, content = null } = req.body;

    if (!title || !content || title.trim().length === 0 || content.trim().length === 0) {
        return res.send({ status: 400, message: "Title and content is required" });
    }

    /**
     * Add post to the db
     */
    const newPost = new Post({
        title, content, headerImageUrl: req.file ? req.file.path : null
    });

    try {
        await newPost.save();
        return res.status(200).send({ status: 200, "message": "New post added!", data: newPost });
    } catch (error) {
        return res.status(500).send({ status: 500, "message": "Something went wrong, please try again!" });
    }

})

app.get(API_URL + '/posts/all', async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).send({ status: 200, "message": "Ok!", data: posts });
    } catch (error) {
        return res.status(500).send({ status: 500, "message": "Something went wrong, please try again!", data: error });
    }

})

// app.use(() => {
//     connection.disconnect();
//     console.log('Disconnected!');
// });

app.listen(PORT, async () => {
    connection = await run();
    console.log(`Server started, visit: http://localhost:${PORT}/welcome`);
});