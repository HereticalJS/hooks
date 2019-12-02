import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  numbers,
  InitializedUndefined,
  FilterDefined,
} from '../components/Defined';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useDefined`', () => {
  it('could be initialized as an undefined value', () => {
    cy.mount(<InitializedUndefined />);
    cy.get('#value')
      .contains('undefined');
  });

  it('should update only defined values', () => {
    cy.mount(<FilterDefined />);
    cy.get('#value')
      .contains(`${numbers}`);
  });
});

