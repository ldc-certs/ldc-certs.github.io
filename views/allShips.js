import { html } from "https://unpkg.com/lit-html?module";

import { getShips, getShipsByName } from "../src/api/data.js";

const allShipsTemplate = (data, onSubmit) => html` <section class="ships">
  <h1>All Ships</h1>
  <form @submit=${onSubmit}>
    <input name="search" type="text" placeholder="Search by field" />
    <input class="search" type="submit" value="Search" />
  </form>

  <div class="my-collection">
    ${data.length
      ? html`${data.map(shipTemplate)}`
      : html`<p class="no-ships">No ships in database.</p>`}
  </div>
</section>`;

const shipTemplate = (ship) => html`
  <div>
    <div class="ship-name">${ship.shipName}</div>
    <div class="ship-description">${ship.description}</div>

    <div>
      <a class="btn-add" href="/createCert/${ship.objectId}">Add Certificate</a>

      <a class="btn-edit" href="/edit/${ship.objectId}">Edit</a>

      <a class="btn-delete" href="/delete/${ship.objectId}">Delete</a>
    </div>
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
