const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const conexao = require('./banco');
require ('dotenv').config();
const porta =  process.env.PORT ; 

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/usuarios', async (req, res) => {
    const usuarios = await conexao.then((conexao) => {
        return conexao.query('SELECT * FROM usuarios');
    }).then((usuarios) => {
        return usuarios;
    }).catch((erro) => {
        console.log(erro);
    });
    res.send(usuarios);
}

);


server.post('/usuarios', async (req, res) => {
    const {  nome, cep, endereco, cidade, email, senha, telefone } = req.body;
    const resultado = await conexao.then((conexao) => {
        return conexao.query('INSERT INTO usuarios (nome, cep, endereco, cidade, email, senha, telefone) VALUES (?, ?, ? ,? ,? ,? ,? )', [nome, cep, endereco, cidade, email, senha, telefone]);
    }).then((resultado) => {
        return resultado;
    }).catch((erro) => {
        console.log(erro);
    });
    res.send(resultado);
}
);

server.put('/usuarios/:id', async (req, res) => {
    const { nome, cep, endereco, cidade, email, senha, telefone } = req.body;
    const { id } = req.params;
    const resultado = await conexao.then((conexao) => {
        return conexao.query('UPDATE usuarios SET nome = ?, cep = ?, endereco = ?, cidade = ?, email = ?, senha = ?, telefone = ? WHERE id = ?', [nome, cep, endereco, cidade, email, senha, telefone, id]);
    }).then((resultado) => {
        return resultado;
    }).catch((erro) => {
        console.log(erro);
    });
    res.send(resultado);
}
);

server.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const resultado = await conexao.then((conexao) => {
        return conexao.query('DELETE FROM usuarios WHERE id = ?', [id]);
    }).then((resultado) => {
        return resultado;
    }).catch((erro) => {
        console.log(erro);
    });
    res.send(resultado);
}
);



server.listen(porta, () => {
    console.log('Servidor rodando na porta 3000');
});
