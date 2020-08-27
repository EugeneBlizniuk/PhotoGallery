import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import auth from '../user/auth/auth';

const request = (options) => {
    const headers = new Headers(
        {
            'Content-Type': 'application/json',
        }
    );
    
    const actualToken = auth.getToken(ACCESS_TOKEN);
    if(actualToken) {
        headers.append('Authorization', 'Bearer ' + actualToken);
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// AUTHENTICATION CONTROLLER

export function login(loginRequest) {
    return request(
        {
            url: API_BASE_URL + "/auth/sign-in",
            method: 'POST',
            body: JSON.stringify(loginRequest)
        }
    );
}

export function signup(signupRequest) {
    return request(
        {
            url: API_BASE_URL + "/auth/sign-up",
            method: 'POST',
            body: JSON.stringify(signupRequest)
        }
    );
}

// USER CONTROLLER

export function checkUsernameAvailability(username) {
    return request(
        {
            url: API_BASE_URL + "/users/checkUsernameAvailability?username=" + username,
            method: 'GET'
        }
    );
}

export function checkEmailAvailability(email) {
    return request(
        {
            url: API_BASE_URL + "/users/checkEmailAvailability?email=" + email,
            method: 'GET'
        }
    );
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request(
        {
            url: API_BASE_URL + "/users/me",
            method: 'GET'
        }
    );
}

export function getUserProfile(username) {
    return request(
        {
            url: API_BASE_URL + "/users/" + username,
            method: 'GET'
        }
    );
}

export function getUserAlbums(username) {
    return request(
        {
            url: API_BASE_URL + "/users/" + username + "/profile-content",
            method: 'GET'
        }
    );
}

export function getUserImages(username, albumId) {
    return request(
        {
            url: API_BASE_URL + "/users/" + username + "/albums/" + albumId,
            method: 'GET'
        }
    );
}

export function isFollowing(username) {
    return request (
        {
            url: API_BASE_URL + "/users/isFollowing/" + username,
            method: 'GET'
        }
    )
}

export function followUser(username) {
    return request (
        {
            url: API_BASE_URL + "/users/follow/" + username,
            method: 'POST'
        }
    )
}

export function unfollowUser(username) {
    return request (
        {
            url: API_BASE_URL + "/users/unfollow/" + username,
            method: 'DELETE'
        }
    )
}

// ALBUM CONTROLLER

export function createAlbum(albumData) {
    return request(
        {
            url: API_BASE_URL + "/albums/new-album",
            method: 'POST',
            body: JSON.stringify(albumData)         
        }
    );
}

export function deleteAlbum(albumId) {
    return request(
        {
            url: API_BASE_URL + "/albums/" + albumId,
            method: 'DELETE'
        }
    );
}   

export function toggleAlbumPrivate(albumId) {
    return request(
        {
            url: API_BASE_URL + "/albums/private/" + albumId,
            method: 'PUT'
        }
    );
}   

// IMAGE CONTROLLER

export function getLastImages() {
    return request(
        {
            url: API_BASE_URL + "/images/last-added",
            method: 'GET'
        }
    );
}

export function getLastImagesAmount(amount) {
    return request(
        {
            url: API_BASE_URL + "/images/last-added?amount=" + amount,
            method: 'GET'
        }
    );
}

export function uploadImage(imageData) {
    return request(
        {
            url: API_BASE_URL + "/images/new-image",
            method: 'POST',
            body: JSON.stringify(imageData)         
        }
    );
}

export function deleteImage(imageId) {
    return request(
        {
            url: API_BASE_URL + "/images/" + imageId,
            method: 'DELETE'
        }
    );
}

export function getFriendImages() {
    return request (
        {
            url: API_BASE_URL + "/images/friends",
            method: 'GET'
        }
    )
}