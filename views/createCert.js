import { html } from "https://unpkg.com/lit-html?module";

import { createCert, getShipById, getCertsByShip } from "../src/api/data.js";

const createTemplate = (
  onSubmit,
  isFilled,
  ship,
  shipCerts
) => html` <section class="createCar">
  <div>
    <h1>Create New Certificate</h1>
    ${
      isFilled ? html`<p style="color: red">Please fill in all fields!</p>` : ""
    }
  </div>

  <form @submit=${onSubmit}>
    <div>
      <label for="new-cert">Certificate Name</label>
      <input name="new-cert" type="text" />
      <label for="issue-date">Issue Date</label>
      <input name="issue-date" type="text" />
      <label for="expire-date">Expire Date</label>
      <input name="expire-date" type="text" />
      <label for="sednaId">Sedna Id</label>
      <input name="sednaId" type="text" />

      <input type="submit" value="Create" />
    </div>
  </form>
</section>

<h1>All ${ship.shipName} Certs</h1>
  
  <div class="my-collection">
    ${
      shipCerts.length
        ? html`${shipCerts.map(certTemplate)}`
        : html`<p class="no-cars">No certificates in database.</p>`
    }
  </div>
</section>
`;

const certTemplate = (shipCerts) => html`
  <div>
    <p>${shipCerts.certName}</p>
  </div>
  <div>
    <a class="btn" href="/edit/${shipCerts.objectId}">Edit</a>
    <a class="btn" href="/delete/${shipCerts.objectId}">Delete</a>
  </div>
`;

export async function createPageCert(ctx) {
  const shipId = ctx.params.id;
  const ship = await getShipById(shipId);
  const shipCerts = await getCertsByShip(shipId);
  ctx.render(createTemplate(onSubmit, false, ship, shipCerts));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const cert = {
      certName: formData.get("new-cert"),
      issueDate: formData.get("issue-date"),
      expireDate: formData.get("expire-date"),
      sednaId: formData.get("sednaId"),
    };

    if (!cert.certName) {
      return ctx.render(createTemplate(onSubmit, true, ship, shipCerts));
    }

    await createCert(cert, shipId);
    event.target.reset();
    ctx.page.redirect("/allShips");
  }
}
