const { connection } = require('./database.js');



//funcion para guardar datos de un usuario nuasync evo
function obtenerUsuario(req, res) {
    console.log(req.body);
    const usuario = req.body;

    let resultados = [];

    connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado a la base de datos correctamente');
        const sql = 'SELECT * FROM `clientes`';

        //realizo el trabajo en la base
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            let datos = result;
            res.send(JSON.stringify(datos));
        })
        //termino el trabajo en la base
        connection.end();
    })
};


//funcion para guardar datos de un usuario nuevo
function crearUsuario(req, res) {
    console.log(req.body);
    const usuario = req.body;

    connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado a la base de datos correctamente');
        
        //creo la sentencia sql para agregar los datos de los clientes
        const sql = 'INSERT INTO `parking_cac`.`clientes` (`email`, `passkey`) VALUES(?, ?)';

        //realizo el trabajo en la base

        connection.execute(sql, [usuario.email, usuario.password], (err, resultado) => {
            if (err) console.log(err);
            console.log(resultado);
            res.send(resultado);
            console.log('usuario registrado exitosamente!')
        });
        connection.unprepare(sql);

        connection.end();
    });
};



//envolviendo el execute en una promesa
const insertarCliente = (_sql, mailPass)=>{
    return new Promise ((resolve, reject)=>{
        connection.execute(_sql, mailPass, (error, resultados)=>{
            if (error) return reject(error);
            console.log('ingreso de datos correcto');
            return resolve(resultados);
        })
    })
};



module.exports = {
    obtenerUsuario,
    crearUsuario
}