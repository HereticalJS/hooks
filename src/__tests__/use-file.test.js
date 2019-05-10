import { renderHook, act } from 'react-hooks-testing-library';
import Blob from 'blob';
import * as DFR from './dummy-file-reader';
import useFile from '../use-file';

describe('useFile', () => {
  beforeAll(() => DFR.init());

  beforeEach(() => DFR.prepareMocks());

  afterEach(() => DFR.clearMocks());

  test('should read a blob', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFile(DFR.data[0].blob));

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
      (b) => useFile(b),
      { initialProps: DFR.data[0].blob }
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
