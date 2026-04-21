const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// rutas
app.use('/api/gastos', require('./routes/gastos'));

// conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});