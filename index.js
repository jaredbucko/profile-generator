const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

const config = { headers: { accept: "application/json" } };

function promptUser() {
  return inquirer.prompt([
    {
      type: "question",
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "color",
      choices: [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Indigo",
        "Violet"
      ]
    }
  ])
};

promptUser()
.then(function(data) {
  const username = data.username;
  const color = data.color;
  axios
    .get(`https://api.github.com/users/${username}`, config)
    .then(function(res) {
      const img = res.data.avatar_url;
      const name = res.data.name;
      const location = res.data.location;
      const github = res.data.html_url;
      const blog = res.data.blog;
      const bio = res.data.bio;
      const repos = res.data.public_repos;
      const followers = res.data.followers;
      const stars = res.data.public_gists;
      const following = res.data.following;
      console.log(res.data);
      console.log(name);
      console.log(location);
      console.log(bio);
    writeFileAsync('profile.html', 
    `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!-- bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <!-- color themes -->
        <link rel="stylesheet" href="">
        <title>Document</title>
      </head>
      <body style="background-color: aquamarine;">
        <div class="jumbotron" style="background-color: darkorange; margin: 5% 5% 5% 5%;">
          <h1 class="display-4 text-center">Hello! My name is ${name}</h1>
          <div class="d-flex justify-content-center">
            <img src="${img}" alt="profile picture" style="border-radius: 50%;">
          </div>
          <p class="lead text-center"></p>
          <hr class="my-4">
          <p class="text-center">Portland-based web developer, currently enrolled in the University of Oregon Coding Bootcamp (Full Stack Web Development).</p>
          <div class="d-flex justify-content-center">
            <a class="btn btn-secondary btn-md ml-1 mr-1" href="https://www.google.com/maps/@?api=1&map_action=map&query=${location}" role="button" target="_blank">${location}</a>
            <a class="btn btn-secondary btn-md ml-1 mr-1" href="${github}" role="button" target="_blank">GitHub</a>
            <a class="btn btn-secondary btn-md ml-1 mr-1" href="https://${blog}" role="button" target="_blank">Blog</a>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col d-flex justify-content-center">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Public Repositories</h5>
                  <p class="card-text">${repos}</p>
                </div>
              </div>
            </div>
            <div class="col d-flex justify-content-center">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Followers</h5>
                  <p class="card-text">${followers}</p>
                </div>
              </div>
            </div>
            <div class="col d-flex justify-content-center">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">GitHub Stars</h5>
                  <p class="card-text">${stars}</p>
                </div>
              </div>
            </div>
            <div class="col d-flex justify-content-center">
              <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Following</h5>
                  <p class="card-text">${following}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>`)
    })
  });
