const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];

function promptUser() {
inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Name:"
      },
      {
          type: "input",
          name: "id",
          message: "ID:"
      },
      {
          type: "input",
          name: "email",
          message: "Email:"
      },
      {
          type: "list",
          name: "role",
          message: "Employee type:",
          choices: ["Manager", "Engineer", "Intern"]
      }
  ])
}

function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "office",
      message: "Office number: "
    }
  ])
}

function promptEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "GitHub: "
    }
  ])
}

function promptIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "school",
      message: "School: "
    }
  ])
}

 function handleRole() {
    let selectedRole = promptUser();
    switch (selectedRole.role) {
      case "Manager": 
        let managerDetails = promptManager();
        return new Manager(selectedRole.name, selectedRole.id, selectedRole.email, managerDetails.office);

      case "Engineer":
        let engineerDetails = promptEngineer();
        return new Engineer(selectedRole.name, selectedRole.id, selectedRole.email, engineerDetails.github);

      case "Intern":
        let internDetails = promptIntern();
        return new Intern(selectedRole.name, selectedRole.id, selectedRole.email, internDetails.school);
    }
} 

function writeToFile(data) {
  fs.writeFile(
      outputPath,
      data,
      (err) => {
          if (err) throw err;
          console.log("New HTML saved to Output folder");
      }
  );
}

async function startSurvey() {
       await promptUser();
       await handleRole();
      const html = render(employees);
      writeToFile(html);
}

startSurvey();
