import { html } from "https://unpkg.com/lit-html?module";

import { createShip } from "../src/api/data.js";

const createTemplate = (onSubmit, isFilled) => html` <section class="createCar">
  <div>
    <h1>Create New Ship</h1>
    ${isFilled
      ? html`<p style="color: red">Please fill in all fields!</p>`
      : ""}
  </div>

  <form @submit=${onSubmit}>
    <div>
      <label for="new-parlour">Parlour Name</label>
      <input name="new-parlour" type="text" />
      <label for="new-city">City</label>
      <input name="new-city" type="text" />

      <label for="new-description">Description</label>
      <textarea name="new-description"></textarea>
      <input type="submit" value="Create" />
    </div>
  </form>
</section>`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const ship = {
      shipName: formData.get("new-ship"),
    };

    if (!ship.shipName) {
      return ctx.render(createTemplate(onSubmit, true));
    }

    await createShip(ship);
    event.target.reset();
    ctx.page.redirect("/allShips");
  }
}
