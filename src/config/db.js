const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

function handleDisconnect() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  connection.connect((err) => {
    if (err) {
      console.error('❌ Erro ao conectar ao MySQL:', err.message);
      setTimeout(handleDisconnect, 2000); // tenta reconectar depois de 2s
    } else {
      console.log('✅ Conectado ao MySQL com sucesso!');
    }
  });

  connection.on('error', (err) => {
    console.error('❌ Erro no MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // reconecta se a conexão caiu
    } else {
      throw err;
    }
  });

  return connection;
}

const db = handleDisconnect();

module.exports = db;
