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
    cliente.query('SELECT * FROM usuarios', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (usuario, callback) => {
    const sql = "INSERT INTO usuarios(cpf, nome, telefone, endereco, email, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [usuario.cpf, usuario.nome, usuario.telefone, usuario.endereco, usuario.email, usuario.senha];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (usuario_id, callback) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id=$1";
    const values = [usuario_id];

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
            const error = "Usuario não encontrado!";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (usuario_id, usuario, callback) => {
    const sql = "UPDATE usuarios SET cpf=$1, nome=$2, telefone=$3, endereco=$4, email=$5, senha=$6 WHERE usuario_id=$7 RETURNING *";
    const values = [usuario.cpf, usuario.nome, usuario.telefone, usuario.endereco, usuario.email, usuario.senha, usuario_id];

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
            const error = "Usuario nâo encontrado!";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (usuario_id, callback) => {
    const sql = "DELETE FROM usuarios WHERE usuario_id=$1 RETURNING *";
    const values = [usuario_id];

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
            const error = {msg:"Usuario não encontrado!"};
            callback(error, null);
        }
        cliente.end();
    });
}

