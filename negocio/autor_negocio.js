//////////////////////////////////////////////////////////////////////////

const autorRepository = require('../repository/autor_repository');

//////////////////////////////////////////////////////////////////////////

exports.listar = async () => {
    try { 
        const listaAutores = await autorRepository.listar();
        return listaAutores;
    } catch(err) { 
        throw err; 
    }
} 

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (autor) => {
    try{
        if (autor && autor.nome) {
            const autorInserido = await autorRepository.inserir(autor);
            return autorInserido;
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
        const autor = await autorRepository.buscarPorId(id);
        if (!autor) {
            let error = {};
            error.mensagem = "Autor não encontrado";
            error.status = 404;
            throw error;
        } else {
            return autor;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorAutor = async (id) => {
    try {
        const obra = await autorRepository.buscarPorAutor(id);
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

exports.atualizar = async (id, autorAtualizacao) => {
    try {
        const autorAtualizado = await autorRepository.atualizar(id, autorAtualizacao);
        if (!autorAtualizado) {
            throw err;
        } else {
            return autorAtualizado;
        }
    } catch(err) {
        throw err; 
    }     
}

//////////////////////////////////////////////////////////////////////////

exports.deletar = async (id) => {
    try {
        const autor = await autorRepository.deletar(id);
        if(!autor){
            throw err;
        }
        else {
            return autor;
        };
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////