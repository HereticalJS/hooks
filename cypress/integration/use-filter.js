import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useArray, useFilter } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

const mod2 = x => x % 2 === 0;

describe('`useMap`', () => {
  it('should modify every value with the same function', () => {
    function Test() {
      const as = useMemo(() => [0, 1, 2, 3, 4, 5], []);
      const x = useArray(as);
      const y = useFilter(x, mod2);

      expect(y).to.be.oneOf([0, 2, 4]);

      return null;
    }

    cy.mount(<Test />);
  });
});
