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
      res.locals.fruitsArr = fruits.rows;
      next();
    }
  } catch (err) {
    console.log(`error: ${err}`);
    next();
  }
};

crudController.postFruits = async (req, res, next) => {
  // values are fruit name & const date = new Date.tolocalestring()

  const postQuery = `
  INSERT INTO fruits (fruit)
  VALUES ($1)
  RETURNING *
  `;
  const findQuery = `
  SELECT f.fruit, f.id FROM fruits f
  WHERE f.fruit=$1
  `;

  const value = [req.body.fruit];

  try {
    const addFruit = await db.query(postQuery, value);
    if (addFruit) {
      console.log('IN CONTROLLER: added new fruit to db!');
    }

    const findFruit = await db.query(findQuery, value);
    if (findFruit) {
      res.locals.fruit = findFruit.rows[0];
      console.log('from controller: ', findFruit.rows[0]);
      next();
    }
  } catch (err) {
    console.log(`error: ${err}`);
    next();
  }
};

crudController.deleteFruit = async (req, res, next) => {
  const deleteQuery = `
  DELETE FROM fruits
  WHERE id=$1
  RETURNING *
  `;
  let value = [req.params.id];

  try {
    const deleteFruit = await db.query(deleteQuery, value);
    if (deleteFruit) {
      console.log(`IN CONTROLLER: just deleted ${value}`);
    }
    next();
  } catch (err) {
    console.log(`error: ${err}`);
    next();
  }
};

module.exports = crudController;
