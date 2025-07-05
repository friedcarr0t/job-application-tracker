const express = require('express');
const dotenv = require('dotenv');
const db = require ('./models/db');
const appRoutes = require('./routes/applicationsRoutes');

const app = express(); 
dotenv.config()

app.use(express.json());
app.use('/', appRoutes);

app.listen(3000, () =>{
    console.log("Service berjalan di port 3000")
});