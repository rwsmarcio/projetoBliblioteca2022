//Rota: /movimentacaos (localhost:3000/movimentacao)

const express = require('express');
const rota = express.Router();

const movimentacaoController = require('../controller/movimentacao_controller');

rota.get('/', movimentacaoController.listar);
rota.post('/', movimentacaoController.inserir);
rota.get('/:movimentacao_id', movimentacaoController.buscarPorId);
//buscar vovimentações de um usuário
rota.get('/retirado/:usuario_id', movimentacaoController.buscarPorUsuario);
rota.put('/:movimentacao_id', movimentacaoController.atualizar);
rota.delete('/:movimentacao_id', movimentacaoController.deletar);

module.exports = rota;