/*dadosCadastraisController.js*/
const DadosCadastrais = require('../models/DadosCadastrais');

exports.criar = (req, res) => {
  const dados = req.body;

  if (!dados.id_usuario || !dados.tipo_pessoa) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios faltando' });
  }

  DadosCadastrais.criar(dados, (err, result) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao salvar dados cadastrais' });
    }
    res.status(201).json({ mensagem: 'Dados cadastrados com sucesso!', id: result.insertId });
  });
};
