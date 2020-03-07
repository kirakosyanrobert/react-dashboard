import { TOGGLE_SIDEBAR } from '../actionTypes';

const initalState = {
   open: false
}

export default (state = initalState, action) => {
    switch(action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                open: !state.open
            }
        default: 
        return state;
    }
} 