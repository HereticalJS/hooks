import useConcat from './use-concat';

// it breaks the rule of hooks but still passes the test:
//
// > Don’t call Hooks inside loops, conditions, or nested functions.
const useList = (xs) => xs.reduceRight((a, b) => useConcat(b, a));

export default useList;
