const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 2000; 

app.use(bodyParser.json());

let clientes = [
  { id: "1", nombre: "María" },
  { id: "2", nombre: "José" }
];


app.post('/registro', (req, res) => {
  const { id, nombre } = req.body;

  if (!id || !nombre) {
    return res.status(400).send({ mensaje: 'ID y nombre son requeridos' });
  }

  const clienteExistente = clientes.find(cliente => cliente.id === id);
  if (clienteExistente) {
    return res.status(400).send({ mensaje: 'El ID ya está en uso' });
  }

  const nuevoCliente = { id, nombre };
  clientes.push(nuevoCliente);
  res.status(201).send(nuevoCliente);
});


app.get('/clientes', (req, res) => {
  res.send(clientes);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
