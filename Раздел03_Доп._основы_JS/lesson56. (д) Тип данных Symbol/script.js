'use strict';

// Lesson 56. (д) Тип данных Symbol
// Символ (анг. Symbol) — это уникальный и неизменяемый тип данных, который может быть использован как 
// идентификатор для свойств объектов. Синтаксис:
Symbol(['описание']);
// где ['описание'] - Необязательный, строка. 
// Чтобы создать новый символьный примитив, достаточно написать Symbol(), указав по желанию строку в кач-е опис-я этого символа
const sym1 = Symbol();
const sym2 = Symbol("foo");

// пример с урока
const obj = {
    name: 'Test',
};
let id = Symbol('idName');
// далее мы к этому обьекту назначим новое св-во
obj[id] = 1;
// где в [] мы помещ-м именно перем-ю а не строчку
console.log(obj[id]); // 1
console.log(obj);     // {name: 'Test', Symbol(idName): 1}

const obj2 = {};
// символы можно создавать и без описания
let id2 = Symbol();
obj2[id2] = 111;
console.log(obj2[id2]);   // 111
console.log(obj2);        // {Symbol(): 111}
