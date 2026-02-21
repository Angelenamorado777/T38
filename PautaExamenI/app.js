const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());


let libros = [{id: 1, titulo:"Game of thrones", autor:"R. R. George Martin", aniopublicacion:"1996", estado:"disponible"},
{id: 2, titulo:"El Caballero de los 7 reinos", autor:"R. R. George Martin", aniopublicacion:"2015", estado:"prestado"},
{id: 3, titulo:"La danza de Dragones", autor:"R. R. George Martin", aniopublicacion:"2011", estado:"reservado"},
{id: 3, titulo:"Fuego y Sangre", autor:"R. R. George Martin", aniopublicacion:"2018", estado:"daniado"}];


app.get('Libros')



app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}/`);
});