import { useState, useEffect } from 'react';

export default function useDefined(state) {
  const [prev, setPrev] = useState(state);

  useEffect(() => {
    if (state === undefined) return;
    setPrev(state);
  }, [state]);

  return prev;
}

