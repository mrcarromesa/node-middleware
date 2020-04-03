<h1>Middlewares</h1>

- Middlewares Global:

Não importa a rota que acessarmos o middleware sempre será executado.

- Ex.:

```js
//middleware Global
server.use((req, res, next) => {
    console.time('Request');
    console.log(`Metodo ${req.method}; Url: ${req.url}`);
    //Necessario para continuar executando
    next();
    console.timeEnd('Request');
});
```

- O middleware é um interceptador, ele irá travar a requisição no middleware, para prosseguir com o fluxo, utilizar o parametro `next` e executar dentro do middleware, `next()`

- Middlewares Local:

Utilizada por uma ou mais rotas especificas

Ex.:

```js
//Middleware
function checkUserExists(req, res, next) {
    if (!req.body.name) {
       return res.status(400).json({error: 'Name not found in body request'});
    }
    
    return next();
    
}

//utilizando o middleware:
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
    
    users = [...users, name ];
    return res.json(users);
});
```

- Para utilizar apenas adicionar o middleware após o nome da rota.