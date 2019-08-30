# @caasi/hooks

Some useful React Hooks.

## Install

```
npm install @caasi/hooks
```

## Basic usage

```typescript
type Opt<T> = T | undefined;
```

### `usePromise`

Resolves a `Promise` and returns its status.

```typescript
declare const usePromise: <T>(p: Promise<Opt<T>>, init?: T) => [Opt<T>, Error, boolean];

const [value, error, isPending] = usePromise(api.get('https://example.com'));
```

### `useImageData`

Reads an image from a URL and gives you a `ImageData`.

```typescript
declare const useImageData: (url: string) => Opt<ImageData>;

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

### `useImageFile`

Gives a `ImageData` from an image blob. It's an alias of `file => useImageData(useObjectURL(file))`.

### `useSpace`

Stores state histories. It uses `undefined` as a reset value so it can cooperate with other custom hooks.

It's named as `useSpace` instead of `useHistory` because it flattens a value in time to space(a list).

```typescript
declare const useSpace: <T>(s: T) => Opt<[T]>;

const [state, setState] = useState(0);
const histories = useSpace(state);

useEffect(() => {
  setState(s => s + 1);
  console.log(histories);
}, [histories]);
```

### `useWebSocket`

Opens a web socket and streams messages.

```typescript
declare const useWebSocket: (url: string) => [WebSocket, string[], (ss: string[]) => void];

const [socket, messages = []] = useWebSocket('wss://echo.websocket.org');
const msgs = messages.filter(x => x).reverse();
```

### `useProp`

Binds a state and a state handler to a React element.

```typescript
declare const useProp: <T, U, V extends string>(elem: ReactElement<U, V>, value: T, valueKey: string, handlerKey: string, selector: Function): [T, ReactElement<U, V>];

const [val, elem] = useProp(element, value, 'value', 'onChange', e => e.target.value);
```

### `useInput`

A shortcut to bind a value to an input element.

```typescript
const [r, rRange] = useInput(
	<input type="range" min="0.0" max="1.0" step="0.01" />,
	'1.0',
)
```

### `useMaybe`/`useOptional`

Chains optional values into another optional value.

```typescript
declare const useMaybe: <T>(deps: Opt<any>[], f: (...args: any[]) => T) => Opt<T>;
declare const useOptional: typeof useMaybe;

const ab = useMaybe(
  [a, b],
  (a, b) => a * a + b * b,
);
```

### `useGenerator`

Treats a generator as a stream and collects values from it.

```typescript
declare const useGenerator: <T>(iter: Iterator<T>) => [T, boolean];

function* gen() {
  yield 0;
  return 1;
}

const iter = useMemo(() => gen(), []);
const v = useGenerator(iter);
```

## ToDo

* [x] `useBlob`
* [ ] Test custom hooks in a headless browser
* [ ] use `useDebugValue`
* [ ] rewrite in TypeScript
