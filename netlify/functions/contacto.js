exports.handler = async function(event, context) {
    const data = JSON.parse(event.body || '{}');
  
    const nome = data.nome || 'Visitante';
    const email = data.email || 'Sem email';
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Olá, ${nome}! Recebemos o teu email: ${email}` })
    };
  };
  