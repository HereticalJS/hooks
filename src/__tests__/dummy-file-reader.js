import Blob from 'blob';

const source0 = 'hello, world';
const source1 = 'world, hello';
const buffer0 = Buffer.from(source0, 'utf8');
const buffer1 = Buffer.from(source1, 'utf8');
const blob0 = new Blob([source0], { type: 'text/plain' });
const blob1 = new Blob([source1], { type: 'text/plain' });

export const data = [
  {
    source: source0,
    buffer: buffer0,
    blob: blob0,
  },
  {
    source: source1,
    buffer: buffer1,
    blob: blob1,
  },
];

// create a dummy FileReader
let RealFileReader;
let dummyFileReader = {};
export let FileReader;
export let addEventListener;
export let removeEventListener;
export let readAsArrayBuffer;

export function init() {
  removeEventListener = jest.fn();
  dummyFileReader.removeEventListener = removeEventListener.bind(dummyFileReader);
  readAsArrayBuffer = jest
    .fn(b => {
      if (b === undefined) {
        throw new Error("Failed to execute 'readAsArrayBuffer' on 'FileReader': 1 argument required, but only 0 present.");
      }
      if (!(b instanceof Blob)) {
        throw new Error("Failed to execute 'readAsArrayBuffer' on 'FileReader': parameter 1 is not of type 'Blob'.");
      }
    });
  dummyFileReader.readAsArrayBuffer = readAsArrayBuffer.bind(this);
  RealFileReader = window.FileReader;
  window.FileReader = FileReader = jest.fn(() => dummyFileReader);
}

export function prepareMocks() {
  addEventListener = jest
    .fn()
    .mockImplementationOnce((_, evtHandler) => {
      process.nextTick(evtHandler, { target: { result: buffer0 } });
    })
    .mockImplementationOnce((_, evtHandler) => {
      process.nextTick(evtHandler, { target: { result: buffer1 } });
    });
  dummyFileReader.addEventListener = addEventListener.bind(dummyFileReader);
}

export function clearMocks() {
  jest.clearAllMocks();
}

export function done() {
  if (RealFileReader) {
    FileReader = undefined;
    window.FileReader = RealFileReader;
  }
}
