import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import { useMaybe, useOptional } from '../../src';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useOptional`', () => {
  it('should be an alias of `useMaybe`', () => {
    expect(useOptional).to.equal(useMaybe);
  });
});

describe('`useMaybe`', () => {
  it('should not trigger the continuation', () => {
    function WithUndefined() {
      const value = useMaybe([undefined, 1], (x, y) => y, 0);
      return (
        <div id="value">{value}</div>
      );
    }

    cy.mount(<WithUndefined />);
    cy.get('#value')
      .contains('0');
  });

  it('should trigger the continuation', () => {
    function WithoutUndefined() {
      const value = useMaybe([1, 2], (x, y) => x + y, 0);
      return (
        <div id="value">{value}</div>
      );
    }

    cy.mount(<WithoutUndefined />);
    cy.get('#value')
      .contains('3');
  });
});

