const mysql = require('mysql2');
const config = require('../config/config.js');
const bcrypt = require('bcryptjs');

const configdb = {
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASS,
    database: config.DBNAME,
    port:config.DBPORT
};

const database = config.DBNAME;

const connection = mysql.createConnection(configdb);


//funcion para obtener datos de un usuario
function consultaUsuarios(req, res) {

    const sql = `SELECT * FROM ${database}.datosClientes`;

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
    const sqlDupli = `SELECT dni, nroRegistroConductor FROM ${database}.datosClientes WHERE dni = ? OR nroRegistroConductor = ? ;`;
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
            const sqlClientes = `INSERT INTO ${database}.clientes (email, passkey) VALUES (?, ?);`;
            const clientesValues = [email, hashUserPassword];
            return insertarCliente(sqlClientes, clientesValues)
        })
        .then((resultados) => {

            const { insertId } = resultados;
            const sqlDatosClientes = `INSERT INTO ${database}.datosClientes (idConductor, nombre, apellido, dni, nroRegistroConductor, direccion, nroTelefono) VALUES ( ?, ? , ? , ? , ? , ? , ?);`;
            const datosClientesValues = [insertId, nombre, apellido, dni, registro, direccion, telefono];
            return insertarCliente(sqlDatosClientes, datosClientesValues)
        })
        .then((resultados) => {

            console.log('log desde el 2do then', resultados);
            res.status(201).send({ status: "Success", message: 'Se ha registrado el nuevo usuario correctamente', resultados: resultados });
        })
        .catch((e) => {
            res.send({ status: 'Error', message: e });

        })
};


/*------------------------------------------------------------------------------------------------------------------*/
function consultaUser(req, res) {
    console.log('iniciando back');
    const dni = [];
    dni.push(req.params.dni);

    const sql = `SELECT * FROM ${database}.datosClientes WHERE dni = ? ;`;

    insertarCliente(sql, dni)
        .then((results) => {
            const usuario = results[0];

            if (usuario != undefined) {

                console.log(usuario);
                res.status(200).send(usuario);
            } else {
                console.log(usuario)
                res.status(400).send({ status: 'error', message: 'El usuario buscado no existe en la base de datos' });
            }
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send(e);
        })
};

function editarUsuario(req, res) {
    const data = req.body;
    console.log(data);
    let datos = [];
    const sql = `UPDATE ${database}.datosClientes SET nombre = ?, apellido = ?, dni = ?, nroRegistroConductor = ?, direccion = ?, nroTelefono = ? WHERE dni = ?;`;
    for (i in data) {
        datos.push(data[i]);
    };
    datos.push(req.params.dni);
    insertarCliente(sql, datos)
    .then((resultados)=>{
        const results = resultados;
        console.log(results);
        console.log('datos actualizados con éxito');
        res.status(200).send({status:'Success', message:'Los datos han sido modificados con éxito'});
    })
    .catch((e)=>{
        res.status(400).send({status:'error', message:'Se produjo un error al actualizar los datos'});
    });

};





function eliminarUsuario() {


};





async function loginUsuario(req, res) {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
        res.status(400).send({ status: 'error', message: 'Hay datos incompletos en uno  o más campos' });
    }
    const sql = `SELECT idUsuario, email, clave FROM ${database}.admindatos WHERE 'email' = ? ;`;
    const datos = [usuario];

    const resultados = await insertarCliente(sql, datos);
    if (resultados.length >= 1) {
        const { clave } = resultados[0];
        console.log(clave);
        res.status(200).send({ status: 'login success!', message: 'Login exitoso, datos correctos' });
    } else {
        res.status(400).send({ status: 'login failed!', message: 'Los datos no coinciden' });
    }

};



async function registrarAdmin(req, res) {

};

//module exports
module.exports = {
    consultaUsuarios,
    crearUsuario,
    loginUsuario,
    consultaUser,
    editarUsuario
}
