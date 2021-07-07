const express = require('express');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8000


app.use(express.static(__dirname + '\\views'))
app.set("view engine", "ejs");

const sql = require('mssql');


const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 1433,
  options: {
    trustservercertificate: true
  }
}

const pool = new sql.ConnectionPool(sqlConfig);

app.get('/', (req, res) => {
  res.render('upload');
});

app.get('/complete', (req, res) => {
  res.render('complete');
});

app.post('/excel', (req, res) => {
  pool.connect().then(() => {
    pool.query('SELECT * FROM LLR_AB')
    .then(results => {
      console.log("Query error", results)
    })
    .then(() => {
      res.redirect('/complete');
    })
  })
  .catch((err) => {
      console.log("Connection Error", err);
    })
  
  
});

app.listen(port, () => console.log("Listening on port " + port));