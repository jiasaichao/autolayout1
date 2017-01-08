import Loki from 'lokijs';

export const ADD_APIDATA = 'ADD_APIDATA'
export const Add_ApiDataAction = (data) => {
    return {
        type: ADD_APIDATA,
        data,
    }
}

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (data) => {
    return function () {
        if (window.Loki === undefined) {
            window.Loki = new Loki('loki.json');
        }
    }
}