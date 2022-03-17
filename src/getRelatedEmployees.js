const data = require('../data/zoo_data');

const { employees } = data;
// console.log(employees);

//

//  primeiro, verifica se existe um parametro, caso não exista envia um erro
/* caso exista parametro percorre os funcionarios, e pra cada funcionario, checa se possui um gerente com o nome especificado. */ //  <======
const isManager = (id) => {
  const Mng = employees.some((manage) => manage.managers.some((person) => person === id));
  if (!id) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  return Mng;
};
// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));

//

// junta nome e sobrenome dos funcionarios com gerente <=====
const employWithManag = (grup) => {
  const result = [];
  employees.forEach((nam) => {
    if (nam.managers.find((manNam) => manNam === grup)) {
      result.push(`${nam.firstName} ${nam.lastName}`);
    }
  });
  return result;
};
// console.log(employWithManag('9e7d4524-363c-416a-8759-8aa7e50c0992'));

//  recebe o parametro e chama as funcoes de analise <=====
const getRelatedEmployees = (managerId) => {
  try {
    if (isManager(managerId)) {
      return employWithManag(managerId);
    } throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  } catch (erro) {
    throw erro.message;
  }
};

// console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));

//
module.exports = { isManager, getRelatedEmployees };
