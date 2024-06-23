const Validator = require("../utils/validaitor");
const transform = require("../utils/apiResponse");
const { ValueTypeEnum } = require("../models/connections");
module.exports = async (req, res, next) => {
  let name = req.body.name;
  let value = req.body.value;
  let time = req.body.time;

  if (!Validator.IsDefined(name).Success) {
    return transform.validationError(
      res,
      Validator.IsDefined(name).Message,
      "name"
    );
  }

  if (!Validator.IsDefined(value).Success) {
    return transform.validationError(
      res,
      Validator.IsDefined(value).Message,
      "value"
    );
  }
  if (!Validator.IsDefined(time).Success) {
    return transform.validationError(
      res,
      Validator.IsDefined(time).Message,
      "time"
    );
  }

  if (!Validator.isValidTimestamp(time).Success) {
    return transform.validationError(
      res,
      Validator.isValidTimestamp(time).Message,
      "time"
    );
  }

  next();
  return;
};
