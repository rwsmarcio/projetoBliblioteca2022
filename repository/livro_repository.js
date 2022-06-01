const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'trabalho_pi',
    user: 'postgres',
    password: '040389'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM livros', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (livro, callback) => {
    const sql = "INSERT INTO livros(titulo, autor_id, editora, qtd, disponivel) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [livro.titulo, livro.autor_id, livro.editora, livro.qtd, livro.disponivel];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (livro_id, callback) => {
    const sql = "SELECT * FROM livros WHERE livro_id=$1";
    const values = [livro_id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro não encontrado 2";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.buscarPorAutor = (autor_id, callback) => {
    const sql = "SELECT a.nome, l.titulo FROM autores a, livros l WHERE a.autor_id = l.autor_id and a.autor_id=$1";
    const values = [autor_id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Obra não encontrada!";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (livro_id, livro, callback) => {
    const sql = "UPDATE livros SET titulo=$1, autor_id=$2, editora=$3, qtd=$4, disponivel=$5 WHERE livro_id=$6 RETURNING *";
    const values = [livro.titulo, livro.autor_id, livro.editora, livro.qtd, livro.disponivel, livro_id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro nao encontrado!";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (livro_id, callback) => {
    const sql = "DELETE FROM livros WHERE livro_id=$1 RETURNING *";
    const values = [livro_id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rowCount > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Livro não encontrado!";
            callback(error, null);
        }
        cliente.end();
    });
}

