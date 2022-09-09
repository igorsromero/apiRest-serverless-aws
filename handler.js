'use strict';

const pacientes = [
  {id: 1, nome: 'João', dataNascimento: '1990-01-01'},
  {id: 2, nome: 'Maria', dataNascimento: '1990-01-01'},
  {id: 3, nome: 'José', dataNascimento: '1990-01-01'},
]

module.exports.listarPacientes = async (event) => {
  console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pacientes
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
