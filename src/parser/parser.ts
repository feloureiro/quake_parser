import * as fs from 'fs'
export class Parser {
    constructor() { }

    task_1(logPath: string) {
        return this.mapToJson(this.separateLogByGame(logPath));
    }

    task_2(logPath: string): any {
        let games: Map<string, any> = this.separateLogByGame(logPath);
        let gameRport: any = {};
        games.forEach((value: any, key: string) => {
            gameRport[key] = this.mapKillToJson(value.kills);
        })
        return gameRport;
    }

    task_3(logPath: string, gameId: number): any {
        let games: Map<string, any> = this.separateLogByGame(logPath);
        let game = games.get('game_' + gameId);
        let gameKills = this.mapKillToJson(game.kills);
        delete game['kills'];
        game['kills'] = gameKills;
        return game;
    }
    //Função que le o arquivos de log e o divide em linhas dado o caminho do log
    separateLogByGame(logPath: string): Map<string, any> {
        let games: Map<string, any> = new Map<string, any>();
        let log = fs.readFileSync(logPath);
        let gameMark: number = 1;
        let linhas: string[] = log.toString().split(/\r?\n/);

        //Variável que guarda a informação de cada jogo
        let game = {
            total_kills: 0,
            players: [],
            kills: new Map<string, number>()
        };;

        for (let linha of linhas) {
            //Toda vez que um jogo é iniciado as informações anteriores são adicionadas no map e reseta a variavel game(ou round)
            if (linha.includes('0:00 InitGame')) {
                games.set('game_' + gameMark, game);
                game = {
                    total_kills: 0,
                    players: [],
                    kills: new Map()
                };
                gameMark++;
            }
            this.defineLine(linha, game);
        }
        return games;
    }

    //função que tranforma o map do game em um objeto json para mandar para a resposta
    mapToJson(map: Map<any, any>) {
        let obj: any = {};
        map.forEach(function (value, key) {
            if (value?.kills?.size > 0) {
                let kiilsObj = Parser.prototype.mapKillToJson(value.kills)
                delete value.kills;
                value.kills = kiilsObj
            }
            if (key != 'kills')
                obj[key] = value;
        });
        return obj;
    }

    public mapKillToJson(map: Map<any, any>) {
        let obj: any = {};
        map.forEach(function (value, key) {
            obj[key] = value;
        });
        return obj;
    }

    //If para verficiar os dados da linha e armazenar a informação na variável game
    defineLine(line: string, game: any) {
        //If para pegar o nome dos players o padrão que escolhi para pegar os players do game
        if (line.includes('ClientUserinfoChanged')) {
            this.verifyPlayer(line, game);
        }
        else if (line.includes('killed')) {
            this.verifyKill(line, game)
        }
    }

    //verifica de o player já está cadastrado no map, 
    verifyPlayer(line: string, game: any) {
        //extrai o nome do player
        let player = line.substring(line.indexOf('n\\') + 2, line.indexOf('\\t'));
        if (player.length > 0 && !game.players.includes(player)) {
            game.players.push(player);
            game.kills.set(player, 0);
        }
    }

    verifyKill(line: string, game: any) {
        if (line.includes('<world> killed')) {
            this.removeKillFromPlayer(line, game);
        }
        else {
            let killer = line.split(': ').pop()?.split(' killed').shift();
            let killed = line.split('killed ').pop()?.split(' by').shift();

            //verificar se o playner não se matou 
            if (killed != killer) {
                game.kills.set(killer, game.kills.get(killer) + 1)
                game.total_kills++;
            }
        }
    }

    //Remove uma kill do player quando ele é morto pelo <world>
    removeKillFromPlayer(line: string, game: any) {
        let player = line.split('killed ').pop()?.split(' by').shift();
        game.kills.set(player, game.kills.get(player) - 1);
    }

}