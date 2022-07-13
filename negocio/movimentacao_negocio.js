//////////////////////////////////////////////////////////////////////////

const movimentacaoRepository = require('../repository/movimentacao_repository');

//////////////////////////////////////////////////////////////////////////

exports.listar = async () => {
    try { 
        const listamovimentacoes = await movimentacaoRepository.listar();
        return listamovimentacoes;
    } catch(err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (movimentacao) => {
    try{
        if (movimentacao && movimentacao.usuario_id && movimentacao.livro_id && movimentacao.data_retirada) {
            const movimentacaoInserida = await movimentacaoRepository.inserir(movimentacao);
            return movimentacaoInserida;
        } else {
            let error = {}
            error.name = "Nogocio error";
            error.msg = "Faltam dados para inserção";
            error.status = 400;
            throw error;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorId = async (id) => {
    try {
        const movimentacao = await movimentacaoRepository.buscarPorId(id);
        if (!movimentacao) {
            let error = {};
            error.mensagem = "Movimentacao não encontrada";
            error.status = 404;
            throw error;
        } else {
            return movimentacao;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorUsuario = async (id) => {
    try {
        const resultado = await movimentacaoRepository.buscarPorUsuario(id);
        if (!resultado) {
            throw err;
        } else {
            return resultado;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (id, movimentacaoAtualizacao) => {
    try {
        if (movimentacaoAtualizacao && movimentacaoAtualizacao.usuario_id && movimentacaoAtualizacao.livro_id && movimentacaoAtualizacao.data_retirada && movimentacaoAtualizacao.data_devolucao){
        const movimentacaoAtualizada = await movimentacaoRepository.atualizar(id, movimentacaoAtualizacao);
        return movimentacaoAtualizada;
        } else {
            let error = {};
            error.name = "Negocio error";
            error.mensagem = "Entrada de dados inválida";
            error.status = 404;
            throw error;
        }
    } catch (err) {
        throw err; 
    }     
}

//////////////////////////////////////////////////////////////////////////

exports.deletar = async (id) => {
    try {
        const movimentacao = await movimentacaoRepository.deletar(id);
        if(!movimentacao){
            throw err;
        }
        else {
            return movimentacao;
        };
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////