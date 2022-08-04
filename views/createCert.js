import { html } from "https://unpkg.com/lit-html?module";

import { createCert, getShipById, getCertsByShip } from "../src/api/data.js";

const createTemplate = (onSubmit, isFilled, ship, shipCerts) => html`
  <section class="createShip">
    <div>
      <h1>Create New Certificate</h1>
      ${isFilled
        ? html`<p style="color: red">Please fill in all fields!</p>`
        : ""}
    </div>

    <form @submit=${onSubmit}>
      <div>
        <label for="new-cert">Certificate Name</label>
        <input name="new-cert" type="text" />
        <label for="issue-date">Issue Date</label>
        <input name="issue-date" type="date" />
        <label for="expire-date">Expire Date</label>
        <input name="expire-date" type="date" />
        <label for="sednaId">Sedna Id</label>
        <input name="sednaId" type="text" />

        <input type="submit" value="Create" />
      </div>
    </form>
  </section>

  <section class="ships">
    <h1>${ship.shipName} Certs</h1>

    <div class="my-collection">
      <div>
        <div class="column-cert-name">Cert Name</div>
        <div class="column-cert-valid">Issue Date</div>
        <div class="column-cert-expire">Expire Date</div>
        <div class="column-cert-sednaId">Sedna ID</div>
        <div class="column-cert-opt">Options</div>
      </div>
    </div>

    <div class="my-collection">
      ${shipCerts.length > 0
        ? html`${shipCerts.map(certTemplate)}`
        : html`<p class="no-ships">No certificates in database.</p>`}
    </div>
  </section>
`;

const certTemplate = (shipCerts) => html`
<div>

  <div class="cert-name">
    ${shipCerts.certName}
  </div>
  <div class="cert-valid">
    ${shipCerts.issueDate}
  </div>
  <div class="cert-expire">
    ${shipCerts.expireDate}
  </div>
  <div class="cert-sednaId">
    ${shipCerts.sednaId}
  </div>
  <div class="cert-opt">
    <a class="btn" href="/editCert/${shipCerts.objectId}">Edit</a>
    <a class="btn" href="/deleteCert/${shipCerts.objectId}">Delete</a>
  </div>
  </div>
  </section>
`;

export async function createPageCert(ctx) {
  const shipId = ctx.params.id;
  const ship = await getShipById(shipId);
  const [shipCerts] = await getCertsByShip(shipId);

  if (shipCerts.length > 0) {
    for (let i = 0; i < shipCerts.length; i++) {
      let issue = shipCerts[i].issueDate;
      let [issueYear, issueMonth, issueDay] = issue.split("-");
      switch (issueMonth) {
        case "01":
          issueMonth = "Jan";
          break;
        case "02":
          issueMonth = "Feb";
          break;
        case "03":
          issueMonth = "Mar";
          break;
        case "04":
          issueMonth = "Apr";
          break;
        case "05":
          issueMonth = "May";
          break;
        case "06":
          issueMonth = "Jun";
          break;
        case "07":
          issueMonth = "Jul";
          break;
        case "08":
          issueMonth = "Aug";
          break;
        case "09":
          issueMonth = "Sep";
          break;
        case "10":
          issueMonth = "Oct";
          break;
        case "11":
          issueMonth = "Nov";
          break;
        case "12":
          issueMonth = "Dec";
          break;
      }

      issue = `${issueDay} ${issueMonth} ${issueYear}`;

      shipCerts[i].issueDate = issue;
    }

    for (let i = 0; i < shipCerts.length; i++) {
      let expire = shipCerts[i].expireDate;
      let [expireYear, expireMonth, expireDay] = expire.split("-");
      switch (expireMonth) {
        case "01":
          expireMonth = "Jan";
          break;
        case "02":
          expireMonth = "Feb";
          break;
        case "03":
          expireMonth = "Mar";
          break;
        case "04":
          expireMonth = "Apr";
          break;
        case "05":
          expireMonth = "May";
          break;
        case "06":
          expireMonth = "Jun";
          break;
        case "07":
          expireMonth = "Jul";
          break;
        case "08":
          expireMonth = "Aug";
          break;
        case "09":
          expireMonth = "Sep";
          break;
        case "10":
          expireMonth = "Oct";
          break;
        case "11":
          expireMonth = "Nov";
          break;
        case "12":
          expireMonth = "Dec";
          break;
      }

      expire = `${expireDay} ${expireMonth} ${expireYear}`;

      shipCerts[i].expireDate = expire;
    }
  }

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
    ctx.page.redirect("/createCert/" + shipId);
  }
}
