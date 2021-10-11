const initialState = {
    loader: false,
    modal: false,
    mainModal: false,
    modalData: null
}
export function systemReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {

        case 'SET_MODAL_DATA':
            newState = { ...state, modalData: action.data }
            break;

        case 'SET_LOADER':
            newState = { ...state, loader: !state.loader }
            break;

        case 'SET_MODAL':
            newState = { ...state, modal: !state.modal }
            break;
        
            case 'SET_MAIN_MODAL':
            newState = { ...state, mainModal: !state.mainModal }
            break;

        default:
    }

    window.userState = newState;
    return newState;
}
