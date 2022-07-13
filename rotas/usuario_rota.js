//Rota: /usuarios (localhost:3000/usuarios)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

/*OK*/rota.get('/', usuarioController.listar);
/*OK*/rota.post('/', usuarioController.inserir);
/*OK*/rota.get('/:usuario_id', usuarioController.buscarPorId);
/*OK*/rota.put('/:usuario_id', usuarioController.atualizar);
/*OK*/rota.delete('/:usuario_id', usuarioController.deletar);

module.exports = rota;