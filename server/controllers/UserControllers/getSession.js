const UserResponse = require('../../models/UserResponse');

const getSession = async (request, response) => {
  const { user } = request;

  const data = UserResponse(user);

  return response
    .status(200)
    .send(data);
};

module.exports = getSession;
