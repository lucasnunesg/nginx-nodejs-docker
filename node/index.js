const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

// Próximos passos:
// 1) abstrair conexão com o banco de dados para um módulo separado (ver no tabnews)
// 2) abstrair geração de nomes aleatórios para um módulo separado (UTILS)
// 3) utilizar o .env
// 4) otimizar a imagem com multi stage build
// 5) fazer rodar tudo automaticamente somente com o docker-compose up -d

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
