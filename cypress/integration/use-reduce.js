import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  array,
  sum,
  AsArray,
  AsSum,
} from '../components/Reduce';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useReduce`', () => {
  it('should reduce to an array', () => {
    cy.mount(<AsArray />);
    cy.get('#value')
      .contains(`${array}`);
  });

  it('should reduce to a single value', () => {
    cy.mount(<AsSum />);
    cy.get('#value')
      .contains(`${sum}`);
  });
});

