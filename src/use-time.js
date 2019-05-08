import { useState, useEffect } from 'react';

const start = 'performance' in window ? performance.now() : 0;

function useTime() {
  const [time, setTime] = useState(0);

  const step = function(current) {
    setTime(current - start);
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return time;
}

export default useTime;
