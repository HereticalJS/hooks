import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useArray, useMap } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

const mul2 = x => x * 2;

describe('`useMap`', () => {
  it('should modify every value with the same function', () => {
    function Test() {
      const as = useMemo(() => [0, 1, 2], []);
      const x = useArray(as);
      const y = useMap(x, mul2);

      expect(y).to.be.oneOf([0, 2, 4]);

      return null;
    }

    cy.mount(<Test />);
  });
});
