import React from 'react';
import { Provider } from 'react-redux';
import { Language } from './Language';

import {store} from '../store/rootReducer';
import { Router } from './Router';
import { ErrorBoundary } from './ErrorBoundary';


export function App() {
  return (
    <ErrorBoundary>
        <Language>
            <Provider store={store}>
                <Router />
            </Provider>
        </Language>
    </ErrorBoundary>
  );
}
