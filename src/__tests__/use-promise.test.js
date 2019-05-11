import { renderHook, act } from 'react-hooks-testing-library';
import usePromise from '../use-promise';

describe('usePromise', () => {
  // XXX:
  //   async tests still emit console errors
  //   see: https://github.com/mpeyper/react-hooks-testing-library/issues/14
  test('should ignore anything but a Promise', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      p => usePromise(p),
      { initialProps: undefined },
    );
    let value;

    [value] = result.current;
    expect(value).toBe(undefined);

    rerender(42);

    [value] = result.current;
    expect(value).toBe(undefined);
  });

  test('should resolve a promise', async () => {
    const p = Promise.resolve(true);
    const { result, waitForNextUpdate } = renderHook(() => usePromise(p));

    let value;
    let error;
    let isPending;

    [value, error, isPending] = result.current;
    expect(value).toBe(undefined);
    expect(error).toBe(undefined);
    expect(isPending).toBe(true);

    await waitForNextUpdate();

    [value, error, isPending] = result.current;
    expect(value).toBe(true);
    expect(error).toBe(undefined);
    expect(isPending).toBe(false);
  });

  test('should reject a promise', async () => {
    const p = Promise.reject(new Error('oops!'));
    const { result, waitForNextUpdate } = renderHook(() => usePromise(p));

    let value;
    let error;
    let isPending;

    [value, error, isPending] = result.current;
    expect(value).toBe(undefined);
    expect(error).toBe(undefined);
    expect(isPending).toBe(true);

    await waitForNextUpdate();

    [value, error, isPending] = result.current;
    expect(value).toBe(undefined);
    expect(error.message).toBe('oops!');
    expect(isPending).toBe(false);
  });
});
