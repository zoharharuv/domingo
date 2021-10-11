import { userService } from './../../services/user.service';
import { showErrorMsg } from "../../services/event-bus.service.js";
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../../services/socket.service.js";

export function loadUsers(filterBy = null) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function updateUser(oldUser) {

    return async dispatch => {
        try {
            const user = await userService.update(oldUser)
            dispatch({ type: 'UPDATE_USER', user })
        } catch (err) {
            console.log('UserActions: err in update user', err)
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}

export function loginGuest() {
    return async (dispatch) => {
        try {
            const user = await userService.login(null, true)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot loginGuest')
            console.log('Cannot loginGuest', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

export function loadAndWatchUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}

