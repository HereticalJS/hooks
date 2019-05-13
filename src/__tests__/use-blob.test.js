import { renderHook, act } from 'react-hooks-testing-library';
import Blob from 'blob';
import * as DFR from './dummy-file-reader';
import useBlob from '../use-blob';

describe('useBlob', () => {
  beforeAll(() => DFR.init());

  beforeEach(() => DFR.prepareMocks());

  afterEach(() => DFR.clearMocks());

  test('should ignore anything but a Blob', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (b) => useBlob(b),
      { initialProps: undefined },
    );

    expect(DFR.FileReader.mock.calls.length).toBe(0);
    expect(DFR.addEventListener.mock.calls.length).toBe(0);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(0);

    rerender('foobar');

    expect(DFR.FileReader.mock.calls.length).toBe(0);
    expect(DFR.addEventListener.mock.calls.length).toBe(0);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(0);

    rerender(42);

    expect(DFR.FileReader.mock.calls.length).toBe(0);
    expect(DFR.addEventListener.mock.calls.length).toBe(0);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(0);
  });

  test('should read a blob', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBlob(DFR.data[0].blob));

    expect(result.current).toBe(undefined);

    expect(DFR.FileReader.mock.calls.length).toBe(1);
    expect(DFR.addEventListener.mock.calls.length).toBe(1);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(1);

    await waitForNextUpdate();

    expect(DFR.removeEventListener.mock.calls.length).toBe(1);

    expect(result.current).toBe(DFR.data[0].buffer);
  });

  test('should cleanup when switching to a new blob', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (b) => useBlob(b),
      { initialProps: DFR.data[0].blob },
    );

    expect(result.current).toBe(undefined);

    expect(DFR.FileReader.mock.calls.length).toBe(1);
    expect(DFR.addEventListener.mock.calls.length).toBe(1);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(1);

    await waitForNextUpdate();

    expect(DFR.removeEventListener.mock.calls.length).toBe(1);

    expect(result.current).toBe(DFR.data[0].buffer);

    rerender(DFR.data[1].blob);

    expect(DFR.removeEventListener.mock.calls.length).toBe(2);

    expect(result.current).toBe(DFR.data[0].buffer);

    expect(DFR.FileReader.mock.calls.length).toBe(2);
    expect(DFR.addEventListener.mock.calls.length).toBe(2);
    expect(DFR.readAsArrayBuffer.mock.calls.length).toBe(2);

    await waitForNextUpdate();

    expect(DFR.removeEventListener.mock.calls.length).toBe(3);

    expect(result.current).toBe(DFR.data[1].buffer);
  });
});
