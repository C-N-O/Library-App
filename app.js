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
const modalEL = document.getElementById('myModal');
const addEL = document.querySelector('.add');
const submitEL = document.querySelector('.submit');
const cancelEL = document.querySelector('.cancel');

const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const formNumpages = document.getElementById('formNumpages');

let myLibrary = [];
let index = 0;
let books = [];

//hide modal on page load
modalEL.classList.add('hidden');

const displayBooks = () => {
  myLibrary.forEach(function (el) {
    const html = `<div class="card">
  <div class="title property">Title: ${el.title}</div>
  <div class="author property">Author: ${el.author}</div>
  <div class="numPages property">Number of Pages: ${el.numPages}</div>
  <div class="isCompleted property">Completed: ${
    el.isCompleted == 'yes' ? 'Yes' : 'No'
  }</div>
</div>`;
    container.insertAdjacentHTML('beforeend', html);
  });
};

const createBook = () => {
  container.innerHTML = '';
  books[index] = new Book(
    uuidv4(),
    formTitle.value,
    formAuthor.value,
    formNumpages.value,
    bookIsCompleted()
  );
};

const clearInputFields = () => {
  formTitle.value = '';
  formAuthor.value = '';
  formNumpages.value = '';
  document.getElementById('no').checked = false;
  document.getElementById('yes').checked = false;
};

bookIsCompleted = () => {
  if (document.getElementById('no').checked) {
    return 'no';
  } else if (document.getElementById('yes').checked) {
    return 'yes';
  }
};

addEL.addEventListener('click', () => {
  container.classList.add('hidden');
  modalEL.classList.remove('hidden');
  formTitle.focus();
});

cancelEL.addEventListener('click', () => {
  clearInputFields();
  container.classList.remove('hidden');
  modalEL.classList.add('hidden');
});

submitEL.addEventListener('click', () => {
  createBook();
  books[index].addBookToLibrary();
  clearInputFields();

  container.classList.remove('hidden');
  modalEL.classList.add('hidden');
  index++;
  displayBooks();
});

//display this card if Library is empty
if (myLibrary.length == 0) {
  container.insertAdjacentHTML(
    'beforeend',
    `<div class="card"><h2>You do not have any books in your library. Why not add one ☝️ </h2></div>`
  );
}
