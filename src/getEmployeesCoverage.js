const data = require('../data/zoo_data');

const { species, employees } = data;

// ----------------------------------->

//  recebe o id de um animal e retorna sua localização. <====
const locateFind = (animalId) => {
  const locates = species.filter((a) => animalId.some((aid) => aid === a.id));
  return locates.map((b) => b.location);
};

//

// Recebe um array de IDs de animais e retorna um array com seus nomes. <====
const animalName = (animalId) => {
  const filter = species.filter((a) => animalId.some((b) => b === a.id));
  return filter.map((c) => c.name);
};

//

//  recebe o nome, sobrenome ou id do funcionario, o encontra e retorna seu Obj. <====
const findEmployee = (find) => employees.find((e) => e.firstName === find
  || e.lastName === find || e.id === find);

//
//  recebe o objeto de pesquisa do funcionario e devolve seus dados. <====
const manageEmployee = (finnInf) => {
  const employee = findEmployee(finnInf);
  if (employee === undefined) { throw new Error('Informações inválidas'); }
  const emploObj = {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: animalName(employee.responsibleFor),
    locations: locateFind(employee.responsibleFor),
  };
  return emploObj;
};

//
const allEmployees = () => {
  const allEmp = employees.map((a) => a.id);
  const empGrup = allEmp.reduce((acc, cv) => {
    acc.push(manageEmployee(cv));
    return acc;
  }, []);
  return empGrup;
};

//

function getEmployeesCoverage(info) { // <= main function.
  try {
    if (!info) { return allEmployees(); }
    return manageEmployee(Object.values(info)[0]);
  } catch (erro) { throw erro.message; }
}
console.log(getEmployeesCoverage({ name: 'Spry' }));

module.exports = getEmployeesCoverage;
