import { html } from "https://esm.run/lit-html@1";

const homeTemplate = () => html` <section class="home">
  <p>List of vsls certificates! Create, modify, delete!</p>
  <img src="/images/home.png" alt="no pic" />
  <p>
    <a href="/login">Login</a> or <a href="/register">register</a> to see all
    ships enlisted!
  </p>
</section>`;

export async function homePage(ctx) {
  const token = sessionStorage.getItem("authToken");
  if (token != null) {
    ctx.page.redirect("/allShips");
  } else {
    ctx.render(homeTemplate());
  }
}
