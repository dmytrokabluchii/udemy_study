
// Lesson 68 Работа с датами. Дата и время

// Встречайте новый встроенный объект: Date. Он содержит дату и время, а также предоставляет методы управления ими.
// Его можно использовать для хранения времени создания/изменения, для измер-я времени или просто для вывода текущей даты.
// Для создания нового объекта Date нужно вызвать конструктор new Date() с одним из следующих аргументов: new Date();
// Создаёт экземпляр объекта Date, представляющего собой момент времени. 
// Объект Дата содержит число миллисекунд прошедших с 1 января 1970 г. UTC.

// Пример - Без аргументов – создать объект Date с текущими датой и временем:
let now = new Date();
console.log(now);  // показывает текущие дату и время: Thu Jul 07 2022 01:34:25 GMT+0300 (Восточная Европа, летнее время)

let now2 = new Date('2020-07-05');
console.log(now2);    // Tue Jul 05 2020 03:00:00 GMT+0300 (Восточная Европа, летнее время)

// если мы вводим 0 то год начи-ся с 1970, если нам нужно меньше то мы вводим минусовое знач-е
let now3 = new Date(0);
console.log(now3);  // Thu Jan 01 1970 03:00:00 GMT+0300 (Восточная Европа, стандартное время)

console.log(new Date(-999999999999));  // Mon Apr 25 1938 01:13:20 GMT+0300 (Восточная Европа, летнее время)


// У обьекта Date сущест-т масса методов, полный йсписок есть тут - https://learn.javascript.ru/date
// Рассмотрим методы получ-я get-теры

// Существуют методы получения года, месяца и т.д. из объекта Date:
// getFullYear(); - Получить год (4 цифры)
let now4 = new Date();
console.log(now4.getFullYear());     // 2022 
// getMonth() - Получить месяц, от 0 до 11.
// getDate() - Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
// getHours(), getMinutes(), getSeconds(), getMilliseconds() - Получить, соответственно, часы, минуты, секунды или миллисекунды.
// getDay() - получить определённый день недели. Вернуть день недели от 0 (воскресенье) до 6 (суббота). Несмотря на то, что в 
// ряде стран за первый день недели принят понедельник, в JavaScript начало недели приходится на воскресенье.
console.log(now4.getDay());   // 5  т.е. 5-1 день недели

// Все вышеперечисленные методы возвращают значения в соответствии с местным часовым поясом.
// Однако существуют и их UTC-варианты, возвращающие день, месяц, год для временной зоны UTC+0: 
// getUTCFullYear(), getUTCMonth(), getUTCDay(). 
// Для их использования требуется после "get" подставить "UTC".

// Помимо вышеприведённых методов, существуют два особых метода без UTC-варианта:
// getTime() - Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
console.log(now4.getTime());   // 1657232616694  это кол-во мс кот-е уже прошло
// если мы поместим это число в new Date() то получим обратоно дату
let now5 = new Date(1657232616694);
console.log(now5);  // Fri Jul 08 2022 01:23:36 GMT+0300 (Восточная Европа, летнее время)

// getTimezoneOffset() - Возвращает разницу в минутах между UTC и местным часовым поясом:
console.log(now4.getTimezoneOffset());    // -180

// А теперь рассмотрим методы устано-ки даты set-теры, испол-я те же методы что и в get только с прист-й set
// Следующие методы позволяют установить компоненты даты и времени:
// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
let nowSet = new Date();
console.log(nowSet.setHours(18)); 
console.log(nowSet);  // Fri Jul 08 2022 18:34:27 GMT+0300 (Восточная Европа, летнее время)
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
// У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().


// Автоисправление – это очень полезная особенность объектов Date. Можно устанавливать компоненты даты вне 
// обычного диапазона значений, а объект сам себя исправит.
let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date); // ...1st Feb 2013!


// Метод Date.parse(str) считывает дату из строки.
// Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:
// YYYY-MM-DD – это дата: год-месяц-день.
// Символ "T" используется в качестве разделителя.
// HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
// Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
// Вызов Date.parse(str) обрабатывает строку в заданном формате и возвращает таймстамп (количество миллисекунд 
// с 1 января 1970 года UTC+0). Если формат неправильный, возвращается NaN.
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms); // 1327611110417 (таймстамп)
let date2 = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
console.log(date2);  // Thu Jan 26 2012 22:51:50 GMT+0200 (Восточная Европа, стандартное время)


//  протестировать производительность функции, которая зависит от процессора.
// Например, сравним две функции, вычисляющие разницу между двумя датами: какая сработает быстрее?
// Подобные вычисления, замеряющие производительность, также называют «бенчмарками» (benchmark).
let start = new Date();
for (let i = 0; i < 100000; i++) {
    // - ** это оператор возвед-я в степень(ES7)
    let some = i ** 3;
}
let end = new Date();
alert(`Цикл отработал за ${end - start} мс`);   // Цикл отработал за 9 мс
