const fs = require("fs");
const inquirer = require("inquirer");
const api = require('./utils/api');

inquirer
  .prompt([{
    type: "input",
    name: "title",
    message: "Insert project title:"
  },{
    type: "input",
    name: "description",
    message: "Insert description of your Project. Be as specific as possible:"
  },{
    type:"input",
    name: "tableOfContents",
    message: "Insert a table of contents for this project:"
  },{
    type: "input",
    name: "installation",
    message: "Insert steps taken to install this application:"
  },{
    type: "input",
    name: "usage",
    message: "Insert instructions on how to use this application:"
  },{
    type: "input",
    name: "license",
    message: "Insert licensing for this project:"
  },{
    type: "input",
    name: "contributing",
    message: "Insert if anyone else worked on this project with you:"
  },{
    type: "input",
    name: "tests",
    message: "Insert different ways this application can be tested:"
  },{
    type: "input",
    name: "username",
    message: "Insert Github username:"
  },
]).then(function (responses) {
    console.log(responses);
    username = responses.username;
    api.getUser(username).then(function (res) {
      console.log(res.data[0].payload.commits[0].author.email);
      const userEmail = res.data[0].payload.commits[0].author.email;
      const userProfile = res.data[0].actor.avatar_url;
      let title = responses.title;
      let description = responses.description;
      let installation = responses.installation;
      let usage = responses.usage;
      let license = responses.license;
      let contributing = responses.contributing;
      let tests = responses.tests;
      let badges = responses.badges;
      let answers = title + "\n" + "\n" + description + "\n" + "\n" + installation + "\n" + "\n" + usage + "\n" + "\n" + license + "\n" + "\n" + "\n" + contributing + "\n" + "\n" + tests + "\n" + "\n" + badges + "\n" + "\n" + userEmail + "\n" + "\n" + "![](" + userProfile + ")";
      fs.writeFile("readMe.md", answers, () => { });
    })
  })