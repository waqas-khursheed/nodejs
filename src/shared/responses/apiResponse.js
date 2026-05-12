export const successResponse = (res, message = "Success", code = 200) => {
  return res.status(code).json({
    status: true,
    message,
  });
};

export const successDataResponse = (res, message = "Success", data = null, code = 200) => {
  return res.status(code).json({
    status: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Error", code = 500, errors = null) => {
  return res.status(code).json({
    status: false,
    message,
    errors,
  });
};