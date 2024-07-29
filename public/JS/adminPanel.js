console.log('vinculado ok.')


async function obtenerClientes() {
    document.querySelector('.form_editar').reset();
    document.querySelector('.get_grid.grid-item').style.display = 'block';
    document.querySelector('.edit_grid.grid-item').style.display = 'none';


    const contenedorGrid = document.querySelector('.tabla__resultados');
    if (contenedorGrid.children.length !== 0) {
        eliminarContenidoCargado(contenedorGrid);
    };
    const jsondatos = await fetch('/api/consultarUsuarios');
    const datos = await jsondatos.json();

    crearListadoHTML(datos);
};

//
function eliminarContenidoCargado(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
    console.log('contenido tabla eliminado');
}

function crearListadoHTML(array) {
    const fragmento = document.createDocumentFragment();
    let columnas = Object.keys(array[0]);

    for (let i = 0; i < columnas.length; i++) {
        const div = document.createElement('DIV');
        div.textContent = columnas[i];
        div.classList.add('tabla__items-titulos');
        fragmento.appendChild(div);
    }

    for (i in array) {
        let valores = Object.values(array[i]);
        for (i in valores) {
            const div = document.createElement('DIV');
            div.textContent = valores[i];
            div.classList.add('tabla__items');
            fragmento.appendChild(div);
        };
    }
    console.log(fragmento);
    document.querySelector('.tabla__resultados').appendChild(fragmento);
};

const btn_obtener = document.querySelector('.btn_cargarClientes');
btn_obtener.addEventListener('click', obtenerClientes);


const btn_editar = document.querySelector('.btn_editarClientes');
btn_editar.addEventListener('click', () => {
    document.querySelector('.form_editar').reset();
    const contenedorGrid = document.querySelector('.tabla__resultados');
    eliminarContenidoCargado(contenedorGrid);
    document.querySelector('.edit_grid.grid-item').style.display = 'block';
    document.querySelector('.get_grid.grid-item').style.display = 'none';
});




//boton buscar clientes, que segun ek dni, busca en la base el que coincida
const btn_buscarCliente = document.querySelector('.btn_buscarCliente');
btn_buscarCliente.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.form_editar');
    console.log(form);

    const dni = form[0].value;
    console.log('dni a buscar:', dni);

    fetch('/api/consultarUser/' + dni)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            const cliente = res;
            form[2].value = cliente['nombre'];
            form[3].value = cliente['apellido'];
            form[4].value = cliente['dni'];
            form[5].value = cliente['nroRegistroConductor'];
            form[6].value = cliente['direccion'];
            form[7].value = cliente['nroTelefono'];
            form[8].value = cliente['creado'];
            form[8].setAttribute('disabled', 'true');
        })
        .catch((e) => { console.log(e) });

});

//boton editar clientes, debe enviar el dni del cliente junto con lso datos a cambiar en base
const btn_editarUsuario = document.querySelector('.btn_editarUsuario');
btn_editarUsuario.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.form_editar');
    console.log(form);

    datos = {
        nombre: form[2].value,
        apellido: form[3].value,
        dni: form[4].value,
        registro: form[5].value,
        direccion: form[6].value,
        nroTelefono: form[7].value,
    }

    console.log('dni a editar: ', datos.dni);
    console.log(datos);

    fetch('/api/editarUsuario/' + datos.dni, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then((respuesta) => {
            respuesta.json();
        })
        .then((data) => { console.log('datos desde el backend: ',data) })
        .catch((e) => { console.log(e) });

})
