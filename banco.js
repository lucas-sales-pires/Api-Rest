const mysql = require('mysql2/promise');
const dotenv = require('dotenv'); 

dotenv.config(); 

const conexao =  mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).then((conexao) => {
    console.log('Conectado ao banco de dados');
    return conexao;
}).catch((erro) => {
    console.log(erro);
});



module.exports = conexao;
