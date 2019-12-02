import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  YieldReturn,
  JustYield,
} from '../components/Generator';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useGenerator`', () => {
  it('should yield and return values', () => {
    cy.mount(<YieldReturn />);
    cy.get('#value')
      .contains('0:false,1:true');
  });

  it('should yield values without a return', () => {
    cy.mount(<JustYield />);
    cy.get('#value')
      .contains('0:true');
  });
});

