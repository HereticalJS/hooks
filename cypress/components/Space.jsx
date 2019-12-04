import React, { useState, useEffect } from 'react';
import { useSpace } from '../../src';

function useThree() {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state >= 2) return;
    setTimeout(setState, 100, state + 1);
  }, [state]);

  return state;
}

export const flatted = [0, 1, 2];

export const setted = [3, 4, 5];

export function SpaceFromTime() {
  const x = useThree();
  const xs = useSpace(x);
  return (
    <div id="value">{`${xs}`}</div>
  );
}
