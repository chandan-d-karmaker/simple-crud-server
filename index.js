const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const uri = "mongodb+srv://crud-user:EAwWG5XVOvlhumpc@cluster0.j1ku2ab.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());

// crud-user
// EAwWG5XVOvlhumpc
// mongodb+srv://crud-user:EAwWG5XVOvlhumpc@cluster0.j1ku2ab.mongodb.net/?appName=Cluster0

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // get data from db
    const db = client.db('simpleCrud');
    const usersCollection = db.collection('users');

    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    })

    app.get('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const user = await usersCollection.findOne(query);
      res.send(user);
    })

    app.post('/users', async(req, res)=>{
      const newUser = req.body;
      console.log('user to be inserted: ',newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })

    app.patch('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const updatedUser = req.body;
      const updatedDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role
        }
      }

      const result = await usersCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id)
      }
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Helllo world');

})

app.listen(port, () => {
  console.log(`serever is running on port ${port}`)
})