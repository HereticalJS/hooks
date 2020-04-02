import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { of } from 'rxjs';
import useObservable from '../../src/use-observable';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useObservable`', () => {
  it('should yields values of an observable', () => {
    function Test() {
      const as = useMemo(() => of(4, 3, 2, 1, 0), []);
      const x = useObservable(as, 0);

      expect(x).to.be.oneOf([4, 3, 2, 1, 0]);

      return null;
    }

    cy.mount(<Test />);
  });
});
