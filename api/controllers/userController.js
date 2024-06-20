const { body, matchedData, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

/**
 * Renders the home page of the REST API.
 */
exports.index = (req, res) => {
  res.render('index')
}

/**
 * Handle the signup post request.
 *
 * Validates the username and password fields in the req.body and returns any errors if present.
 * If no errors are present, creates a new user in the database and returns the user object with the username field and a jwt token as the response.
 */
exports.signup = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage('Username must be 3-32 characters long.')
    .escape()
    .custom(async (username) => {
      const existingUser = await User.findOne({ username }, '_id')
      if (existingUser) throw new Error(`Username ${username} already in use.`)
    }),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long.'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    const { username, password } = matchedData(req, { onlyValidData: false })

    if (errors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({
        username,
        password: hashedPassword,
      })

      await newUser.save()

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ username, token })
    } else {
      res.status(403).json(errors.array())
    }
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
