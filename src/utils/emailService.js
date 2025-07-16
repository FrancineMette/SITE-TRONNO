/*emailService.js*/
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.enviarLinkRecuperacao = async (email, token) => {
  const link = `https://site-tronno.com.br/redefinir.html?token=${token}`;

  try {
    const resposta = await resend.emails.send({
      from: 'Tronno <onboarding@resend.dev>',
      to: email,
      subject: 'Redefinição de Senha - Tronno',
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição de senha.</p>
        <p><a href="${link}">Clique aqui para redefinir sua senha</a></p>
        <p>Se não foi você, ignore este e-mail.</p>
      `
    });

    // 🧪 Logs úteis para depuração
    console.log("📨 Tentando enviar para:", email);
    console.log("🔗 Link de redefinição:", link);
    console.log("📬 Resposta da Resend:", JSON.stringify(resposta, null, 2));

    return resposta;
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw error;
  }
};
