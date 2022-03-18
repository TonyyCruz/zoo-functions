const data = require('../data/zoo_data');

const { species } = data;

//
//  Retorno padrão caso não tenha parametros, ou não tenha a chave 'includeNames'. < ====
//  imprime local e nome. Ex:'NE: [ 'lions', 'giraffes' ]'
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

// Recebe um nome e sexo, e faz um array com os animais do grupo e sexo especificado <====
const checkSex = (grup, sx) => {
  // const grup = Object.keys(animal)[0];
  const comp = species.find((n) => n.name === grup);
  const { residents } = comp;
  return residents.filter((anm) => anm.sex === sx).map((a) => a.name);
};
// console.log(checkSex({ lions: ['c', 'b', 'a'] }, 'male'));

//  ---------------------------->

//  recebe um animal e retorna seus residentes, auxiliar de 'includeTrue/ IncludeConstructor'<====
const reside = (anim) => {
  const select = species.filter((anmFind) => anmFind.name === anim);
  return select[0].residents.map((animals) => animals.name);
};

//  Auxiliar da função 'includeTrue'. <====
const IncludeConstructor = (n, call, sx) => {
  const nm = [n];
  const back = nm.reduce((acc, cv) => {
    acc[cv] = call(cv, sx);
    return acc;
  }, {});
  return back;
};

//  Em caso de receber 'includeNames = true', coloca no formato: { NE: [{animal: [população]}]} <====
// Recebe a saida padrão do 'sem parametro', como parâmetro. - Ex: NE: ['lions', 'giraffes'].
const includeTrue = (locate, call, sx) => { // o call define quem serão os residentes, deve chamar a função correta
  const { NE, NW, SE, SW } = locate;
  const ne = NE.map((incube) => IncludeConstructor(incube, call, sx));
  const nw = NW.map((incube) => IncludeConstructor(incube, call, sx));
  const se = SE.map((incube) => IncludeConstructor(incube, call, sx));
  const sw = SW.map((incube) => IncludeConstructor(incube, call, sx));
  return { NE: ne, NW: nw, SE: se, SW: sw };
};

//  ---------------------------->

const sexSelect = (obj, sexTyp) => includeTrue(obj, checkSex, sexTyp);
// console.log(sexSelect(location(), 'male').NE);

//  ---------------------------->

// função de controle <====
const functionsCall = (check) => {
  let act;
  if (!check.sex) { act = includeTrue(location(), reside); }
  if (!check.sex === false) { act = sexSelect(location(), check.sex); }
  if (check.sorted === true) { sorted(act); }
  return act;
};

//  finção primaria <====
const getAnimalMap = (options) => {
  if (options === undefined || options.includeNames === undefined) { return location(); }
  const calls = functionsCall(options);
  return calls;
};
// console.log(getAnimalMap({ includeNames: true, sex: 'female' }));

//

module.exports = getAnimalMap;
