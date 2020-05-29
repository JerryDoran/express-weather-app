const express = require('express');

const app = express();

const router = require('./src/router');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.set('views', 'views');

app.set('view engine', 'hbs');

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
