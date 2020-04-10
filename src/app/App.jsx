import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/rootReducer';
import { Router } from './Router';
import { Language } from './Language';
import { ErrorBoundary } from './ErrorBoundary';
import { MessageProvider } from './MessageProvider';


export function App() {
  return (
    <ErrorBoundary>
      <MessageProvider>
          <Language>
              <Provider store={store}>
                  <Router />
              </Provider>
          </Language>
      </MessageProvider>
    </ErrorBoundary>
  );
}
