require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No authorization token' });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.patient = decoded.patient
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization invalid' })
  }
}