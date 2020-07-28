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

app.get('/games/:gameId', (req, res) => {
    let id = Number.parseInt(req.params.gameId);
    res.status(200).json(parser.Parser.prototype.task_3('src/games.txt', id))
});

app.get('/task/:taskId', (req, res) => {
    //Retorna, após a leitura do arquivo de log as informações separadas por jogo
    if (req.params.taskId == '1') {
        res.status(200).json(parser.Parser.prototype.task_1('src/games.txt'));
    }
    else if (req.params.taskId == '2') {
        res.status(200).json(parser.Parser.prototype.task_2('src/games.txt'));
    }
    else if (req.params.taskId == '3') {
        res.status(200).json({
            message: 'Para acessar essa task use o seguinte end point: http://localhost:3030/games/{gameId}',
            api_operation: 'Game id é o número equivalente ao jogo seguindo a ordem do log',
            exemplo: ' http://localhost:3030/games/1'
        });
    }
    else {
        res.status(404).json({ message: 'Task inválida' })
    }
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});