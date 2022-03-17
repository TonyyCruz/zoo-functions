const data = require('../data/zoo_data');

const { prices } = data;

//
//  recebe as idades minima e maxima para fazer a contagem da quantidade por idade. <====
const count = (ag, entrants) => entrants.reduce((acc, cv) => {
  if (cv.age >= ag.min && cv.age < ag.max) { return acc + 1; }
  return acc;
}, 0);

//  recebe a lista de pessoas e chama um comparador que verifica as idades.
const countEntrants = (entrants) => {
  const kid = count({ min: 0, max: 18 }, entrants);
  const major = count({ min: 15, max: 50 }, entrants);
  const old = count({ min: 50, max: 200 }, entrants);
  return { child: kid, adult: major, senior: old };
};

//  calcula o valor da entrada
const totalPrice = (obj) => (obj.child * prices.child)
+ (obj.adult * prices.adult)
+ (obj.senior * prices.senior);

//  recebe a lista de pessoas e chama um comparador que verifica as idades.
const calculateEntry = (entrants = {}) => {
  if (Object.keys(entrants).length === 0) { return 0; }
  const peaples = countEntrants(entrants);
  return totalPrice(peaples);
};

// console.log(calculateEntry([{ name: 'joão', age: 12 }, { name: 'joão', age: 12 }, { name: 'joão', age: 54 }, { name: 'joão', age: 22 }]));
//

module.exports = { calculateEntry, countEntrants };
