import React, { useState, useEffect, useCallback } from 'react';
import { useReduce } from '../../src';

function useThree() {
  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(setState, 100, 1);
  }, []);

  useEffect(() => {
    setTimeout(setState, 200, 2);
  })

  return state;
}

export const array = [0, 1, 2];

export const sum = 3;

const concat = (acc, x) => [...acc, x];

const add = (acc, x) => acc + x;

export function AsArray() {
  const as = useReduce(useThree(), concat, []);
  return (
    <div id="value">{`${as}`}</div>
  );
}

export function AsSum() {
  const sum = useReduce(useThree(), add, 0);
  return (
    <div id="value">{`${sum}`}</div>
  );
}
