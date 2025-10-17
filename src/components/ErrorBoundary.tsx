import React, { ReactNode, ReactElement } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-md rounded-lg border border-red-700 bg-red-900/20 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-red-100">Something went wrong</h2>
              <p className="mb-4 text-sm text-red-200">{this.state.error?.message}</p>
              <button
                onClick={this.resetError}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
              >
                <RotateCcw className="h-4 w-4" />
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

