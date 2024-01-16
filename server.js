require('dotenv').config()
require('./db/conn.js')
const express = require('express')
const { storyRoutes, chapterRoutes } = require('./routes')

const PORT = process.env.PORT || 5005;
const app = express();

app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => {
    res.json({
        status: true
    })
});

app.use('/api/story', storyRoutes);
app.use('/api/chapter', chapterRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});