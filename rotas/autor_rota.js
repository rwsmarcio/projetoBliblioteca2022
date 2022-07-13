//Rota: /autores (localhost:3000/autores)

const express = require('express');
const rota = express.Router();

const autorController = require('../controller/autor_controller');

/*OK*/rota.get('/', autorController.listar);
/*OK*/rota.post('/', autorController.inserir);
/*OK*/rota.get('/:autor_id', autorController.buscarPorId);
/*OK*/rota.put('/:autor_id', autorController.atualizar);
/*OK*/rota.delete('/:autor_id', autorController.deletar);

module.exports = rota;