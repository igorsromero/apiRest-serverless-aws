'use strict';

const pacientes = [
  { id: 1, nome: 'João', dataNascimento: '1990-01-01' },
  { id: 2, nome: 'Maria', dataNascimento: '1990-01-01' },
  { id: 3, nome: 'José', dataNascimento: '1990-01-01' },
]

const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: "PACIENTES"
}

module.exports.listarPacientes = async (event) => {
  try {
    let data = await dynamoDB.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
  }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.name || 'Exception',
        message: error.message || 'Unknown error',
      }),
    }
  }
};

module.exports.obterPaciente = async (event) => {
  try {
    const { pacienteId } = event.pathParameters;

    const data = await dynamoDB
      .get({
        ...params,
        Key: {
          paciente_id: pacienteId,
        },
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Paciente não existe" }, null, 2),
      };
    }

    const paciente = data.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(paciente, null, 2),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

module.exports.cadastrarPaciente = async (event) => {
  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    const paciente = {
      paciente_id: uuidv4(),
      nome,
      data_nascimento,
      email,
      telefone,
      status: true,
      criado_em: timestamp,
      atualizado_em: timestamp,
    };

    await dynamoDB
      .put({
        TableName: "PACIENTES",
        Item: paciente,
      })
      .promise();

    return {
      statusCode: 201,
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

module.exports.atualizarPaciente = async (event) => {  
  const { pacienteId } = event.pathParameters

  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    await dynamoDB
      .update({
        ...params,
        Key: {
          paciente_id: pacienteId
        },
        UpdateExpression:
          'SET nome = :nome, data_nascimento = :dt, email = :email,' 
          + ' telefone = :telefone, atualizado_em = :atualizado_em',
        ConditionExpression: 'attribute_exists(paciente_id)',
        ExpressionAttributeValues: {
          ':nome': nome,
          ':dt': data_nascimento,
          ':email': email,
          ':telefone': telefone,
          ':atualizado_em': timestamp
        }
      })
      .promise()

    return {
      statusCode: 204,
    };
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Paciente não existe';
      message = `Recurso com o ID ${pacienteId} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
};

module.exports.excluirPaciente = async event => {
  const { pacienteId } = event.pathParameters

  try {
    await dynamoDB
      .delete({
        ...params,
        Key: {
          paciente_id: pacienteId
        },
        ConditionExpression: 'attribute_exists(paciente_id)'
      })
      .promise()
 
    return {
      statusCode: 204
    }
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Paciente não existe';
      message = `Recurso com o ID ${pacienteId} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
}
