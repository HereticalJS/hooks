import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useList } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useList`', () => {
  it('should yields values of an array', () => {
    function Test() {
      const as = useMemo(() => [4, 3, 2, 1, 0], []);
      const x = useList(as);

      expect(x).to.be.oneOf([4, 3, 2, 1, 0]);

      return null;
    }

    cy.mount(<Test />);
  });
});
