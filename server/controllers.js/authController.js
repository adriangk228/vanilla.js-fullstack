const db = require('../model/model');

const authController = {};

authController.verifyLogin = (req, res, next) => {
  console.log('req.body in verifyLogin: ', req.body);
  try {
    if (req.body.user === 'mia' && req.body.pass === 'coding') {
      console.log('user and pass verified');
      res.cookie('token', `${req.body.user}token`);
      next();
    }
  } catch (err) {
    console.log(`error in authController.verifyLogin: ${err}`);
    next();
  }
};

authController.cookie = (req, res, next) => {
  try {
    if (req.cookies.token) {
      console.log(`token was set: ${req.cookies.token}`);
      next();
    }
  } catch (err) {
    console.log(`error in authController.cookie: ${err}`);
    next();
  }
};

module.exports = authController;
