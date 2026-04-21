const API = '/api/gastos';
let editando = null;

// cargar datos
async function cargar() {
    const res = await fetch(API);
    const data = await res.json();

    const lista = document.getElementById('lista');
    const totalSpan = document.getElementById('total');

    lista.innerHTML = '';

    let total = 0;

    data.forEach(g => {
        total += g.monto;

        lista.innerHTML += `
            <li>
                ${g.descripcion} - $${g.monto} (${g.categoria})
                <button onclick="editar('${g._id}')">Editar</button>
                <button onclick="eliminar('${g._id}')">X</button>
            </li>
        `;
    });

    totalSpan.textContent = total;
}

// crear o actualizar
document.getElementById('form').addEventListener('submit', async e => {
    e.preventDefault();

    const gasto = {
        descripcion: desc.value,
        monto: Number(monto.value),
        categoria: categoria.value
    };

    if (editando) {
        await fetch(API + '/' + editando, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gasto)
        });
        editando = null;
    } else {
        await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gasto)
        });
    }

    form.reset();
    cargar();
});

// eliminar
async function eliminar(id) {
    if (confirm("¿Seguro?")) {
        await fetch(API + '/' + id, { method: 'DELETE' });
        cargar();
    }
}

// editar
async function editar(id) {
    const res = await fetch(API);
    const data = await res.json();

    const gasto = data.find(g => g._id === id);

    desc.value = gasto.descripcion;
    monto.value = gasto.monto;
    categoria.value = gasto.categoria;

    editando = id;
}

// filtro
document.getElementById('filtro').addEventListener('input', async e => {
    const texto = e.target.value.toLowerCase();

    const res = await fetch(API);
    const data = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    data
        .filter(g => g.categoria.toLowerCase().includes(texto))
        .forEach(g => {
            lista.innerHTML += `<li>${g.descripcion} - $${g.monto}</li>`;
        });
});

cargar();