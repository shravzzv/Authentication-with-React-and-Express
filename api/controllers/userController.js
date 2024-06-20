const asyncHandler = require('express-async-handler')

/**
 * Renders the home page of the REST API.
 * @param {*} req
 * @param {*} res
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
