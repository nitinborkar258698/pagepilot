const fs = require('fs');
const path = require('path');

function generatePage(data, slug) {
  const templatePath = path.join(__dirname, '../templates/landing.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace(/{{headline}}/g, data.headline)
                     .replace(/{{subheadline}}/g, data.subheadline)
                     .replace(/{{imageUrl}}/g, data.imageUrl)
                     .replace(/{{buttonText}}/g, data.buttonText)
                     .replace(/{{redirectUrl}}/g, data.redirectUrl);

  const outputPath = path.join(__dirname, `../pages/${slug}.html`);
  fs.writeFileSync(outputPath, template);
  return outputPath;
}

module.exports = generatePage;