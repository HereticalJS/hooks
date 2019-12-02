import { useState, useEffect } from 'react';
import useDefined from './use-defined';

function useGenerator(iter, initial) {
  const [next, setNext] = useState({ done: false, value: initial });

  useEffect(() => {
    if (!iter) return;
    if (next.done) return;
    setNext(iter.next());
  }, [next]);

  useEffect(() => {
    if (!iter) return;
    return () => setNext({ done: false, value: initial });
  }, [iter]);

  return [useDefined(next.value), useDefined(next.done)];
}

export default useGenerator;

