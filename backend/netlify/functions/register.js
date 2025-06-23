const { Client } = require('pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const { email, senha } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    await client.query(
      'INSERT INTO usuarios (email, senha) VALUES ($1, $2)',
      [email, senha]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuário cadastrado com sucesso' })
    };
  } catch (erro) {
    console.error('Erro ao cadastrar:', erro);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao cadastrar usuário' })
    };
  }
};
