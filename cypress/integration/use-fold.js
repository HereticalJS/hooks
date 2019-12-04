import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  array,
  sum,
  AsArray,
  AsSum,
} from '../components/Fold';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useFold`', () => {
  it('should fold to an array', () => {
    cy.mount(<AsArray />);
    cy.get('#value')
      .contains(`${array}`);
  });

  it('should fold to a single value', () => {
    cy.mount(<AsSum />);
    cy.get('#value')
      .contains(`${sum}`);
  });
});

