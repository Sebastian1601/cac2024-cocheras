const mysql = require('mysql2');
const config = require('../config/config.js');
const bcrypt = require('bcryptjs');

const configdb = {
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASS,
    database: config.DBNAME,
    port: config.DBPORT
};

const connection = mysql.createConnection(configdb);


//funcion para obtener datos de un usuario
function consultaUsuarios(req, res) {

    const sql = 'SELECT * FROM `clientes`';

    //realizo el trabajo en la base
    const datos = connection.query(sql, (err, resultados) => {
        if (err) return err;

        res.status(201).send(JSON.stringify(resultados));
    });
};



//---------funcion principal crear usuario --------------------------
//creo una funcion que devuelva una promesa para usar los resultados
function insertarCliente(sentenciaSql, datos) {
    return new Promise((resolve, reject) => {
        connection.execute(sentenciaSql, datos, (error, resultados) => {
            if (error) return reject(error);

            return resolve(resultados);
        });
    });
};



function crearUsuario(req, res) {

    //desestructuro los datos que vienen en la request
    const { email, password, nombre, apellido, dni, direccion, registro, telefono } = req.body;

    if (!email || !password || !nombre || !apellido || !dni || !direccion || !registro || !telefono) {
        res.status(400).send({ status: 'error', message: 'Falta ingresar datos en uno o más campos' });
    }

    //creo una sentencia para ver si hay datos duplicados en la base=>
    const sqlDupli = 'SELECT `dni`, `nroRegistroConductor` FROM `parking_cac`.`datosclientes` WHERE `dni` = ? OR `nroRegistroConductor` = ? ;';
    const datosDupli = [dni, registro];

    insertarCliente(sqlDupli, datosDupli)
        .then((resultados) => {
            console.log('primera promesa datos', resultados);
            if (resultados.length > 0) {
                throw 'El dni o registro ya están en la base';
            };
            //generar clave segura
            const salt = bcrypt.genSaltSync(10);
            const hashUserPassword = bcrypt.hashSync(password, salt);

            //genero la sentencia de inserción de datos en las tablas
            const sqlClientes = 'INSERT INTO `parking_cac`.`clientes` (`email`, `passkey`) VALUES (?, ?);';
            const clientesValues = [email, hashUserPassword];
            return insertarCliente(sqlClientes, clientesValues)
        })
        .then((resultados) => {

            const { insertId } = resultados;
            const sqlDatosClientes = 'INSERT INTO `parking_cac`.`datosclientes` (`idConductor`, `nombre`, `apellido`, `dni`, `nroRegistroConductor`, `direccion`, `nroTelefono`) VALUES ( ?, ? , ? , ? , ? , ? , ?);';
            const datosClientesValues = [insertId, nombre, apellido, dni, registro, direccion, telefono];
            return insertarCliente(sqlDatosClientes, datosClientesValues)
        })
        .then((resultados) => {

            console.log('log desde el 2do then', resultados);
            res.status(201).send({ status: "Success", message: 'Se ha registrado el nuevo usuario correctamente', resultados: resultados });
        })
        .catch((e) => {
            res.send({ status: 'Error', message: e});

        })
};


/*------------------------------------------------------------------------------------------------------------------*/
function modificarUsuario() {

};

function eliminarUsuario() {


};


module.exports = {
    consultaUsuarios,
    crearUsuario
}
