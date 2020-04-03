const express = require('express');

const server = express();
server.use(express.json());

//parametros
//Query params => ?teste=1 ==> req.query;
//Route params => /users/1
//Request Body => {"inf": "inf"}

//req = representa todos os dados da requisicao
//res = tera todas as infs necessarias para retornar para o front-end
server.get('/teste', (req, res) => {
    const {nome} = req.query;
    return res.json({message: `Hello ${nome}`});
});


var users = ['Rodolfo', 'Diana', 'Oliver', 'Outro'];

//middleware Global
server.use((req, res, next) => {
    console.time('Request');
    console.log(`Metodo ${req.method}; Url: ${req.url}`);
    //Necessario para continuar executando
    next();
    console.timeEnd('Request');
});


//Middleware
function checkUserExists(req, res, next) {
    if (!req.body.name) {
       return res.status(400).json({error: 'Name not found in body request'});
    }
    
    return next();
    
}

//Middleware
function checkUserExistsInArray(req, res, next) {
    const {index} = req.params;

    const user = users[index];

    console.log(typeof users[index]);
    
    if (typeof users[index] == 'undefined') {
        console.log(typeof users[index], 'entrou aqui');
        return res.status(404).json({ error: 'usuario não encontrado'});
    }

    req.user = user;

    return next();
}

server.get('/users',(req, res) => {
    res.json(users);
});


server.get('/users/:index', checkUserExistsInArray, (req, res) => {
    //const {index} = req.params;
    //return res.json(users[index]);
    //req.user gerado no checkUserExistsInArray
    return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
    
    users = [...users, name ];
    return res.json(users);
});

server.put('/users/:index', checkUserExists, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    users[index] = name;

    return res.json(users[index]);
});

server.delete('/users/:index', checkUserExistsInArray, (req, res) => {
    const {index} = req.params;

    users.splice(index, 1);
    users = [...users];

    return res.send();
});

server.listen(3000);