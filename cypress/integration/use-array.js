import React, { useMemo, useState, useEffect } from 'react';
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

  it('should yields values from different array', () => {
    function Test() {
      const as = useMemo(() => [4, 3, 2, 1, 0], []);
      const bs = useMemo(() => [2, 4, 6], []);
      const [ss, set] = useState(as);
      const x = useArray(ss);

      useEffect(() => {
        if (x === 0) set(bs);
      }, [x]);

      expect(x).to.be.oneOf([4, 3, 2, 1, 0, 2, 4, 6]);

      return null;
    }

    cy.mount(<Test />);
  });
});
