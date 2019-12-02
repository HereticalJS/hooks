import React, { useMemo } from 'react';
import { useGenerator, useSpace } from '../../';

function* gen0() {
  yield 0;
  return 1;
}

function* gen1() {
  yield 0;
}

export function YieldReturn() {
  const [value, done] = useGenerator(useMemo(() => gen0(), []));
  const [vs] = useSpace(`${value}:${done}`);
  return (
    <div id="value">{`${vs}`}</div>
  );
}

export function JustYield() {
  const [value, done] = useGenerator(useMemo(() => gen1(), []));
  const [vs] = useSpace(`${value}:${done}`);
  return (
    <div id="value">{`${vs}`}</div>
  );
}

