# @caasi/hooks

Some useful React Hooks.

## Install

```
npm install @caasi/hooks
```

## Basic usage

### `usePromise`

Resolves a `Promise` and returns its status.

```typescript
declare const usePromise: <T>(p: Promise<T | undefined>, init?: T) => [T | undefined, Error, boolean];

const [value, error, isPending] = usePromise(api.get('https://example.com'));
```

### `useImageData`

Reads an image from a URL and gives you a `ImageData`.

```typescript
declare const useImageData: (url: string) => ImageData | undefined;

const imageData = useImageData('https://example.com/lena.png');
```

### `useTime`

Gives a `DOMHighResTimeStamp` diff from the time it was called first time.

```typescript
declare const useTime: () => number;

const t = useTime();
```

### `useRange`

Gives a number between `start` and `end`. It's an application of `useTime` and it's useful in simple animation.

```typescript
declare const useRange: (start: number, end: number) => number;

const theta = useRange(0, 2 * Math.PI);
const x = Math.cos(theta);
const y = Math.sin(theta);
const pt = { x, y };
```

### `useBlob`/`useFile`

Reads a `Blob` as an `ArrayBuffer` or a string. Defaults to an `ArrayBuffer`.

```typescript
enum ResultType {
    ARRAY_BUFFER = 'arraybuffer',
    BINARY_STRING = 'binarystring',
    DATA_URL = 'dataurl',
    TEXT = 'text',
}
declare const useBlob: (blob: Blob, type: ResultType) => ArrayBuffer | string;
declare const useFile: typeof useBlob;

const dataurl = useBlob(file, useBlob.ResultType.DATA_URL);
```

### `useObjectURL`

Creates an object URL from anything. It's useful with an image blob.

```typescript
declare const useObjectURL: (o: any) => string;

const imageData = useImageData(useObjectURL(file));
```

## ToDo

* [x] `useBlob`
* [ ] Test custom hooks in a headless browser
* [ ] use `useDebugValue`
* [ ] rewrite in TypeScript
