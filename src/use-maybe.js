import { useMemo } from 'react';

function hasUndefined(xs) {
  return xs.reduce((acc, x) => acc || x === undefined, false);
}

function useMaybe(dependencies, f, fallback) {
  return useMemo(
    () => (hasUndefined(dependencies) ? fallback : f.apply(null, dependencies)),
    dependencies
  );
}

export default useMaybe;
