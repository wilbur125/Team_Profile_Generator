const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//NEED FUNCTION TO WRITE FILE TO PUT INTO THE OUTPUT FOLDER
//REQUIRES PATH AND FS, BUT ATTEMPS HAVE RESULTED IN EMPLOYEES ARRAY BEING UNDEFINED

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");

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
    },
    {
      type: "input",
      name: "office",
      message: "Office number: "
    },
    {
      type: "input",
      name: "github",
      message: "GitHub: "
    },
    {
      type: "input",
      name: "school",
      message: "School: "
    }
  ])
  .then(answers => {
  
    switch (answers.role) {
      case "Manager": 
        console.log("OFFICE NAME", answers.office);
        return new Manager(answers.name, answers.id, answers.email, answers.office);

      case "Engineer":
        console.log("GITHUB NAME", answers.github);
        return new Engineer(answers.name, answers.id, answers.email, answers.github);

      case "Intern":
        console.log("SCHOOL NAME", answers.school);
        return new Intern(answers.name, answers.id, answers.email, answers.school);
    }
  })
}

function addEmployees() {
  const employee = promptUser();
      employees.push(employee);
      return employees;
}

// function writeToFile(data) {
//   fs.writeFile(
//       outputPath,
//       data,
//       (err) => {
//           if (err) throw err;
//           console.log("File has been saved!");
//       }
//   );
// }

function run() {
      addEmployees()
      // const html = render();
      // writeToFile(html);
}

run();

