// customerMiddleware.js
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import your Mongoose user model
const {  jwtSecret } = require("../config/setting");

async function userMiddleWare(req, res, next) {
  // Check if the user has a Bearer token in the Authorization header
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `No authorization token was found`,
      statusCode: StatusCodes.UNAUTHORIZED,
      status: ReasonPhrases.UNAUTHORIZED,
    });
  }

  const tokenValue = token.split(' ')[1];

  try {
    // Decode the token to get the user's ID
    const decoded = jwt.verify(tokenValue, jwtSecret); // Replace with your secret key

    // Query the user document in MongoDB
    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: `You Don't have access for this Page`,
        statusCode: StatusCodes.UNAUTHORIZED,
        status: ReasonPhrases.UNAUTHORIZED,
      });
    }

    // User is valid, so continue to the next middleware/route
    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = userMiddleWare;
