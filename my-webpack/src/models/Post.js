export default class Post {
  constructor(title) {
    this.title = title; 
    // this.img = img;
    this.date = new Date();
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
    }, null, 2);
  }

  get upperCaseTitle() {
    return this.title.toUpperCase();
  }
}
