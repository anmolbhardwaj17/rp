const dotenv = require('dotenv');
const express = require('express');
var cors = require('cors')
const app = express();

dotenv.config({path: './config.env'});

require('./db/connection');
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors())

app.get("/", async (req, res) =>{
    res.send({message:"rp assignment", code:200});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`) 
})