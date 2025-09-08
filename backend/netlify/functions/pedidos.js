// netlify/functions/pedidos.js
const { Client } = require("pg");

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ message: "Método não permitido" }) 
    };
  }

  const email = event.queryStringParameters?.email;
  if (!email) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ message: "Email é obrigatório" }) 
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Substitua "email" pelo nome correto da coluna na sua tabela
    const result = await client.query(
      "SELECT servico, status, criado_em FROM pedidos WHERE email = $1 ORDER BY criado_em DESC",
      [email]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows)
    };

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "Erro interno ao buscar pedidos", 
        erro: error.stack 
      })
    };
  }
};
