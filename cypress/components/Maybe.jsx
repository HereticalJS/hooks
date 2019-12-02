import React from 'react';
import { useMaybe } from '../../src';

export function WithUndefined() {
  const value = useMaybe([undefined, 1], (x, y) => y, 0);
  return (
    <div id="value">{value}</div>
  );
}

export function WithoutUndefined() {
  const value = useMaybe([1, 2], (x, y) => x + y, 0);
  return (
    <div id="value">{value}</div>
  );
}

