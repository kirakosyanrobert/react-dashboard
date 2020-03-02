import {COUNTRY_FILTER, CATEGORY_FILTER, QUERY_FILTER} from '../actionTypes';


const initalState = {
    country: 'ru',
    category: '',
    query: ''
}

export default (state = initalState, action) => {
    switch(action.type) {
        case COUNTRY_FILTER:
            return {
                ...state,
                country: action.payload
            }
        case CATEGORY_FILTER:
            return {
                ...state,
                category: action.payload
            }
        case QUERY_FILTER:
            return {
                ...state,
                query: action.payload
            }
        default: 
        return state;
    }
} 