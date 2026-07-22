import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-panel border border-red-900/50 rounded text-center m-6">
          <AlertTriangle className="w-12 h-12 text-accent mb-4" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-2">Module Exception Detected</h2>
          <p className="text-sm text-gray-400 max-w-md mb-6 font-mono bg-gray-900/80 p-3 rounded border border-gray-800">
            {this.state.error?.toString() || "An unexpected rendering error occurred."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="inline-flex items-center px-4 py-2 bg-accent hover:bg-yellow-600 text-black font-bold uppercase text-xs tracking-widest rounded transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Reload Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
