const display = document.querySelector('.container');
const modal = document.querySelector('#modal');
const openModal = document.querySelector('#new');
const closeModal = document.querySelector('#close-button')
const submit = document.querySelector('#submit');
const form = document.querySelector('#form');

let myLibrary = [];
let bookCounter = 0;

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.dataId = bookCounter++;
  }
  element() {
    let read = this.isRead ? 'read' : 'not read yet';
    let readClass = this.isRead ? 'read' : 'unread';
    return `
      <div class="book" data-id="${this.dataId}">
        <div class="title">${this.title}</div>
        <div class="author">${this.author}</div>
        <div class="pages">${this.pages}</div>
        <button type="button" id="delete" class="close">✕</button>
        <button type="button" class="${readClass}" id="readChange">${read}</button>
      </div>
    `;
  }
}

const addBookToLibrary = (book) => {
  myLibrary.push(book);
}

const removeBookFromLibrary = (bookId) => {
  for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].dataId == bookId) {
      myLibrary.splice(i, 1)
      displayLibrary();
      return
    }
  }
}

const changeBookReadStatus = (bookId) => {
  for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].dataId == bookId) {
      myLibrary[i].isRead = !myLibrary[i].isRead
      displayLibrary();
      return
    }
  }
}

const displayLibrary = () => {
  display.innerHTML = '';
  myLibrary.forEach(book => {
    display.innerHTML += book.element();
  });
  const del = Array.from(document.querySelectorAll('#delete'));
  del.forEach(btn => {
    btn.addEventListener('click', event => {
      removeBookFromLibrary(event.target.parentNode.dataset.id);
    })
  })
  const readChange = Array.from(document.querySelectorAll('#readChange'));
  readChange.forEach(btn => {
    btn.addEventListener('click', event => {
      changeBookReadStatus(event.target.parentNode.dataset.id)
    })
  });
}

openModal.addEventListener('click', () => {
  modal.showModal();
})

closeModal.addEventListener('click', () => {
  modal.close();
})

submit.addEventListener('click', (event) => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const isRead = document.querySelector('#isRead');
  if(!title.checkValidity()) return
  if(!author.checkValidity()) return
  if(!pages.checkValidity()) return
  addBookToLibrary(new Book(
    title.value,
    author.value,
    parseInt(pages.value),
    isRead.checked
  ));
  displayLibrary();
  modal.close();
  form.reset();
})

// newBook.addEventListener('click', () => {
//   addBookToLibrary(new Book(
//     window.prompt('Title:'),
//     window.prompt('Author:'),
//     parseInt(window.prompt('# of pages:')),
//     window.prompt('Has been read? (Y/N)').toLowerCase() === 'y' ? true : false
//   ));
//   displayLibrary();
// });

