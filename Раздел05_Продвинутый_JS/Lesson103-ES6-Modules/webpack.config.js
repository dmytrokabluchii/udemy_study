'use strict';
let path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,
  devtool: "source-map",
  module: {}
};



// 1.   mode: 'development'
// - development: это режим разработки, здесь плагинов меньше и он работает быстрее;  
// - production: режим для создания продукта, устав-м его тогда когда закончим уже продукт, работает чуть медленеее, 
// но содержит в себе инструм-ты по оптимизации кода, это режим для конечной сборки продукта. 
// Перечис-е на сайте плагины уже вкл-ны в webpack и перечис-ть их не нужно;
// подроб-е: https://webpack.js.org/configuration/mode/

// 2. entry: './js/script.js'
// entry - данное св-во содержит тот файл с которого мы будем начинать;
// Если бы мы испол-ли вариант без конфига, то это был бы файл index.js из src. Обычно в нем пропис-ся все зависим-ти
// require или import из нового стандарта. В будущем если мы будем испол-ть несколько файлов то нужно будет создать объект

// 3. output: { filename: 'bundle.js', path: __dirname + '/dist/js' }
// output: - файл выхода задается в виде объекта, здесь конфигур-м тот файл что получится в итоге, где: 
// filename: имя файла; 
// path: куда складываем, а __dirname - позволяет получить корень нашей папки и далее идет путь куда

// 4. watch: true
// Eсли стоит в позиции true то webpack(после того как был вызван) будет отслеживать изменения файлов
// и в автом-м режиме будет пересобирать проект когда мы сохран-м измен-е файлы, данный параметр можно донастраивать(в конфиг-и)

// 5. devtool: "source-map",
// "development tools" или сокращённо "DevTools" - это программы, которые позволяют создавать, тестировать и 
// отлаживать (debug) программное обеспечение. "source-map"- технология кот-я хранит инфо об исход-х и месторас-и кода
// Обычно данный параметр устан-ся именно в варианте: devtool: "source-map"

// 6. module: {} - Модули и их настр-ка, тут можно устан-ть Babel, TypeScript, SASS etc как модуль webpack

// npm install webpack webpack-cli --save-dev - команда по установке webpack!
// npx webpack - для запуска webpack-конфигаратора
// npx json-server db.json - Команда запуска JSON-Server