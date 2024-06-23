exports.successRespond = function (res, msg, data) {
  const resdata = {
    status: 200,
    success: true,
    message: msg,
    data: data,
  };
  return res.status(200).json(resdata);
};

exports.ErrorRespond = function (res, msg, field) {
  let status = 422;
  let message = msg;
  if (msg.status) {
    status = msg.status;
    message = msg.message;
    field = msg.field;
  }
  const data = {
    status: status,
    success: false,
    message: message,
    field: field,
  };
  return res.status(status).json(data);
};

exports.notFoundRespond = function (res, msg) {
  const data = {
    status: 404,
    success: false,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationError = function (res, msg, field) {
  const resdata = {
    status: 422,
    success: false,
    message: msg,
    field: field,
  };
  return res.status(422).json(resdata);
};

exports.unauthorizedResponse = function (res, msg) {
  const data = {
    status: 401,
    success: false,
    message: msg,
  };
  return res.status(401).json(data);
};

exports.RefreshTokenException = function (res, msg, field) {
  const data = {
    status: 418,
    success: false,
    message: msg,
    field: field,
  };
  return res.status(418).json(data);
};
