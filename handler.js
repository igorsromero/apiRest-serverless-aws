'use strict';

const pacientes = [
  { id: 1, nome: 'João', dataNascimento: '1990-01-01' },
  { id: 2, nome: 'Maria', dataNascimento: '1990-01-01' },
  { id: 3, nome: 'José', dataNascimento: '1990-01-01' },
]

const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: "PACIENTES"
}

module.exports.listarPacientes = async (event) => {
  try {
    let data = await dynamoDB.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
  const { pacienteId } = event.pathParameters

  const paciente = pacientes.find(paciente => paciente.id == pacienteId)

  if (!paciente) {
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          message: 'Paciente não encontrado'
        },
        null,
        2
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      paciente,
      null,
      2
    ),
  };
};
