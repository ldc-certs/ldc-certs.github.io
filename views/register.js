import { html } from "https://unpkg.com/lit-html?module";

import { register } from "../src/api/data.js";

const registerTemplate = (onSubmit, isFilled, isMatching) => html` <section
  class="logreg"
>
  <div>
    <h1>Register</h1>
    ${isFilled
      ? html`<p style="color: red">Please fill in all fields!</p>`
      : ""}
    ${isMatching ? html`<p style="color: red">Passwords don't match!</p>` : ""}
  </div>

  <form @submit=${onSubmit}>
    <div class="formDiv">
      <label for="username">Username</label>
      <input name="username" type="text" />
      <label for="email">Email</label>
      <input name="email" type="text" />
      <label for="password">Password</label>
      <input name="password" type="password" />
      <label for="repass">Repeat Password</label>
      <input name="repass" type="password" />

      <input class="lrBtn" type="submit" value="Register" />
    </div>
  </form>
</section>`;

export async function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const repass = formData.get("repass");

    if (!username || !password || !email || !repass) {
      return ctx.render(registerTemplate(onSubmit, true));
    }

    if (password != repass) {
      return ctx.render(registerTemplate(onSubmit, false, true));
    }

    await register(username, email, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/allShips");
  }
}
