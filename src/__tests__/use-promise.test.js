import { renderHook, act } from 'react-hooks-testing-library';
import usePromise from '../use-promise';

describe('usePromise', () => {
  // XXX:
  //   async tests still emit console errors
  //   see: https://github.com/mpeyper/react-hooks-testing-library/issues/14
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

  test('should pass anything but a Promise or an undefined', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      p => usePromise(p),
      { initialProps: 'foobar' }
    );
    let value;

    [value] = result.current;
    expect(value).toBe('foobar');

    rerender(42);

    [value] = result.current;
    expect(value).toBe(42);
  });

  test('should use undefined to reset result', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      p => usePromise(p),
      { initialProps: Promise.resolve(0) }
    );
    let value;

    [value] = result.current;
    expect(value).toBe(undefined);

    await waitForNextUpdate();

    [value] = result.current;
    expect(value).toBe(0);

    rerender(Promise.resolve());

    [value] = result.current;
    expect(value).toBe(0);

    await waitForNextUpdate();

    [value] = result.current;
    expect(value).toBe(undefined);
  });
});
