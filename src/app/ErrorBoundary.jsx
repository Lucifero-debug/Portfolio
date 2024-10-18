'use client'
import React, { Component } from 'react';
import * as Sentry from '@sentry/nextjs';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to Sentry but prevent it from crashing the app
    if (Sentry && Sentry.captureException) {
      try {
        Sentry.captureException(error, { extra: errorInfo });
      } catch (sentryError) {
        console.warn('Error reporting to Sentry failed', sentryError);
      }
    } else {
      console.warn('Sentry is not initialized');
    }
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
