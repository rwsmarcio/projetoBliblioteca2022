//Rota: /usuarios (localhost:3000/usuarios)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.get('/', usuarioController.listar);
rota.post('/', usuarioController.inserir);
rota.get('/:usuario_id', usuarioController.buscarPorId);
rota.put('/:usuario_id', usuarioController.atualizar);
rota.delete('/:usuario_id', usuarioController.deletar);

module.exports = rota;