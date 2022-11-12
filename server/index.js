const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const { app } = require('./app');

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
