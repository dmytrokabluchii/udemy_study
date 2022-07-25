'use strict';
// Lesson 86. Promise (ES6)

// Объект Promise используется для отложенных и асинхронных вычислений.
// Помните, что промисы лежат в основе async/await и их понимание, можно сказать, что обязательно для работы с асинхронным JS
// Синтаксис создания Promise:
// let promise = new Promise(function(resolve, reject) {
//    функция-исполнитель (executor)
//    код фун-и
// });

// у промиса есть 3 состояния. Это:
// 1. Промис в состоянии ожидания (pending). Когда вы не знаете, получите ли вы мобильный телефон к следующей неделе или нет.
// 2. Промис решен (resolved). Вам реально купят новый телефон.
// 3. Промис отклонен (rejected). Вы не получили новый мобильный телефон, так как всё-таки, мама была не в настроении.


// Эдеми примеры. 
// Обычный пример синхронного кода, который выполнится сразу
console.log('Запрос данных...');

// Строим дерево callback-ов, которое имеет определ-й порядор действия и асинхронность
setTimeout(() => {
    console.log('Подготовка данных');
    // Имулируем как будто мы получили эти данные от сервера
    const product = {
        name: 'TV',
        price: 2000
    };
    // И когда мы уже получили данные свыше мы хотим с ними что-то сделать и сделать это асинхронно(т.е. не сразу)
    setTimeout( () => {
        product.status = 'order';
        console.log(product);
    }, 2000);
}, 2000);


// И что-бы мы не попадали в callback-help нам и понадобятся промисы
// Когда мы испол-м промисы то эти 2 аргум-та (resolve, reject) обознач-т фун-и, которые мы в будущем можем передавать
// Фун-я resolve - означает что код выпол-ся правильно, т.е. "обещание" выпол-сь как мы ожидали(т.е правильно)
// Фун-я reject - означает что код выпол-ся неверно, возможно с "ошибкой", т.е. что-то пошло не так
// Создадим промис(обещание) new Promise() и поместим его в перем-ю reg
// Когды мы его созд-м мы понимаем что оно может завер-ся как полож-но так и отриц-но, например мы посыл-м запрос на сервер
// и ждем, при этом не знаем как он ответит
const req = new Promise( (resolve, reject) => {
    // Ниже идет имитация асинхр-го кода, как будто данные от сервера пришли к нам, через 2 сек
    setTimeout(() => {
        console.log('Подготовка данных');
        // Имулируем как будто мы получили эти данные от сервера
        const product = {
            name: 'TV',
            price: 2000
        };
        // Если все прошло успешно то мы вызываем фун-ю resolve
        resolve();
        // Если что-то пошло не по плану, то reject
    }, 2000);
});
// Промисы имеют след-е строенные методы, это then(), catch() и finally()
// then() - это метод кот-й выпол-ся на промисе в случае полож. исхода, т.е. внутри себя он прнимает фун-я resolve()
// Она еще нигде не объявлена, а будет перед-ся просто как объект и этот аргум-т мы как раз и помещаем в () в фун-ю then()
req.then( () => {
    console.log('Данные получены');
});


setTimeout( () => {
    product.status = 'order';
    console.log(product);
}, 2000);







// Это аналогия из реальной жизни для ситуаций, с которыми мы часто сталкиваемся в программировании:
// Есть «создающий» код, который делает что-то, что занимает время. Например, загружает данные по сети. У нас это – «певец».
// Есть «потребляющий» код, который хочет получить результат «создающего» кода, когда он будет готов. Он может быть необходим 
// более чем одной функции. Это – «фанаты».
//      Promise (по англ. promise, будем называть такой объект «промис») – это специальный объект в JavaScript, который связывает 
// «создающий» и «потребляющий» коды вместе. В терминах нашей аналогии – это «список для подписки». «Создающий» код может 
// выполняться сколько потребуется, чтобы получить результат, а промис делает результат доступным для кода, который подписан 
// на него, когда результат готов.
//      Аналогия не совсем точна, потому что объект Promise в JavaScript гораздо сложнее простого списка подписок: он обладает 
// дополнительными возможностями и ограничениями. Но для начала и такая аналогия хороша.
//      Синтаксис создания Promise:
// let promise = new Promise(function(resolve, reject) {
//    функция-исполнитель (executor)
//    "певец"
// });
//      Функция, переданная в конструкцию new Promise, называется исполнитель (executor). Когда Promise создаётся, она запус-ся 
// автоматически. Она должна содержать «создающий» код, который когда-нибудь создаст результат. В терминах нашей аналогии: 
// исполнитель – это «певец».
//      Её аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. Наш код – только внутри исполнителя.
// Когда он получает результат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:
// resolve(value) — если работа завершилась успешно, с результатом value.
// reject(error) — если произошла ошибка, error – объект ошибки.
// Итак, исполнитель запускается автоматически, он должен выполнить работу, а затем вызвать resolve или reject.

// Потребители: then, catch, finally
// Объект Promise служит связующим звеном между исполнителем («создающим» кодом или «певцом») и функциями-потребителями 
// («фанатами»), которые получат либо результат, либо ошибку. Функции-потребители могут быть зарегистрированы (подписаны) 
// с помощью методов .then, .catch и .finally.

// then
// Наиболее важный и фундаментальный метод – .then. Синтаксис:
// promise.then(
//   function(result) { /* обработает успешное выполнение */ },
//   function(error) { /* обработает ошибку */ }
// );
// Если мы заинтересованы только в результате успешного выполнения задачи, то в then можно передать только одну функцию
// let promise = new Promise(resolve => {
//     setTimeout(() => resolve("done!"), 1000);
//   });
// promise.then(alert);     // выведет "done!" спустя одну секунду
// Подробнее на: https://learn.javascript.ru/promise-basics
