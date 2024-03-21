import { html, render } from "https://esm.run/lit-html@1";
import page from "https://cdn.rawgit.com/visionmedia/page.js/master/page.mjs";

import { homePage } from "../views/home.js";
import { loginPage } from "../views/login.js";
import { registerPage } from "../views/register.js";
import { createPage } from "../views/createShip.js";
import { createPageCert } from "../views/createCert.js";
import { logout as apiLogout } from "../src/api/data.js";
import { allShipsPage } from "../views/allShips.js";
// import { detailsPage } from '../views/details.js';
import { editPage } from "../views/edit.js";
import { deletePage } from "../views/delete.js";
import { editPageCert } from "../views/editCert.js";
import { deletePageCert } from "../views/deleteCert.js";

const container = document.querySelector(".container");
document.getElementById("logoutBtn").addEventListener("click", logout);

page("/", decorateContext, homePage);
page("/index.html", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/createShip", decorateContext, createPage);
page("/createCert/:id", decorateContext, createPageCert);
page("/allShips", decorateContext, allShipsPage);
// page('/details/:id', decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page("/delete/:id", decorateContext, deletePage);
page("/editCert/:id", decorateContext, editPageCert);
page("/deleteCert/:id", decorateContext, deletePageCert);

setUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, container);
  ctx.setUserNav = setUserNav;
  next();
}

function setUserNav() {
  const username = sessionStorage.getItem("username");
  if (username != null) {
    document.getElementById("welcome").textContent = `Welcome, ${username}`;
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

async function logout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
