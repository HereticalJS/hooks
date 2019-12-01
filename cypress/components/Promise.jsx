import React, { useMemo, useState } from 'react';
import { usePromise } from '../../';

const delay = time => value =>
  new Promise(resolve => setTimeout(resolve, time, value));

export function NotAPromise({ data }) {
  const [result = ''] = usePromise(data);
  return result;
}

export function Resolved({ data }) {
  const p = useMemo(() => Promise.resolve(data), []);
  const [result = ''] = usePromise(p);
  return result;
}

export function Rejected({ error }) {
  const p = useMemo(() => Promise.reject(error), []);
  const [, err] = usePromise(p);
  return err ? err.message : null;
}

export function Pending() {
  const p = useMemo(() => delay(100)(), []);
  const [,, isPending] = usePromise(p);
  return (
    <div id="value">{`${isPending}`}</div>
  );
}

export function Reset() {
  const [promise, setPromise] = useState(Promise.resolve(0));
  const [count] = usePromise(promise);
  const inc = () => setPromise(Promise.resolve(count + 1));
  const reset = () => setPromise(undefined);
  return (
    <div>
      <span id="value">{`${count}`}</span>
      <button id="inc" onClick={inc}>increase</button>
      <button id="reset" onClick={reset}>reset</button>
    </div>
  );
}

