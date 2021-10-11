import { userService } from '../../services/user.service.js'

const initialState = {
    user: userService.getLoggedinUser() || null,
    users: [],
    watchedUser: null
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'UPDATE_USER':

            const updatedUsers = state.users.map(user => user._id !== action.user._id ? user : action.user)
           
            newState = { ...state, user: action.user,users:updatedUsers }
            
            break;
           
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;
}
