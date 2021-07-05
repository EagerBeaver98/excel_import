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
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 1433
}

app.get('/', (req, res) => {
  res.render('upload');
});

app.get('/complete', (req, res) => {
  res.render('complete');
});

app.post('/excel', (req, res) => {
  sql.connect(sqlConfig, (err) => {
    if (err) console.log(err)
    
    const request = new sql.Request();

    request.query('SELECT * FROM LLR_AB', (err, records) => {
      if (err) console.log(err)
      console.log("Records", records);
    });
  })
  res.redirect('/complete');
});

app.listen(port, () => console.log("Listening on port " + port));