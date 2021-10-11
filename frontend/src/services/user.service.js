// import { storageService } from './async-storage.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
// var gWatchedUser = null;
import { httpService } from './http.service'
const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService

async function getUsers(filterBy) {
    const filter = { ...filterBy }
    try {
        return await httpService.get('user', filter)
    } catch (err) {
        console.log(err);
    }
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user;
    return user;
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(userToUpdate) {
    const user = await httpService.put(`user/${userToUpdate._id}`, userToUpdate)
    return user;
}

async function login(credentials, guest = null) {
    var user;
    try {
        if (guest) {
            // GUEST LOGIN
            credentials = { fullname: '', username: 'guest', password: 'guest' }
        }
        user = await httpService.post('auth/login', credentials)
        // socketService.emit('set-user-socket', user._id);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        console.log('error in loggin service', err);
    }
}

async function signup(credentials) {
    const user = await httpService.post('auth/signup', credentials)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    // socketService.emit('set-user-socket', user._id);
    return user
}

async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}














