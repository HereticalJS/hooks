import { renderHook, act } from 'react-hooks-testing-library';
import useMaybe from '../use-maybe';

describe('useMaybe', () => {
  // XXX:
  //   async tests still emit console errors
  //   see: https://github.com/mpeyper/react-hooks-testing-library/issues/14
  test('should not trigger the continuation', async () => {
    const { result, waitForNextUpdate } =
      renderHook(() => useMaybe([undefined, 1], x => x, 0));

    const value = result.current;
    expect(value).toBe(0);
  });

  test('should trigger the continuation', async () => {
    const { result, waitForNextUpdate } =
      renderHook(() => useMaybe([1, 2], (x, y) => x + y, 0));

    const value = result.current;
    expect(value).toBe(3);
  });
});
