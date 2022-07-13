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

exports.listar = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT * FROM autores");
        cliente.end();
        return (resultado.rows);
    } catch (err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (autor) => {
    const sql = "INSERT INTO autores(nome) VALUES ($1) RETURNING *";
    const values = [autor.nome];

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

exports.buscarPorId = async (autor_id) => {
    const sql = "SELECT * FROM autores WHERE autor_id=$1";
    const values = [autor_id];

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
        error.message = "Não existe autor registrado para este ID";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (autor_id, autor) => {
    const sql = "UPDATE autores SET nome=$1 WHERE autor_id=$2 RETURNING *";
    const values = [autor.nome, autor_id];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const autorAtualizado = await cliente.query(sql, values);
        cliente.end();
        if (autorAtualizado.rowCount == 0) {
            throw error; 
        } else {
            return(autorAtualizado.rows);
        };
    } catch (err) { 
        let error = {};
        error.name = "Repository Error";
        error.message = "ID referida não existe";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.deletar = async (autor_id) => {
    const sql = "DELETE FROM autores WHERE autor_id=$1 RETURNING *";
    const values = [autor_id];

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
