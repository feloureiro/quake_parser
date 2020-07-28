//Imports
import express from "express";
import * as parser from './parser/parser'

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

app.get('/task/:taskId', (req, res) => {
    //Retorna, após a leitura do arquivo de log as informações separadas por jogo
    if(req.params.taskId == '1'){
        res.status(200).json(parser.Parser.prototype.task_1('src/games.txt'));
    }
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});