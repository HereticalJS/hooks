import { useState, useEffect } from 'react';

function useGenerator(iter) {
  const [counter, setCounter] = useState(0);
  const [state, setState] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!iter) return;
    const { done, value } = iter.next();
    if (done) {
      if (value !== undefined) {
        setState(value);
      }
      setDone(true);
      return;
    }
    setState(value);
    setCounter(counter + 1);
  }, [iter, counter])

  useEffect(() => {
    if (!iter) return;
    setCounter(1);
    return () => {
      setCounter(0);
      setState();
      setDone(false);
    };
  }, [iter]);

  return [state, done];
}

export default useGenerator;
