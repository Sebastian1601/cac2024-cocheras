//active-nav.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav__link');
    const currentUrl = window.location.href;

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
});



document.querySelector('.menu-btn').addEventListener('click', function () {
    document.querySelector('.nav__ul').classList.toggle('active');
});



/*------------------FORMULARIO DE LOGIN-------------------*/
function prevenirCarga(e) {
    e.preventDefault();

    //muestro los datos obtenidos del formulario.
    console.log(miForm);

    //creo un array con los datos de los 2 campos, pares nombre y clave
    let par = [[miForm[0].id, miForm[0].value], [miForm[1].id, miForm[1].value]];

    console.log(par);
    console.log(typeof par);
    //creo un objeto a partir de los datos del array
    const data = Object.fromEntries(par);
    console.log(data);

    const datajson = JSON.stringify(data);

    let headers = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: datajson
    };


    try {
        fetch("/api/login", headers)
            .then((res) => {
                if (res.ok) {
                    console.log('codigo de status: ', res.status);
                    console.log(res);
                    return res.json();
                } else {
                    return res.json();
                }
            }).then((res) => {
                if (!res.ok) {
                console.log('error en el login ', res.status, res.message);
                } else {}
            return 'success!'
            })
        miForm.reset();
    } catch (err) {
        return err
    }
}


let miForm = document.getElementById('formulario');
miForm.addEventListener("submit", prevenirCarga);