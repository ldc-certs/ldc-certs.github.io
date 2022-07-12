import { deleteShipById } from "../src/api/data.js";

export async function deletePage(ctx) {
  const token = sessionStorage.getItem("authToken");
  if (token == null) {
    ctx.page.redirect("/");
  }

  const shipId = ctx.params.id;
  const confirmed = confirm("Are you sure?");
  if (confirmed) {
    await deleteShipById(shipId);
    ctx.page.redirect("/allShips");
  }
}
