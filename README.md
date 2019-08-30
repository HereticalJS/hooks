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

## ToDo

* [x] `useBlob`
* [ ] Test custom hooks in a headless browser
* [ ] use `useDebugValue`
