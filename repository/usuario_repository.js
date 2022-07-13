//////////////////////////////////////////////////////////////////////////

const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'trabalho_pi',
    user: 'postgres',
    password: '040389'
};

//////////////////////////////////////////////////////////////////////////

exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM usuarios', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.listar = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT * FROM usuarios");
        cliente.end();
        return (resultado.rows);
    } catch (err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (usuario) => {
    const sql = "INSERT INTO usuarios(cpf, nome, telefone, endereco, email, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [usuario.cpf, usuario.nome, usuario.telefone, usuario.endereco, usuario.email, usuario.senha];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    } catch (err) {
        let error = {};
        error.name = "Repository error";
        error.message = "Faltam dados para inserção";
        error.status = 500;
        throw error;
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorId = async (usuario_id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id=$1";
    const values = [usuario_id];

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        if (resultado.rowCount == 0){
            throw error;
        } else {
            return(resultado.rows);
        }        
    } catch (err) {
        let error = {};
        error.name = "Repository Error";
        error.message = "Não existe usuario registrado para este ID";
        error.status = 404; 
        throw error; 
    }
}
//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (usuario_id, usuario) => {
    const sql = "UPDATE usuarios SET cpf=$1, nome=$2, telefone=$3, endereco=$4, email=$5, senha=$6 WHERE usuario_id=$7 RETURNING *";
    const values = [usuario.cpf, usuario.nome, usuario.telefone, usuario.endereco, usuario.email, usuario.senha, usuario_id];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const usuarioAtualizado = await cliente.query(sql, values);
        cliente.end();
        if (usuarioAtualizado.rowCount == 0) {
            throw error; 
        } else {
            return(usuarioAtualizado.rows);
        };
    } catch (err) { 
        let error = {};
        error.name = "Repository Error";
        error.message = "ID de usuário não existe";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

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

exports.deletar = async (usuario_id) => {
    const sql = "DELETE FROM usuarios WHERE usuario_id=$1 RETURNING *";
    const values = [usuario_id];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        if(resultado.rowCount == 0){
            throw error; 
        } else {
            return(resultado.rows);
        }
    } catch (err) {
        let error = {};
        error.name = "Repository error";
        error.message = "ID referida não existe";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

