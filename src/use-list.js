import useConcat from './use-concat';

// it breaks the rule of hooks but still passes the test:
//
// > Don’t call Hooks inside loops, conditions, or nested functions.
//
// `xs.reduce(useConact)` will not work by breaking the same rule.
const useList = ([x, ...xs]) => useConcat(x, xs.length === 0 ? x : useList(xs));

export default useList;
