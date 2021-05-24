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
const searchContainer = document.querySelector('.search-container');
const modalEL = document.getElementById('myModal');
const searchModalEL = document.getElementById('searchModal');
const addBTN = document.querySelector('.add');
const submitBTN = document.querySelector('.submit');
const cancelBTN = document.querySelector('.cancel');
const cancelSearchEL = document.querySelector('.cancelSearch');
const findEL = document.querySelector('.find');

const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const formNumpages = document.getElementById('formNumpages');

const searchTitleEL = document.getElementById('searchTitle');
const searchEL = document.querySelector('.search');

const detailEL = document.querySelector('.detail');

// let myLibrary = [
//   {
//     id: uuidv4(),
//     title: 'The Subtle Act of not giving a Bleep',
//     author: 'Mark Manson',
//     numPages: 212,
//     isCompleted: 'Yes',
//   },
//   {
//     id: uuidv4(),
//     title: 'Redefining Success',
//     author: 'Bret Wilson',
//     numPages: 252,
//     isCompleted: 'No',
//   },
//   {
//     id: uuidv4(),
//     title: 'Living the Good Life',
//     author: 'David Patchell',
//     numPages: 254,
//     isCompleted: 'No',
//   },
//   {
//     id: uuidv4(),
//     title: 'The Ideal Team Player',
//     author: 'Patrick Lencioni',
//     numPages: 219,
//     isCompleted: 'Yes',
//   },
//   {
//     id: uuidv4(),
//     title: 'The Advantage',
//     author: 'Patrick Lencioni',
//     numPages: 210,
//     isCompleted: 'Yes',
//   },
// ];
let index = 0;
let books = [];
let myLibrary;
let searchResult = [];

displayBooks = (bookList, htmlContainer) => {
  if (bookList.length === 0) {
    if (htmlContainer.classList.contains('container')) {
      htmlContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="card"><h2>You have no books in your library. Why not add one ☝️ </h2></div>`
      );
    } else if (htmlContainer.classList.contains('search-container')) {
      htmlContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="card"><h2>Want to find a Book? Click the Find button ☝️ </h2></div>`
      );
    }
  } else {
    bookList.forEach(function (el) {
      const html = `<div class="card">
    <div class="bookTitleWrapper">
    <div class="title property">${el.title}</div>
    <div class="author property">Author: ${el.author}</div>
    </div>
    <div class="bookBtnWrapper">
    <button class="cardBtn btnView"  onclick="showBookDetail('${el.id}')">VIEW</button>
    <button class="cardBtn btnDelete" onclick="deleteBook('${el.id}')">DELETE</button>
    </div>
</div>`;
      htmlContainer.insertAdjacentHTML('afterbegin', html);
    });
  }
};

deleteBook = (id) => {
  if (myLibrary.length !== 0) {
    container.innerHTML = '';
    myLibrary.forEach((el, index) => {
      if (el.id == id) myLibrary.splice(index, 1);
    });
    displayBooks(myLibrary, container);
    localStorage.setItem('BookList', JSON.stringify(myLibrary));
    ç;
  }

  if (searchResult.length !== 0) {
    searchContainer.innerHTML = '';
    searchResult.forEach((el, index) => {
      if (el.id == id) searchResult.splice(index, 1);
    });
    displayBooks(searchResult, searchContainer);
  }

  detailEL.innerHTML = '';
};

showBookDetail = (id) => {
  detailEL.innerHTML = '';
  myLibrary.forEach((el) => {
    if (el.id == id) {
      const html = `<div>
<div>
<span class="detailTitle">Title:</span>
<p>${el.title}</p>
</div>

<div>
<span class="detailTitle">Author:</span>
<p>${el.author}</p>
</div>

<div>
<span class="detailTitle">Number of Pages:</span>
<p>${el.numPages}</p>
</div>

<div>
<span class="detailTitle">Book ID:</span>
<p>${el.id}</p>
</div>

<div>
<span class="detailTitle">Finished Reading:</span>
<p>${el.isCompleted}</p>
</div>

</div>`;
      detailEL.insertAdjacentHTML('afterbegin', html);
    }
  });
};

const createBook = () => {
  container.innerHTML = '';
  books[index] = new Book(
    uuidv4(),
    formTitle.value.toLowerCase(),
    formAuthor.value.toLowerCase(),
    formNumpages.value,
    bookIsCompleted()
  );
};

search = () => {
  const searchTerm = searchTitleEL.value;
  myLibrary.map((el) => {
    if (
      searchTerm == el.id ||
      searchTerm == el.author ||
      searchTerm == el.title
    ) {
      searchResult.push(el);
    }
  });
  displayBooks(searchResult, searchContainer);

  if (searchResult.length === 0) {
    searchContainer.innerHTML = '';
    searchContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="card"><h2>Your Search did not yield any result!</h2></div>`
    );

    setTimeout(() => {
      searchContainer.innerHTML = '';
      searchContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="card"><h2>Want to find a book? Click the Find button ☝️ </h2></div>`
      );
    }, 5000);
  }
};

clearInputFields = () => {
  formTitle.value = '';
  formAuthor.value = '';
  formNumpages.value = '';
  document.getElementById('no').checked = false;
  document.getElementById('yes').checked = false;
};

bookIsCompleted = () => {
  if (document.getElementById('no').checked) {
    return 'No';
  } else if (document.getElementById('yes').checked) {
    return 'Yes';
  }
};

//accepts an array of elements. Will add or remove the hidden class on each element
toggle = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('hidden');
  }
};

//validate the new book info
validInfo = () => {
  if (
    formTitle.value == '' ||
    formAuthor.value == '' ||
    formNumpages.value == '' ||
    (document.getElementById('no').checked == false &&
      document.getElementById('yes').checked == false)
  )
    return false;
  else return true;
};

addBTN.addEventListener('click', () => {
  if (modalEL.classList.contains('hidden')) {
    toggle([container, modalEL]);
    formTitle.focus();
  }
});

submitBTN.addEventListener('click', () => {
  if (validInfo()) {
    createBook();
    books[index].addBookToLibrary();
    localStorage.setItem('BookList', JSON.stringify(myLibrary));
    clearInputFields();
    toggle([container, modalEL]);
    index++;
    displayBooks(myLibrary, container);
  }
});

cancelBTN.addEventListener('click', () => {
  clearInputFields();
  toggle([container, modalEL]);
});

findEL.addEventListener('click', () => {
  searchResult = [];
  if (searchModalEL.classList.contains('hidden')) {
    toggle([searchContainer, searchModalEL]);
    searchTitleEL.focus();
  }
});

searchEL.addEventListener('click', () => {
  searchContainer.innerHTML = '';
  toggle([searchContainer, searchModalEL]);
  search();
  searchTitleEL.value = '';
});

cancelSearchEL.addEventListener('click', () => {
  toggle([searchContainer, searchModalEL]);
  searchTitleEL.value = '';
});

initiateLocalStorage = () => {
  if (localStorage.getItem('BookList') != null)
    myLibrary = JSON.parse(localStorage.getItem('BookList'));
  else myLibrary = [];
};

//do all these on page load
modalEL.classList.add('hidden');
searchModalEL.classList.add('hidden');
initiateLocalStorage();
displayBooks(myLibrary, container);
displayBooks(searchResult, searchContainer);
