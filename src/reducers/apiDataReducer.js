import {ADD_APIDATA} from '../actions/apiData'

const initialState = [];
const initialState1 = [
    {
        id: 1,
        name:'',
        method:'',
        url:'',
        param:'',
        returnParam:'',        
    }
];
export const apiDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_APIDATA:
            return [...state,action.data];
        break;
        default:
            return state;
    }
}