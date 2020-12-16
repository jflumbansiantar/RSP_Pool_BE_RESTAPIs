const jwt = require("jsonwebtoken");
const secretKey = "2020";

const tokenGenerator = (users) => {
  console.log(users, "--user");
  const { email, _id } = users;

  return jwt.sign(
    {
      email,
      _id,
    },
    secretKey
  );
};

const tokenVerifier = (access_token) => {
  return jwt.verify(access_token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
