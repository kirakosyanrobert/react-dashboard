import {TEST_FETCH_BEGIN, TEST_FETCH_SUCCESS, TEST_FETCH_ERROR} from '../actionTypes';

const initalState = {
    users: [],
    loading: false,
    error: ''
}

export default (state = initalState, action) => {
    switch(action.type) {
        case TEST_FETCH_BEGIN:
            return {
                ...state,
                loading: true
            }
        case TEST_FETCH_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case TEST_FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: 
        return state;
    }
} 