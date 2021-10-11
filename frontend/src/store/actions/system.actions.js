export function setLoader() {
    return (dispatch) => {
        dispatch({
            type: 'SET_LOADER',
        })
    }
}

export function toggleModal() {
    return (dispatch) => {
        dispatch({
            type: 'SET_MODAL',
        })
    }
}

export function toggleMainModal() {
    return (dispatch) => {
        dispatch({
            type: 'SET_MAIN_MODAL',
        })
    }
}

export function setModalData(modalData) {
    return (dispatch) => {
        dispatch({
            type: 'SET_MODAL_DATA',
            data: modalData,
        })
    }
}

