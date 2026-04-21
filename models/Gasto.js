const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
    descripcion: String,
    monto: Number,
    categoria: String,
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gasto', GastoSchema);