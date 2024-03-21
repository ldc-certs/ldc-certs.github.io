import { html } from "https://esm.run/lit-html@1";

import { editShipById, getShipById } from "../src/api/data.js";

const editTemplate = (ship, onSubmit, isFilled) => html` <section
  class="createShip"
>
  <div>
    <h1>Edit Ship</h1>
    ${isFilled ? html`<p>Please fill in all fields!</p>` : ""}
  </div>

  <form @submit=${onSubmit}>
    <div>
      <label for="new-ship">Ship Name</label>
      <input name="new-ship" type="text" .value=${ship.shipName} />

      <label for="new-description">Description</label>
      <textarea name="new-description" .value=${ship.description}></textarea>
      <input type="submit" value="Update" />
    </div>
  </form>
</section>`;

export async function editPage(ctx) {
  const shipId = ctx.params.id;
  const ship = await getShipById(shipId);
  ctx.render(editTemplate(ship, onSubmit, false));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      shipName: formData.get("new-ship"),
      description: formData.get("new-description"),
    };

    if (!data.shipName) {
      return ctx.render(editTemplate(ship, onSubmit, true));
    }

    await editShipById(shipId, data);
    event.target.reset();
    ctx.page.redirect(`/allShips`);
  }
}
