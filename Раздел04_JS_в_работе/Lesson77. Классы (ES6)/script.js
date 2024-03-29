'use strict';
// Lesson 77. Классы (ES6)
// Классы в JavaScript были введены в ECMAScript 2015 и представляют собой синтаксический сахар над существующим 
// в JavaScript механизмом прототипного наследования. Синтаксис классов не вводит новую объектно-ориентированную модель, 
// а предоставляет более простой и понятный способ создания объектов и организации наследования.
// В объектно-ориентированном программировании класс – это расширяемый шаблон кода для создания объектов, который 
// устанавливает в них начальные значения (свойства) и реализацию поведения (методы).
// На практике нам часто надо создавать много объектов одного вида, например пользователей, товары или что-то ещё.
// Базовый синтаксис выглядит так:
class MyClass {
  // методы класса
  constructor() {  }
  method1() {  }
  method2() {  }
  method3() {  }
}
new MyClass();
// Затем используйте вызов new MyClass() для создания нового объекта со всеми перечисленными методами.
// При этом автоматически вызывается метод constructor(), в нём мы можем инициализировать объект.

// 1-й Принцип ООП - это абстракция, т.е. когда мы отдел-м концепцию(шаблон) от его экземпляра(кот-е созданы на основе концепции)
// созд-м новый класс где ключ-м словом создания класса будет class и далее его назв-е с бол-й буквы!
// class Rectangle будет нашим шаблоном
class Rectangle {
  // чтобы сконстр-ть наш класс внутри у нас есть св-во constructor() кото-е и заним-ся этим
  // где в () запис-м аргум-мы кот-е будут к нам приходить, 2-ва этих пар-ра (height, width) 
  // у нас будут приходить из вне при созд-и экземпляра класса и испол-я этот класс мы сможем созд-ть много фигурок
  constructor(height, width) {
    // когда мы уже передали сюда аргум-ты мы должны записать их в св-ва этого нового объекта
    // this будет обращ-ся к экземпляру нового созд-го объэкта(к каждому новоме элементу-квадратику)
    // и в каждый новый объект мы запис-м какое-то новое св-во и берем его из арг-в
    this.heights = height;
    this.widths = width;
  }
  // теперь создадим метод, посч-м площадь нашего квадрата
  calcArea() {
    // наш метод должен возвр-ть площадь прямоуг-ка
    return this.heights * this.widths;
  }
}
// в перем-ю square мы помещ-м объект, который созд-ся при помощи класса, испол-м new и назв-е нашего класса
// и во внутрь помещ-м 2 нашим аргум-та. square и longRectangle - будут нашими экземплярами
const square = new Rectangle(10, 10);
const longRectangle = new Rectangle(10, 50);
// и так мы можем созд-ть сколько угодно сущностей, а выдавать резул-т нам будет один и тот же метод calcArea()
// наш метод calcArea() в нашем классе просто возвр-т что-то, а не выводит в консоль, и что-бы увидеть рез-т выведем его в консоль
console.log(square.calcArea());         // 100
console.log(longRectangle.calcArea());  // 500
// В реальных проектах мы будем испол-ть классы, а не фун-и конструкторы, т.к. классы просто удобнее!


// 2-й важный Принцип это наследование, т.е. способность нашего объекта или класса базироваться на другом объекте или классе
// Это главный механизм для повторного испол-я кода! И такое наследствен-е отношение классов четко будет опред-ть их иерархию
// Далее мы будем испол-ть след-е:
// 1. Ключевое слово extends - используется в объявлении класса или в выражениях класса для создания дочернего класса.
// 2. Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
// Выражения super.prop и super[expr] действительны в любом определении метода в классах и в литералах объекта.
// Этот метод вызывает суперконструктор родителя, т.е. вызывает тоже самое что и было у родителя, 
// в нашем случае это - this.heights = height; this.widths = width;

// у этого класса будет те же св-ва что и у Rectangle(та же ширина и высота) и чтобы не дублировать код у нас и есть наследование
// т.е. класс ColoredRectangleWidthText будет наслед-ся от Rectangle, т.е. будет испол-ть его св-ва и методы
// и что бы это заработало нам нужно испол-ть ключ-е слово extends(т.е. наследоваться от)
class ColoredRectangleWidthText extends Rectangle {
  constructor(height, width, text, bgColor) {
    // и чтобы на не перепис-ть св-ва(this.heights = height;) в constructor у родителя(class Rectangle) есть метод super()
    // эти строки автомат-ки перейдут за счет наследования(extends Rectangle)
    // super(); должна всегда быть на 1-м месте в конструкторе, т.е. на 1-й строчке!!!
    // в () мы можем указать св-ва которые нам будут нужны, в случае если нам будут нужны не все св-ва
    super(height, width);
    this.texts = text;
    this.bgColors = bgColor;
  }
  // метод родителя calcArea() тут тоже наслед-ся
  // создадим метод чтобы узнать что это все у нас работает
  showMyProps() {
    console.log(`Текст: ${this.texts}, цвет: ${this.bgColors}`);   // Текст: Hello Dima, цвет: red
  }
}
const div = new ColoredRectangleWidthText(25, 10, 'Hello Dima', 'red');
// теперь у нас есть объект div который содер-т эти св-ва
// протест-м сначала метод кот-й сущест-т в этом объекте(классе)
div.showMyProps();
// далее обратимся к div и испол-м метод кот-й сущ-т в его родителе(т.е. от кот-го он наслед-ся)
console.log(div.calcArea());   // 250
// И так мы соблюд-м принцип наслед-я в нашем JS и с такими констр-ми мы постоянно будем работать в наших работах далее!
// Особенно при создании WEB-приложений!

