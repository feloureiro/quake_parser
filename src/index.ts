//Imports
import express from "express";

//Definindo porta padrão ou 3030
const PORT = 3030;

//Inicializando o servidor http com express
const app = express();

//requests e responses
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello world!"
    })
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});