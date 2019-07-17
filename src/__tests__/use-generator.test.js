import { renderHook, act } from 'react-hooks-testing-library';
import useGenerator from '../use-generator';

function* gen0() {
  yield 0;
  return 1;
}

function* gen1() {
  yield 0;
}

// XXX: `useGenerator` is not testable right now
describe('useGenerator', () => {
  test('should update many times', async () => {
    /*
    const { result, waitForNextUpdate } = renderHook(() => useGenerator(gen0()));

    let value;

    value = result.current;
    expect(value).toBe(undefined);

    await waitForNextUpdate();

    value = result.current;
    expect(value).toBe(0);

    await waitForNextUpdate();

    value = result.current;
    expect(value).toBe(1);
    */
  });

  test('should just update the yield value', async () => {});
});
