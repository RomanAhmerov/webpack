// --- Стандартные модули NodeJS --
// Модуль по работе с путями
const path = require("path");

// --- Сторонние модули NodeJS ---
// Модуль для работы html-webpack
const HTMLWebpackPlugin = require("html-webpack-plugin");

// Модуль для очистки dist - проекта
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// --- Конфигурация Webpack ---
// Экспортирование модулей NodeJS
module.exports = {
  // Минимальная конфигурация Webpack
  // --- Контекст (говорит о том где лежат все исходники приложения, указывает от какой папки отталкиваться) ---
  context: path.resolve(__dirname, "src"),

  // --- Входная точка ---
  //  entry: "./src/index.js", - одна из реализаций
  entry: {
    main: "./index.js",
    analytics: "./analytics.js",
  },

  // --- Выходная точка ---
  output: {
    // Имя выходного файла (bundle)
    filename: "[name].[contenthash].js", // Используется паттерн [name] - динамически указывает на ключ в entry, [contenthash] - динамический хэш зависящий от контента файла

    // Путь
    path: path.resolve(__dirname, "dist"),
  },

  // --- Расширенная конфигурация (опциональная)
  // Режим сборки по умолчанию "production"
  mode: "development",

  // --- Настройки по умолчанию ---
  resolve: {
    // Кастомная настройка расширений (расширение файлов, которые можно не прописывать "import ... from app (вместо app.js)")
    extensions: [".js", ".json"],

    // Кастомные пути для определенных папок
    alias: {
      "@": path.resolve(__dirname, "src"), // - src
      "@models": path.resolve(__dirname, "src/models"), // - models
    },
  },

  // --- Оптимизация ---
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // --- Плагины (подключение) ---
  plugins: [
    new HTMLWebpackPlugin({
      // Первоначальный HTML - файл (шаблон)
      template: "./index.html",
    }),

    new CleanWebpackPlugin(),
  ],

  // --- (Модули) Лоадеры (нужны для работы с различными файлами кроме JS и JSON) работа с <styles> ---
  module: {
    rules: [
      // Загрузка стилей
      {
        // Если есть определенное расширение (регулярное выражение)
        test: /\.css$/i,
        // То использовать эти лоудеры (порядок <-- справа - налево) "лоудеры нужно установить"
        use: ["style-loader", "css-loader"], // - в новой версии (текущей) они могут обрабатывать картинки (url(./...)) и шрифты
      },

      // Загрузка html - файлов (в данном случае он парсит наши html - файлы и тегах <img src="../" - парсит изображения в src)
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      // Загрузка файлов
      // {
      //    test:  test: /\.(png|jpg|svg|gif|tff|woff|eot)$/i, - старая версия (сейчас все картинки и шрифты могут импортировать ["style-loader", "css-loader"]),
      //   use: "file-loader",
      // },

      {
        test: /\.xml$/i,
        use: "xml-loader",
      },

      {
        test: /\.csv$/i,
        use: "csv-loader",
      },
    ],
  },

  // --- DevServer (пакет NPM: npm i -D webpack-dev-server) ---
  devServer: {
    port: 3001,
    watchFiles: ['./src/**/*'],
    liveReload: true,
  }
};
