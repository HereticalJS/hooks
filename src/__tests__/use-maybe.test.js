import { renderHook, act } from '@testing-library/react-hooks';
import useMaybe from '../use-maybe';

describe('useMaybe', () => {
  test('should not trigger the continuation', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMaybe([undefined, 1], x => x, 0)
    );

    const value = result.current;
    expect(value).toBe(0);
  });

  test('should trigger the continuation', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMaybe([1, 2], (x, y) => x + y, 0)
    );

    const value = result.current;
    expect(value).toBe(3);
  });
});
