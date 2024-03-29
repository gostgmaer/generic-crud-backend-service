const express = require("express");
const { register, login, signOut, refresh, verify, confirm, reset, forget, changes, profile, Updateprofile } = require("../controller/auth");
const authRoute = express.Router();




authRoute.route("/authentication/user/register").post(register);
authRoute.route("/authentication/user/signin").post(login);
authRoute.route("/authentication/user/signout").post(signOut);
authRoute.route("/authentication/user/token/refersh").post(refresh);
authRoute.route("/authentication/user/verify/auth-token").post(verify);
authRoute.route("/authentication/user/confirm:token").post(confirm);
authRoute.route("/authentication/user/reset-password:token").post(reset);
authRoute.route("/authentication/user/forget-password").post(forget);
authRoute.route("/authentication/user/change-password").post(changes);
authRoute.route("/authentication/user/current/profile").get(profile);
authRoute.route("/authentication/user/current/profile/update/:user").patch(Updateprofile);



module.exports = authRoute;
