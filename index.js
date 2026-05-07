const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// crud-user
// EAwWG5XVOvlhumpc
// mongodb+srv://crud-user:EAwWG5XVOvlhumpc@cluster0.j1ku2ab.mongodb.net/?appName=Cluster0

app.get('/', (req, res)=>{
    res.send('HElllo world');

})

app.listen(port, ()=>{
    console.log(`serever is running on port ${port}`)
})