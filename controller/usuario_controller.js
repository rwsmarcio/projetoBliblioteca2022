const usuarioRepository = require('../repository/usuario_repository');


exports.listar = (req, res) => {    
    usuarioRepository.listar((err, listaUsuarios) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listaUsuarios);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.usuario_id;
    usuarioRepository.buscarPorId (id, (err, usuarioEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(usuarioEncontrado) {
            res.json(usuarioEncontrado);
        }
        else {
            res.status(404).json({msg:"usuario nao encontrado 1"});
        }    
    });
}

exports.inserir = (req, res) => {
    let usuario = req.body;
    if(usuario && usuario.cpf && usuario.nome && usuario.endereco && usuario.email && usuario.senha) {
        usuarioRepository.inserir(usuario, (err, usuarioInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(usuario);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados invalida"});
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.usuario_id;
    const usuarioAtualizar = req.body;

    usuarioRepository.atualizar(id, usuarioAtualizar, (err, usuarioAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else {
            res.json(usuarioAtualizado);
        }        
    })
}

exports.deletar = (req, res) => {
    const id = req.params.usuario_id;

    usuarioRepository.deletar(id, (err, usuarioAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(usuarioAtualizado);
        }        
    })
}