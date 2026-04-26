import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display' }}>Something went wrong.</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>
            We've encountered a temporary artisan error. Please try refreshing the page.
          </p>
          <button 
            className="login-btn" 
            style={{ width: 'auto', padding: '12px 40px' }}
            onClick={() => window.location.reload()}
          >
            Refresh Boutique
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
