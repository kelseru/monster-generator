## The Node Handbook - How to make a D&D Random Monster Generator
A step-by-step guide on how to create a server that can pull data from an API and return it to be interactive.

### Initial Setup - Directory and Github

Firstly, you want to create a new directory and add a .gitignore file and a README.md file. Be sure to check that 'node_modules' and '.env' are included in your .gitignore for this project.

Head over to Github and set up a new repository. 'Git init' to set up a local repository and then 'git add .', 'git commit -m "first commit"', then remote add the origin source provided on Github. Finally, 'git push -u origin master' and you're ready to proceed.

Open your terminal and initialise npm using 'npm init -y'. -y will say yes to all questions, initialize everything for you and create a ready package.json file.

### Initial Setup - Installing tools and dependencies

We need to install a few things first before we can make a start on our project. Please find a list of what we need below, as well as the installation syntax and a brief overview of what they do:

nodemon- $npm i nodemon
   A tool that will automatically restart the server if it detects any changes to the files. Inside the script section of package.json, insert '"start": "nodemon index.js"'. This tells it that typing 'npm start' into the terminal will run index.js through Nodemon.        

node-fetch- $npm i node-fetch -> const fetch = require('node-fetch');
   info here

express- $npm i express
   info here

express-handlebars- $npm i express-handlebars
   info here

path- $npm i path
   info here

body-parser- $npm i body-parser
   This will change any values that the user submits via form into a json format. It will then use this data as the 'body' of a POST request.

### Folder Structure - Setup

Let's take a look at our basic folder structure:

>node-api -> our root folder
   >lib
      -getMonsters.js -> our API will be called from here
   >node_modules
   >public
      -main.css -> our CSS files
   >views -> everything in views is run by Handlebars
      >layouts
         -main.hbs
      >partials
         -navbar.hbs
      -index.hbs
      -monsters.hbs
      -404.hbs
   -.env (we will not be using this file as we do not have a key for our API)
   -index.js -> express runs the server from this file
   -package-lock.json
   -package.json -> where all of our dependencies are stored

### Initial Setup - API
Grab the API link from your respective website. We will be using https://www.dnd5eapi.co/api/ for our data.

We will be doing this inside out 'index.js' file first to ensure that the API is working correctly. We need to do a few things:

a. Import 'node-fetch'
b. Import the URL of our API as a variable

If you have an API key, be sure to add this into the address link where necessary. Keep this handy, we will need it soon! If your API has a key, move on to step c. If not, skip to step d.

   c.1. We need to remove the key from the URL. Sometimes keys have a pay-per-access charge, which we don't want other people to use. To do this, create a variable for it and insert this variable into the URL instead of the key.
   e.g 'const KEY = 'e78vy45o378y4tygefk74vr4yht';
   then 'const url = `http://blah.api.stuff${APPID}`;' (don't forget to use backticks!)

   c.2. We now need to hide our key. To do this, we will be using a zero-dependency module called dotenv. It will load variables from an .env file as a process. Install it using 'npm i dotenv' and create a new file called '.env'.

   c.3. Cut and paste your key variable into the .env file. It is not a JS file, so remove the variable declare and quote marks.
   e.g KEY = 8745973th5gh38v7h

   c.4 To call it back into index.js, we need to import the dotenv module. You can do this by typing the following into your index.js file:
   require('dotenv').config();

   c.5 Go back to your API URL. Inside our ${}, we need to add something that will search for the key in every .env file:
   e.g. '${process.env.KEY}'

d. Create a variable to fetch data from the API, then call the variable.
eg. 'const getData = async() => {
   let data = await fetch(url);
   console.log(await data.json());
}
getData ();'

When you do 'npm start', you will get your data from the API in a .json format. You should now see your API data in your console log! Let's now go ahead and move all of this information into our getMonsters.js file. 

Make sure that at the end of the .js file that you are exporting the module and not calling the funtion, similarly to how you would export a component in React. 
e.g. 'module.exports = getMonsters;'

### Index.js

index.js should now be empty at this stage. Let's now fill it!

First we need to import our tools and dependancies:
e.g. 'const express = require('express');'

and then our API custom module:
e.g. 'getMonsters = require('./lib/getMonsters');'

Next we initialise express as a variable. We can use 'app' to define it, again similarly to React:
'const app = express();'

We then need to define the path of our CSS and link it to our 'app' variable. We can do this using the following syntax:
e.g. 'app.use(express.static(path.join(__dirname, 'public')));'

As we have now specified the path of our CSS files, whenever we need to use them we can simply call them like so:
e.g. 'href="/x.css"'

Now we need to sort out express-handlebars' settings by using the syntax below:
'app.engine('hbs', hbs({
   defaultLayout: 'main',
   extname: '.hbs',
   layoutsDir: path.join(__dirname, 'views', 'layouts'),
   partialsDir: path.join(__dirname, 'views', 'partials')
}));'

Here we are declaring the extension for express-handlebars. The documentation says that it is officially '.handlebars', but we are shortening it to '.hbs' here for ease of purpose. We are also specifying the directory for our layouts and partials.

Next we set up our views directory, this is achieved in the same way as we declared our CSS:
'app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');'

Once done, we can begin to implement our localhost responses, starting with a successful render of the index page, which has a path of ('/'). Here is where we need to call the data that we require from our API as variables:
e.g. 'app.get ('/', async(req, res) => {
   let data = await getAPI();
   let name = data.name;
   console.log(name);
   res.render('index', {name});
});'

render of our 'content,
'app.get('/content', (req, res) => {
   res.render('content');
});'

and render of a 404 error ('*' means content is not available),
'app.get('*', (req, res) => {
   res.render('404');
});'

Finally we can place a console.log to let us know that the listening was successful:
'app.listen(3000, () => {
   console.log('listening on port 3000');
});'

### Setting Up - Handlebars

Handlebars will handle our page content for us, so let's set this up now.

Inside our main.hbs and navbar.hbs, we want to add some HTML:5 elements. In main, insert the template HTML:5, update your title and add a link to your CSS:
e.g. '<link rel="stylesheet" type = "text/css" href="main.css">'

Inside the body, we need to add our partials inside curly brackets. This is for CSS purposes:
e.g. '<body>{{>navbar}}<div class = "container">{{{body}}}</div></body>'

In navbar.hbs, simply set up the structure like HTML. We use / to specify the root file, i.e. index:
e.g. '<nav><h2>title here</h2><ul><li>a href = "/">Home</a></li><li>a href = "/content">Content</a></li>'

In index.hbs, let's add some content for our home page:
e.g. '<h1>hello {{name}}</h1><a class="btn-style" href="/content">show me stuff!</a>'

If you want to add any further information, make sure you set them up in index.hbs by declaring them and also adding them in to the render, seperated by commas.:
'e.g. let x = data.x;' 
'res.render('index', {x, name});'

In content.hbs and 404.hbs, we will just have a simple <h1>for now. Make sure to include an error message in the h1 of your 404:
e.g. '<h1>Oops, this page does not exist</h1>

### index.js - further amendments

If we wanted to extract more imformation from the API, we need to make sure we set this up in index.js first. 
You are simply declaring them as variables along with what we have already done, for example:
'app.get ('/', async(req, res) => {
   let data = await getAPI();
   let name = data.name;
   <!-- PULL MORE DATA HERE -->
   let info = data.stuff[0].aboutstuff;
   let something = data.things.something;
   res.render('index', {name, data: {aboutstuff, something}});
});'

Just make sure that you are declaring the path properly for the data inside your API. Check the API content before you start adding things in.

### index.hbs - review
Where we have included data: in our index.js, this will set up a for loop for us, so that we do not need to put the same lines of code twice.

We wrap those list items inside an {{#each data}} object:
e.g. '<ul>{{#each data}}<li>{{@key}} : {{this}}</li>'

### POST method
What if we want the user to specify what information to extract from the API, instead of the data hardcoded into index.js? 

POST method allows you to ask the server to accept/store data in a json format (called body). This is usually used for forms, such as a sign in page or for submitting values. 

In content.hbs, let's add a basic form below our h1 element, like so:
'<form action="/content" method="POST">
   <label for="who">who: </label>
   <input type="text" name="person">
   <input for="what">what: </label>
   <input type="text" name="thing">
   <input type="submit" value="submit">
</form>'

'form action' will declare which page should be actioned, and 'POST method' will make the request for us. 

Inside index.js, we need to declare an app.get function before it can be posted. This function will render the content too:
e.g. 'app.get('/content', (req, res) => {
   res.render('content');
});'

### body-parser
This will change any values that the user has submitted into a json format, and then use it as the 'body' of the POST request. 
To install, type 'npm i body-parser'. We need to specify that we are using it in index.js, so go ahead and pass it through:
e.g. 'const bodyParser = require('body-parser');'
then 'app.use(bodyParser.urlencoded({extended: false}));
      app.use(bodyParser.json());'

The POST HTTP method will pull the data through from the req. It is the same layout as the above example, except you are using app.post instead of app.get. The req portion will pull data through from the API for req.body.

### Using POST and body-parser together
Here is where we can amend our API link so that the user has full control over what they need. We can specify our conditions inside the function, and then add a ${} for interchangeable values:
e.g. 'const getAPI = async(location, countryCode) => {
   let data = await fetch(`http://api.whateveritis.org/stuff${thatthing}, skrughsiruf ${thisthing}jwhdfskjdfh {process.env.APPID}`);
   return await data.json();
}'

Don't forget that it is being passed as a string so you must use backticks, and type using camelCase!

Inside our content.hbs, we now need to add our information below our form. Let's digest this:

'{{#if err}}
   <h2>{{err}}</h2>
{{/if}}
{{#if listExists}}
   <h2>Here's some content!:</h2>
   <ul>  
      {{#each data}}
         <li>{{@key}} : {{this}}</li>
      {{/each}}
   <ul>
{{/if}}

Firstly we are adding an if statement to push an error message if there are any problems. If you are not having any more lines, you can just put through an else statement to close it.
Our next if statement is the code that will be displayed. This is also a for loop, which will push the data through for each instance instead of having to retype the code every time.

Going back to our index.js, in our app.get we will amend our data variable to specify the conditions that we are calling. We also need to amend it in our app.post for the same reasons:
e.g. app.get - 'let data = await getAPI ("heresthatthing", "heresthisthing")'
   app.post - 'let data = await getAPI (thatthing, thisthing);'

We can also add a 404 error in post, if the data that is being requested does not exist. Cod is the term for error code:
'if (data.cod == '404') {
   res.render('API', {
      err: 'The provided location doesn\'t exist'
   });
}
