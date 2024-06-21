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
 * If no errors are present, creates a new user in the database and returns a jwt token as the response.
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

      res.json({ token })
    } else {
      res.status(403).json(errors.array())
    }
  }),
]

/**
 * Handle the signin post request.
 *
 * Validates the username and password inputs. Checks if they are correct. If not, returns an errors arrays as the json response.
 * If there are no errors, returns a JWT as the response.
 */
exports.signin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage('Username must be 3-32 characters long.')
    .bail()
    .escape()
    .custom(async (username, { req }) => {
      const user = await User.findOne({ username }, '_id password')
      if (user) req.user = user
      if (!user) throw new Error(`Username ${username} doesn't exist.`)
    }),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long.')
    .bail()
    .custom(async (password, { req }) => {
      if (req.user && !(await bcrypt.compare(password, req.user.password))) {
        throw new Error('Incorrect password.')
      }
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

      res.json({ token })
    } else {
      res.status(403).json(errors.array())
    }
  }),
]

/**
 * Get all the users.
 */
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password')
  res.json(users)
})
