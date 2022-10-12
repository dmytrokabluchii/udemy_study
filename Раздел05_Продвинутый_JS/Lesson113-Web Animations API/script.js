'use strict';
// Lesson 113-Web Animations API

const btnPhone = document.querySelector('#iphone'),
      btnMacbook = document.querySelector('#macbook'),
      images = document.querySelectorAll('img');

const phoneAnimation = images[2].animate([
    // Где 1-м элементом мы передаем массив элементов с ключевыми кадрами, это начал-я, промеж-я и конечная точки анимации
    // т.е. как анимация будет развиваться от начала до конца. Внутри у нас будет массив объектов(с как бы css св-ми внутри)
    // И в отличии от css-анимаций этими анимациями можно еще и управ-ть
    {transform: 'translateY(0)'},
    {transform: 'translateY(100px)'},
    {transform: 'translateY(-100px)'},
    {transform: 'translateY(0)'}
    // Далее зададим опции для нашей анимации
], {
    duration: 3000,
    iterations: Infinity
});

let phoneAnimation2;
// При клике на кнопку запустим анимацию или остановим
btnPhone.addEventListener('click', () => {
    // Если такой анимации не существует, создадим ее
    if (!phoneAnimation2) {
        phoneAnimation2 = images[0].animate([
            {transform: 'translateY(0) rotate(0deg)', filter: 'opacity(100%)'},
            {transform: 'translateY(100px) rotate(180deg)', filter: 'opacity(50%)'},
            {transform: 'translateY(-100px) rotate(270deg)', filter: 'opacity(75%)'},
            {transform: 'translateY(0) rotate(360deg)', filter: 'opacity(100%)'}
        ], {
            duration: 3000,
            iterations: Infinity
        });
        // Если анимация создана, но стоит на паузе, то мы ее запустим, если она уже запущена то поставим ее на паузу
        // значение 'paused' есть в св-ве .playState метода animate()
        // Animation.playState - Возвращает перечисляемое значение, описывающее состояние воспроизведения анимации.
    } else if (phoneAnimation2.playState === 'paused') {
        // Animation.play() - Запускает или продолжает выполнение анимации или начинает анимацию снова, если она ранее завершилась
        phoneAnimation2.play();
        // Если же он не стоит на паузе то
    } else {
        // Animation.pause() - Приостанавливает запущенную анимацию.
        phoneAnimation2.pause();
    }
});

let macbookAnimation;
btnMacbook.addEventListener('click', () => {
    if (!macbookAnimation) {
        macbookAnimation = images[1].animate([
            {transform: 'translateY(0) rotate(0deg)', filter: 'opacity(100%)'},
            {transform: 'translateY(100px) rotate(180deg)', filter: 'opacity(50%)'},
            {transform: 'translateY(-100px) rotate(270deg)', filter: 'opacity(75%)'},
            {transform: 'translateY(0) rotate(360deg)', filter: 'opacity(100%)'}
        ], {
            duration: 4000,
            iterations: Infinity
        });
    } else if (macbookAnimation.playState === 'paused') {
        macbookAnimation.play();
    } else {
        macbookAnimation.pause();
    }
});






// Web Animations API
// В Web Animations API открывает анимацию на движке браузеров для разработчиков и манипуляции через (с помощью) JavaScript.
// Этот API был разработан в основе реализации CSS Animations и CSS Transitions, и оставлял свободу движений для будущих 
// анимационных эффектов. Это один из самых эффективных способов анимации, поддерживаемой в Интернете, позволяя браузеру 
// сделать свою собственную внутреннюю оптимизацию без хаков, принуждения, или Window.requestAnimationFrame().
// С Web Animations API, мы можем управлять интерактивной анимацией со стилями JavaScript, отделяя представление от действия. 
// Нам больше не нужно полагаться на DOM-heavy методики написания CSS-свойств и обзорных классов для элементов 
// контроля воспроизведения направления. И в отличии от чисто декларативного CSS, JavaScript также позволяет устанавливать 
// динамические значения свойств и их продолжительность. Для создания пользовательских библиотек и интерактивной 
// анимации Web Animations API может стать прекрасным инструментом в работе.


// Element.animate()
// Подр-е на https://developer.mozilla.org/ru/docs/Web/API/Element/animate
// Метод animate() интерфейса Element это быстрый способ создания Animation, которая сразу применяется к элементу, 
// а затем проигрывает эту анимацию. Метод возвращает созданный экземпляр класса Animation.
// Синтаксис:
// var animation = element.animate(keyframes, options); 
// Параметры:
// 1. keyframes
// Массив объектов ключевых кадров, либо объект ключевого кадра, свойства которого являются массивами значений для итерации. 
// 2. options
// Целое число, представляющее продолжительность анимации (в миллисекундах), или объект, содержащий одно или более временных свойств.
// 3. id - Необязательный
// Свойство уникальное для animate(): DOMString, с помощью которого можно ссылаться на анимацию.

// - delay (en-US) Необязательный
// Число миллисекунд для задержки начала анимации. По умолчанию 0.
// - direction (en-US) Необязательный
// Указывает направление анимации. Она может выполняться вперёд (normal), назад (reverse), переключать направление после 
// каждой итерации (alternate), или работать назад и переключать после каждой итерации (alternate-reverse). По умолчанию "normal".
// - duration (en-US) Необязательный
// Число миллисекунд, в течении которых выполняется каждая итерация анимации. По умолчанию 0. Хотя это свойство технически 
// необязательное, имейте ввиду, что ваша анимация не будет запущена, если это значение равно 0.
// - easing (en-US) Необязательный
// Скорость изменения анимации с течением времени. Принимает заранее определённые значения "linear", "ease", "ease-in", 
// "ease-out", и "ease-in-out", или кастомное "cubic-bezier" со значением типа "cubic-bezier(0.42, 0, 0.58, 1)". По умолчанию "linear".
// - endDelay (en-US) Необязательный
// Число миллисекунд задержки после окончания анимации. Это в первую очередь полезно, когда последовательность действий анимации 
// базируется на окончании другой анимации. По умолчанию 0.
// - fill (en-US) Необязательный
// Диктует должны ли эффекты анимации отражаться элементом(ами) перед воспроизведением ("backwards"), сохраняться после того, 
// как анимация завершилась ("forwards"), или и то и другое ("both"). По умолчанию "none".
// - iterationStart (en-US) Необязательный
// Описывает, в какой момент итерации должна начаться анимация. Например, значение 0.5 указывает на начало запуска анимации в 
// середине первой итерации, с таким набором значений анимация с 2-мя итерациями будет закончена на полпути к третей итерации. 
// По умолчанию 0.0.
// - iterations (en-US) Необязательный
// Число раз, которое анимация должна повторяться. По умолчанию 1, может принимать значение до Infinity, чтобы повторять анимацию 
// до тех пор, пока элемент существует.


// Animation.playState
// Возвращает перечисляемое значение, описывающее состояние воспроизведения анимации.
// Animation.play() (en-US)
// Запускает или продолжает выполнение анимации или начинает анимацию снова, если она ранее завершилась.
// Animation.pause() (en-US)
// Приостанавливает запущенную анимацию.