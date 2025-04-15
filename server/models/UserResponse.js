const UserResponse = data => {
  if (!data) return undefined;

  return {
    id: data.id,
    name: data.name,
    lastName: data.lastName,
    email: data.email,
  };
};

module.exports = UserResponse;
