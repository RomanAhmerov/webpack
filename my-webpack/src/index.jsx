// - Не нативный испорт с использованием доп. пакетов
// Импорт CSS (пакеты: "style-loader" / MiniCssExtractPlugin.loader  , "css-loader")
import "@/styles/styles.css";
// Импорт Less (пакеты: "style-loader" / MiniCssExtractPlugin.loader  , "css-loader", "less-loader", "less")
import "@/styles/less.less";
// Импорт SCSS (пакеты: "style-loader" / MiniCssExtractPlugin.loader  , "css-loader", "sass-loader", "node-sass")
import "@/styles/scss.scss";

// Импорт файлов
// import WebpackLogo from "./assets/webpack-logo.png"; // Пакет - "file-loader"
import xml from "@/assets/data.xml"; // Пакет - "xml-loader"
import csv from "@/assets/data.csv"; // Пакет - "csv-loader" (в старой версии еще нужено было установить пакет "papaparse")

// - Нативный импорт без доп. пакетов
import json from "@/assets/json"; // Можно с расширением .json, можно и без

// - Импорт сущностей из файлов JS
// import Post from "@/models/Post"; - можно такой импорт
import Post from "@models/Post"; // - можно такой импорт (см. конфигурацию webpack (resolve.alias))
// import "babel.js"
import "./babel";

// - Импорт библиотек NPM
import * as $ from "jquery";

// - Логика
const post = new Post("Webpack Post Title");

// Работа с импортированными библиотеками NPM
// $("pre").addClass("code").html(post.toString());

// Вывод файлов:
console.log("Post to String: ", post.toString());

console.log("JSON: ", json);

console.log("XML: ", xml);

console.log("CSV: ", csv);

// React
import React from "react";
import { render } from "react-dom";

const App = () => (
  <div className="container">
    <h1>WebPack Course</h1>

    <hr />
    {/* Импорт картинки в CSS (background-image: url(...)) */}
    <div className="logo"></div>

    <hr />

    {/* Импорт картинки img (src="...") */}
    <img src="./assets/webpack-logo" alt="logo" />

    <hr />

    {/* Импорт jquery */}
    <pre></pre>

    {/* Препроцессор less */}
    <div className="box">
      <h2>Less</h2>
    </div>

    {/* Препроцессор SASS | SCSS */}
    <div className="card">
      <h2>SCSS</h2>
    </div>
  </div>
);

render(<App />, document.getElementById("app"));
