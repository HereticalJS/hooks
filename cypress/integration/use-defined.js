import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDefined, useSpace } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

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

const numbers = [0, 1, 2];

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useDefined`', () => {
  it('could be initialized as an undefined value', () => {
    function InitializedUndefined() {
      const v = useDefined();
      return <div id="value">{`${v}`}</div>;
    }

    cy.mount(<InitializedUndefined />);
    cy.get('#value').contains('undefined');
  });

  it('should update only defined values', () => {
    function FilterDefined() {
      const n = useGappedNumbers();
      const v = useDefined(n);
      const vs = useSpace(v);
      return <div id="value">{`${vs}`}</div>;
    }

    cy.mount(<FilterDefined />);
    cy.get('#value').contains(`${numbers}`);
  });
});
