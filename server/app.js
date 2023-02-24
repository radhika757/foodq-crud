const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors'); // cross-origin resource sharing --> port of f-end 3000 & back 3001
require("./db/connection");
const port = 3001;
const router = require("./Routes/router");

// app.get("/",(req,res)=>{
//     res.send('hello node');
// });



//middleware
app.use(express.json()); // the data we get from the front is is jason form
app.use(cors());

app.use(router);

app.listen(port,()=>{
    console.log('server started at port: '+ port);
});