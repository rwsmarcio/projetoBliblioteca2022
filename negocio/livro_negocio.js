//////////////////////////////////////////////////////////////////////////

const livroRepository = require('../repository/livro_repository');

//////////////////////////////////////////////////////////////////////////

exports.listar = async () => {
    try { 
        const listaLivros = await livroRepository.listar();
        return listaLivros;
    } catch(err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (livro) => {
    try{
        if (livro && livro.titulo && livro.autor_id) {
            const livroInserido = await livroRepository.inserir(livro);
            return livroInserido;
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
        const livro = await livroRepository.buscarPorId(id);
        if (!livro) {
            let error = {};
            error.mensagem = "Livro não encontrado";
            error.status = 404;
            throw error;
        } else {
            return livro;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorAutor = async (id) => {
    try {
        const obra = await livroRepository.buscarPorAutor(id);
        if (!obra) {
            throw err;
        } else {
            return obra;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (id, livroAtualizacao) => {
    try {
        if (livroAtualizacao && livroAtualizacao.titulo){
        const livroAtualizado = await livroRepository.atualizar(id, livroAtualizacao);
        return livroAtualizado;
        } else {
            let error = {};
            error.name = "Negocio error";
            error.mensagem = "Entrada de Dados inválida";
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
        const livro = await livroRepository.deletar(id);
        if(!livro){
            throw err;
        }
        else {
            return livro;
        };
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////