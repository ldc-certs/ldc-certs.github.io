import { render } from 'https://unpkg.com/lit-html?module';
import page from 'https://cdn.rawgit.com/visionmedia/page.js/master/page.mjs';

import { homePage } from '../views/home.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';
import { createPage } from '../views/create.js';
import { logout as apiLogout } from '../src/api/data.js';
import { allParloursPage } from '../views/allParlours.js';
// import { detailsPage } from '../views/details.js';
import { editPage } from '../views/edit.js';
// import { myCarsPage } from '../views/mycars.js';

const container = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', logout);

page('/', decorateContext, homePage);
page('/index.html', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/allParlours', decorateContext, allParloursPage);
// page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
// page('/my-cars', decorateContext, myCarsPage);

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username != null) {
        document.getElementById('welcome').textContent = `Welcome, ${username}`;
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}

