const API = '/api/gastos';
const form = document.getElementById('form');
const lista = document.getElementById('lista');

// cargar datos
async function cargar() {
    const res = await fetch(API);
    const data = await res.json();

    lista.innerHTML = '';

    data.forEach(g => {
        lista.innerHTML += `
            <li>
                ${g.descripcion} - $${g.monto}
                <button onclick="eliminar('${g._id}')">X</button>
            </li>
        `;
    });
}

// crear
form.addEventListener('submit', async e => {
    e.preventDefault();

    const gasto = {
        descripcion: desc.value,
        monto: monto.value,
        categoria: categoria.value
    };

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gasto)
    });

    form.reset();
    cargar();
});

// eliminar
async function eliminar(id) {
    await fetch(API + '/' + id, { method: 'DELETE' });
    cargar();
}

cargar();