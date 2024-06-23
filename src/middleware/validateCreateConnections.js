const Validator = require("../utils/validaitor");
const transform = require("../utils/apiResponse");
const { ValueTypeEnum } = require("../models/connections");
module.exports = async (req, res, next) => {
  let name = req.body.name;
  let parameters = req.body.parameters ? req.body.parameters : [];

  if (!Validator.IsDefined(name).Success) {
    return transform.validationError(
      res,
      Validator.IsDefined(name).Message,
      "name"
    );
  }

  for (var i = 0; i < parameters.length; i++) {
    if (
      !Validator.IsInEnumList(parameters[i].valueType, ValueTypeEnum).Success
    ) {
      return transform.validationError(res, "نوع داده معتبر نیست", "valueType");
    }
  }

  next();
  return;
};
