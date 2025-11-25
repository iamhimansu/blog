import mongoose from 'mongoose';
const uri = process.env.DB_HOST;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.plugin((schema) => {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    });
});
export default async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Successfully connected!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await mongoose.disconnect();
    }
    return mongoose;
}
