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

crudController.postFruits = async (req, res, next) => {
  const query = `
  INSERT INTO fruits (fruits)
  VALUES ($1)
  RETURNING *
  `;
  const value = [req.body.fruit];

  try {
    const addFruit = await db.query(query, value);
    if (addFruit) {
      console.log('IN CONTROLLER: added new fruit to db!');
      next();
    }
  } catch (err) {
    console.log(`error: ${err}`);
    next();
  }
};

module.exports = crudController;
