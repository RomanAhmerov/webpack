async function start() {
  return await Promise.resolve("async is working");
}

start().then(console.log);

class Util {
  static id = Date.now();
}

console.log("Util Id:", Util.id);

// Динамический импорт (lazy load) (пример lodash)
import("lodash").then((_) => {
    console.log('Lodash: ', _)
});
