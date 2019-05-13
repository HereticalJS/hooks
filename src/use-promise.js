import { useState, useEffect } from 'react';

function isThenable(p) {
  return p.then && typeof p.then === 'function';
}

function usePromise(promise) {
  const [[value, error, isPending], setResult] = useState([
    undefined,
    undefined,
    false,
  ]);

  useEffect(() => {
    if (!promise) {
      setResult([undefined, undefined, false]);
      return;
    }
    if(!isThenable(promise)) {
      setResult([promise, undefined, false]);
      return;
    }

    setResult([value, error, true]);
    promise.then(
      x => setResult([x, undefined, false]),
      e => setResult([undefined, e, false])
    );
  }, [promise]);

  return [value, error, isPending];
}

export default usePromise;
