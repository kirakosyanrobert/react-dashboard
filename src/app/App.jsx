import React from 'react';
import { Provider } from 'react-redux';

import {store} from '../store/rootReducer';
import { Router } from './Router';
import { ErrorBoundary } from './ErrorBoundary';


export function App() {
  return (
    <ErrorBoundary>
        <Provider store={store}>
            <Router />
        </Provider>
    </ErrorBoundary>
  );
}
