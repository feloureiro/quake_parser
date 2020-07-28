Um projeto em node usando Typescript que implementa um parser de log para o jogo Quake.

--------------------- SETUP DO PROJETO -------------------------------------

Para rodar o projeto é necessário ter o Node instalado e, consequentemente, o npm.
Com isso é necessário rodar os seguintes comandos:
1.
    '$ npm install' para instalar todas as depentendias
2. 
    '$ npm run dev' para rodar a aplicação em modo desenvolvimento

Por utilizar Typescript foi feitas alterações no package.json para transpilar o código quando o arquivo for salvo e fazer um hot reaload com o nodemon

basimente, utilizei as ferramentas do npm para ler o arquivo de log e funções simples do javascript para ler as linhas e seguimentar da maneira que achei
mais coerente.

Sobre a task 2, não entendi se o script era para ser um arquivo separado, talvez um .sh ou um script python, então decidi implementar em typescript mesmo.
Também não ficou muito claro para mim qual era o retorno específico para a task.

---------------------- USO DA API ----------------------------------------

Após rodar em modo desenvolvimento, é possível acessar o retorno das task via browser seguindo o seguinte padrão:

http://localhost:3030/task/<taskId> 

Onde task id é o número da task(1, 2, 3).