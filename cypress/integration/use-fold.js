import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFold } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

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

const array = [0, 1, 2];

const sum = 3;

const concat = (acc, x) => [...acc, x];

const add = (acc, x) => acc + x;

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useFold`', () => {
  it('should fold to an array', () => {
    function AsArray() {
      const as = useFold(useThree(), concat, []);
      return (
        <div id="value">{`${as}`}</div>
      );
    }

    cy.mount(<AsArray />);
    cy.get('#value')
      .contains(`${array}`);
  });

  it('should fold to a single value', () => {
    function AsSum() {
      const sum = useFold(useThree(), add, 0);
      return (
        <div id="value">{`${sum}`}</div>
      );
    }

    cy.mount(<AsSum />);
    cy.get('#value')
      .contains(`${sum}`);
  });
});

