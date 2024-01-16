const mongoose = require('mongoose')
const Chapter = require('./chapter').schema
const Schema = mongoose.Schema

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    category: {
        type: ['Financial', 'Technology', 'Health'],
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    },
    coverImagePath: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    status: {
        type: ['Publish', 'Draft'],
        required: true
    },
    chapter: {
        type: [Chapter],
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Story', storySchema)