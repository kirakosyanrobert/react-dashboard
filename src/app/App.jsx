import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/rootReducer';
import { Router } from './Router';
import { Language } from './Language';
import { ErrorBoundary } from './ErrorBoundary';
import { Axios } from './Axios';


export function App() {
  return (
    <ErrorBoundary>
      <Axios>
          <Language>
              <Provider store={store}>
                  <Router />
              </Provider>
          </Language>
      </Axios>
    </ErrorBoundary>
  );
}
