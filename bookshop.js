async function getBooks() {
  const response = await fetch(filename);
  const result = await response.json();
  return result;
}

async function getBooks2() {
  const bookbase = await getBooks();
  for (let i = 0; i < bookbase.length; i++) books.push(bookbase[i]);
}

// creating Book Catalog - 4 books
async function bookCatalog(sourceDiv, firstBook) {
  for (let i = firstBook; i < firstBook + 4; i++) {
    book_desc = document.createElement("div");
    book_desc.className = "book" + (i - firstBook + 1) + " book_entry";
    sourceDiv.appendChild(book_desc);

    book_author = document.createElement("div");
    book_author.textContent = books[i].author;
    book_author.className = "book_author";
    book_desc.appendChild(book_author);

    book_img_small = document.createElement("img");
    book_img_small.src = books[i].imageLink;
    book_img_small.className = "book_img_small";
    book_desc.appendChild(book_img_small);

    book_title = document.createElement("div");
    book_title.className = "book_title";
    book_title.textContent = books[i].title;
    book_desc.appendChild(book_title);
  }
}

// removing Book Catalog code from HTML
async function destroyBookCatalog(sourceDiv, firstBook) {
  for (let i = firstBook; i < firstBook + 4; i++) {
    book_desc = sourceDiv.getElementsByTagName("div")[0];
    sourceDiv.removeChild(book_desc);
  }
}

// main page of Book Store
async function DisplayStore() {
  console.log("Book catalog : ", books);

  var wrapper = document.getElementById("wrapper");
  var menu_bar = document.createElement("div");
  menu_bar.id = "menu_bar";
  wrapper.appendChild(menu_bar);

  var logo = document.createElement("img");
  logo.src = "./icons/logo2.png";
  logo.id = "logo";
  menu_bar.appendChild(logo);

  var menu = document.createElement("div");
  menu.id = "menu";
  menu_bar.appendChild(menu);

  var menu_item1 = document.createElement("span");
  menu_item1.textContent = "STORE";
  menu_item1.className = "menu_item";
  menu.appendChild(menu_item1);

  var menu_item2 = document.createElement("span");
  menu_item2.textContent = "BLOG";
  menu_item2.className = "menu_item";
  menu.appendChild(menu_item2);

  var menu_item3 = document.createElement("span");
  menu_item3.textContent = "ABOUT US";
  menu_item3.className = "menu_item";
  menu.appendChild(menu_item3);

  var store_content = document.createElement("div");
  store_content.id = "store_content";
  wrapper.appendChild(store_content);

  grid_books = document.createElement("grid");
  grid_books.id = "grid_books";
  store_content.appendChild(grid_books);

  await bookCatalog(grid_books, bookStart);

  var button_previous = document.createElement("div");
  button_previous.id = "button_previous";
  button_previous.onclick = async function () {
    console.log("Previous button clicked");
    await destroyBookCatalog(grid_books, bookStart);
    bookStart = bookStart - 4;
    if (bookStart < 0) bookStart = 0;
    console.log("Book start = ", bookStart);
    await bookCatalog(grid_books, bookStart);
  };
  button_previous.textContent = "<";
  store_content.appendChild(button_previous);

  var button_next = document.createElement("div");
  button_next.id = "button_next";
  button_next.onclick = async function () {
    console.log("Next button clicked");
    await destroyBookCatalog(grid_books, bookStart);
    bookStart = bookStart + 4;
    if (bookStart > books.length - 4) bookStart = books.length - 4;
    console.log("Book start = ", bookStart);
    await bookCatalog(grid_books, bookStart);
  };
  button_next.textContent = ">";
  store_content.appendChild(button_next);
}

// Main Display function - can be displayed Store, Blog or About Us
async function MainDisplay() {
  await getBooks2();
  if (displayscreen == 1) DisplayStore();
  if (displayscreen == 2) DisplayBlog();
  if (displayscreen == 3) DisplayAboutUs();
}

// global variables and start application
const filename = "./books.json";
var grid_books;
var displayscreen = 1;
var bookStart = 0;
var books = Array();
MainDisplay();
