import { html } from "https://esm.run/lit-html@1";

import { editCertById, getCertById } from "../src/api/data.js";

const editTemplate = (cert, onSubmit, isFilled) => html` <section
  class="createShip"
>
  <div>
    <h1>Edit Ship</h1>
    ${isFilled ? html`<p>Please fill in all fields!</p>` : ""}
  </div>

  <form @submit=${onSubmit}>
    <div>
      <label for="new-cert">Certificate Name</label>
      <input name="new-cert" type="text" .value=${cert.certName} />
      <label for="issue-date">Issue Date</label>
      <input name="issue-date" type="date" .value=${cert.issueDate} />
      <label for="expire-date">Expire Date</label>
      <input name="expire-date" type="date" .value=${cert.expireDate} />
      <label for="sednaId">Sedna Id</label>
      <input name="sednaId" type="text" .value=${cert.sednaId} />

      <input type="submit" value="Update" />
    </div>
  </form>
</section>`;

export async function editPageCert(ctx) {
  const certId = ctx.params.id;
  const cert = await getCertById(certId);
  ctx.render(editTemplate(cert, onSubmit, false));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      certName: formData.get("new-cert"),
      issueDate: formData.get("issue-date"),
      expireDate: formData.get("expire-date"),
      sednaId: formData.get("sednaId"),
    };

    if (!data.certName) {
      return ctx.render(editTemplate(cert, onSubmit, true));
    }

    await editCertById(certId, data);
    event.target.reset();
    ctx.page.redirect(`/createCert/` + cert.ship.objectId);
  }
}
