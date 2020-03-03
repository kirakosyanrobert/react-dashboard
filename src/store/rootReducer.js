import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import users from './test/testReducer';

const rootReducer = combineReducers({
    users,
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);