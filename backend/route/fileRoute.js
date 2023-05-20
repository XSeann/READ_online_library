const express = require('express')

const {
    getFiles, getFile, getSearchTest, createFile, deleteFile, updateFile
} = require('../controller/fileController')

const router = express.Router()

router.get('/', getFiles)
router.get('/:id', getFile)
router.get('/search/:title', getSearchTest)
router.post('/', createFile)
router.delete('/:id', deleteFile)
router.patch('/:id', updateFile)

module.exports = router