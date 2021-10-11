const initialState = {
    boards: [],
    board: null,
}
export function boardReducer(state = initialState, action) {
    var newState = state;
    var boards;
    switch (action.type) {
        case 'FILTER_BOARD':
            newState = { ...state, board: action.board }
            break;
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break;
        case 'SET_BOARD':
            boards = state.boards.map(board => board._id !== action.board._id ? board : action.board)
            newState = { ...state, boards, board: action.board }
            break;
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break;
        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;
}
