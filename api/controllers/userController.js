const asyncHandler = require('express-async-handler')

/**
 * Renders the home page of the REST API.
 * @param {*} req
 * @param {*} res
 */
exports.index = (req, res) => {
  res.render('index')
}
