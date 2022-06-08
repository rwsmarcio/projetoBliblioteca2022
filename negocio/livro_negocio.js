const livroRepository = require('../repository/livro_repository');

let listaLivros = [];
let idAutoIncrement = 1;

exports.listar = async () => {
    try { 
    const listaLivros = await livroRepository.listar();
    return listaLivros;
    } catch(err) { throw err; }
}
