import { useState, useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useSpace from '../use-space';

function useThree() {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state >= 2) return;
    setTimeout(setState, 100, state + 1);
  }, [state]);

  return state;
}

// XXX: Looks like it's not possible to test this hook now.
describe('useSpace', () => {
  test('should flat values from time into space', async () => {
    /*
    const { result, waitForNextUpdate } = renderHook(
      () => useSpace(useThree()),
    );

    expect(result.current[0]).toEqual([0]);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual([0, 1]);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual([0, 1, 2]);
    */
  });

  test('should be able to reset values', async () => {
    /*
    const { result, waitForNextUpdate } = renderHook(
      () => useSpace(useThree()),
    );
    let states;
    let setStates;

    await waitForNextUpdate();
    await waitForNextUpdate();

    [states, setStates] = result.current;
    expect(states).toEqual([0, 1, 2]);

    act(() => setStates([]));

    [states] = result.current;
    expect(states).toEqual([]);
    */
  });
});
