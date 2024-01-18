const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

const mongoose = require("mongoose");
const {
  getAppIdAndEntity,
  createProjectionFromArray,
  FilterOptions,
  invoke,
} = require("../../utils/service");
const { authHost } = require("../../config/setting");
const { jwtDecode } = require("jwt-decode");

const register = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/register", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const login = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/login", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};




const forget = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/forget-password", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const changes = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/change-password", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const reset = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const { token } = req.params;

    const request = await invoke(
      `/user/auth/reset-password/${token}`,
      param,
      req
    );
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const confirm = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const { token } = req.params;
    const request = await invoke(
      `/user/auth/confirm-account/${token}`,
      param,
      req
    );
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const verify = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/verify/session", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const refresh = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke(
      "/user/auth/session/refresh/token",
      param,
      req
    );
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const signOut = async (req, res) => {
  try {
    const param = {
      method: "post",
      query: {},
      body: req.body,
    };
    const request = await invoke("/user/auth/logout", param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const profile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const tokenValue = token.split(" ")[1];
    const access_token = jwtDecode(tokenValue);
    req.params.user = access_token.user_id;
    const param = {
      method: "get",
      query: req.query,
      body: req.body,
    };

    const id = access_token.user_id;

    const request = await invoke(
      `/user/auth/profile/${req.params.user}`,
      param,
      req
    );
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};
const Updateprofile = async (req, res) => {
  try {
    const { user } = req.params;
    const param = {
      method: "patch",
      query: req.query,
      body: req.body,
    };
    const request = await invoke(`users/${user}`, param, req);
    res.status(request.statusCode).json(request);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  register,
  login,
  signOut,
  refresh,
  verify,
  confirm,
  reset,
  forget,
  changes,
  profile,
  Updateprofile,
};
