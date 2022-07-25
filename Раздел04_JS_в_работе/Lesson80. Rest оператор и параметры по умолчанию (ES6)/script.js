'use strict';
// Lesson 80 Rest оператор и параметры по умолчанию (ES6)

// Остаточные параметры (rest parameters ...). Этот оператор всегда записыв-ся последним!
// Синтаксис остаточных параметров функции позволяет представлять неограниченное множество аргументов в виде массива.
// Особенно актуально когда мы не знаем сколько аргум-в прийдет в фун-ю!
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}
console.log(sum(1, 2, 3, 4));   // 10

// примеры Udemy. 
const log = function(a, b, ...restName) {
  console.log(a, b, restName);
};
// т.е. первые 2 арг-та приходят пост-но, остальных может быть сколько угодно
log('basic', 'rest', 'operator', 'useage');   // basic rest [ 'operator', 'useage' ]


// иногда мы хотим что-бы в наших функ-х парам-ры кот-е мы перед-м по умолчанию имели какие-то значения
// тогда к аргум-ту просто дописываем его значение, например = 2
function calcOrDouble(number, basis = 2) {
  // ранее если мы забыли его добавить параметр по умолчанию(или он не пришел от сервера) мы обходили это таким приемом
  // где оператор || вер-т нам 1-ю правду и если basis не передал-ся то там underfined, а по логич. контексту 
  // underfined это false, а это значит что верн-ся нам true, т.е. 2. Но такой вариант иногда приводил в ошибке.
  // В ES6 это стало делать проще, парам-р по умолчанию можно записать сразу в при объяв-и фун-и и строчка ниже будет не нужна!
  // basis = basis || 2;
  console.log(number * basis);  // 6
}
calcOrDouble(3);

