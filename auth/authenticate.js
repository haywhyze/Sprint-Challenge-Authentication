const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET
  || 'add a .env file to root of project with the JWT_SECRET variable';

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      return next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
const generateToken = (id) => {
  const token = jwt.sign(
    {
      subject: id,
    },
    jwtKey,
    { expiresIn: '1d' },
  );
  return token;
};

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken,
};
