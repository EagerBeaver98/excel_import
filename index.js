const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.render('Hello World');
});

app.listen(8000, () => console.log("Listening on port 8000"));