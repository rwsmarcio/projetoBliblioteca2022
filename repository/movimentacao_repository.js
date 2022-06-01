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
    cliente.query('SELECT * FROM movimentacao', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (movimentacao, callback) => {
    const sql = "INSERT INTO movimentacao(usuario_id, livro_id, data_retirada, data_devolucao) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [movimentacao.usuario_id, movimentacao.livro_id, movimentacao.data_retirada, movimentacao.data_devolucao];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (movimentacao_id, callback) => {
    const sql = "SELECT * FROM movimentacao WHERE movimentacao_id=$1";
    const values = [movimentacao_id];

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
            const error = "Movimentacao não encontrada!";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (movimentacao_id, movimentacao, callback) => {
    const sql = "UPDATE movimentacao SET usuario_id=$1, livro_id=$2, data_retirada=$3, data_devolucao=$4 WHERE movimentacao_id=$5 RETURNING *";
    const values = [movimentacao.usuario_id, movimentacao.livro_id, movimentacao.data_retirada, movimentacao.data_devolucao, movimentacao_id];

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
            const error = "Movimentacao nâo encontrada!";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (movimentacao_id, callback) => {
    const sql = "DELETE FROM movimentacao WHERE movimentacao_id=$1 RETURNING *";
    const values = [movimentacao_id];

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
            const error = "Movimentacao não encontrada!";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.buscarPorUsuario = (usuario_id, callback) => {
    const sql = "SELECT u.nome, l.titulo, m.data_retirada, m.data_devolucao FROM movimentacao m, livros l, usuarios u WHERE m.usuario_id = u.usuario_id and l.livro_id = m.livro_id and u.usuario_id = $1";
    const values = [usuario_id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows);
        }
        else {
            const error = "Movimentacao não encontrada!";
            callback(error, null);
        }
        cliente.end();
    });
}