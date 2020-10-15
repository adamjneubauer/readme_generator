const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {   
return inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: "Title:"
  },
  {
    type: "input",
    name: "description",
    message: "Description:"
  },
  {
    type: "input",
    name: "installationInstructions",
    message: "Installation Instructions:",
  },
  {
    type: "input",
    name: "usageInstructions",
    message: "Usage Instructions:",
  },
  {
    type: "input",
    name: "contributing",
    message: "Contributions:",
  },
  {
    type: "input",
    name: "tests",
    message: "Tests:"
  },
  {
    type: "input",
    name: "username",
    message: "What is your username?"
  },{
    type: "input",
    name: "email",
    message: "What is your email?"
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license option:",
    choices: ["MIT", "ISC", "GPLv3", "Unlicense"]
  },
])};

function generateReadme(responses) {
  return `
  ### ${responses.title}

  ![GitHub license](https://img.shields.io/badge/license-${responses.license}-blue.svg)

  ### Table of Contents

  1) [Description](#description)
  2) [Installation Instructions](#installation%20Instructions)
  3) [Usage Instructions](#usage%20Instructions)
  4) [Contributions](#contributions)
  5) [Tests](#tests)
  6) [Questions](#questions)
  7) [License](#license)

  ### Description

  ${responses.description}
  
  ### Installation Instructions

  ${responses.installationInstructions}

  ### Usage Instructions

  ${responses.usageInstructions}

  ### Contributions

  ${responses.contributing}

  ### Tests

  ${responses.tests}

  ### Questions

  This project was created by ${responses.username}. Any questions you may have can be directed to ${responses.email}.
  
  ### License

  ${responses.license}
  `
}

promptUser()
.then(function(responses) {
  const finishedReadMe = generateReadme(responses);

  return writeFileAsync("README.md", finishedReadMe)
  .catch(function(err) {
    console.log(err);
  });


})