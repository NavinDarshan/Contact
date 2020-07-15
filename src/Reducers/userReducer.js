import * as actionTypes from '../Actions/Actiontypes'

const initialState = {
    username: "",
    id: null,
    islogged: false,
    flashMessage: "",
    flash: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            console.log("its reducer action")
            console.log(action.data);
            return {
                ...state,
                username: action.data.username,
                id: action.data.id,
                islogged: true,
                flashMessage: action.data.message,
                flash: true
            }
        case actionTypes.RESET_LOGIN:
            return {
                username: "",
                islogged: false
            }
        case actionTypes.FLASH_MESSAGE:
            return {
                ...state,
                flashMessage: action.data.message,
                flash: true
            }
        case actionTypes.RESET_FLASH:
            return {
                ...state,
                flashMessage: "",
                flash: false
            }
        default:
            return state;
    }
}
export default userReducer;