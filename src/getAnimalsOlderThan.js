const data = require('../data/zoo_data');

const { species } = data;

//  testa se a idade de cada animal é igual ou maior que a minima.
const ageTest = (minAge, residents) => residents.every((ages) => ages.age >= minAge);

//  testa se todos os argumentos sao validos
const getAnimalsOlderThan = (animal, age) => species.some((animalObj) => animalObj.name === animal
&& ageTest(age, animalObj.residents));

// console.log(getAnimalsOlderThan('lions', 7));

module.exports = getAnimalsOlderThan;
