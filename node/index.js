const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

app.get('/', (req, res) => {
  let randomName = uniqueNamesGenerator({ dictionaries: [names] });
  const connection = mysql.createConnection(config);
  const sqlInsert = `INSERT INTO people(name) VALUES('${randomName}')`;

  connection.query(sqlInsert, (insertError) => {
    if (insertError) throw insertError;

    connection.query('SELECT * FROM people', (selectError, results) => {
      if (selectError) throw selectError;

      let peopleList = results
        .map((person) => `<li>${person.name}</li>`)
        .join('');
      connection.end();
      res.send(`<h1>Full Cycle</h1><ul>${peopleList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log('Rodando na porta ', port);
});
