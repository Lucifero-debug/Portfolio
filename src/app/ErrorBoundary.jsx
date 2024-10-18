import React, { Component } from 'react';
import * as Sentry from '@sentry/nextjs';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to Sentry
    if (Sentry && Sentry.captureException) {
      try {
        Sentry.captureException(error, { extra: errorInfo });
      } catch (sentryError) {
        console.warn('Error reporting to Sentry failed', sentryError);
      }
    } else {
      console.warn('Sentry is not initialized');
    }
    
    // Log the error to the console
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Optionally display the error message in the UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Error Details: {this.state.error ? this.state.error.toString() : 'Unknown error'}</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
