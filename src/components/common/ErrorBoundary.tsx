import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component para capturar errores en la jerarquía
 * Solo funciona con errores en render, no en event handlers
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log a servicio de error tracking (e.g., Sentry)
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // Aquí se podría enviar a Sentry, Rollbar, etc.
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div role="alert" className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              ¡Algo salió mal!
            </h1>
            <p className="text-gray-600 mb-4">
              Lo sentimos, ocurrió un error inesperado. Por favor, intenta recargar la página.
            </p>
            {isDev && (
              <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-mono text-red-600">
                  Detalles del error (desarrollo)
                </summary>
                <pre className="mt-2 text-xs overflow-auto max-h-40 text-red-700">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-lg bg-primary-700 py-2 font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
