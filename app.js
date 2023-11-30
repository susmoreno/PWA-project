const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

app.post(
  '/encuesta',
  [
    body('nombre').custom(value => /^[a-zA-Z\s]+$/.test(value)).withMessage('El nombre debe contener solo letras y espacios'),
    body('edad').isInt().withMessage('La edad debe ser un número entero'),
    body('email').isEmail().withMessage('El formato del correo electrónico es inválido'),
    body('alien').isIn(['chris', 'crabSpider', 'cynthia', 'courierFlap']).withMessage('Alien no válido'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const datos = req.body;
    console.log('Datos recibidos:', datos);

    res.json({ mensaje: 'Datos recibidos correctamente' });
  }
);

const port = 8080;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});