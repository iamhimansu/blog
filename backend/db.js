import mongoose from 'mongoose';
const uri = process.env.DB_HOST;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export default async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Successfully connected!");
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}
