import {COUNTRY_FILTER, CATEGORY_FILTER, QUERY_FILTER} from '../actionTypes';


export const countryAction = (country) => ({
    type: COUNTRY_FILTER,
    payload: country
});


export const categoryAction = (category) => ({
    type: CATEGORY_FILTER,
    payload: category
});


export const queryAction = (query) => ({
    type: QUERY_FILTER,
    payload: query
});