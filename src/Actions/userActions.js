import * as actionTypes from './Actiontypes';
import axios from 'axios';

export const userIn = (url, obj, history) => {
    //console.log(obj);
    return (dispatch) => {
        axios.post(url, obj)
        .then(response => {
                console.log(response.data);
                if(response.data.username){
                    dispatch({
                        type: actionTypes.SET_LOGIN,
                        data: response.data
                    })
                    history.push("/user");
                }
                else{
                    dispatch({
                        type: actionTypes.FLASH_MESSAGE,
                        data: response.data
                    })
                }
            }
        )
    }
}

export const userOut = (url) => {
    return (dispatch) => {
        axios.post(url)
        .then(response => {
            dispatch({
                type: actionTypes.RESET_LOGIN,
                data: ""
            })
            dispatch({
                type: actionTypes.GET_DATA_SUCCESS,
                data: []
            })
        })
    }
}
export const resetFlash = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET_FLASH,
            data: ""
        })
    }
}