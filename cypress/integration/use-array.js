import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useArray } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useArray`', () => {
  it('should yields values of an array', () => {
    function Test() {
      const as = useMemo(() => [0, 1, 2], []);
      const x = useArray(as);

      expect(x).to.be.oneOf([0, 1, 2]);

      return null;
    }

    cy.mount(<Test />);
  });
});
