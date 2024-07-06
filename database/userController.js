function crearUsuario (req, res) {
    console.log(req.body);
    const usuario = req.body;
    
    for(datos in usuario){
        console.log(`${datos}: ${usuario[datos]}`);
    }

    res.send(JSON.stringify('datos cargados correctamente'));
};

module.exports = {
    crearUsuario
}