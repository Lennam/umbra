const User = require('./model/user');
const jwt = require('jsonwebtoken');

module.exports.createToken = ({key, ...arg}) => {
  return jwt.sign({...arg}, key, { expiresIn: '12h' });
};

module.exports.isValidUser = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if(err) {
        return reject(err);
      }
      User.find({username:decoded.username, password: decoded.password}, function (err) {
        if (err) {
          return reject(err);
        }
        return resolve(decoded.username);
      });
    });
  });
};