import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';

export const addCurrentUser = (user) => ({
    type: ADD_CURRENT_USER,
    payload: user
});

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})
