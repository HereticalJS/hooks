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
```

```javascript
const [value, error, isPending] = usePromise(api.get('https://example.com'));
```

### `useImageData`

Reads an image from a URL and gives you a `ImageData`.

```typescript
declare const useImageData: (url: string) => ImageData | undefined;
```

```javascript
const imageData = useImageData('https://example.com/lena.png');
```

### `useTime`

Gives a `DOMHighResTimeStamp` diff from the time it was called first time.

```typescript
declare const useTime: () => number;
```

```javascript
const t = useTime();
```

## ToDo

* [x] `useBlob`
* [ ] Test custom hooks in a headless browser
* [ ] use `useDebugValue`
