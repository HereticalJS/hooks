import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  flatted,
  setted,
  SpaceFromTime,
  SpaceSet,
} from '../components/Space';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useSpace`', () => {
  it('should flat values from time to space', () => {
    cy.mount(<SpaceFromTime />);
    cy.get('#value')
      .contains(`${flatted}`);
  });

  it('should be able to set values', () => {
    cy.mount(<SpaceSet />);
    cy.get('#value')
      .contains(`${setted}`);
  });
});

