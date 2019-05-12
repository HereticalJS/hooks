import { useState, useEffect } from 'react';

/**
 * Transforms states in time into states in space, and expose a function to
 * reset them.
 * It also take a lot of spaces if you are not watching. XD
 */
function useSpace(state) {
  const [states, setStates] = useState([state]);

  useEffect(() => {
    setStates([...states, state]);
  }, [state]);

  return [states, setStates];
}

export default useSpace;
