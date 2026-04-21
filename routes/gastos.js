const express = require('express');
const router = express.Router();
const Gasto = require('../models/Gasto');

// CREAR
router.post('/', async (req, res) => {
    const nuevo = new Gasto(req.body);
    const guardado = await nuevo.save();
    res.json(guardado);
});

// LEER
router.get('/', async (req, res) => {
    const gastos = await Gasto.find();
    res.json(gastos);
});

// ACTUALIZAR
router.put('/:id', async (req, res) => {
    const actualizado = await Gasto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
});

// ELIMINAR
router.delete('/:id', async (req, res) => {
    await Gasto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Eliminado" });
});

module.exports = router;