import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useArray, useFold } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

const array = [0, 1, 2];

const sum = 3;

const concat = (acc, x) => [...acc, x];

const add = (acc, x) => acc + x;

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useFold`', () => {
  it('should fold to an array', () => {
    function AsArray() {
      const as = useFold(useArray(array), concat, []);
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
      const sum = useFold(useArray(array), add, 0);
      return (
        <div id="value">{`${sum}`}</div>
      );
    }

    cy.mount(<AsSum />);
    cy.get('#value')
      .contains(`${sum}`);
  });
});

