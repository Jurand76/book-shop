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

//about us

function openAboutUs() {
  let aboutUsClosing = document.getElementById("about_us");
  console.log("show aboutus");
  aboutUsClosing.style = "visibility: visible";
}

// main page of Book Store
async function DisplayStore() {
  console.log("Book catalog : ", books);

  var wrapper = document.getElementById("wrapper");
  var menu_bar = document.createElement("div");
  menu_bar.id = "menu_bar";
  wrapper.appendChild(menu_bar);

  var logo = document.createElement("img");
  logo.src = "./icons/logo4.png";
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
  menu_item3.onclick = function () {
    openAboutUs();
  };
  menu_item3.className = "menu_item";
  menu.appendChild(menu_item3);

  var menu_basket_value = document.createElement("span");
  menu_basket_value.id = "menu_basket_value";
  menu.appendChild(menu_basket_value);

  var menu_basket_img = document.createElement("img");
  menu_basket_img.id = "menu_basket_img";
  if (basket_quantity > 0) {
    menu_basket_img.src = "./icons/basket_full.png";
    menu_basket_value.textContent = basket_quantity;
  } else menu_basket_img.src = "./icons/basket_empty.png";
  menu_basket_img.onclick = function () {
    let site = document.getElementById("order_page");
    site.style = "visibility: visible";
  };
  menu.appendChild(menu_basket_img);

  // store content
  var store_content = document.createElement("div");
  store_content.id = "store_content";
  wrapper.appendChild(store_content);

  grid_books = document.createElement("grid");
  grid_books.id = "grid_books";
  store_content.appendChild(grid_books);

  await bookCatalog(grid_books, bookStart);

  var button_previous = document.createElement("img");
  button_previous.id = "button_previous";
  button_previous.src = "./icons/previous.png";
  button_previous.onclick = async function () {
    await destroyBookCatalog(grid_books, bookStart);
    bookStart = bookStart - 4;
    if (bookStart < 0) bookStart = 0;
    await bookCatalog(grid_books, bookStart);
  };
  store_content.appendChild(button_previous);

  var button_next = document.createElement("img");
  button_next.id = "button_next";
  button_next.src = "./icons/next.png";
  button_next.onclick = async function () {
    await destroyBookCatalog(grid_books, bookStart);
    bookStart = bookStart + 4;
    if (bookStart > books.length - 4) bookStart = books.length - 4;
    await bookCatalog(grid_books, bookStart);
  };
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
  book_details_button.onclick = function () {
    basket_quantity++;
    menu_basket_img.src = "./icons/basket_full.png";
    menu_basket_value.textContent = basket_quantity;
    basket_item = [];
    basket_item;
    basket_item.push(
      book_details_author.textContent,
      book_details_title.textContent,
      book_details_price_value.textContent
    );
    basket_items.push(basket_item);
    let site = document.getElementById("order_list");
    let text = site.innerHTML;
    site.innerHTML =
      text +
      "<div class='order_item'><span class='order_item_author'>" +
      book_details_author.textContent +
      "</span><span class='order_item_title'>" +
      book_details_title.textContent +
      "</span><span class='order_item_price_2'>" +
      book_details_price.textContent +
      "</span></div>";
    basket_sum = basket_sum + parseInt(book_details_price_value.textContent);
    let site2 = document.getElementById("order_total_value");
    site2.textContent = basket_sum + "$";
    site2 = document.getElementById("order_total");
    site2.style = "top: " + parseInt(80 + basket_quantity * 25) + "px";
  };
  book_details_button.textContent = "Add to basket";
  book_details.appendChild(book_details_button);

  // next and previous background
  var background_change = document.createElement("div");
  background_change.id = "background_change";
  wrapper.appendChild(background_change);

  var background_previous = document.createElement("img");
  background_previous.id = "background_previous_button";
  background_previous.src = "./icons/previous.png";
  background_previous.onclick = function () {
    background_number = background_number - 1;
    if (background_number < 1) background_number = 1;
    let source = "url('./images/background_book" + background_number + ".jpg')";
    store_content.style.backgroundImage = source;
  };
  background_change.appendChild(background_previous);

  var background_next = document.createElement("img");
  background_next.id = "background_next_button";
  background_next.src = "./icons/next.png";
  background_next.onclick = function () {
    background_number = background_number + 1;
    if (background_number > 9) background_number = 9;
    let source = "url('./images/background_book" + background_number + ".jpg')";
    store_content.style.backgroundImage = source;
  };
  background_change.appendChild(background_next);

  // about Us
  var aboutUs = document.createElement("div");
  aboutUs.id = "about_us";
  wrapper.appendChild(aboutUs);

  var aboutUsClose = document.createElement("div");
  aboutUsClose.id = "about_us_close";
  aboutUsClose.textContent = "X";
  aboutUsClose.onclick = function () {
    aboutUs.style = "visibility: hidden";
  };
  aboutUs.appendChild(aboutUsClose);

  // order confirmation
  var order_page = document.createElement("div");
  order_page.id = "order_page";
  wrapper.appendChild(order_page);

  var order_main = document.createElement("div");
  order_main.id = "order_main";
  order_main.textContent = "List of ordered books";
  order_page.appendChild(order_main);

  var order_list = document.createElement("div");
  order_list.id = "order_list";
  order_page.appendChild(order_list);

  var order_total = document.createElement("div");
  order_total.id = "order_total";
  order_total.textContent = "Total price:";
  order_page.appendChild(order_total);

  var order_total_value = document.createElement("span");
  order_total_value.id = "order_total_value";
  order_total_value.textContent = "";
  order_total.appendChild(order_total_value);

  //var basket_item = [];
  //var basket_items = [];
  //var basket_quantity = 0;

  var order_page_close = document.createElement("div");
  order_page_close.id = "order_page_close";
  order_page_close.textContent = "X";
  order_page_close.onclick = function () {
    order_page.style = "visibility: hidden";
  };
  order_page.appendChild(order_page_close);

  // footer
  var footer = document.createElement("div");
  footer.id = "footer";
  wrapper.appendChild(footer);
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
var background_number = 4;
var basket_item = [];
var basket_items = [];
var basket_quantity = 0;
var basket_sum = 0;
var grid_books;
var displayscreen = 1;
var bookStart = 0;
var books = Array();
MainDisplay();
