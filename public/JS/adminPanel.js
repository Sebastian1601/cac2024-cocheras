console.log('vinculado ok.')

async function obtenerClientes() {
    const contenedorGrid = document.querySelector('.tabla__resultados');
    if (contenedorGrid.children.length !== 0 ) {
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
        for(i in valores){
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

