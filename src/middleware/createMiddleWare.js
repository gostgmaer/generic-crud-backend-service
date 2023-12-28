
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require("http-status-codes");
async function createMiddleWare(req, res, next) {

    const { create_list } = req.body
    const { appId, containerId } = req.params

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
                record = { ...record, appId, containerId, ...extra }
            ))
            req.body = currBody
            next();
        }
    } else {
        var currBody = { ...create_list, appId, containerId, ...extra }
        req.body = currBody
        next();
    }
}

module.exports = createMiddleWare;
