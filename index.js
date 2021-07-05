const express = require('express');

const app = express();
const port = process.env.PORT || 8000

app.use(express.static(__dirname + '\\views'))
app.set("view engine", "ejs");

const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE
}

app.get('/', (req, res) => {
  res.render('upload');
});

app.get('/complete', (req, res) => {
  res.render('complete');
});

app.post('/excel', (req, res) => {
  res.redirect('/complete');
});

app.listen(port, () => console.log("Listening on port " + port));