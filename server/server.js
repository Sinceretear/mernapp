const express = require("express");

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;

var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const dbo = require("./db/conn");

app.get('/', (req, res) => {
  res.send('just gonna send it .0005');
});
app.get('/flower', (req, res) => {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  });
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
