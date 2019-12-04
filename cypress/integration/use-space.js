import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSpace } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';

function useThree() {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state >= 2) return;
    setTimeout(setState, 100, state + 1);
  }, [state]);

  return state;
}

const flatted = [0, 1, 2];

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useSpace`', () => {
  it('should flat values from time to space', () => {
    function SpaceFromTime() {
      const x = useThree();
      const xs = useSpace(x);
      return (
        <div id="value">{`${xs}`}</div>
      );
    }

    cy.mount(<SpaceFromTime />);
    cy.get('#value')
      .contains(`${flatted}`);
  });
});

