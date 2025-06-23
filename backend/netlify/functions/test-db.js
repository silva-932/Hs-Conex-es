const { Client } = require('pg');

exports.handler = async () => {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Conexão com a base de dados bem-sucedida!',
        horaServidor: res.rows[0].now,
      }),
    };
  } catch (erro) {
    console.error('Erro na conexão com o banco de dados:', erro.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro na conexão com o banco de dados.' }),
    };
  }
};
