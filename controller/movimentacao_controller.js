const movimentacaoRepository = require('../repository/movimentacao_repository');


exports.listar = (req, res) => {    
    movimentacaoRepository.listar((err, listamovimentacoes) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listamovimentacoes);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.movimentacao_id;
    movimentacaoRepository.buscarPorId (id, (err, movimentacaoEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(movimentacaoEncontrado) {
            res.json(movimentacaoEncontrado);
        }
        else {
            res.status(404).json({msg:"Movimentacao nao encontrado"});
        }    
    });
}

exports.buscarPorUsuario = (req, res) => {
    const id = req.params.usuario_id;
    movimentacaoRepository.buscarPorUsuario (id, (err, movimentacaoEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(movimentacaoEncontrado) {
            res.json(movimentacaoEncontrado);
        }
        else {
            res.status(404).json({msg:"Movimentacao não encontrado"});
        }    
    });
}

exports.inserir = (req, res) => {
    let movimentacao = req.body;
    if(movimentacao && movimentacao.usuario_id && movimentacao.livro_id && movimentacao.data_retirada && movimentacao.data_devolucao) {
        movimentacaoRepository.inserir(movimentacao, (err, movimentacaoInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(movimentacao);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados invalida"});
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.movimentacao_id;
    const movimentacaoAtualizar = req.body;

    movimentacaoRepository.atualizar(id, movimentacaoAtualizar, (err, movimentacaoAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else {
            res.json(movimentacaoAtualizado);
        }        
    })
}

exports.deletar = (req, res) => {
    const id = req.params.movimentacao_id;

    movimentacaoRepository.deletar(id, (err, movimentacaoAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(movimentacaoAtualizado);
        }        
    })
}