import React, { useState, useEffect } from 'react';
import { useDefined, useSpace } from '../../src';

function useGappedNumbers() {
  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(setState, 100, 1);
  }, []);

  useEffect(() => {
    setTimeout(setState, 200);
  }, []);

  useEffect(() => {
    setTimeout(setState, 300, 2);
  }, []);

  useEffect(() => {
    setTimeout(setState, 400);
  }, []);

  return state;
}

export const numbers = [0, 1, 2];

export function InitializedUndefined() {
  const v = useDefined();
  return (
    <div id="value">{`${v}`}</div>
  );
}

export function FilterDefined() {
  const n = useGappedNumbers();
  const v = useDefined(n);
  const [vs] = useSpace(v);
  return (
    <div id="value">{`${vs}`}</div>
  );
}
