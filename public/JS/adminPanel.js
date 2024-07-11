console.log('vinculado ok.')

async function obtenerClientes() {
    const contenedorGrid = document.querySelector('.tabla__resultados');
    if (contenedorGrid.children.length !== 0) {
        eliminarContenidoCargado(contenedorGrid);
    };
    const jsondatos = await fetch('http://localhost:3000/api/consultarUsuarios');
    const datos = await jsondatos.json();

    crearListadoHTML(datos);
};


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
    console.log(fragmento);
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
    const contenedorGrid = document.querySelector('.tabla__resultados');
    eliminarContenidoCargado(contenedorGrid);
    document.querySelector('.edit_grid.grid-item').style.display = 'block';
    document.querySelector('.get_grid.grid-item').style.display = 'none';
})

//boton buscar clientes, que segun los campos, busca en la base los que coincidan
const btn_buscarCliente = document.querySelector('.btn_buscarCliente');

btn_buscarCliente.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.form_editar');
    console.log(form);

    const dni = form[1].value;


    fetch(`http://localhost:3000/api/consultarUser/${dni}`)   
        .then(res => res.json())
        .then((res) => {console.log(res);
            const cliente = res;
            form[0].value = cliente['idConductor'];
            form[3].value = cliente['nombre'];
            form[4].value = cliente['apellido'];
            form[5].value = cliente['dni'];
            form[6].value = cliente['nroRegistroConductor'];
            form[7].value = cliente['direccion'];
            form[8].value = cliente['nroTelefono'];
            form[9].value = cliente['creado'];
        })
        .catch(e => console.log(e));

});