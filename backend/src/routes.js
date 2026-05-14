const { Router } = require("express");
const UserController = require("./controller/UserController");
const SessaoController = require("./controller/SessaoController");

const routes = Router();

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.post('/Pacientes', UserController.store);
routes.get('/Pacientes', UserController.index);
routes.get('/Pacientes/:id', UserController.show);
routes.put('/Pacientes/:id', UserController.update);
routes.delete('/Pacientes/:id', UserController.destroy);

routes.post('/Pacientes/:paciente_id/sessoes', SessaoController.store);
routes.get('/Pacientes/:paciente_id/sessoes', SessaoController.index);

routes.get('/Sessoes/:id', SessaoController.show);
routes.put('/Sessoes/:id', SessaoController.update);

module.exports = routes;
