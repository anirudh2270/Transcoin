const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack));

module.exports = {
  async query(text, params) {
    // invocation timestamp for the query method
    const start = Date.now();
    try {
      const res = await client.query(text, params);
      // time elapsed since invocation to execution
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.log('error in query', { text });
      throw error;
    }
  },
};
