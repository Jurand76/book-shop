async function getBooks() {
  const response = await fetch(filename);
  const result = await response.json();
  return result;
}

async function getBooks2() {
  const bookbase = await getBooks();
  for (let i = 0; i < bookbase.length; i++) books.push(bookbase[i]);
}

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

  var grid_books = document.createElement("grid");
  grid_books.id = "grid_books";
  store_content.appendChild(grid_books);

  for (let i = 1; i < 5; i++) {
    book_desc = document.createElement("div");
    book_desc.className = "book" + i + " book_entry";
    grid_books.appendChild(book_desc);

    book_author = document.createElement("div");
    book_author.textContent = books[bookStart + i - 1].author;
    book_author.className = "book_author";
    book_desc.appendChild(book_author);

    book_img_small = document.createElement("img");
    book_img_small.src = books[bookStart + i - 1].imageLink;
    book_img_small.className = "book_img_small";
    book_desc.appendChild(book_img_small);

    book_title = document.createElement("div");
    book_title.className = "book_title";
    book_title.textContent = books[bookStart + i - 1].title;
    book_desc.appendChild(book_title);
  }

  var button_previous = document.createElement("div");
  button_previous.id = "button_previous";
  button_previous.onclick = function () {
    console.log("Previous button clicked");
    bookStart = bookStart - 4;
    if (bookStart < 0) bookStart = 0;
    console.log("Book start = ", bookStart);
    DisplayStore();
  };

  button_previous.textContent = "<";
  store_content.appendChild(button_previous);

  var button_next = document.createElement("div");
  button_next.id = "button_next";
  button_next.onclick = function () {
    console.log("Next button clicked");
    bookStart = bookStart + 4;
    if ((bookStart) => books.length - 4) bookStart = books.length - 4;
    console.log("Book start = ", bookStart);
    book_title.textContent = books[bookStart].title;
    //DisplayStore();
  };
  button_next.textContent = ">";
  store_content.appendChild(button_next);
}

async function MainDisplay() {
  await getBooks2();
  if (displayscreen == 1) DisplayStore();
  if (displayscreen == 2) DisplayBlog();
  if (displayscreen == 3) DisplayAboutUs();
}

const filename = "./books.json";
var displayscreen = 1;
var bookStart = 0;
var books = Array();
MainDisplay();
