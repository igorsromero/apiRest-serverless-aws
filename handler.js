'use strict';

const pacientes = [
  { id: 1, nome: 'João', dataNascimento: '1990-01-01' },
  { id: 2, nome: 'Maria', dataNascimento: '1990-01-01' },
  { id: 3, nome: 'José', dataNascimento: '1990-01-01' },
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
