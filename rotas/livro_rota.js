//Rota: /livros (localhost:3000/livros)

const express = require('express');
const rota = express.Router();

const livroController = require('../controller/livro_controller');

/*OK*/rota.get('/', livroController.listar); // lista livros
/*OK*/rota.post('/', livroController.inserir); // adiciona um livro
/*OK*/rota.get('/:livro_id', livroController.buscarPorId); // busca livro por ID
/*OK*/rota.get('/obra/:autor_id', livroController.buscarPorAutor); //busca livros do autor
/*OK*/rota.put('/:livro_id', livroController.atualizar); // altera informações de um livro
/*OK*/rota.delete('/:livro_id', livroController.deletar); // deleta livro por ID

module.exports = rota;