const express = require("express");
const recordRoute = express.Router();
const {
  create,
  get,createMany,
  getSingleRecord,
  remove,removeMany,
  update,
} = require("../controller/record/controller");
const createMiddleWare = require("../middleware/createMiddleWare");



recordRoute.route("/record/:appId").post(createMiddleWare,create);
recordRoute.route("/record/bulk/:appId").post(createMiddleWare,createMany);
recordRoute.route("/record/:appId").get(get);
recordRoute.route("/record/:appId/:id").get(getSingleRecord);
recordRoute.route("/record/:appId/:id").patch(update);
recordRoute.route("/record/bulk/:appId").patch(update);
recordRoute.route("/record/:appId/:id").delete(remove);
recordRoute.route("/record/bulk/:appId/:id").delete(removeMany);
module.exports = recordRoute;
