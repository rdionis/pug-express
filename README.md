# pug-express project
Made with examples from [this tutorial](https://www.sitepoint.com/a-beginners-guide-to-pug/#:~:text=Pug%20is%20a%20template%20engine,from%20a%20database%20or%20API.).
<br/><br/>

### **Behaviour**
In app.js, we are declaring a route (/), which will respond to a GET request with the text “Hello, World!”. We can test this in our browsers, by starting the server with ***node app.js*** and then visiting http://localhost:3000.
<br/><br/>
### Start the server with **node app.js**
### Open Chrome and see the result by typing in http://localhost:3000.
<br/><br/>
### **Adding Some Data**
We will be building a simple staff directory which fetches a list of employees from a database and displays them in a table. For that to happen, we will need a database and some data.

For this small example, we will use a package called ***json-server***. This will allow us to create a ***db.json*** file which it will turn into a **REST API** that we can perform CRUD<sup>(1)</sup> operations against.
<br/><br/>
<br/><br/>
<sup>(1)</sup> CRUD = create, read, update and delete