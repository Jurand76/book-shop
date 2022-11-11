var wrapper = document.getElementById("wrapper");

var menu = document.createElement("div");
menu.id = "menu";
wrapper.appendChild(menu);

var logo = document.createElement("img");
logo.src = "../icons/logo.png";
logo.id = "logo";
menu.appendChild(logo);
