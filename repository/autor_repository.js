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
    cliente.query('SELECT * FROM autores', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (autor, callback) => {
    const sql = "INSERT INTO autores(nome) VALUES ($1) RETURNING *";
    const values = [autor.nome];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (autor_id, callback) => {
    const sql = "SELECT * FROM autores WHERE autor_id=$1";
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
            const error = "Autor não encontrado!";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (autor_id, autor, callback) => {
    const sql = "UPDATE autores SET nome=$1 WHERE autor_id=$2 RETURNING *";
    const values = [autor.nome, autor_id];

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
            const error = "Autor não encontrado!";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (autor_id, callback) => {
    const sql = "DELETE FROM autores WHERE autor_id=$1 RETURNING *";
    const values = [autor_id];

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
            const error = "Autor não encontrado!";
            callback(error, null);
        }
        cliente.end();
    });
}

