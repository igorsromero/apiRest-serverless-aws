# apiRest-serverless-aws
 
### Criar um projeto serverless
```
serverless create --template aws-nodejs
```

### Rodar função localmente
```
sls invoke local -f hello
```

### Rodar função localmente e passando parâmetros pelo event
```
sls invoke local -f listarPacientes -d '{"teste": "teste"}'
```

### Realizando deploy
```
sls deploy
```