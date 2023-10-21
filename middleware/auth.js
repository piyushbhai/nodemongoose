const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  let token = req.headers.authorization;
  // console.log(token);
  if (!token) return res.status(401).json({ message: 'Access denied' });
  token = token.split(' ')[1];

  try {
    const verified = jwt.verify(token, 'secret_key');

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
