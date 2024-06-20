const asyncHandler = require('express-async-handler')
const User = require('../models/user')

/**
 * Renders the home page of the REST API.
 */
exports.index = (req, res) => {
  res.render('index')
}

/**
 * Handle the signup post request.
 */
exports.signup = [
  asyncHandler(async (req, res) => {
    res.send('signup post not implemented')
  }),
]

/**
 * Handle the signin post request.
 */
exports.signin = [
  asyncHandler(async (req, res) => {
    res.send('signin post not implemented')
  }),
]

/**
 * Get all the users.
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password')
  res.json(users)
})
