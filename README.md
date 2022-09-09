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

### Deploy de apenas uma função
```
sls deploy -f obterPaciente
```

---

### Endpoints
```
- GET /pacientes
- GET /pacientes/ID
- POST /pacientes
- PUT /pacientes/ID
- DELETE /pacientes/ID
```

### Obter logs de requisições
```
sls logs -f obterPaciente --tail
```

--- 

## Executar serverless localmente
```
npm install serverless-offline --save-dev

add to serverless.yml:
plugins:
  - serverless-offline
```