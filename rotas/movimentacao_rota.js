//Rota: /movimentacaos (localhost:3000/movimentacao)

const express = require('express');
const rota = express.Router();

const movimentacaoController = require('../controller/movimentacao_controller');

/*OK*/rota.get('/', movimentacaoController.listar);
/*OK*/rota.post('/', movimentacaoController.inserir);
/*OK*/rota.get('/:movimentacao_id', movimentacaoController.buscarPorId);
//buscar vovimentações de um usuário
/*OK*/rota.get('/retirado/:usuario_id', movimentacaoController.buscarPorUsuario);
/*OK*/rota.put('/:movimentacao_id', movimentacaoController.atualizar);
/*OK*/rota.delete('/:movimentacao_id', movimentacaoController.deletar);

module.exports = rota;