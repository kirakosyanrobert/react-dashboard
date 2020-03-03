import {TEST_FETCH_BEGIN, TEST_FETCH_SUCCESS, TEST_FETCH_ERROR} from '../actionTypes';

const fetchBegin = () => ({
    type: TEST_FETCH_BEGIN,
});

const fetchSuccess = (users) => ({
    type: TEST_FETCH_SUCCESS,
    payload: users
});

const fetchError = (error) => ({
    type: TEST_FETCH_ERROR,
    payload: error
});


export function fetchDataAction () {
    return (dispatch) => {
        dispatch(fetchBegin);
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(json => dispatch(fetchSuccess(json)))
            .catch(err => dispatch(fetchError(err))) 
    }
} 
