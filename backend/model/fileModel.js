const mongoose = require('mongoose')

const Schema = mongoose.Schema
const FileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('libraryFiles', FileSchema)