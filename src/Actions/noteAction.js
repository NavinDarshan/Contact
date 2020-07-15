import * as actiontypes from './Actiontypes'
import axios from "axios";

export const getdata = (url , obj , props) =>{
    return(dispatch) => {
        console.log(obj);
        axios.get(url+obj)
        .then(response =>{
            dispatch({
                type : actiontypes.GET_DATA_SUCCESS,
                data : response.data
            });
        })
    }
}
export const postdata = (url , obj , props) => {
    return(dispatch) =>{
        axios.post(url , obj)
        .then(response =>{
            dispatch(getdata(url , obj.username))
        })
    }
}

export const deleteData = (url, obj, history) => {
    return (dispatch) => {
        axios.delete(url, obj)
        .then(response => {
            dispatch(getdata(url, obj.username));
        })
    }
}