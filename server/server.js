const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = 3000;

const app = express();
const authController = require('./controllers.js/authController');
const crudController = require('./controllers.js/crudController');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/views', express.static(path.join(__dirname, '../views')));

// serve index.html on route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/', crudController.getFruits, (req, res) => {
  return res.status(200).json({ fruits: res.locals.fruits });
});

// global error handler
app.use((err, req, res, next) => {
  const errObj = {
    log: 'Express error handler caught in unknown middleware error',
    status: 500,
    message: `An error occurred: ${err}`,
  };
  console.log(errObj);
  return res.status(errObj.status).json(errObj.message);
});

// handler for all other non-defined routes
app.use((req, res) => {
  res.status(404).send('This is not the page you are looking for...');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
