const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let registrationFormContent = "";
let jsContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(
  "Enter path for registration form (registration.html) ",
  (path) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        throw err;
      }
      registrationFormContent = data;
    });

    fs.readFile("main.js", (err, data) => {
      if (err) {
        throw err;
      }
      jsContent = data;
    });
    lineDetail.close();
    http
      .createServer((request, response) => {
        let url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
          case "/project":
            response.write(projectContent);
            response.end();
            break;
          case "/registration":
            response.write(registrationFormContent);
            response.end();
            break;
          case "/main.js":
            response.write(jsContent);
            response.end();
            break;
          default:
            response.write(homeContent);
            response.end();
            break;
        }
      })
      .listen(3000);
  }
);
