export const settings = {
    host: ''
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        try {
            return await response.json();
        } catch (err) {
            return response;
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }

}

function createOptions(method = 'get', data) {
    const result = {
        method,
        headers: {
            'X-Parse-Application-Id': 'O7mrq94BjqFHm6z7RADiLr1keV7gi3utACxVY7s1',
            'X-Parse-REST-API-Key': 'yntCke3Rfa9Fs6E6vuCFGAUma8FImi3y86vEf0KO'
        }
    }

    if (data) {
        result.headers['Content-type'] = 'application/json';
        result.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        result.headers['X-Parse-Session-Token'] = token;
    }

    return result;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const response = await post(settings.host + '/login', { username, password });

    sessionStorage.setItem('authToken', response.sessionToken);
    sessionStorage.setItem('userId', response.objectId);
    sessionStorage.setItem('username', username);

    return response;
}

export async function register(username, email, password) {
    const response = await post(settings.host + '/users', { username, email, password });

    sessionStorage.setItem('authToken', response.sessionToken);
    sessionStorage.setItem('userId', response.objectId);
    sessionStorage.setItem('username', username);

    return response;
}

export async function logout() {
    const response = await post(settings.host + '/logout', {});

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');

    return response;
}