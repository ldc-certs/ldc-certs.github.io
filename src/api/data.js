import * as api from './api.js'

const host = 'https://parseapi.back4app.com'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}

export async function getParlours() {
    return Object.values(await api.get(host + '/classes/Beauty'));
}

export async function getParlourById(id) {
    return await api.get(host + '/classes/Beauty/' + id + '?include=owner');
}

export async function createParlour(parlour) {
    const userId = sessionStorage.getItem('userId');

    parlour.owner = createPointer('_User', userId);

    return await api.post(host + '/classes/Beauty', parlour);
}

export async function editParlourById(id, parlour) {
    return await api.put(host + '/classes/Beauty/' + id, parlour)
}

export async function deleteParlourById(id) {
    return await api.del(host + '/classes/Beauty/' + id);
}

// export async function getRecipeCount() {
//     return api.get(host + '/data/recipes?count');
// }

// export async function getRecent() {
//     return api.get(host + '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
// }

// export async function getCarsByOwner(userId) {
//     const query = JSON.stringify({ owner: createPointer('_User', userId) })
//     return Object.values(await api.get(host + `/classes/Car?where=` + encodeURIComponent(query)));
// }



