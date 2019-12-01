import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  NotAPromise,
  Resolved,
  Rejected,
  Pending,
  Reset,
} from '../components/Promise';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`usePromise`', () => {
  it('should pass anything other than a promise', () => {
    cy.mount(<NotAPromise data="foobar" />);
    cy.contains('foobar');
  });

  it('should resolve a promise', () => {
    cy.mount(<Resolved data="foobar" />);
    cy.contains('foobar');
  });

  it('should reject a promise', () => {
    cy.mount(<Rejected error={new Error('oops')} />);
    cy.contains('oops');
  });

  it('should wait for a promise', () => {
    cy.mount(<Pending />);
    cy.get('#value')
      .contains('true');
  });

  it('should use undefined to reset a result', () => {
    cy.mount(<Reset />);
    cy.get('#value')
      .contains('0');
    cy.get('#inc')
      .click()
    cy.get('#value')
      .contains('1');
    cy.get('#reset')
      .click();
    cy.get('#value')
      .contains('undefined');
  });
});

