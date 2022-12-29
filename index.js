const express = require('express')
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.vljpuop.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const addTaskCorrection = client.db('taskApp').collection('addTask')

        app.post('/addtask', async(req, res)=>{
            const task = req.body 
            const result = await addTaskCorrection.insertOne(task)
            res.send(result)
        })


        app.get('/addtask', async(req, res)=>{
          const email = req.query.email
          const filter = {
            email: email,
            catagory: 'Not complete'
          }
          const result = await addTaskCorrection.find(filter).toArray()
          res.send(result)
        })


        app.get('/complete', async(req, res)=>{
          const email = req.query.email
          const filter = {
            email: email,
            catagory: 'Complete'
          }
          const result = await addTaskCorrection.find(filter).toArray()
          res.send(result)
        })




        app.delete('/addtask/:id', async(req, res)=>{
          const id = req.params.id 
          const query = {_id: ObjectId(id)}
          const result = await addTaskCorrection.deleteOne(query)
          res.send(result)
        })


        app.patch('/addtask/:id', async(req, res)=>{
          const id = req.params.id 
          const newtask = req.body.message
          console.log(id)
          const filter = {_id: ObjectId(id)}

          const updateDoc = {
            $set: {
              text: newtask
            }
          };
          const result = await addTaskCorrection.updateOne(filter, updateDoc)
          res.send(result)
        })



        app.patch('/complete/:id', async(req, res)=>{
          const id = req.params.id 
          const newtask = req.body.catagory
          console.log(id)
          const filter = {_id: ObjectId(id)}

          const updateDoc = {
            $set: {
              catagory: newtask
            }
          };
          const result = await addTaskCorrection.updateOne(filter, updateDoc)
          res.send(result)
        })



    }
    finally{

    }
}

run().catch(e => console.error(e))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})