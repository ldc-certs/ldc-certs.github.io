import { deleteCertById } from "../src/api/data.js";

export async function deletePageCert(ctx) {
  const token = sessionStorage.getItem("authToken");
  if (token == null) {
    ctx.page.redirect("/");
  }

  const certId = ctx.params.id;
  const confirmed = confirm("Are you sure?");
  if (confirmed) {
    await deleteCertById(certId);
    ctx.page.redirect("/createCert/" + certId.ship);
  }
}
