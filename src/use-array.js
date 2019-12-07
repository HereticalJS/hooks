import { useState, useEffect } from 'react';

export default function useArray(xs) {
  const [s, set] = useState(xs[0]);

  useEffect(() => {
    for (let v of xs) {
      setImmediate(set, v);
    }
  }, [xs]);

  return s;
}
