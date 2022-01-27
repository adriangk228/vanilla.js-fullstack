const db = require('../model/model');

const crudController = {};

crudController.getFruits = async (req, res, next) => {
  const query = `
  SELECT * FROM fruits
  `;

  try {
    const fruits = await db.query(query);
    if (fruits) {
      console.log(fruits.rows);
      res.locals.fruits = fruits.rows;
      next();
    }
  } catch (err) {
    console.log(`error: ${err}`);
    next();
  }
};

module.exports = crudController;
