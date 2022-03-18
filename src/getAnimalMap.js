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
// console.log(location());
//  ----------------------------

//  recebe um animal e retorna seus residentes <====
const reside = (anim) => {
  const select = species.filter((anmFind) => anmFind.name === anim);
  return select[0].residents.map((animals) => animals.name);
};

//  constroi a estrutura pegida na questão.
const IncludeConstructor = (n) => {
  const nm = [n];
  const back = nm.reduce((acc, cv) => {
    acc[cv] = reside(cv);
    return acc;
  }, {});
  return back;
};

const includeTrue = (locate) => {
  const { NE, NW, SE, SW } = locate;
  const ne = NE.map((incube) => IncludeConstructor(incube));
  const nw = NW.map((incube) => IncludeConstructor(incube));
  const se = SE.map((incube) => IncludeConstructor(incube));
  const sw = SW.map((incube) => IncludeConstructor(incube));
  return { NE: ne, NW: nw, SE: se, SW: sw };
};

//  finção primaria <====
const getAnimalMap = (options) => {
  if (options === undefined || options.includeNames === undefined) { return location(); }
  return includeTrue(location()); //  teste ******
};
console.log(getAnimalMap({ includeNames: true }));

//

module.exports = getAnimalMap;
