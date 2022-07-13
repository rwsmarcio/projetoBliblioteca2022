//////////////////////////////////////////////////////////////////////////

const livroNegocio = require('../negocio/livro_negocio');

//////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {    
    try{
        const listaLivros = await livroNegocio.listar();
        res.json(listaLivros);
    } catch (err) {
        res.status(500).jason({error: err});
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (req, res) => {
    const livro = req.body;

    try{
        const livroInserido = await livroNegocio.inserir(livro);
        res.status(201).json(livroInserido);
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
    const id = req.params.livro_id;
    try{ 
        const livro = await livroNegocio.buscarPorId(id);
        res.json(livro);
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(500).json({msg:"Livro não encontrado"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorAutor = async (req, res) => {
    const id = req.params.autor_id;
    try{ 
        const livro = await livroNegocio.buscarPorAutor(id);
        res.json(livro);
    } catch (err) {
        if (err.status) {res.status(err.status).json(err);
        } else {
            res.status(500).json({msg:"Obra não encontrada"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (req, res) => {
    const id = req.params.livro_id;
    const livroAtualizacao = req.body;

    try{
        const livroAtualizado = await livroNegocio.atualizar(id, livroAtualizacao);
        res.status(201).json(livroAtualizado)
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
    const id = req.params.livro_id;
    try{ 
        const livro = await livroNegocio.deletar(id);
        res.json(livro);
    } catch(err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(400).json({msg:"Livro inexistente"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////