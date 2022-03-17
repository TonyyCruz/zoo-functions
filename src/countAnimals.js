const data = require('../data/zoo_data');

const { species } = data;

//  caso nao aja parametro, retorna os nomes dos animais e aa quantidades <====
const noArgument = species.reduce((acc, cv) => {
  acc[cv.name] = cv.residents.length;
  return acc;
}, {});
// console.log(noArgument);
//  -------------------------------

//  encontra o animal buscado e devolve sua quantidade
const animalForNam = (anm) => species.find((anis) => anis.name === anm).residents.length;
// console.log(animalForNam('giraffes'));
//  -------------------------------

//  procura animais femias <====
const anmFemale = (female) => species.find((fem) => fem.name === female)
  .residents.reduce((acc, cv) => {
    if (cv.sex === 'female') {
      return acc + 1;
    } return acc;
  }, 0);
// console.log(anmFemale('bears'));
//  -------------------------------

//  recebe os parametros e distribui as funçoes <====
const countAnimals = (animal) => {
  if (!animal) { return noArgument; }
  if (Object.keys(animal).length === 1) {
    return animalForNam(animal.specie);
  } if (Object.keys(animal).length === 2) {
    return anmFemale(animal.specie);
  }
};
// console.log(countAnimals({ specie: 'bears' }));

module.exports = countAnimals;
