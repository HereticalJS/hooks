import { useCallback } from 'react';
import useFold from './use-fold';

export default function useMap(x, f) {
  const map = useCallback((_, x) => f(x), [f]);
  return useFold(x, map, x);
}
