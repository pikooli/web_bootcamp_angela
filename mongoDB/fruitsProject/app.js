const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, { useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("Products");
    // Query for a movie that has the title 'Back to the Future'
    const query = { id: 1 };
    const movies = await collection.find();
    await movies.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
