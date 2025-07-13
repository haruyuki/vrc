import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // In production, you could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950 dark:to-gray-800">
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md mx-4">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              Something went wrong
            </h2>
            <p className="text-amber-700 dark:text-amber-300 mb-6">
              We encountered an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-red-600 dark:text-red-400">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-xs overflow-auto rounded">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
