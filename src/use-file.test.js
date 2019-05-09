import { renderHook, act } from 'react-hooks-testing-library';
import Blob from 'w3c-blob';
import useFile from './use-file';

// prepare test data
const source = 'hello, world';
const blob = new Blob([source], { type: 'text/plain' });
const buffer = Buffer.from(source, 'utf8');

// create a dummy FileReader
let dummyFileReader = { result: buffer };
dummyFileReader.addEventListener = jest.fn((_, evtHandler) => {
  process.nextTick(evtHandler, { target: dummyFileReader });
}).bind(dummyFileReader);
dummyFileReader.removeEventListener = jest.fn().bind(dummyFileReader);
dummyFileReader.readAsArrayBuffer = jest.fn().bind(dummyFileReader);
window.FileReader = jest.fn(() => dummyFileReader);

test('should read a blob', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFile(blob));

  expect(result.current).toBe(undefined);

  await waitForNextUpdate();

  expect(result.current).toBe(buffer);
});

// TODO
//text('should cleanup the old blob when switching to the new blob', async () => {
//});
