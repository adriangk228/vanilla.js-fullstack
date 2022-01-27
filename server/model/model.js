const { Pool } = require('pg');

const PG_URI =
  'postgres://fyjalpma:Fh6RrYJm-QH7zojgg4MXgzfcUa93NDRu@raja.db.elephantsql.com/fyjalpma';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
