import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';


const initalState = {
   user: {}
}

export default (state = initalState, action) => {
    switch(action.type) {
        case ADD_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        case REMOVE_CURRENT_USER:
            return {
                ...state,
                user: {}
            };
        default: 
        return state;
    }
} 