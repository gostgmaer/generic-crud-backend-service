// const mongoose = require("mongoose");
// const { dbUrl } = require("../config/setting");

// const connection = mongoose.createConnection(dbUrl);
// const dynamicModel = connection.model('Tank');

// module.exports = dynamicModel;


const {  collection } = require("../config/setting");
const mongoose = require("mongoose");

const dynamicSchema = new mongoose.Schema(
    {},
    { timestamps: true }, { strict: false }
);


const genericModel = mongoose.model(collection, dynamicSchema );

module.exports = genericModel;

