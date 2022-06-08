//Rota: /livros (localhost:3000/livros)

const express = require('express');
const rota = express.Router();

const livroController = require('../controller/livro_controller');

rota.get('/', livroController.listar); // lista livros
rota.post('/', livroController.inserir); // adiciona um livro
rota.get('/:livro_id', livroController.buscarPorId); // busca livro por ID
rota.get('/obra/:autor_id', livroController.buscarPorAutor); //busca livros do autor
rota.put('/:livro_id', livroController.atualizar); // altera informações de um livro
rota.delete('/:livro_id', livroController.deletar); // deleta livro por ID

module.exports = rota;