const data = require('../data/zoo_data');

//  abilita species para uso!
const { species } = data;

//  compara se o id passado é igual ao id dos objetos do array <===
const comparing = (animalIdComp, id) => id.some((idComp) => animalIdComp.id === idComp);

//  recebe um id e retorna os animais correspondentes <===
const getSpeciesByIds = (...ids) => species.filter((animalId) => comparing(animalId, ids));

// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', '533bebf3-6bbe-41d8-9cdf-46f7d13b62ae'));
// console.log(species);

module.exports = getSpeciesByIds;
