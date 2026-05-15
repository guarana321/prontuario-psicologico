const { Pacientes } = require('../app/models');

class UserController {
    async store(req, res) {
        const { Nome, email, telefone, observacoes } = req.body;
        // Convert empty strings to null for typed columns
        const Idade = req.body.Idade !== '' && req.body.Idade != null ? parseInt(req.body.Idade) : null;
        const data_nascimento = req.body.data_nascimento || null;

        if (!Nome || !email) {
            return res.status(400).json({ error: 'Preencha todos os campos' });
        }

        try {
            const userAlreadyExists = await Pacientes.findOne({ where: { email } });

            if (userAlreadyExists) {
                return res.status(400).json({ error: 'Esse paciente ja existe' });
            }

            const paciente = await Pacientes.create({ Nome, email, Idade, telefone, data_nascimento, observacoes });

            return res.status(201).json(paciente);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async index(req, res) {
        try {
            const pacientes = await Pacientes.findAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            const paciente = await Pacientes.findByPk(id);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente nao encontrado' });
            }

            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar paciente', details: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { Nome, email, telefone, observacoes } = req.body;
            // Convert empty strings to null for typed columns
            const Idade = req.body.Idade !== '' && req.body.Idade != null ? parseInt(req.body.Idade) : null;
            const data_nascimento = req.body.data_nascimento || null;

            const paciente = await Pacientes.findByPk(id);

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente nao encontrado' });
            }

            await paciente.update({ Nome, email, Idade, telefone, data_nascimento, observacoes });

            return res.status(200).json({ message: "Paciente atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar paciente", error: error.message });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            await Pacientes.destroy({ where: { id: id, } });

            return res.status(200).json({ message: "Paciente excluido com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao excluir paciente", error: error.message });
        }
    }
}

module.exports = new UserController();