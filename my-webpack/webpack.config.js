// --- Стандартные модули NodeJS --
// Модуль по работе с путями
const path = require("path");

// --- Сторонние модули NodeJS (Plugins) ---
// Модуль для работы html-webpack
const HTMLWebpackPlugin = require("html-webpack-plugin");

// Модуль для очистки dist - проекта
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Модуль для копирования статических файлов
const CopyWebpackPlugin = require("copy-webpack-plugin");

// - Модуль для работы с CSS
// Модуль для создания отдельного файла CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Модуль для минимизации файла CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// Переменные для работы
// Системная переменная (вставляем при использовании npm run ... | cross-env NODE_ENV=development/production)
const isDev = process.env.NODE_ENV === "development"; // - статус сборки (режим разработки)
const isProd = process.env.NODE_ENV === "production"; // - статус сборки (режим продакшн)

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
    // webpack отделяет повторяющиеся пакеты и вытаскивает их новые chunk-и (vendors)
    splitChunks: {
      chunks: "all",
    },

    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`, 
      new CssMinimizerPlugin(),
    ],
  },

  // --- Плагины (подключение) ---
  plugins: [
    // - Модуль для работы html-webpack
    new HTMLWebpackPlugin({
      // Первоначальный HTML - файл (шаблон)
      template: "./index.html",
    }),

    // - Модуль для очистки dist - проекта
    new CleanWebpackPlugin(),

    // - Модуль для сжатия CSS
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    // - Модуль для копирования статических файлов (сейчас html-webpack сам копирует статические файлы используемые в html)
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/favicon.ico"),
    //       to: path.resolve(__dirname, "dist"),
    //     },
    //   ],
    // }),
  ],

  // --- (Модули) Лоадеры (нужны для работы с различными файлами кроме JS и JSON) работа с <styles> ---
  module: {
    rules: [
      // Загрузка стилей
      {
        // Если есть определенное расширение (регулярное выражение)
        test: /\.css$/i,
        // То использовать эти лоудеры (порядок <-- справа - налево) "лоудеры нужно установить"
        // css-loader - обрабатывает CSS
        // style-loader - вставляет стили в HTML
        // use: ["style-loader", "css-loader"], // - в новой версии (текущей) они могут обрабатывать картинки (url(./...)) и шрифты

        // MiniCssExtractPlugin.loader - выносит CSS в отдельные файлы
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ], // - в новой версии (текущей) они могут обрабатывать картинки (url(./...)) и шрифты
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

  // --- DevServer (пакет NPM: npm i -D webpack-dev-server  'запуск: npm run start (npx webpack serve)') ---
  devServer: {
    port: 3001,
    watchFiles: ["./src/**/*"],
    hot: isDev,
    liveReload: true,
  },
};
