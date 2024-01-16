require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const conn = require('./db/conn.js')

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(cors)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});