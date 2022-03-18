const data = require('../data/zoo_data');

const { species } = data;

//
//  sem parametros ou sem a chave includeNames. < ====
const locationSub = (tip) => species.filter((neLocate) => neLocate.location === tip)
  .map((nam) => nam.name);

const location = () => {
  const NE = locationSub('NE');
  const NW = locationSub('NW');
  const SE = locationSub('SE');
  const SW = locationSub('SW');
  return { NE, NW, SE, SW };
};

//  ---------------------------->

// funsão para ordenar nomes <====
const sorted = (use) => {
  const { NE, NW, SE, SW } = use;
  NE.forEach((sot) => Object.values(sot)[0].sort());
  NW.forEach((sot) => Object.values(sot)[0].sort());
  SE.forEach((sot) => Object.values(sot)[0].sort());
  SW.forEach((sot) => Object.values(sot)[0].sort());
  return { NE, NW, SE, SW };
};
// console.log(sorted({ NE: [{ lions: ['c', 'b', 'a'] }, { giraffes: ['g', 'd', 'i'] }] }));

//  ---------------------------->

//  recebe um animal e retorna seus residentes <====
const reside = (anim) => {
  const select = species.filter((anmFind) => anmFind.name === anim);
  return select[0].residents.map((animals) => animals.name);
};

//  constroi a estrutura pegida na questão. <====
const IncludeConstructor = (n) => {
  const nm = [n];
  const back = nm.reduce((acc, cv) => {
    acc[cv] = reside(cv);
    return acc;
  }, {});
  return back;
};

//  coloca no formato: { NE: [{animal: [população]}]} <====
const includeTrue = (locate) => {
  const { NE, NW, SE, SW } = locate;
  const ne = NE.map((incube) => IncludeConstructor(incube));
  const nw = NW.map((incube) => IncludeConstructor(incube));
  const se = SE.map((incube) => IncludeConstructor(incube));
  const sw = SW.map((incube) => IncludeConstructor(incube));
  return { NE: ne, NW: nw, SE: se, SW: sw };
};

// função de controle <====
const functionsCall = (check) => {
  const act = includeTrue(location());
  if (check.sorted === true) { sorted(act); }
  return act;
};

//  finção primaria <====
const getAnimalMap = (options) => {
  if (options === undefined || options.includeNames === undefined) { return location(); }
  const calls = functionsCall(options);
  return calls;
};
console.log(getAnimalMap({ includeNames: true }));

//

module.exports = getAnimalMap;
