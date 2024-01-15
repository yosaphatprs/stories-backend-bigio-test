const loadEnv = require('dotenv').config();
const express = require('express')

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(require('cors')())

console.log(process.env.ATLAS_URI);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});