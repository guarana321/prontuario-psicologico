const { Sessoes, Pacientes } = require('../app/models');

class SessaoController {
    // Criar uma nova anotação de sessão
    async store(req, res) {
        try {
            const { paciente_id } = req.params; // Pega o ID da URL
            const { data_sessao, anotacoes } = req.body; // Pega os dados que você digitou

            // Passo 1: Confirmar se o paciente realmente existe
            const paciente = await Pacientes.findByPk(paciente_id);
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            // Passo 2: Criar a sessão no banco
            const sessao = await Sessoes.create({
                paciente_id,
                data_sessao: data_sessao || new Date(), // Se não mandar data, usa a data atual
                anotacoes
            });

            // Responde com sucesso
            return res.status(201).json(sessao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Listar todas as sessões de um paciente
    async index(req, res) {
        try {
            const { paciente_id } = req.params;

            // Passo 1: Confirmar se o paciente existe
            const paciente = await Pacientes.findByPk(paciente_id);
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            // Passo 2: Buscar todas as sessões do paciente (ordenado por mais recentes)
            const sessoes = await Sessoes.findAll({
                where: { paciente_id },
                order: [['data_sessao', 'DESC']]
            });

            return res.status(200).json(sessoes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Buscar uma única sessão
    async show(req, res) {
        try {
            const { id } = req.params;

            const sessao = await Sessoes.findByPk(id);

            if (!sessao) {
                return res.status(404).json({ error: 'Sessão não encontrada' });
            }

            return res.status(200).json(sessao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Atualizar uma sessão existente
    async update(req, res) {
        try {
            const { id } = req.params;
            const { data_sessao, anotacoes } = req.body;

            const sessao = await Sessoes.findByPk(id);

            if (!sessao) {
                return res.status(404).json({ error: 'Sessão não encontrada' });
            }

            // Atualiza os campos
            if (data_sessao) sessao.data_sessao = data_sessao;
            if (anotacoes !== undefined) sessao.anotacoes = anotacoes;

            await sessao.save();

            return res.status(200).json(sessao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SessaoController();
