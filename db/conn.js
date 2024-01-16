const mongoose = require('mongoose')

const connectionString = process.env.ATLAS_URI || "";

try {
    mongoose.connect(
        connectionString,
    );
} catch (e) {
    console.error(e);
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

module.exports = dbConnection;