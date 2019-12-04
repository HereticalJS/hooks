import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useGenerator, useSpace } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

function* gen0() {
  yield 0;
  return 1;
}

function* gen1() {
  yield 0;
}

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useGenerator`', () => {
  it('should yield and return values', () => {
    function YieldReturn() {
      const [value, done] = useGenerator(useMemo(() => gen0(), []));
      const vs = useSpace(`${value}:${done}`);
      return <div id="value">{`${vs}`}</div>;
    }

    cy.mount(<YieldReturn />);
    cy.get('#value').contains('0:false,1:true');
  });

  it('should yield values without a return', () => {
    function JustYield() {
      const [value, done] = useGenerator(useMemo(() => gen1(), []));
      const vs = useSpace(`${value}:${done}`);
      return <div id="value">{`${vs}`}</div>;
    }

    cy.mount(<JustYield />);
    cy.get('#value').contains('0:true');
  });
});
