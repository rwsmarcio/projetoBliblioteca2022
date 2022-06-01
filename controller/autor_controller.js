const autorRepository = require('../repository/autor_repository');


exports.listar = (req, res) => {    
    autorRepository.listar((err, listaAutores) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listaAutores);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.autor_id;
    autorRepository.buscarPorId (id, (err, autorEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(autorEncontrado) {
            res.json(autorEncontrado);
        }
        else {
            res.status(404).json({msg:"Autor não encontrado"});
        }    
    });
}

exports.inserir = (req, res) => {
    let autor = req.body;
    if(autor && autor.nome) {
        autorRepository.inserir(autor, (err, autorInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(autor);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados invalida"});
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.autor_id;
    const autorAtualizar = req.body;

    autorRepository.atualizar(id, autorAtualizar, (err, autorAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else {
            res.json(autorAtualizado);
        }        
    })
}

exports.deletar = (req, res) => {
    const id = req.params.autor_id;

    autorRepository.deletar(id, (err, autorAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(autorAtualizado);
        }        
    })
}