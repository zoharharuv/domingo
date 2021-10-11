import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { userReducer } from './reducers/user.reducer.js'
import { boardReducer } from './reducers/board.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

const rootReducer = combineReducers({
    userModule : userReducer,
    boardModule : boardReducer,
    systemModule : systemReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



