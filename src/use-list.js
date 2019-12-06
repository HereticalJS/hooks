import useConcat from './use-concat';

const useList = ([x, ...xs]) => useConcat(x, xs.length === 0 ? x : useList(xs));

export default useList;
