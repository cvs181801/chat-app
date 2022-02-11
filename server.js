const express = require('express')
//const axios = require('axios')
//const { DateTime } = require("luxon")
const app = express()
const path = require('path')
const port = 3000;

app.use('/', express.static(path.join(__dirname, "client", "build")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
app.listen(port);