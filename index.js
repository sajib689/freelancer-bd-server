const express = require('express');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173/'],
    withCredentials: true,
    optionsSuccessStatus: 200,
}));
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.Db_user}:${process.env.Db_password}@cluster0.2m0rny5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const jobsCollection = await client.db('freelancerBd').collection('jobs')
    const bidsCollection = await client.db('freelancerBd').collection('bids')
    
    app.get('/jobs', async (req, res) => {
        const result = await jobsCollection.find().toArray()
        res.send(result)
    })
  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', async(req, res) => {
    res.send('Welcome to the server')
})

app.listen(port, () => {
    console.log(`Starting ${port}`)
})