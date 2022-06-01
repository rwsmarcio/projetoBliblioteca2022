const livroRepository = require('../repository/livro_repository');


exports.listar = (req, res) => {    
    livroRepository.listar((err, listalivros) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listalivros);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.livro_id;
    livroRepository.buscarPorId (id, (err, livroEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(livroEncontrado) {
            res.json(livroEncontrado);
        }
        else {
            res.status(404).json({msg:"Livro não encontrado."});
        }    
    });
}

exports.buscarPorAutor = (req, res) => {
    const id = req.params.autor_id;
    livroRepository.buscarPorAutor (id, (err, livroEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(livroEncontrado) {
            res.json(livroEncontrado);
        }
        else {
            res.status(404).json({msg:"Livro não encontrado."});
        }    
    });
}

exports.inserir = (req, res) => {
    let livro = req.body;
    if(livro && livro.titulo && livro.autor_id && livro.qtd && livro.disponivel) {
        livroRepository.inserir(livro, (err, livroInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(livro);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados invalida"});
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.livro_id;
    const livroAtualizar = req.body;

    livroRepository.atualizar(id, livroAtualizar, (err, livroAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else {
            res.json(livroAtualizado);
        }        
    })
}

exports.deletar = (req, res) => {
    const id = req.params.livro_id;

    livroRepository.deletar(id, (err, livroAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(livroAtualizado);
        }        
    })
}