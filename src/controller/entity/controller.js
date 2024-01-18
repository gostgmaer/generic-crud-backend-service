// @ts-nocheck
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
} = require("../../utils/service");
const { collection } = require("../../config/setting");
const genericSchema = mongoose.connection.collection(collection);

const create = async (req, res) => {
  try {
    const result = await genericSchema.insertOne(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Record Created Successfully!",
      status: ReasonPhrases.CREATED,
      statusCode: StatusCodes.CREATED,
      result: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const createMany = async (req, res) => {
  try {
    const result = await genericSchema.insertMany(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Record Created Successfully!",
      status: ReasonPhrases.CREATED,
      statusCode: StatusCodes.CREATED,
      result: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

//Get All Record

const get = async (req, res) => {
  try {
    const { appId, containerId } = req.params;

    const { sort, page, limit, filter, select_keys } = req.query;

    const filterData = FilterOptions(
      sort,
      page,
      limit,
      filter,
      (extra = { appId }),
      select_keys
    );

    const objects = await genericSchema
      .find(
        { ...filterData.query, appId, containerId },
        { projection: filterData.arrayOfValues }
      )
      // .sort(filterData.options.sort)
      // .skip(filterData.options.skip)
      // .limit(parseInt(filterData.options.limit))
      // .toArray();
    const totalCount = await genericSchema.countDocuments({
      ...filterData.query,
      appId,
      containerId,
    });

    res.status(StatusCodes.OK).json({
      result: objects,
      total_record: totalCount,
      message: `Loaded Successfully!`,
      statusCode: StatusCodes.OK,
      status: ReasonPhrases.OK,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};

const getSingleRecord = async (req, res) => {
  try {
    const { appId, containerId } = req.params;
    const objectId = req.params.id;
    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const object = await genericSchema.findOne({ appId, containerId, _id: ID });
    if (!object) {
      res.status(StatusCodes.NOT_FOUND).json({
        result: object,
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        result: object,
        message: `Loaded Successfully!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { appId } = req.params;
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const object = await genericSchema.findOneAndUpdate(
      { _id: ID },
      { $set: { ...req.body, status: "INACTIVE" } },
      { returnOriginal: false }
    );
    if (object?.lastErrorObject?.n == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `deleted successful!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};

const removeMany = async (req, res) => {
  try {
    const { appId } = req.params;
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const object = await genericSchema.bulkWrite(
      { _id: ID },
      { $set: { ...req.body, status: "INACTIVE" } },
      { returnOriginal: false }
    );
    if (object?.lastErrorObject?.n == 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        message: `deleted successful!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const objectId = req.params.id;

    if (!objectId) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record id Provide`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    }
    const ID = new mongoose.Types.ObjectId(objectId);
    const objectToUpdate = req.body;

    const result = await genericSchema.findOneAndUpdate(
      { _id: ID },
      { $set: objectToUpdate },
      { returnOriginal: false }
    );

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `No record Found for Given id!`,
        statusCode: StatusCodes.NOT_FOUND,
        status: ReasonPhrases.NOT_FOUND,
      });
    } else {
      res.status(StatusCodes.OK).json({
        result: result.value,
        message: `Update successfully!`,
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};

module.exports = {
  create,
  createMany,
  get,
  getSingleRecord,
  remove,
  removeMany,
  update,
};
