import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePromise } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

const delay = time => value =>
  new Promise(resolve => setTimeout(resolve, time, value));

beforeEach(() => fixScope(ReactDOM)(window));

describe('`usePromise`', () => {
  it('should pass anything other than a promise', () => {
    function NotAPromise({ data }) {
      const [result = ''] = usePromise(data);
      return result;
    }

    cy.mount(<NotAPromise data="foobar" />);
    cy.contains('foobar');
  });

  it('should resolve a promise', () => {
    function Resolved({ data }) {
      const p = useMemo(() => Promise.resolve(data), []);
      const [result = ''] = usePromise(p);
      return result;
    }

    cy.mount(<Resolved data="foobar" />);
    cy.contains('foobar');
  });

  it('should reject a promise', () => {
    function Rejected({ error }) {
      const p = useMemo(() => Promise.reject(error), []);
      const [, err] = usePromise(p);
      return err ? err.message : null;
    }

    cy.mount(<Rejected error={new Error('oops')} />);
    cy.contains('oops');
  });

  it('should wait for a promise', () => {
    function Pending() {
      const p = useMemo(() => delay(100)(), []);
      const [,, isPending] = usePromise(p);
      return (
        <div id="value">{`${isPending}`}</div>
      );
    }

    cy.mount(<Pending />);
    cy.get('#value')
      .contains('true');
  });

  it('should use undefined to reset a result', () => {
    function Reset() {
      const [promise, setPromise] = useState(Promise.resolve(0));
      const [count] = usePromise(promise);
      const inc = () => setPromise(Promise.resolve(count + 1));
      const reset = () => setPromise(undefined);
      return (
        <div>
          <span id="value">{`${count}`}</span>
          <button id="inc" onClick={inc}>increase</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
      );
    }

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

