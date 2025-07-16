/*DadosCadastrais.js em models*/
const db = require('../config/db');

const DadosCadastrais = {
  criar: (dados, callback) => {
    const sql = `
      INSERT INTO dados_cadastrais (
        id_usuario, tipo_pessoa,
        cpf, nome_completo, data_nascimento, rg,
        cnpj, razao_social, nome_fantasia, situacao_cadastral, data_situacao_cadastral,
        natureza_juridica, capital_social, porte_empresa, tipo_unidade, data_abertura,
        atividade_principal, atividades_secundarias,
        logradouro, numero, complemento, bairro, cep, municipio, uf,
        telefone, email_nf
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      dados.id_usuario, dados.tipo_pessoa,

      // PF
      dados.cpf || null,
      dados.nome_completo || null,
      dados.data_nascimento || null,
      dados.rg || null,

      // PJ
      dados.cnpj || null,
      dados.razao_social || null,
      dados.nome_fantasia || null,
      dados.situacao_cadastral || null,
      dados.data_situacao_cadastral || null,
      dados.natureza_juridica || null,
      dados.capital_social || null,
      dados.porte_empresa || null,
      dados.tipo_unidade || null,
      dados.data_abertura || null,
      dados.atividade_principal || null,
      dados.atividades_secundarias || null,

      // Em comum
      dados.logradouro || null,
      dados.numero || null,
      dados.complemento || null,
      dados.bairro || null,
      dados.cep || null,
      dados.municipio || null,
      dados.uf || null,
      dados.telefone || null,
      dados.email_nf || null
    ];

    db.query(sql, valores, (err, result) => {
      if (err) {
        console.error('❌ Erro ao inserir dados cadastrais:', err);
        return callback(err);
      }
      console.log('✅ Dados cadastrais inseridos com sucesso!');
      callback(null, result);
    });
  },

  buscarPorUsuario: (id_usuario, callback) => {
    const sql = 'SELECT * FROM dados_cadastrais WHERE id_usuario = ? LIMIT 1';
    db.query(sql, [id_usuario], (err, results) => {
      if (err) {
        console.error('❌ Erro ao buscar dados cadastrais:', err);
        return callback(err);
      }
      callback(null, results[0]);
    });
  },

  atualizar: (id_usuario, novosDados, callback) => {
    const sql = 'UPDATE dados_cadastrais SET ? WHERE id_usuario = ?';
    db.query(sql, [novosDados, id_usuario], (err, result) => {
      if (err) {
        console.error('❌ Erro ao atualizar dados cadastrais:', err);
        return callback(err);
      }
      console.log('✅ Dados cadastrais atualizados com sucesso!');
      callback(null, result);
    });
  }
};

module.exports = DadosCadastrais;
