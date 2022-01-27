const db = require('../model/model');

const crudController = {};

crudController.getFruits = async (req, res) => {
  const query = `
  SELECT * FROM fruits
  `;

  try {
    const fruits = await db.query(query);
    if (fruits) {
      console.log(fruits);
      res.locals.fruits = fruits.rows;
    }
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

module.exports = crudController;
