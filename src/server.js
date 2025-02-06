// server.js
const express = require('express');
const bodyParser = require('body-parser');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exportado para os testes
