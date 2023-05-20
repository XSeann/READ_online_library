const File = require('../model/fileModel')
const mongoose = require('mongoose')

// get all workouts
const getFiles = async (req, res) => {
  const files = await File.find({}).sort({createdAt: -1})

  res.status(200).json(files)
}

// get a single workout
const getFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const file = await File.findById(id)

  if (!file) {
    return res.status(404).json({error: 'No such data'})
  }
  
  res.status(200).json(file)
}

// get all possible regex
const getSearchTest = async (req, res) => {
  const { title } = req.params

  let arrData = [[]]
  let regex = new RegExp(title, "mi")
  const tst = await File.find({title: {$regex : regex}})
  
  let num = -1
  let num2  = 0
  for (let i = 0; i < tst.length; i++) {
    //let result = regex.exec(tst[i])
    num++
    if(num >= 5){
      arrData.push([])
      num = 0
      num2++
    }
    if(tst != null && tst[i].approved) {
      arrData[num2].push(tst[i])
    }

  }
  
  if (arrData[0].length === 0) {
    return res.status(400).json({error: 'No such Thesis'})
  }
  
  res.status(200).json(arrData)
  
}


// create new workout
const createFile = async (req, res) => {
  const {title, authors, section, pdf} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!authors) {
    emptyFields.push('authors')
  }
  if(!section) {
    emptyFields.push('section')
  }
  if(!pdf) {
    emptyFields.push('file')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: emptyFields})
  }

  // add doc to db
  try {
    const file = await File.create({title, authors, section, file: pdf})
    res.status(200).json(file)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const file = await File.findOneAndDelete({_id: id})

  if (!file) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(file)
}

// update a workout
const updateFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const file = await File.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!file) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(file)
}


module.exports = {
  getFiles,
  getFile,
  getSearchTest,
  createFile,
  deleteFile,
  updateFile
}
