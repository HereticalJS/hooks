import { useState, useEffect } from 'react';

function isThenable(p) {
  return p.then && typeof p.then === 'function';
}

function usePromise(promise) {
  // TODO: make inner isPending a counter
  const [[value, error, pending], setResult] = useState([
    undefined,
    undefined,
    0,
  ]);

  useEffect(() => {
    if (!promise) {
      setResult([undefined, undefined, pending]);
      return;
    }
    if(!isThenable(promise)) {
      setResult([promise, undefined, pending]);
      return;
    }

    setResult([value, error, pending + 1]);
    promise.then(
      x => setResult([x, undefined, pending - 1]),
      e => setResult([undefined, e, pending - 1])
    );
  }, [promise]);

  return [value, error, pending > 0];
}

export default usePromise;
