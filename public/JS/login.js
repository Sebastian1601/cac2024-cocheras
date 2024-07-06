
function prevenirCarga(e) {
    e.preventDefault();

    console.log(miForm);
    console.log(miForm[0].value);

    let datos = [];

    for (let i = 0; i <= 8; i++) {
        let pair = [];
        pair.push(miForm[i].id);
        pair.push(miForm[i].value);
        datos.push(pair);
    }
    const data = Object.fromEntries(datos);
    console.log(data);

    const datajson = JSON.stringify(data);

    let headers = {
        method: "POST",
        body: datajson,
        headers: { "Content-Type": "application/json" }
    };

    try {
        fetch("/registerUser", headers)
            .then((res) => {
                if (res.ok) {
                    console.log('codigo de status: ',res.status);
                    console.log(res);
                    return res.json();
                } else {
                    throw "error, no se logró conectar al servidor"
                }
            }).then((res)=>{
                console.log(res);
            })
            miForm.reset();
    } catch (err) {
        return err
    }
}


let miForm = document.getElementById('formulario');
miForm.addEventListener("submit", prevenirCarga);