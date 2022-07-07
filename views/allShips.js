import { html } from "https://unpkg.com/lit-html?module";

import { getShips } from "../src/api/data.js";

const allShipsTemplate = (data) => html` <section class="my-cars">
  <h1>All Cars</h1>
  <div class="my-collection">
    ${data.length
      ? html`${data.map(shipTemplate)}`
      : html`<p class="no-cars">No shipss in database.</p>`}
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

  ctx.render(allShipsTemplate(data));
}
