const express = require('express')

// controller functions
const { loginUser, signupUser, getUsers, sendEmail, deleteUser, updateUser } = require('../controller/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get all users
router.get('/users', getUsers)

//send email
router.post('/sendEmail', sendEmail)

//delete a user
router.delete('/:id', deleteUser)

//update a user
router.patch('/:id', updateUser)

module.exports = router