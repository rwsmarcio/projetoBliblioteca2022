//////////////////////////////////////////////////////////////////////////

const autorNegocio = require('../negocio/autor_negocio');

//////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {    
    try{
        const listaAutores = await autorNegocio.listar();
        res.json(listaAutores);
    } catch (err) {
        res.status(500).jason({error: err});
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (req, res) => {
    const autor = req.body;
    try{
        const autorInserido = await autorNegocio.inserir(autor);
        res.status(201).json(autorInserido);
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
    const id = req.params.autor_id;
    try{ 
        const autor = await autorNegocio.buscarPorId(id);
        res.json(autor);
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(500).json({msg:"Autor não encontrado"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (req, res) => {
    const id = req.params.autor_id;
    const autorAtualizacao = req.body;

    try{
        const autorAtualizado = await autorNegocio.atualizar(id, autorAtualizacao);
        res.status(201).json(autorAtualizado)
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
    const id = req.params.autor_id;
    try{ 
        const autor = await autorNegocio.deletar(id);
        res.json(autor);
    } catch(err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(400).json({msg:"Livro inexistente"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////