import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useArray, useSpace } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useSpace`', () => {
  it('should flat values from time to space', () => {
    function Test() {
      const as = useMemo(() => [0, 1, 2], []);
      const x = useArray(as);
      const xs = useSpace(x);

      expect([0, 1, 2]).to.includes.members(xs);

      return null;
    }

    cy.mount(<Test />);
  });
});
