import { useState, useEffect } from 'react';

export default function useFold(x, f, init) {
  const [acc, setAcc] = useState(init);

  useEffect(() => {
    setAcc(f(acc, x));
  }, [x, f]);

  return acc;
}
