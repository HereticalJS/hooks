import { useCallback } from 'react';
import useFold from './use-fold';

export default function useFilter(x, f) {
  const filter = useCallback((prev, curr) => (f(curr) ? curr : prev));
  return useFold(x, filter, x);
}
