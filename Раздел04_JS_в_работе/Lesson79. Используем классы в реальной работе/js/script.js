// сначала назначаем глобальный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
    // Lesson 64. Tabs
    // получ-м перем-е с которыми мы будем взаимод-ть
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
    // родитель кот-й будет содер-ть все наши табы(тема делегирование событий)
          tabsParent = document.querySelector('.tabheader__items');

    // делаем фун-ю(она может быть универсальной) где скрываем все ненуж-е нам табы!
    function hideTabContent() {
        // т.к. это псевдомассив нам его нужно перебрать, где item - это каждый отдел-й контент
        tabsContent.forEach(item => {
                // т.е. добав-м к item css стиль - display = 'none', кот-й скрывает контент
                // item.style.display = 'none';
            // чтобы добавить анимацию при перек-и табов нам нужны будут css классы при перек-и, а не inline стили испол-е выше
            // класс 'hide' прячет контент (display = 'none')
            // класс 'show' показ-т контент (display = 'block')
            // класс 'fade' у нас отвеч-т за анимацию
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // убер-м класс активности у всех табов которые нам не нужны будут
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // теперь делаем фун-ю которая будет показывать нам таб-контент(она может быть универсальной)!
    // где i - это элемент(номер) к кот-му мы обращ-ся и кот-й нужно будет показать.
    // в ES6 есть такой функционал где мы можем устан-ть значение по умолчанию уже в нашей фун-и! 
    // Т.е. если мы выз-м фун-ю без аргум-та, то у нас вместо i будет подст-ся 0. Т.е. i мы сразу присв-м 0 !
    function showtabContent(i = 0) {
            // испол-м inline стили при перекл-и, но также в перек-и часто испол-т и классы(далее рассмотрим)
            // tabsContent[i].style.display = 'block';
        // для того что бы у нас работали классы и соот. анимация заменим пример выше на:
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    // чтобы фун-и выше заработали не забываем их вызывать после!
    hideTabContent();
    // арг-м в() устан-м в фун-и по умолчанию, т.е. 0, в ES6 функ-и мы можем сразу присв-ть 0, (i = 0)
    showtabContent();

    // испол-я делегирование, созд-м событие на клик
    tabsParent.addEventListener('click', (event) => {
        // если мы часто будем испол-ть событие event.target мы можем опред-ть его в перем-ю
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            // методом перебора делаем расп-е куда кликнул польз-ль и подст-м соот. по номеру элемент для показа
            // где item - это каждый таб что бы будем передавать, а i - это номер элемента по порядку(согласно синтаксису метода)
            tabs.forEach((item, i) => {
                // если target(тот элемент в кот-й мы кликнули) будет совпадать с элементом что мы перебираем
                if(target == item) {
                    // вызыв-м 2 фун-и т.к. при перекл-и мы должны скрыть остальные и ост-ть только нужную
                    hideTabContent();
                    // где в i хранит-ся нужный нам номер по порядку
                    showtabContent(i);
                }
            });
        }
    });


    // Lesson 69. Timer + Lesson 70. Обработка прошедшей даты
    // в перем-ю поместим дату в виде строки, это будет наша отправ-я точка
    const deadline = '2022-08-08';

    // 1-я фун-я! опред-я разницу между deadline и нашим текущим временем, т.е разницу между датами
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // нам нужно превр-ть строку в нечно осязаемое, испол-м Date.parce
        // получ-и кол-во мс в нашем конеч-м времени до кот-го нам нужно дойти
        // мы в пере-ю t получим разницу между этими датами в кол-ве мс
        const t = Date.parse(endtime) - Date.parse(new Date());
        // добавим обработка прошедшей даты(Lesson 70), опред-м будет ли значение у нас отриц-м, 
        // и если оно отриц-е то мы просто вернем нули 000 вместо наших значений
        if (t <= 0) {
            // устан-м знач-е 0 каждой перем-й
            days = 0;
            hours = 0;
            minutes = 0; 
            seconds = 0;
        } else {
        // тут нам нужно посч-ть кол-во дней отобр-я в нашем таймере
        // нам нужно взять кол-во мс и / на кол-во мс в одном дне и округлить все это
        //  days = Math.floor() - это округ-е до ближ-го целого\
        // где 1000 * 60 - кол-во мс в 1мин, еще на * 60 - кол-во в 1 часе, * 24 - кол-во в 1 дне
        // т.е тут (1000 * 60 * 60 * 24) мы получ-м сколько в сутках будем мс
        // и когда мы общее кол-во мс t / на (1000 * 60 * 60 * 24) мы получ-м сколько суток у нас осталось до оконч-я
        // нашей даты ('2020-05-11')
        days = Math.floor( (t/(1000*60*60*24)) );
        // t / на кол-во мс в 1 часе и так мы получим общее кол-во часов остав-ся до таймера
        // далее мы общее кол-во часов что получ-сь (t / 1000 * 60 * 60) делим через % на 24
        // т.е. мы напр. 50 / 24 и получ-м 2 дня, а остаток от деления, т.е. 2 часа, вер-ся и мы его помести к нам на сайт
        // в графу кол-ва часов остав-ся до конца акции
        hours = Math.floor( (t/(1000*60*60) % 24) );
        // и по похожему принципу мы будем считать и далее т.к. нам нужны именно "хвостики" а не общее кол-во!
        minutes = Math.floor( (t/1000/60) % 60 );
        // тут нам нужно просто разделить кол-во сек внутри мс
        seconds = Math.floor( (t/1000) % 60 );
        }
        

        // и что-бы мы могли испол-ть перем-е выше снаружи мы должны их вернуть, при этом мы будем возв-ть объект
        // такой прием часто испол-ся!!!
        return {
            // св-во total будет у нас - общее кол-во мс, куда соот. мы поместим значение t
            // в будущем нам нужна будем перем-я t, т.к. нам нужно знать не закон-ся ли таймер
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            // в ссылке есть инфа как записать схожие по названию ключи и значения иначе
            // https://attacomsian.com/blog/javascript-object-property-shorthand
        };
    }

    // тут нам нужно подставить 0 в ячейки с днями и часами, чтобы было 09 дней и тд
    function getZero(num){
        // если пришед-е число от 0-10 тогда подст-м 0
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    // 2-я фун-я! когда у нас уже есть фун-я по расчету времен-х промежутков, напишем фун-ю устанав-ю наш таймер нам на стр-цу
    // для запуска этой фун-и нам понад-ся 2 аргум-та (selector, endtime)
    function setClock(selector, endtime) {
        // и что-бы настроить наш таймер нам нужен блок <div class="timer"> и deadline кот-й мы будем в него перед-ть
        // получ-м все нужные нам элем-ты со страницы
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
            // где фун-й будет высту-ть updateClock() и запус-я она будет через каждую сек
              timeInterval = setInterval(updateClock, 1000);

        // запус-м updateClock для инициализации(запустит текущ-ю дату) и отмены "моргания" таймера при обновлении страницы
        updateClock();

        // 3-я фун-я! обновляющая наш таймер каждую секунду, пишем ее внутри 2-й фун-и setClock
        // внутри себя она будет содер-ть 3 самых глав. действия
        function updateClock() {
            // 1. расчет времени что остался прямо на эту секунду и для этого испол. фун-ю getTimeRemaining
            // которрая возвр-т нужный нам объект с данными, где endtime это на дедлайн кот-й мы будем перед-ть в setClock
            const t = getTimeRemaining(endtime);
            // 2. теперь нам нужно поместить на стр-цу расчетные величины что мы получили
            // колич-во дней кот-е мы отобр-м на стр-це
            // и чтобы наш 0 при необ-ть подств-ся испол. фун-ю getZero
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // и когда эта фун-я запус-ся, она расч-т нужное нам время и на основ-и этих расчетов запишет на стр-цу 
            // необ. резул-ты, запуск фун-и будет в константе timeInterval
            // 3. И раз у нас уже есть интервал, то нам его нужно будет рано или поздно остановить
            // и для этого нам нужна будет перем-я t в 'total': t, т.к. в ней есть кол-во мс нужное нам
            // если наше ремя уже вышло, т.е. оно идет в отриц-ю сторону, то таймер мы уже не обновляем
            if (t.total <= 0) {
                // то мы просто будем остан-ть наш таймер
                clearInterval(timeInterval);
            }
        }
    }
    // устанав-м наши часы в фун-и setClock, где 1-й арг-т это наш селектор .timer, 
    // а 2-й наш дедлайн, в будущем данные в эту перем-ю могут прих-ть от сервера!
    setClock('.timer', deadline);
    

    // Modal Lesson 72. Создаем модальное окно
    // Пропишем функионал модал. окна и пропишем его сразу на несколько триггеров. 
    // Триггеры это те элементы что вызывают последующие действия. 

    // Пропишем data-атрибуты(data-modal) в html нужным конопкам, тоже самое сдел-м и с закрытием окна,
    // на нужный нам div повесим data-close
    const btnModalOpen = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          btnModalClose = document.querySelector('[data-close]');
          
    // нам нужно будет 2 фун-и, открыв-я модал. окно и закрывающая его
    function openModal() {
        // показыв-м и скрываем наше мод. окно, т.е. актив-м соот. css классы + есть вариант с toggle
        // modalWindow.classList.add('show', 'fade-modal');
        // modalWindow.classList.remove('hide');
        // альтерн-й вариант с toggle
        modalWindow.classList.toggle('show');
        // когда мы откр-м модал. окно у нас добав-ся стиль не позвол-й прокручивать стр-цу
        document.body.style.overflow = 'hidden';
        // если польз-ль уже открывал модал.окно - обнулим таймер в перем-й
        clearInterval(modalTimerId);
    }
    // переберем наши кнопки btnModalOpen чтобы мы могли с любой кнопки откр-ть модал.окно
    btnModalOpen.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        // скрываем и показыв-м наше мод. окно
        // modalWindow.classList.add('hide');
        // modalWindow.classList.remove('show');
        // альтерн-й вариант с toggle
        modalWindow.classList.toggle('show');
        // восстанав-м скролл на стр-це после закрытия, если мы просто остав-м '' то браузер сам решит что ставить по дефолту
        document.body.style.overflow = '';
    }
    // только после сраб-я клика у нас выпол-ся фун-я closeModal
    btnModalClose.addEventListener('click', closeModal);
    // реал.функ-л закрытия модал. окна по клику вне мод. окна
    // вешаем обраб-к клика на модал-е окно, где в () в callback фун-и помещ-м обьект события(e или event)
    modalWindow.addEventListener('click', (e) => {
        // e.target - куда кликнул польз-ль
        if(e.target === modalWindow) {
            closeModal();
        }
    });
    // реал-м функ-л закрытия модал. окна по нажатию на кнопку клав-ры ESC
    // Событие keydown срабатывает, когда клавиша была нажата.
    document.addEventListener('keydown', (e) => {
        // у нашего объекта событие (e) есть св-во .code, кот-е может отслеж-ть код нашей клавиши
        // code – физической код клавиши на клавиатуре; для клав-ши ESC это будет 'Escape'
        // есть спец.сайты где можно узнать как имен-ся необ. клавиша по нажатию на нее https://www.toptal.com/developers/keycode
        // и чтобы фун-я пост-я не запус-ст когда мы нажимаем ESC в условие добавим доп. проверку
        // Метод Node.contains() возвращает Boolean значение, указывающее, является ли узел потомком данного узла, 
        // т.е. проверяет, находится ли элемент ('show') в теле страницы.
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Lesson 73 продол-е. 1.Через опред-й промежуток времени в () нам нужно поместить фун-ю 
    // открытию модал. окна и указать время через окно появится с момента захода на наш сайт
    // const modalTimerId = setTimeout(openModal, 5000); 
    // чтобы при пролистывании до конца мод. окно постоянно не вылазило созд-м фун-ю 
    function showModalByScroll() {
        // 2.Когда пользов-ль долистал стр-цу до конца появляется модал-е окно
        // Свойство Element.scrollHeight (только чтение) - измерение высоты контента в элементе, 
        // включая содержимое, невидимое из-за прокрутки.
        // pageYOffset - свойство окна Window , доступное только для чтения. Это то же свойство, что и scrollY и, 
        // как таковое, оно тоже возвращает количество пикселей, на которое прокручен документ по вертикали (вниз или вверх).
        // window.pageYOffset - это прокруч-я часть
        // Document.documentElement - свойство только для чтения, которое возвращает элемент Element(тема парам-ры докум-а)
        // document.documentElement.clientHeight - это видимая часть которую мы прямо сейчас видим на сайте(без прокрутки)
        // document.documentElement.scrollHeight - значит что польз-ль долистал до конца стр-цы
        // -1 (px) указыв-м чтобы не было возможных багов в некот-х браузерах
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            // чтобы при пролистывании до конца окно постоянно не вылазило
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    // чтобы удал-ть обраб-к события нужно делать и ссылку на фун-ю кот-я испол-сь и это showModalByScroll
    window.addEventListener('scroll', showModalByScroll);


    // Lesson 79. Используем классы в реальной работе
    // Задача: шаблонизировать карточки с меню и созд-ть их перед-я только нужные аргум-ты
    // Для этой задачи будем испол-ть классы и создан-е динамич-х элементов на стр-це с перед-й аргум-в
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            // в this.parent помещаем DOM элемент(нащего родителя в верстке) кот-й в дальн-м мы сможем испол-ть
            this.parent = document.querySelector(parentSelector);
            // сюда запишем статич-й курс валют(в будущем можно поменять если курс будет прих-ть от сервера)
            this.transfer = 27;
            // вызовем метод ниже changeToUAN() что-бы он уже верн-л нам прав-е значение
            this.changeToUAN();
        }
        // добавим метод кот-й будет заниматься конвер-й валюты
        changeToUAN() {
            this.price *= this.transfer;
        }
        // здесь мы сфор-м нашу верстку(елементы куда помещ-ся отпер-я верстка), потом допол-ть
        // верстку данными кот-е прих-т от аргум-в и поместить элемент на стр-цу
        render() {
        // сформир-м сам div элемент куда мы поместим нашу верстку
        const element = document.createElement('div');
        // innerHTML позво-т нам динам-ки сформир-ть HTML стр-ру наших карточек
        element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                ${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            // помещ=м наш элемент во внутрь родителя
            this.parent.append(element);
        }
    }
    // новый сокр. систаксис! Созд-м объект и сразу на нем вызыв-м метод render(). Это удобно когда нам нужно испол-ть его лиш раз
    // далее в () MenuCard перед-м арг-ты во внуть нашего класса
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container'
    ).render();


});