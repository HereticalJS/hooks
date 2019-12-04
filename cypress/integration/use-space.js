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
});

