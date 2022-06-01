//Rota: /autores (localhost:3000/autores)

const express = require('express');
const rota = express.Router();

const autorController = require('../controller/autor_controller');

rota.get('/', autorController.listar);
rota.post('/', autorController.inserir);
rota.get('/:autor_id', autorController.buscarPorId);
rota.put('/:autor_id', autorController.atualizar);
rota.delete('/:autor_id', autorController.deletar);

module.exports = rota;