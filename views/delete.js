import {
  deleteShipById,
  getCertsByShip,
  deleteCertById,
} from "../src/api/data.js";

export async function deletePage(ctx) {
  const token = sessionStorage.getItem("authToken");
  if (token == null) {
    ctx.page.redirect("/");
  }

  const shipId = ctx.params.id;
  const confirmed = confirm(
    "Are you sure, all CERTS for the ship will be deleted as well?"
  );
  if (confirmed) {
    const [certs] = await getCertsByShip(shipId);

    for (let c of certs) {
      await deleteCertById(c.objectId);
    }

    await deleteShipById(shipId);
    ctx.page.redirect("/allShips");
  }
}
