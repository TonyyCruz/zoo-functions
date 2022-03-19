const data = require('../data/zoo_data');

const { species, employees } = data;

//  ---------------------------------->

function getOldestFromFirstSpecies(id) {
  const firstAnimal = employees.find((e) => e.id === id).responsibleFor[0];
  const animals = species.find((a) => a.id === firstAnimal).residents;
  const result = animals.reduce((acc, cv) => {
    if (acc.age > cv.age) { return acc; }
    return cv;
  });
  return [result.name, result.sex, result.age];
}
// console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
module.exports = getOldestFromFirstSpecies;
