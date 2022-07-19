import * as api from "./api.js";

const host = "https://parseapi.back4app.com";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(name, id) {
  return {
    __type: "Pointer",
    className: name,
    objectId: id,
  };
}

export async function getShips() {
  return Object.values(await api.get(host + "/classes/Ships"));
}

export async function getShipById(id) {
  return await api.get(host + "/classes/Ships/" + id);
}

export async function getCertById(certId) {
  return await api.get(host + "/classes/Certs/" + certId);
}

export async function createShip(ship) {
  const userId = sessionStorage.getItem("userId");

  ship.owner = createPointer("_User", userId);

  return await api.post(host + "/classes/Ships", ship);
}

export async function createCert(cert, shipId) {
  const userId = sessionStorage.getItem("userId");

  cert.owner = createPointer("_User", userId);
  cert.ship = createPointer("_Ships", shipId);

  return await api.post(host + "/classes/Certs", cert);
}

export async function editShipById(id, ship) {
  return await api.put(host + "/classes/Ships/" + id, ship);
}

export async function editCertById(certId, cert) {
  return await api.put(host + "/classes/Certs/" + certId, cert);
}

export async function deleteShipById(id) {
  return await api.del(host + "/classes/Ships/" + id);
}

export async function deleteCertById(certId) {
  return await api.del(host + "/classes/Certs" + certId);
}

export async function getCertsByShip(shipId) {
  const query = JSON.stringify({ ship: createPointer("_Ships", shipId) });
  return Object.values(
    await api.get(host + `/classes/Certs?where=` + encodeURIComponent(query))
  );
}

export async function getShipsByName(criteria) {
  const query = JSON.stringify({
    $or: [
      { shipName: { $regex: criteria, $options: "i" } },
      // { city: { $regex: criteria, $options: "i" } },
      // { machine: { $regex: criteria, $options: "i" } },
      // { machineSN: { $regex: criteria, $options: "i" } },
      // { applicator: { $regex: criteria, $options: "i" } },
      // { applicatorSN: { $regex: criteria, $options: "i" } },
      // { description: { $regex: criteria, $options: "i" } },
    ],
  });
  console.log(query);
  return Object.values(
    await api.get(host + `/classes/Ships?where=` + encodeURIComponent(query))
  );
}
