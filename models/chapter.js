const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
})

module.exports = mongoose.model('Chapter', chapterSchema)