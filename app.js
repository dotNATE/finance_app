const express = require('express');
const bodyParser = require('body-parser').json;

const app = express();

app.use(bodyParser())

app.listen(3000);