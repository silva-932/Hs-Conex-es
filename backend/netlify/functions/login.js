const { Client } = require('pg');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  const { email, senha } = JSON.parse(event.body || '{}');

  if (!email || !senha) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email e senha são obrigatórios' })
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    const result = await client.query(
      'SELECT id, email, role FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    await client.end();

    if (result.rows.length > 0) {
      const usuario = result.rows[0];
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Login bem-sucedido',
          usuario: {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role // "admin" ou "user"
          }
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Credenciais inválidas' })
      };
    }

  } catch (error) {
    console.error('Erro ao logar:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno', erro: error.message })
    };
  }
};
