import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  WithUndefined,
  WithoutUndefined,
} from '../components/Maybe';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useMaybe`', () => {
  it('should not trigger the continuation', () => {
    cy.mount(<WithUndefined />);
    cy.get('#value')
      .contains('0');
  });

  it('should trigger the continuation', () => {
    cy.mount(<WithoutUndefined />);
    cy.get('#value')
      .contains('3');
  });
});

