const express = require("express");
const genericRoute = express.Router();
const {
  create,
  get, createMany,
  getSingleRecord,
  remove, removeMany,
  update,
} = require("../controller/entity/controller");
const createMiddleWare = require("../middleware/createMiddleWare");
const userMiddleWare = require("../middleware/userAccess");

genericRoute.route("/record/:appId/container/:containerId").post(createMiddleWare, create);
genericRoute.route("/record/bulk/:appId/container/:containerId").post(createMiddleWare, createMany);
genericRoute.route("/record/:appId/container/:containerId").get(get);
genericRoute.route("/record/:appId/container/:containerId/:id").get(getSingleRecord);
genericRoute.route("/record/:appId/container/:containerId/:id").patch(update);
genericRoute.route("/record/bulk/:appId/container/:containerId").patch(update);
genericRoute.route("/record/:appId/container/:containerId/:id").put(update);
genericRoute.route("/record/bulk/:appId/container/:containerId").put(update);
genericRoute.route("/record/:appId/container/:containerId/:id").delete(remove);
genericRoute.route("/record/bulk/:appId/container/:containerId/:id").delete(removeMany);
module.exports = genericRoute;
