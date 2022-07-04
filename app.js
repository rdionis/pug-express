const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');

const PORT = 3000;

app.get('/', async(req, res) => {
	const query = await axios.get('http://localhost:3001/results');
	res.render('index', {employees: query.data});
});


app.listen(3000, () => console.log(`Server listening on ${PORT}` ));
// We can test this in our browsers, by starting the server with node app.js and then visiting http://localhost:3000.
