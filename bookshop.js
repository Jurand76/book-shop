var wrapper = document.getElementById("wrapper");

var menu_bar = document.createElement("div");
menu_bar.id = "menu_bar";
wrapper.appendChild(menu_bar);

var logo = document.createElement("img");
logo.src = "../icons/logo.png";
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
