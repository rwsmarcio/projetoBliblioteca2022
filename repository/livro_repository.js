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
        const resultado = await cliente.query("SELECT * FROM livros");
        cliente.end();
        return (resultado.rows);
    } catch (err) { 
        throw err; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.inserir = async (livro) => {
    const sql = "INSERT INTO livros(titulo, autor_id, editora, qtd, disponivel) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [livro.titulo, livro.autor_id, livro.editora, livro.qtd, livro.disponivel];

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

exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM livros WHERE livro_id=$1";
    const values = [id];

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
        error.message = "Não existem livros registrados para este ID";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.buscarPorAutor = async (id) => {
    const sql = "SELECT a.nome, l.titulo, l.livro_id, l.disponivel FROM autores a, livros l WHERE a.autor_id = l.autor_id and a.autor_id=$1";
    const values = [id];

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
        error.message = "Não existem livros registrados para este autor";
        error.status = 404; 
        throw error; 
    }
}

//////////////////////////////////////////////////////////////////////////

exports.atualizar = async (livro_id, livro) => {
    const sql = "UPDATE livros SET titulo=$1, autor_id=$2, editora=$3, qtd=$4, disponivel=$5 WHERE livro_id=$6 RETURNING *";
    const values = [livro.titulo, livro.autor_id, livro.editora, livro.qtd, livro.disponivel, livro_id];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const livroAtualizado = await cliente.query(sql, values);
        cliente.end();
        if (livroAtualizado.rowCount == 0) {
            throw error; 
        } else {
            return(livroAtualizado.rows);
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

exports.deletar = async (livro_id) => {
    const sql = "DELETE FROM livros WHERE livro_id=$1 RETURNING *";
    const values = [livro_id];

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