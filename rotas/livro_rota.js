//Rota: /livros (localhost:3000/livros)

const express = require('express');
const rota = express.Router();

const livroController = require('../controller/livro_controller');

rota.get('/', livroController.listar);
rota.post('/', livroController.inserir);
rota.get('/:livro_id', livroController.buscarPorId);
//busca livros do autor
rota.get('/obra/:autor_id', livroController.buscarPorAutor);
rota.put('/:livro_id', livroController.atualizar);
rota.delete('/:livro_id', livroController.deletar);

module.exports = rota;