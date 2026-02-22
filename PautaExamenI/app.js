const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());


let libros = [{id: 1, titulo:"Game of thrones", autor:"R. R. George Martin", aniopublicacion:"1996", estado:"disponible"},
{id: 2, titulo:"El Caballero de los 7 reinos", autor:"R. R. George Martin", aniopublicacion:"2015", estado:"prestado"},
{id: 3, titulo:"La danza de Dragones", autor:"R. R. George Martin", aniopublicacion:"2011", estado:"reservado"},
{id: 4, titulo:"Fuego y Sangre", autor:"R. R. George Martin", aniopublicacion:"2018", estado:"daniado"}];


app.get("/libros", (req,res) => {
res.json({status:200, message:"Success",data: libros})
});


app.post("/libros", (req,res) => {

let id = req.body.id;
let titulo = req.body.titulo;
let autor = req.body.autor;
let aniopublicacion = req.body.aniopublicacion;
let estado = req.body.estado;

if ( !id || !titulo || !autor || !aniopublicacion || !estado) {
   return res.status(400).json({mensaje:"Faltan datos"})}

 let valoressugeridos = false;
 switch (estado) {
   case 'disponible':
   case 'prestado':
   case 'reservado':
   case 'daniado':
    valoressugeridos = true;
    break;
    default: valoressugeridos = false
 }
  if (valoressugeridos === false) {
    return res.status(400).json({mensaje:"Solo se permiten los valores sugeridos"})
  }

  let libronuevo = {
    id: id,
    titulo: titulo,
    autor: autor,
    aniopublicacion: aniopublicacion,
    estado: estado
  };

  libros.push(libronuevo);
  res.status(201).json({mensaje:"Se ingreso correctamente un nuevo libro",data:(libronuevo)})
});

app.put ("/libros/:id", (req,res) => {
  
  const id = parseInt(req.params.id);
  const datos = req.body

  let isExist = false

  libros.forEach(libro => {

    if(libro.id === id) {

      isExist = true;

      if(datos.titulo){
        libro.titulo = datos.titulo;
      }

      if(datos.autor){
        libro.autor = datos.autor;
      }
      if(datos.aniopublicacion){
        libro.aniopublicacion = datos.autor;
      }
      if(datos.estado){
      let valido = false;

      switch (datos.estado){
       case "disposuble":
       case "prestado":
       case "reservado":
       case "daniado":
        valido = true;
        break;
        default;
        valido = false;

      }

      }


    } 
  })
});
 

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}/`);
});