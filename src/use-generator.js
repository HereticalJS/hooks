import { useState, useEffect } from 'react';

function useGenerator(iter) {
  const [state, setState] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!iter) return;

    let id;
    const step = () => {
      const { done, value } = iter.next();
      if (done) {
        if (value !== undefined) {
          setState(value);
        }
        setDone(true);
        return;
      }
      setState(value);
      id = setTimeout(step, 0);
    };
    id = setTimeout(step, 0);

    return () => {
      clearTimeout(id);
      id = undefined;
      setState();
      setDone(false);
    };
  }, [iter]);

  return [state, done];
}

export default useGenerator;
