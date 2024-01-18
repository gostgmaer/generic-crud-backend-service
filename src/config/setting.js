const dbUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const refressSecret = process.env.JWT_REFRESH_SECRET;
const serverPort = process.env.PORT;
const collection = process.env.COLLECTION;

const authHost = process.env.AUTHHOST;

module.exports = {
  dbUrl,
  authHost,
  jwtSecret,
  serverPort,
  collection,
  refressSecret,
};
