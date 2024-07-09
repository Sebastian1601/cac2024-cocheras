const { connection } = require('./database.js');



//funcion para obtener datos de un usuario
function consultaUsuarios(req, res) {
    connection.connect((err) => {
        if (err) throw console.log('error de conexion', err);
        console.log('Conectado a la base de datos correctamente');
        const sql = 'SELECT * FROM `clientes`';

        //realizo el trabajo en la base
        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            let datos = result;
            res.send(JSON.stringify(datos));
        });

    });
    connection.end();
};


/*--- LEER LOS USUARIOS DE CLIENTES---------------------------------------------------*/
/* 
const obtenerUsuarios = (sentenciaSql) => {
    return new Promise((resolve, reject) => {
        connection.execute(sentenciaSql, (error, resultados) => {
            if (error) return reject(error);
            console.log('obtencion de todos los datos correcta.')
            return resolve(resultados);
        });
    });
};

async function resultadosSQLget(senSql) {
    const resCon = await obtenerUsuarios(senSql);
    connection.unprepare(sql);
    return resCon
};

------funcion princpal obtener todos los usuarios---------------------
async function consultaUsuarios(req, res) {
    //conecto la base de datos
    connection.connect((err) => {
        if (err) throw err;
        console.log('conectado a la base de datos correctamente.');

        const sql = 'SELECT * FROM `clientes`';
        const resultados = resultadosSQLget(sql);
        console.log('query obtenida, enviando datos al front');
        res.send(JSON.stringify(resultados));
    })
}
 */











/*--------------crear nuevo registro de usuario---------------------------*/

//envolviendo el execute en una promesa, para poder usar datos del registro ya creado luego
function insertarCliente(sentenciaSql, mailPass) {
    return new Promise((resolve, reject) => {
        connection.execute(sentenciaSql, mailPass, (error, resultados) => {
            if (error) return reject(error);
            console.log('execute logrado correctamente.');
            console.log(resultados);
            return resolve(resultados);
        });
    });
};

/* 
insertarCliente(sql, datos)
    .then((res) => {
        connection.unprepare(sql);
        console.log('dentro de la funcion resultadosSQL')
        return res;
    })
    .catch((err) => {
        return { 'error': err, 'exist': true };
    });

 */

//---------funcion principal crear usuario --------------------------
function crearUsuario(req, res) {

    const { email, password, nombre, apellido, dni, direccion, registro, telefono } = req.body;

    connection.connect((err) => {

        if (err) throw err;

        console.log('Conectado a la base de datos correctamente');
        //creo una sentencia para ver si hay datos duplicados en la base=>
        const sqlDupli = 'SELECT dni, nroRegistroConductor FROM `parking_cac`.`datosclientes` WHERE dni = ? OR nroRegistroConductor = ? ;';
        const datosDupli = [dni, registro];

        const datosDuplicados = insertarCliente(sqlDupli, datosDupli)
            .then((resultados) => {
                console.log('existen resultados de la prebusqueda: ', resultados);
                console.log('resultados en el then: ', resultados.length);
                return resultados;
            })
            .catch((e) => {
                console.log(e.code);
            });
            console.log('datos: ', datosDuplicados, 'longitud: ',datosDuplicados.length); //veo si datosDuiplicados tiene el resultado de la funcion 
        //verifico si la busqueda anterior dio algún resultado.
        if (datosDuplicados.length = 0) {

            //de resultar un array vacío, creo la sentencia sql para agregar los datos de los clientes
            const sql = 'INSERT INTO `parking_cac`.`clientes` (`email`, `passkey`) VALUES(?, ?);';
            const dataArray = [email, password];

            //paso a insertarcliente la sentencia y datos
            insertarCliente(sql, dataArray)
                .then((resultados) => {
                    //con el primer insert en clientes, obtengo desde los resultados el id autoincremental y lo uso para agregar datos a la tabla datosclientes
                    const { insertId } = resultados;
                    const sql1 = 'INSERT INTO `parking_cac`.`datosclientes` (`idConductor`,`nombre`, `apellido`, `dni`, `nroRegistroConductor`, `direccion`, `nroTelefono`) VALUES(?, ?, ?, ?, ?, ?, ?);';
                    const dataArray1 = [insertId, nombre, apellido, dni, registro, direccion, telefono];

                    //le paso los datos restantes a insertarcliente para la tabla datosclientes
                    insertarCliente(sql1, dataArray1)
                        .then(() => {
                            console.log('ingreso realizado en ambas tablas')

                            //si se agregaron todos los datos, envio en la respuesta un objeto con mensaje de datos guardados.
                            res.status(200).send({ status: 'ok', message: 'Nuevo usuario guardado correctamente', redirect: '/' });
                        })
                        .catch((err) => {
                            console.error('no se pudo guardar datos en la tabla `datosclientes`', err.code);


                            res.status(400).send({ status: 'fail', message: 'No se han guardado los datos' });
                        })


                });
        } else {
            res.status(400).send({ status: 'fail', message: 'Los datos ya existen en la base de datos' });
        }
    });
}


module.exports = {
    consultaUsuarios,
    crearUsuario
}