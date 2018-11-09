const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const poll=require('./routes/poll');

const app=express();

//set a folder
app.use(express.static(path.join(__dirname,'public')));

//body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/poll',poll);
const port=5000;

app.listen(port,()=>{

    console.log(`Server is running at ${port}`);
})