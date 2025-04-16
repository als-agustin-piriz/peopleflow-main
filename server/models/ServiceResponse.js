
const SuccessResponse = (data, message = 'Ok') => ({
  data,
  message,
});

const SuccessPaginationResponse = ({ data = [], total, page, size }, message = 'Ok') => ({
  ...SuccessResponse(data, message)
});

const ErrorResponse = (message, errors = []) => ({
  errors,
  message,
});

module.exports = {
  SuccessResponse,
  SuccessPaginationResponse,
  ErrorResponse,
};
