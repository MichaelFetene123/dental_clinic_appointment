require('dotenv').config();
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect().then(() => {
  client.query('SELECT name FROM "PatientProfile" LIMIT 1')
    .then(res => { console.log('Column exists on DATABASE_URL!'); client.end(); })
    .catch(e => { console.error('Error on DATABASE_URL:', e.message); client.end(); });
});
