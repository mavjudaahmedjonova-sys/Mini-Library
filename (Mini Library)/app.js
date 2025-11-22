const form = document.getElementById('book-form');
const booksGrid = document.getElementById('books-grid');

let books = [];

// LocalStorage dan o‘qish
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
  renderBooks();
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = {
    id: Date.now(),
    title,
    author,
    pages: +pages,
    read
  };

  books.push(newBook);
  saveToLocalStorage();
  renderBooks();

  form.reset();
});

function renderBooks() {
  booksGrid.innerHTML = '';

  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Muallif:</strong> ${book.author}</p>
      <p><strong>Sahifalar:</strong> ${book.pages}</p>
      <div class="read-status ${book.read ? 'read' : 'not-read'}">
        ${book.read ? 'O‘qilgan ✓' : 'O‘qilmagan ✗'}
      </div>
      <i class="fas fa-book toggle-read" title="Holati o‘zgartirish"></i>
      <i class="fas fa-trash delete-book" title="O‘chirish"></i>
    `;

    // O‘qilgan/o‘qilmagan holatini o‘zgartirish
    bookCard.querySelector('.toggle-read').addEventListener('click', () => {
      book.read = !book.read;
      saveToLocalStorage();
      renderBooks();
    });

    // Kitobni o‘chirish
    bookCard.querySelector('.delete-book').addEventListener('click', () => {
      books = books.filter(b => b.id !== book.id);
      saveToLocalStorage();
      renderBooks();
    });

    booksGrid.appendChild(bookCard);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}