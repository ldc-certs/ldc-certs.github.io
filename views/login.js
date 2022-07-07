import { html } from 'https://unpkg.com/lit-html?module';

import { login } from '../src/api/data.js';

const loginTemplate = (onSubmit, isFilled) => html`
<section>
    <div>
        <h1>Login</h1>
        ${isFilled ? html`<p style="color: red">Please fill in all fields!</p>` : ''}
    </div>

    <form @submit=${onSubmit}>
        <div class="formDiv">
            <label for="username">Username</label>
            <input name="username" type="text">
            <label for="password">Password</label>
            <input name="password" type="password">

            <input class="lrBtn" type="submit" value="Login">
        </div>
    </form>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');


        if (!username || !password) {
            return ctx.render(loginTemplate(onSubmit, true));
        }

        await login(username, password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/allCars');
    }
}