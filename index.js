const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer")

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

function generatePDF() {
  return ``
}

promptUser()
  .then(function(data) {
    const username = data.username;
    axios
      .get(`https://api.github.com/users/${username}`)
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
        console.log(name);
        console.log(location);
        console.log(bio);
      })
  });
