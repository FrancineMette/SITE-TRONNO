const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.enviarLinkRecuperacao = async (email, token) => {
  const link = `https://site-tronno.com.br/redefinir.html?token=${token}`;

  try {
    const resposta = await resend.emails.send({
      from: 'Tronno <helpdesk@tronno.com.br>',
      to: email,
      subject: 'Redefinição de Senha - Tronno',
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição de senha.</p>
        <p><a href="${link}">Clique aqui para redefinir sua senha</a></p>
        <p>Se não foi você, ignore este e-mail.</p>
      `
    });

    console.log("Email enviado:", resposta);
    return resposta;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};
