// j8rv_generate_a_resp.js

const fs = require('fs');
const inquirer = require('inquirer');
const Mustache = require('mustache');

const templates = {
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>{{ title }}</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  {{ content }}\n  <script src="script.js"></script>\n</body>\n</html>',
  css: 'body {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n}\n',
  js: 'console.log("Responsive web app generated!");'
};

inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your web app:',
  },
  {
    type: 'input',
    name: 'content',
    message: 'Enter the content of your web app:',
  }
]).then(answers => {
  const title = answers.title;
  const content = answers.content;

  const templateVars = {
    title,
    content
  };

  const html = Mustache.render(templates.html, templateVars);
  const css = templates.css;
  const js = templates.js;

  fs.mkdirSync(`generated-app/${title}`);
  fs.writeFileSync(`generated-app/${title}/index.html`, html);
  fs.writeFileSync(`generated-app/${title}/styles.css`, css);
  fs.writeFileSync(`generated-app/${title}/script.js`, js);

  console.log(`Responsive web app generated in generated-app/${title}!`);
});