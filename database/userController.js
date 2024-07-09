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
async function crearUsuario(req, res) {

    //desestructuro los datos que vienen en la request
    const { email, password, nombre, apellido, dni, direccion, registro, telefono } = req.body;

    if (!email || !password || !nombre || !apellido || !dni || !direccion || !registro || !telefono) {
        res.status(400).send({ status: 'error', message: 'Falta ingresar datos en uno o más campos' });
    }

    //creo una sentencia para ver si hay datos duplicados en la base=>
    const sqlDupli = 'SELECT `dni`, `nroRegistroConductor` FROM `parking_cac`.`datosclientes` WHERE `dni` = ? OR `nroRegistroConductor` = ? ;';
    const datosDupli = [dni, registro];

    await connection.execute(sqlDupli, datosDupli, (err, result, fields) => {
        console.log('dentro de busqueda de duplicado: ', result);
        console.log('dentro de busqueda de duplicado: ', fields);
        if (err) throw err;
        if (fields != []) {
            res.status(400).send({ status: 'error', message: 'Hay datos únicos que ya existen en la base' });
        };
    });

    //generar clave segura
    const salt = bcrypt.genSaltSync(10);
    const hashUserPassword = bcrypt.hashSync(password, salt);

    //genero la sentencia de inserción de datos en las tablas
    const sqlClientes = 'INSERT INTO `parking_cac`.`clientes` (`email`, `passkey`) VALUES (?, ?) RETURNING `idConductor`;';
    const clientesValues = [email, hashUserPassword];
    const obtenerID = await connection.execute(sqlClientes, clientesValues, function (err, result) {
        if (err) return err
        console.log(result);
    });



    //const sqlDatosClientes = 'INSERT INTO `parking_cac`.`datosclientes` (`idConductor`, `nombre`, `apellido`, `dni`, `nroRegistroConductor`, `direccion`, `nroTelefono`) VALUES (?, ?, ?, ?, ?, ?, ?);';

    //const datosClientesValues = []
    //connection.execute()



    console.log('final de funcion de ingreso');
};


//------------------------------------------------------------------------------------------------------------------
function modificarUsuario() {

};

function eliminarUsuario() {


};


module.exports = {
    consultaUsuarios,
    crearUsuario
}
