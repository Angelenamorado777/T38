const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

//Creamos un objeto de conexión con todos los atributos de la conexión
//host, user, password, database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'R00tP4ssw0rd',
    database: 'Libreria'
});

pool.getConnection((error, conexion) => {
    if (error) {
        console.log('Error de conexión a la base de datos');
    }
    else {
        console.log('Conexión exitosa');
    }
});

app.use(express.json());

app.get('/api/libros', (req, res) => {
    const sql = 'SELECT * FROM Libro';
    pool.query(sql, (error, results) => {
        if (error) {
            console.log('Existe un error en la consulta SQL');
            res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
        }
        else {
            res.status(200).json({ status: 200, message: 'Success', data: results });
        }
    });
});

app.get('/api/libros/:AutorId', (req, res) => {
    const AutorId = parseInt(req.params.AutorId);
    const sql = 'SELECT a.Nombre,' +
        ' l.Titulo as Libro' +
        ' FROM Autor a' +
        ' LEFT JOIN Libro l' +
        ' ON (a.Id = l.AutorId)' +
        ' WHERE a.Id = ?;';

    console.log(sql);
    pool.query(sql, [AutorId], (error, results) => {
        if (error) {
            console.log('Existe un error en la consulta SQL');
            res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
        }
        else {
            res.status(200).json({ status: 200, message: 'Success', data: results });
        }
    });
});

app.post('/api/libros',(req,res)=>{
    const libro = req.body;
    if(!libro.titulo || !libro.autorId || !libro.anioPublicacion 
        || !libro.ISBN || !libro.genero || !libro.estado){
            return res.status(400).json({status:400,message:'Todos los campos son obligatorios...'});
    }
    
    const sql = 'INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Estado,ISBN,AutorId) VALUES(?,?,?,?,?,?)';

        pool.query(sql,[libro.titulo, libro.anioPublicacion, libro.genero, libro.estado, libro.ISBN, libro.autorId],(error,results)=>{
            if (error) {
                console.log('Existe un error en la consulta SQL');
                res.status(500).json({ status: 500, message: 'Error en la consulta SQL' });
            }
            else {
                libro.id = results.insertId;
                res.status(200).json({ status: 200, message: 'Success', data: libro });
            }
        });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});