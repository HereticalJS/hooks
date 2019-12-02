import { useState, useEffect } from 'react';
import useDefined from './use-defined';

function callNext(iter) {
  return iter && typeof iter.next === 'function' && iter.next();
}

function useGenerator(iter) {
  const [next = { done: false }, setNext] = useState(callNext(iter));

  useEffect(() => {
    if (!iter) return;
    if (next.done) return;
    setNext(callNext(iter));
  }, [next]);

  useEffect(() => {
    if (!iter) return;
    return () => setNext(callNext(iter));
  }, [iter]);

  return [useDefined(next.value), useDefined(next.done)];
}

export default useGenerator;
