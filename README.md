## The Node Handbook
A step-by-step guide on how to set up the server!

### Setup

Firstly, you want to create a new directory and add a .gitignore file and a README.md file. Be sure to check that node_modules and .env are included in your .gitignore for this project.

Head over to Github and set up a new repository. 'Git init' to set up a repository locally and then 'git add .'

Open your terminal and initialise npm using 'npm init -y'. -y will say yes to all, initialize everything and create a package.json file as a result.

Check that Nodemon is installed. Nodemon will automatically restart the server if it detects any changes to the files. If not installed, type 'npm i nodemon' into the terminal to install it.

Inside the script section of package.json, insert '"start": "nodemon index.js"'. This tells it that typing 'npm start' into the terminal will run index.js through nodemon.