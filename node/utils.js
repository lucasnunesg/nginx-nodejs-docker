const { uniqueNamesGenerator, names } = require('unique-names-generator');

function generateRandomName() {
  let randomName = uniqueNamesGenerator({ dictionaries: [names] });
  return randomName;
}

function mapArrayToUnorderedList(array) {
  const unorderedList = array.map((name) => `<li>${name}</li>`).join('');
  return unorderedList;
}

module.exports = { generateRandomName, mapArrayToUnorderedList };
