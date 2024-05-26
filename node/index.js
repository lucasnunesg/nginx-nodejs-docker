const database = require('./infrastructure/database');
const express = require('express');
const utils = require('./utils');

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
  let randomName = utils.generateRandomName();
  const insertQuery = `INSERT INTO people(name) VALUES('${randomName}')`;

  database.query(insertQuery, (insertError) => {
    if (insertError) {
      console.error(insertError);
      return res.status(500).send('Internal Server Error');
    }

    database.getAllRecords('people', (selectError, peopleList) => {
      if (selectError) {
        console.error(selectError);
        return res.status(500).send('Internal Server Error');
      }

      let mappedPeopleList = utils.mapArrayToUnorderedList(peopleList);
      res.send(`<h1>Full Cycle</h1><ul>${mappedPeopleList}</ul>`);
    });
  });
});

app.listen(PORT, () => {
  console.log('Server running on port: ', PORT);
});
