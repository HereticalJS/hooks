# @caasi/hooks

Some useful React Hooks.

## Install

```
npm install @caasi/hooks
```

## Basic usage

### `usePromise`

```typescript
declare const usePromise: <T>(p: Promise<T | undefined>, init?: T) => [T | undefined, Error, boolean];
```

`usePromise` resolve a `Promise` and returns its status.

```javascript
const [value, error, isPending] = usePromise(api.get('https://example.com'));
```

### `useImageData`

```typescript
declare const useImageData: (url: string) => ImageData | undefined;
```

 `useImageData` reads an image from a URL and gives you a `ImageData`.

 ```javascript
 const imageData = useImageData('https://example.com/lena.png');
 ```

### `useTime`

```typescript
declare const useTime: () => number;
```

`useTime` gives a `DOMHighResTimeStamp` diff from the time it was called first time.

```javascript
const t = useTime();
```

## ToDo

* [x] `useBlob`
* [ ] Test custom hooks in a headless browser
* [ ] use `useDebugValue`
