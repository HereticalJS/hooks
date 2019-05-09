import { renderHook, act } from 'react-hooks-testing-library';
import Blob from 'blob';
import useFile from './use-file';

describe('useFile', () => {
  // prepare test data
  const source0 = 'hello, world';
  const source1 = 'world, hello';
  const buffer0 = Buffer.from(source0, 'utf8');
  const buffer1 = Buffer.from(source1, 'utf8');
  const blob0 = new Blob([source0], { type: 'text/plain' });
  const blob1 = new Blob([source1], { type: 'text/plain' });

  // create a dummy FileReader
  let dummyFileReader = {};
  let addEventListener;
  let removeEventListener;
  let readAsArrayBuffer;

  beforeAll(() => {
    removeEventListener = jest.fn();
    dummyFileReader.removeEventListener = removeEventListener.bind(dummyFileReader);
    readAsArrayBuffer = jest.fn();
    dummyFileReader.readAsArrayBuffer = readAsArrayBuffer.bind(this);
    window.FileReader = jest.fn(() => dummyFileReader);
  });

  beforeEach(() => {
    addEventListener = jest
      .fn()
      .mockImplementationOnce((_, evtHandler) => {
        process.nextTick(evtHandler, { target: { result: buffer0 } });
      })
      .mockImplementationOnce((_, evtHandler) => {
        process.nextTick(evtHandler, { target: { result: buffer1 } });
      });
    dummyFileReader.addEventListener = addEventListener.bind(dummyFileReader);
  });

  afterEach(() => jest.clearAllMocks());

  test('should read a blob', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFile(blob0));

    expect(result.current).toBe(undefined);

    expect(FileReader.mock.calls.length).toBe(1);
    expect(addEventListener.mock.calls.length).toBe(1);
    expect(readAsArrayBuffer.mock.calls.length).toBe(1);

    await waitForNextUpdate();

    expect(removeEventListener.mock.calls.length).toBe(1);

    expect(result.current).toBe(buffer0);
  });

  test('should cleanup when switching to a new blob', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (b) => useFile(b),
      { initialProps: blob0 }
    );

    expect(result.current).toBe(undefined);

    expect(FileReader.mock.calls.length).toBe(1);
    expect(addEventListener.mock.calls.length).toBe(1);
    expect(readAsArrayBuffer.mock.calls.length).toBe(1);

    await waitForNextUpdate();

    expect(removeEventListener.mock.calls.length).toBe(1);

    expect(result.current).toBe(buffer0);

    rerender(blob1);

    expect(removeEventListener.mock.calls.length).toBe(2);

    expect(result.current).toBe(buffer0);

    expect(FileReader.mock.calls.length).toBe(2);
    expect(addEventListener.mock.calls.length).toBe(2);
    expect(readAsArrayBuffer.mock.calls.length).toBe(2);

    await waitForNextUpdate();

    expect(removeEventListener.mock.calls.length).toBe(3);

    expect(result.current).toBe(buffer1);
  });
});
