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
        const resultado = await cliente.query("SELECT * FROM movimentacao");
        cliente.end();
        return (resultado.rows);
    } catch (err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (movimentacao) => {
    const sql = "INSERT INTO movimentacao(usuario_id, livro_id, data_retirada, data_devolucao) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [movimentacao.usuario_id, movimentacao.livro_id, movimentacao.data_retirada, movimentacao.data_devolucao];

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

exports.buscarPorId = async (movimentacao_id) => {
    const sql = "SELECT * FROM movimentacao WHERE movimentacao_id=$1";
    const values = [movimentacao_id];

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
        error.message = "Não existem movimentações registradas para este ID";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (movimentacao_id, movimentacao) => {
    const sql = "UPDATE movimentacao SET usuario_id=$1, livro_id=$2, data_retirada=$3, data_devolucao=$4 WHERE movimentacao_id=$5 RETURNING *";
    const values = [movimentacao.usuario_id, movimentacao.livro_id, movimentacao.data_retirada, movimentacao.data_devolucao, movimentacao_id];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const movimentacaoAtualizada = await cliente.query(sql, values);
        cliente.end();
        if (movimentacaoAtualizada.rowCount == 0) {
            throw error; 
        } else {
            return(movimentacaoAtualizada.rows);
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

exports.deletar = async (movimentacao_id) => {
    const sql = "DELETE FROM movimentacao WHERE movimentacao_id=$1 RETURNING *";
    const values = [movimentacao_id];

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

exports.buscarPorUsuario = async (usuario_id) => {
    const sql = "SELECT u.nome, l.titulo, m.data_retirada, m.data_devolucao FROM movimentacao m, livros l, usuarios u WHERE m.usuario_id = u.usuario_id and l.livro_id = m.livro_id and u.usuario_id = $1";
    const values = [usuario_id];

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        if (resultado.rowCount == 0) {
            throw error; 
        } else {
            return(resultado.rows);
        };
    } catch (err) {
        let error = {};
        error.name = "Repository Error";
        error.message = "Não existem movimentações registradas para este usuario";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////