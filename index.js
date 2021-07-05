const express = require('express');

const app = express();
const port = process.env.PORT || 8000

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log("Listening on port " + port));