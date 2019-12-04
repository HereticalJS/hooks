import { useState, useEffect } from 'react';

export default function useArray(xs) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [xs])

  useEffect(() => {
    if (index < xs.length - 1) setIndex(index + 1);
  }, [index]);

  return xs[index];
}
