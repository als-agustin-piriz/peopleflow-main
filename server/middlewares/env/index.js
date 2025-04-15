
const publicEnvMiddleware = async (req, res, next) => {
  console.log('pase')

  res.json({
    test: 'hola'
  });

};

module.exports = { publicEnvMiddleware };
