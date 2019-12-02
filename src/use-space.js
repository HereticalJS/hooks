import { useState, useEffect } from 'react';

/**
 * Transforms states in time into states in space, and expose a function to
 * reset them.
 * It also take a lot of spaces if you are not watching. XD
 */
function useSpace(state) {
  // TODO: use an empty array as the initial value
  const [states, setStates] = useState();

  useEffect(() => {
    // TODO: stop using `undefined` as a reste signal
    if (state === undefined) {
      setStates();
      return;
    }

    setStates((ss = []) => [...ss, state]);
  }, [state]);

  return [states, setStates];
}

export default useSpace;
