import { useState, useEffect } from 'react';

export default function useConcat(x, y) {
  const [s, set] = useState(x);

  useEffect(() => { set(x) }, [x]);
  useEffect(() => { set(y) }, [y]);

  return s;
}
