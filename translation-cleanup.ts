// @ts-ignore
const {writeFileSync} = require('fs-extra');
// @ts-ignore
const {resolve} = require('path');
const fs = require('fs');

// translation cleanup
const translationsPath = resolve(__dirname, 'src', 'assets', 'i18n');
fs.readdirSync(translationsPath).forEach(file => {
  const filePath = resolve(translationsPath, file);
  const contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
  const translationJson = JSON.parse(contents);
  Object.keys(translationJson).filter(entry => entry.startsWith('cfg.')).forEach(key => delete translationJson[key]);
  writeFileSync(filePath, JSON.stringify(translationJson, null, 2), {encoding: 'utf-8'});
});
