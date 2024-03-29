'use strict';
// Сложная задача на понятие композиции функций

// В математике есть такое понятие, как композиция функций. В программирование этот прием тоже перекочевал и является 
// весьма удобным в части ситуаций. Приведу наглядный пример из этой статьи. (Пока её можно открыть только в начале, 
// так как там вы найдете начало решения 🙂)
// Допустим, у вас есть отдельные функции, которые в итоге вычисляют скидку:
const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);
console.log(multiply20(200));     // 4000
console.log(divide100(4000));     // 40
console.log(normalizePrice(40));  // 40.00
// В итоге мы получим результат, но эта цепочка не совсем удобна. А если действий там будет много? Можно запустить её вот так:
// // result = a(b(c(x)))
// const discount = normalizePrice(divide100(multiply20(200)));
// console.log(discount);    // 40.00
// Но при увеличении количества функций это превратиться в нечитаемый ад. И вот задача состоит в том, чтобы написать 
// функцию compose, которая будет принимать все эти функции и делать тоже самое. То есть, организовывать композицию функций. 
// Обратите внимание на порядок записи функций - последняя записанная запускается первой и дальше справа налево. 
// Функций может быть сколько угодно и они могут принимать только один начальный аргумент. Так что вариант:
// const compose = (a, b, c) => (x) => a(b(c(x)));
// Не подходит, так как работает только с 3мя функциями.
// P.S. Да, в работе такие функции уже готовы за нас, мы будем работать с подобными в части по React. 
// Но как оно устроено изнутри, да и вообще такое понятие полезно знать. 

const compose = (...fns) => (x) => fns.reduceRight((res, fn) => fn(res), x);
const discount = compose(normalizePrice, divide100, multiply20);
console.log(discount(200));     // 40.00
// Метод reduceRight принимает коллбэк функцию с previousValue
// Значение, возвращённое предыдущим выполнением функции callback, либо значение initialValue, если оно предоставлено.
// currentValue - Текущий обрабатываемый элемент массива.
// Что в наших реалиях называется res и fn.  Теперь перейдем к fns - Это массив с функциями.
// При первом запуске res будет равен х, так как второй аргумент у reduceRight есть. То есть, это начальное значение, 
// тот аргумент, который передавался в первую функцию. fn - это первая функция в массиве. Получается, что
// fn(res) - это запуск первой переданной (вызванной, той что справа) функции с начальным аргументом. А каждые последующие 
// запуски в res помещается полученный результат.

// Усложненное задание! Справились с первой частью? Хорошо, давайте усложним 🙂
// А теперь напишите функцию композиции composeWithArgs, которая принимает сколько угодно аргументов в начале. Пример:
// const add1 = function(a){return a + 1}
// const addAll3 = function(a,b,c){return a + b + c}
// composeWithArgs(add1,addAll3)(1,2,3)  => Вернет 7

const composeWithArgs = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)));
const add1 = function(a){return a + 1};
const addAll3 = function(a,b,c){return a + b + c};
console.log(composeWithArgs(add1,addAll3)(1,2,3));     // 7
// Если постараться объяснить простыми словами, то аргументы попадают в первую функцию, которая была "справа" вот тут:
// (...args) => g(f(...args)))
// reduceRight последовательно запускает функции, и вот как раз в первую из них автоматически будут переданы все аргументы, 
// которые передадутся в composeWithArgs. Возможно, самым наглядным вариантом будет посмотреть на работу в дебаггере) 
// Или обложить консоль.логами




// reduceRight()
// Метод применяет функцию к аккумулятору и каждому значению массива (справа-налево), сводя его к одному значению.
// rest parameters
// Синтаксис остаточных параметров функции позволяет представлять неограниченное множество аргументов в виде массива
// Если последний именованный аргумент функции имеет префикс ..., он автоматически становится массивом с элементами 
// от 0 до theArgs.length-1 в соответствии с актуальным количеством аргументов, переданных в функцию.