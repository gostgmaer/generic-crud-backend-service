// customerMiddleware.js
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const jwt = require('jsonwebtoken'); // Import your Mongoose user model
const { jwtSecret } = require("../config/setting");
const { jwtDecode } = require("jwt-decode");
const { invoke, getUserInfo } = require("../utils/service");

async function userMiddleWare(req, res, next) {
  // Check if the user has a Bearer token in the Authorization header
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `You don't have access for this Page`,
      statusCode: StatusCodes.UNAUTHORIZED,
      status: ReasonPhrases.UNAUTHORIZED,
    });
  }

  const tokenValue = token.split(' ')[1];

  try {
    // Decode the token to get the user's ID
    const decode = jwtDecode(tokenValue)
    const userData = getUserInfo(req)
    req.query = { ...req.query, filter:JSON.stringify(userData) }
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
