const mysql = require('mysql');

function createConnection() {
  const config = {
    host: process.env.MYSQL_HOST || 'db',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'nodedb',
  };
  const connection = mysql.createConnection(config);
  return connection;
}

function query(queryString, callback) {
  const connection = createConnection();
  connection.query(queryString, (error, results) => {
    connection.end();
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, results);
    }
  });
}

function getAllRecords(tableName, callback) {
  const connection = createConnection();
  connection.query(`SELECT * FROM ${tableName}`, (error, results) => {
    connection.end();
    if (error) {
      return callback(error, null);
    } else {
      const namesArray = results.map((row) => row.name); // Extrair os nomes em um array
      return callback(null, namesArray);
    }
  });
}

module.exports = { query, getAllRecords };
// let connection;
//   try {
//     connection = createConnection();
//     const result = connection.query(queryObject);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   } finally {
//     connection.end();
//   }
// }

// function getAllRecordsAsList() {
//   let connection;
//   try {
//     connection = createConnection();
//     connection.query(
//       'SELECT * FROM people;',
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           throw error;
//         }
//         let peopleList = results
//           .map((person) => `<li>${person.name}</li>`)
//           .join('');
//         console.log('PEOLPES LIST TYPE');
//         console.log(typeof peopleList);
//         console.log('PEOLPES LIST');
//         console.log(peopleList);
//         return peopleList;
//       }
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     connection.end();
//   }
// }

module.exports = { query, getAllRecords };
