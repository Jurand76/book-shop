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
    book_desc.dataset.value = i;
    book_desc.onclick = async function () {
      var temporary = document.getElementById("book_details");
      temporary.style = "visibility: visible";
      let author = temporary.getElementsByClassName("book_details_author")[0];
      author.textContent = books[i].author;
      let bigImage = temporary.getElementsByClassName("book_img_big")[0];
      bigImage.src = books[i].imageLink;
      let title = temporary.getElementsByClassName("book_details_title")[0];
      title.textContent = books[i].title;
      let description = temporary.getElementsByClassName(
        "book_details_description"
      )[0];
      description.textContent = books[i].description;
      let price = document.getElementById("book_details_price_value");
      price.textContent = books[i].price;
    };
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

  var menu_basket_value = document.createElement("span");
  menu_basket_value.id = "menu_basket_value";
  menu.appendChild(menu_basket_value);

  var menu_basket_img = document.createElement("img");
  menu_basket_img.id = "menu_basket_img";
  if (basket_quantity > 0) menu_basket_img.src = "./icons/basket_full.png";
  else menu_basket_img.src = "./icons/basket_empty.png";
  menu.appendChild(menu_basket_img);

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

  // book details box
  var book_details = document.createElement("div");
  book_details.id = "book_details";
  store_content.appendChild(book_details);

  book_details_author = document.createElement("div");
  book_details_author.textContent = "";
  book_details_author.className = "book_details_author";
  book_details.appendChild(book_details_author);

  book_img_big = document.createElement("img");
  book_img_big.src = "";
  book_img_big.className = "book_img_big";
  book_details.appendChild(book_img_big);

  book_details_title = document.createElement("div");
  book_details_title.className = "book_details_title";
  book_details_title.textContent = "";
  book_details.appendChild(book_details_title);

  book_details_description = document.createElement("div");
  book_details_description.className = "book_details_description";
  book_details_description.textContent = "";
  book_details.appendChild(book_details_description);

  book_details_close = document.createElement("div");
  book_details_close.id = "book_details_close";
  book_details_close.textContent = "X";
  book_details_close.onclick = function () {
    book_details.style = "visibility: hidden";
  };
  book_details.appendChild(book_details_close);

  book_details_price = document.createElement("div");
  book_details_price.id = "book_details_price";
  book_details.appendChild(book_details_price);

  book_details_price_text = document.createElement("span");
  book_details_price_text.className = "book_details_price";
  book_details_price_text.textContent = "Price: ";
  book_details_price.appendChild(book_details_price_text);

  book_details_price_value = document.createElement("span");
  book_details_price_value.id = "book_details_price_value";
  book_details_price.appendChild(book_details_price_value);

  book_details_price_text = document.createElement("span");
  book_details_price_text.className = "book_details_price";
  book_details_price_text.textContent = "$";
  book_details_price.appendChild(book_details_price_text);

  book_details_button = document.createElement("button");
  book_details_button.id = "book_details_button";
  book_details_button.textContent = "Add to basket";
  book_details.appendChild(book_details_button);
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
var basket_quantity = 0;
var grid_books;
var displayscreen = 1;
var bookStart = 0;
var books = Array();
MainDisplay();
