import { html } from "https://unpkg.com/lit-html?module";

import { getShips } from "../src/api/data.js";

const allShipsTemplate = (data, onSubmit) => html` <section class="my-cars">
  <h1>All Ships</h1>
  <form @submit=${onSubmit}>
    <input name="search" type="text" placeholder="Search by field" />
    <input type="submit" value="Search" />
  </form>

  <div class="my-collection">
    ${data.length
      ? html`${data.map(shipTemplate)}`
      : html`<p class="no-cars">No ships in database.</p>`}
  </div>
</section>`;

const shipTemplate = (ship) => html`
  <div>
    <p>${ship.shipName}</p>
    <p>${ship.owner}</p>
    <!-- <img alt="no-pic" src=${ship.img}> -->
  </div>
  <div>
    <a class="btn" href="/edit/${ship.objectId}">Edit</a>
  </div>
`;

export async function allShipsPage(ctx) {
  const [data] = await getShips();

  const token = sessionStorage.getItem("authToken");
  if (token == null) {
    ctx.page.redirect("/");
  }

  ctx.render(allShipsTemplate(data, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const search = formData.get("search");

    const [searchResult] = await getShipsByName(search);
    console.log(searchResult);
    ctx.render(allShipsTemplate(searchResult, onSubmit));
  }
}
