const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;

app.use(cors());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const livroRota = require('./rotas/livro_rota');
app.use('/livros', livroRota);

const usuarioRota = require('./rotas/usuario_rota');
app.use('/usuarios', usuarioRota);

const autorRota = require('./rotas/autor_rota');
app.use('/autores', autorRota);

const movimentacaoRota = require('./rotas/movimentacao_rota');
const { buscarPorId } = require('./controller/livro_controller');
app.use('/movimentacao', movimentacaoRota);

app.listen(porta,() => 
    console.log(`Iniciando o servidor na porta ${porta}`)
);

