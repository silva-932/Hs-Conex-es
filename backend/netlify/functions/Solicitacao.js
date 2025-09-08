require('dotenv').config();
const nodemailer = require("nodemailer");


exports.handler = async function(event) {
  if(event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido" };
  }

  try {
    const data = JSON.parse(event.body);

    // Criar transporter SMTP com Gmail usando senha de app
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Ex.: djheldersilva.mr.wait@gmail.com
        pass: process.env.EMAIL_PASS  // senha de app do Gmail
      }
    });

    let mensagem = `Nova solicitação de serviço:\n\n`;
    mensagem += `Serviço: ${data.servico}\n`;
    Object.keys(data).forEach(key => {
      if(key !== "servico") mensagem += `${key}: ${data[key]}\n`;
    });

    await transporter.sendMail({
      from: `"HS Conexões" <${process.env.EMAIL_USER}>`,
      to: "suport@hsconexoes.site",
      subject: `Nova Solicitação - ${data.servico}`,
      text: mensagem
    });

    return { statusCode: 200, body: JSON.stringify({ message: "Solicitação enviada com sucesso!" }) };

  } catch(err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: "Erro ao enviar solicitação", erro: err.message }) };
  }
};
