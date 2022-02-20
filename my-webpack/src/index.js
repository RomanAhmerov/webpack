// - Не нативный испорт с использованием доп. пакетов
// Импорт CSS (пакеты: "style-loader", "css-loader")
import "@/styles/styles.css";

// Импорт файлов
// import WebpackLogo from "./assets/webpack-logo.png";
import xml from "@/assets/data.xml"; // Пакет - "xml-loader"
import csv from "@/assets/data.csv"; // Пакет - "csv-loader" (в старой версии еще нужено было установить пакет "papaparse")

// - Нативный импорт без доп. пакетов
import json from "@/assets/json"; // Можно с расширением .json, можно и без

// - Импорт сущностей из файлов JS
// import Post from "@/models/Post"; - можно такой импорт
import Post from "@models/Post"; // - можно такой импорт (см. конфигурацию webpack (resolve.alias))

// - Импорт библиотек NPM
import * as $ from "jquery";


// - Логика
const post = new Post("Webpack Post Title");

// Работа с импортированными библиотеками NPM
$('pre').addClass('code').html(post.toString());

// Вывод файлов:
console.log("Post to String: ", post.toString());

console.log("JSON: ", json);

console.log("XML: ", xml);

console.log("CSV: ", csv);
