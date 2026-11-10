/**
 * Performance Monitoring Utilities
 * Integración con web-vitals para medir Core Web Vitals
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

export interface WebVitalsMetrics {
  LCP?: number;  // Largest Contentful Paint (ms)
  INP?: number;  // Interaction to Next Paint (ms)
  CLS?: number;  // Cumulative Layout Shift
  FCP?: number;  // First Contentful Paint (ms)
  TTFB?: number; // Time to First Byte (ms)
}

const metrics: WebVitalsMetrics = {};

/**
 * Inicializar recolección de Web Vitals
 * En producción, enviar a servicio de analytics
 */
export function initWebVitals(onMetric?: (metric: Metric) => void) {
  // Largest Contentful Paint
  onLCP((metric) => {
    metrics.LCP = metric.value;
    console.log(`LCP: ${metric.value.toFixed(2)}ms`);
    onMetric?.(metric);
  });

  // Interaction to Next Paint (reemplaza FID)
  onINP((metric) => {
    metrics.INP = metric.value;
    console.log(`INP: ${metric.value.toFixed(2)}ms`);
    onMetric?.(metric);
  });

  // Cumulative Layout Shift
  onCLS((metric) => {
    metrics.CLS = metric.value;
    console.log(`CLS: ${metric.value.toFixed(3)}`);
    onMetric?.(metric);
  });

  // First Contentful Paint
  onFCP((metric) => {
    metrics.FCP = metric.value;
    console.log(`FCP: ${metric.value.toFixed(2)}ms`);
    onMetric?.(metric);
  });

  // Time to First Byte
  onTTFB((metric) => {
    metrics.TTFB = metric.value;
    console.log(`TTFB: ${metric.value.toFixed(2)}ms`);
    onMetric?.(metric);
  });
}

/**
 * Obtener métricas actuales
 */
export function getWebVitalsMetrics(): WebVitalsMetrics {
  return { ...metrics };
}

/**
 * Validar umbrales de Web Vitals
 * https://web.dev/vitals/
 */
export function validateWebVitals(): {
  passed: boolean;
  results: Record<string, { value: number; threshold: number; status: 'good' | 'needsImprovement' | 'poor' }>;
} {
  const thresholds = {
    LCP: 2500,     // < 2.5s = Good
    INP: 200,      // < 200ms = Good (reemplaza FID)
    CLS: 0.1,      // < 0.1 = Good
    FCP: 1800,     // < 1.8s = Good
    TTFB: 600,     // < 600ms = Good
  };

  const results: Record<
    string,
    { value: number; threshold: number; status: 'good' | 'needsImprovement' | 'poor' }
  > = {};
  let allPassed = true;

  const metricNames: Array<keyof WebVitalsMetrics> = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'];
  metricNames.forEach((key) => {
    const value = metrics[key];
    if (value !== undefined) {
      const threshold = thresholds[key];
      const isPassed = value <= threshold;
      const status = isPassed ? 'good' : value <= threshold * 1.25 ? 'needsImprovement' : 'poor';
      
      results[key] = {
        value: Number(value.toFixed(2)),
        threshold,
        status,
      };

      if (!isPassed) {
        allPassed = false;
      }
    }
  });

  return { passed: allPassed, results };
}

/**
 * Log Web Vitals Summary
 */
export function logWebVitalsSummary() {
  const validation = validateWebVitals();
  console.group('📊 Web Vitals Summary');
  console.table(validation.results);
  console.log(`✅ All metrics passed: ${validation.passed}`);
  console.groupEnd();
}
