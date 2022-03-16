const data = require('../data/zoo_data');

const { employees } = data;

//  procura o employee pelo nome ou sobrenome, caso em branco, devolve "{}"
const getEmployeeByName = (employeeName) => {
  if (!employeeName) { return {}; }
  return employees.find((nam) => nam.firstName === employeeName
|| nam.lastName === employeeName);
};
console.log(getEmployeeByName());

//

module.exports = getEmployeeByName;
