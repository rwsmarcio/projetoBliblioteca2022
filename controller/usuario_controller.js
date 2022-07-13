//////////////////////////////////////////////////////////////////////////

const usuarioNegocio = require('../negocio/usuario_negocio');


//////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {    
    try{
        const listaUsuarios = await usuarioNegocio.listar();
        res.json(listaUsuarios);
    } catch (err) {
        res.status(500).jason({error: err});
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (req, res) => {
    const usuario = req.body;

    try{
        const usuarioInserido = await usuarioNegocio.inserir(usuario);
        res.status(201).json(usuarioInserido);
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        } else {
            res.status(400).json({msg:"Entrada de dados invalida"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorId = async (req, res) => {
    const id = req.params.usuario_id;
    try{ 
        const usuario = await usuarioNegocio.buscarPorId(id);
        res.json(usuario);
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(500).json({msg:"Usuario não encontrado"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (req, res) => {
    const id = req.params.usuario_id;
    const usuarioAtualizacao = req.body;

    try{
        const usuarioAtualizado = await usuarioNegocio.atualizar(id, usuarioAtualizacao);
        res.status(201).json(usuarioAtualizado)
    } catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(400).json({msg:"Entrada de dados invalida"});            
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
    const id = req.params.usuario_id;
    try{ 
        const usuario = await usuarioNegocio.deletar(id);
        res.json(usuario);
    } catch(err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(400).json({msg:"Usuario inexistente"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////