//////////////////////////////////////////////////////////////////////////

const movimentacaoNegocio = require('../negocio/movimentacao_negocio');

//////////////////////////////////////////////////////////////////////////

exports.listar = async (req, res) => {    
    try{
        const listamovimentacoes = await movimentacaoNegocio.listar();
        res.json(listamovimentacoes);
    } catch (err) {
        res.status(500).jason({error: err});
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (req, res) => {
    const movimentacao = req.body;

    try{
        const movimentacaoInserida = await movimentacaoNegocio.inserir(movimentacao);
        res.status(201).json(movimentacaoInserida);
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
    const id = req.params.movimentacao_id;
    try{ 
        const movimentacao = await movimentacaoNegocio.buscarPorId(id);
        res.json(movimentacao);
    } catch (err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(500).json({msg:"Movimentação não encontrada"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorUsuario = async (req, res) => {
    const id = req.params.usuario_id;
    try{ 
        const resultado = await movimentacaoNegocio.buscarPorUsuario(id);
        res.json(resultado);
    } catch (err) {
        if (err.status) {res.status(err.status).json(err);
        } else {
            res.status(500).json({msg:"Lista de movimentações não encontrada"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (req, res) => {
    const id = req.params.movimentacao_id;
    const movimentacaoAtualizacao = req.body;

    try{
        const movimentacaoAtualizada = await movimentacaoNegocio.atualizar(id, movimentacaoAtualizacao);
        res.status(201).json(movimentacaoAtualizada)
    } catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        } else {
            res.status(400).json({msg:"Entrada de dados invalida"});            
        }
    }
}

//////////////////////////////////////////////////////////////////////////

exports.deletar = async (req, res) => {
    const id = req.params.movimentacao_id;
    try{ 
        const movimentacao = await movimentacaoNegocio.deletar(id);
        res.json(movimentacao);
    } catch(err) {
        if (err.status) {
            res.status(err.status).json(err);
        } else {
        res.status(400).json({msg:"Movimentação inexistente"});
        }
    }
}

//////////////////////////////////////////////////////////////////////////