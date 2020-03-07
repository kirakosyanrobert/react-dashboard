import React from 'react'

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="container d-flex justify-content-center">
            <h1>Something went wrong.</h1>
          </div>
        ) 
      }
  
      return this.props.children; 
    }
  }