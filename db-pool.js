const {Pool} = require('pg');
require("dotenv").config();

// const pool = new Pool({
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: 5432,
//     database: process.env.DATABASE
// })
module.export = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
});