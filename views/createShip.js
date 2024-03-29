import { html } from "https://esm.run/lit-html@1";

import { createShip } from "../src/api/data.js";

const createTemplate = (onSubmit, isFilled) => html` <section
  class="createShip"
>
  <div>
    <h1>Create New Ship</h1>
    ${isFilled
      ? html`<p style="color: red">Please fill in all fields!</p>`
      : ""}
  </div>

  <form @submit=${onSubmit}>
    <div class="my-collection">
      <label for="new-ship">Ship Name</label>
      <input name="new-ship" type="text" />

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
      description: formData.get("new-description"),
    };

    if (!ship.shipName) {
      return ctx.render(createTemplate(onSubmit, true));
    }

    await createShip(ship);
    event.target.reset();
    ctx.page.redirect("/allShips");
  }
}
