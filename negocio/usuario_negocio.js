//////////////////////////////////////////////////////////////////////////

const usuarioRepository = require('../repository/usuario_repository');

//////////////////////////////////////////////////////////////////////////

exports.listar = async () => {
    try { 
        const listaUsuarios = await usuarioRepository.listar();
        return listaUsuarios;
    } catch(err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (usuario) => {
    try{
        if (usuario && usuario.nome && usuario.telefone) {
            const usuarioInserido = await usuarioRepository.inserir(usuario);
            return usuarioInserido;
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
        const usuario = await usuarioRepository.buscarPorId(id);
        if (!usuario) {
            let error = {};
            error.mensagem = "Usuario não encontrado";
            error.status = 404;
            throw error;
        } else {
            return usuario;
        }
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (id, usuarioAtualizacao) => {
    try {
        if (usuarioAtualizacao && usuarioAtualizacao.nome){
            const usuarioAtualizado = await usuarioRepository.atualizar(id, usuarioAtualizacao);
            return usuarioAtualizado;
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
        const usuario = await usuarioRepository.deletar(id);
        if(!usuario){
            throw err;
        }
        else {
            return usuario;
        };
    } catch(err) {
        throw err;
    }
}

//////////////////////////////////////////////////////////////////////////