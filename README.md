# pug-express project
Made with examples from [this tutorial](https://www.sitepoint.com/a-beginners-guide-to-pug/#:~:text=Pug%20is%20a%20template%20engine,from%20a%20database%20or%20API.).
<br/><br/>

## **Behaviour**
In app.js, we are declaring a route (/), which will respond to a GET request with the text “Hello, World!”. We can test this in our browsers, by starting the server with ***node app.js*** and then visiting http://localhost:3000.
<br/><br/>
### Start the server with **node app.js**
### Open Chrome and see the result by typing in http://localhost:3000.
<br/><br/>
## **Adding Some Data**
We will be building a simple staff directory which fetches a list of employees from a database and displays them in a table. For that to happen, we will need a database and some data.

For this small example, we will use a package called ***json-server***. This will allow us to create a ***db.json*** file which it will turn into a **REST API** that we can perform CRUD<sup>(1)</sup> operations against.
<br/><br/>
Finally, we need some JSON to populate it. We will use the [Random User Generator](https://randomuser.me/), which is a free, open-source API for generating random user data. Twenty-five people should do for our example, so head over to https://randomuser.me/api/?results=25 and copy the results into db.json.
<br/><br/>
Start the server in a second terminal window with:

```
json-server --watch db.json -p=3001
```
This will cause json-server to start up on port 3001 and watch our database file for changes.
<br/><br/>
## Setting up Pug as the Template Engine
Express has excellent support for using Pug, so very little configuration is necessary.

First, let’s add Pug to our project:

```
npm i pug
```
Then in app.js we need to tell Express to use Pug:

```
app.set('view engine', 'pug');
``` 
Next, create a ***views*** directory, then in the ***views*** directory, add an ***index.pug*** file.

Add some content to that file:

```
doctype html
html(lang='en')
 head
   title Hello, World!
 body
```

Then alter app.js like so:
```
const express = require('express');
const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
```

## Building the Staff Directory
The next task on the list is to hand some data to the **Pug template** to display. To do that, we will need a method of **fetching the data from the json-server**. Unfortunately, the fetch API isn’t implemented in Node, so let’s use ***axios***, the popular HTTP client instead:
```
npm i axios
```
Then alter app.js like so:

```
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  const query = await axios.get('http://localhost:3001/results');
  res.render('index', { employees: query.data });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
```
There’s a couple of things going on here. We’ve turned our route handler into an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), so that we can wait for the employee data to be returned from json-server before handing it off to the template.

Then we render the index as before, but this time we pass it an object literal containing all of our data.

Note: you have to restart the Node server every time you make a change to app.js. If this starts to get annoying, check out nodemon, which will do this for you.

Now for the Pug. Change index.pug to look like the following:
```
doctype html
html(lang='en')
  head
    title Staff Directory
    link(rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.3.3/dist/semantic.min.css')
    style.
      table.ui.celled img { display: inline-block; }
      footer { margin: 35px 0 15px 0; text-align: center }
  body
    main#main
    h1.ui.center.aligned.header Staff Directory
    .ui.container
      table.ui.celled.table.center.aligned
        thead
          tr
            th Avatar
            th First Name
            th Last Name
            th Email
            th Phone
            th City
        tbody
          each employee in employees
            tr
              td
                img.ui.mini.rounded.image(src=employee.picture.thumbnail)
              td #{employee.name.first}
              td #{employee.name.last}
              td #{employee.email}
              td #{employee.phone}
              td #{employee.location.city}
        tfoot
          tr
            th(colspan='6')
    footer
      p © #{new Date().getFullYear()} My Company
```
There’s hopefully nothing surprising going on here. We’re using [semantic-ui-css](https://www.npmjs.com/package/semantic-ui-css) for some styling, as well as a couple of styles of our own.

Then, in the table body we’re iterating over the array of employees that we are passing in from app.js and outputting their details to a table.

At the bottom of the page is a footer with our copyright claim and the current year.

If you refresh the page now, you should see this:
 ![browser simulation](https://uploads.sitepoint.com/wp-content/uploads/2019/03/1551900592pug-05.png)

 <br/><br/><br/>
<sup>(1)</sup> CRUD = create, read, update and delete