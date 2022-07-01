const express = require('express');
const app = express();

const PORT = 3000

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Here, we are declaring a route (/), which will respond to a GET request with the text “Hello, World!”

app.listen(3000, () => console.log(`Server listening on ${PORT}` ))
// We can test this in our browsers, by starting the server with node app.js and then visiting http://localhost:3000.
