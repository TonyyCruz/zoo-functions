const data = require('../data/zoo_data');

const { hours, species } = data;

// ------------------------->

//  constroi as rotinas diarias de cada dia da semana. <====
const activity = (wd) => {
  const officeHour = `Open from ${hours[wd].open}am until ${hours[wd].close}pm`;
  const select = species.filter((a) => a.availability.some((b) => b === wd));
  const exhibition = select.reduce((acc, cv) => {
    acc.push(cv.name);
    return acc;
  }, []);
  return { officeHour, exhibition };
};

//
//  constroi a rotina diaria padrão, sem parametro. <====
const weekSchedule = () => {
  const week = {
    Tuesday: activity('Tuesday'),
    Wednesday: activity('Wednesday'),
    Thursday: activity('Thursday'),
    Friday: activity('Friday'),
    Saturday: activity('Saturday'),
    Sunday: activity('Sunday'),
    Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' },
  };
  return week;
};
// console.log(weekSchedule());

//
// caso o parâmetro não seja um dia da semana, sera verificado se é um animal aqui <====
const animalChk = (chk) => {
  if (species.some((a) => a.name === chk)) {
    const select = species.filter((a) => a.name === chk);
    return select[0].availability;
  }
  return weekSchedule();
};
//
//  verifica se um dia da semana foi adicionado como parâmetro, se sim, envia o conteudo do dia. <====
const check = (chk) => {
  const weekDs = Object.keys(weekSchedule());
  if (chk === 'Monday') { return { Monday: weekSchedule().Monday }; }
  if (weekDs.some((w) => w === chk)) { return { [chk]: weekSchedule()[chk] }; }
  return animalChk(chk);
};

//

function getSchedule(scheduleTarget) { // Main function <=
  if (!scheduleTarget) { weekSchedule(); }
  return check(scheduleTarget);
}
console.log(getSchedule('Tuesday'));
module.exports = getSchedule;
