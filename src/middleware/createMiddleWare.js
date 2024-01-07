
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require("http-status-codes");
const { getUserInfo } = require("../utils/service");



async function createMiddleWare(req, res, next) {

    
try {
    
    const { create_list } = req.body
    const { appId, containerId } = req.params

    const userData = getUserInfo(req)

    const extra = {
        createdAt: Date.now(),
        updatedAt: Date.now(),status:"ACTIVE"
    }

    var body = undefined;

    if (req.body.hasOwnProperty("create_list")) {

        if (!Array.isArray(create_list)) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "create_list value must be an array",
                statusCode: StatusCodes.BAD_REQUEST,
                status: ReasonPhrases.BAD_REQUEST,
            });
        } else {
            var currBody = create_list
            currBody.map((record, index) => (
                record = { ...record, appId, containerId, ...extra,...userData }
            ))
            req.body = currBody
            next();
        }
    } else {
        var currBody = { ...req.body, appId, containerId, ...extra,...userData }
        req.body = currBody
        next();
    }
} catch (error) {
    next();
}
}

module.exports = createMiddleWare;
