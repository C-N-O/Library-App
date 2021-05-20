//import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class Book {
  constructor(id, title, author, numPages, isCompleted) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isCompleted = isCompleted;
  }

  addBookToLibrary = () => {
    myLibrary.push({
      id: this.id,
      title: this.title,
      author: this.author,
      numPages: this.numPages,
      isCompleted: this.isCompleted,
    });
  };

  getBookInfo = () => {
    const str = `"${this.title}, by ${this.author}, has ${
      this.numPages
    } pages and ${this.hasBeenRead()}"`;

    return str;
  };

  hasBeenCompleted() {
    if (this.isCompleted) return 'has been completed.';
    else return 'has not been completed.';
  }
}

const container = document.querySelector('.container');
// const titleEL = document.querySelector('.titleEL');
// const authorEL = document.querySelector('.authorEL');
// const numPagesEL = document.querySelector('.numPagesEL');
// const isCompletedEL = document.querySelector('.isCompletedEL');
let myLibrary = [];

const book1 = new Book(
  uuidv4(),
  'Things Fall Apart',
  'Chinua Achebe',
  300,
  false
);
const book2 = new Book(
  uuidv4(),
  'Things Fall Apart',
  'Chinua Achebe',
  300,
  true
);
const book3 = new Book(
  uuidv4(),
  'Things Fall Apart',
  'Chinua Achebe',
  300,
  false
);
const book4 = new Book(
  uuidv4(),
  'Things Fall Apart',
  'Chinua Achebe',
  300,
  true
);
const book5 = new Book(
  uuidv4(),
  'Things Fall Apart',
  'Chinua Achebe',
  300,
  false
);

const addBooks = () => {
  book1.addBookToLibrary();
  book2.addBookToLibrary();
  book3.addBookToLibrary();
  book4.addBookToLibrary();
  book5.addBookToLibrary();
};

const displayBooks = () => {
  myLibrary.forEach(function (el) {
    const html = `<div class="card">
  <div class="title property">Title: ${el.title}</div>
  <div class="author property">Author: ${el.author}</div>
  <div class="numPages property">Number of Pages: ${el.numPages}</div>
  <div class="isCompleted property">Completed: ${
    el.isCompleted ? 'Yes' : 'No'
  }</div>
</div>`;
    container.insertAdjacentHTML('beforeend', html);
  });
};

addBooks();
displayBooks();
