
const publicEnvMiddleware = async (req, res, next) => {

  res.json({
    test: 'hola'
  });

};

module.exports = { publicEnvMiddleware };
