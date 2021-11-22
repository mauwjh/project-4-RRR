const Pool = require('pg').Pool
require('dotenv').config()


// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   database: process.env.PG_DATABASE
// }

const devConfig = {
  user: 'irnjkizbyrpuvh',
  password: 'a8783f99d118086c606143e36009f26cf0e4c628b9f7c7092af99b9160c3324c',
  host: 'ec2-52-20-143-167.compute-1.amazonaws.com',
  port: 5432,
  database: 'dcjnpvo20nbgch', 
  ssl: {required: true, rejectUnauthorized: false}
}

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {required: true, rejectUnauthorized: false}
}

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

module.exports = pool