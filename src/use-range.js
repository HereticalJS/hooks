import useTime from './use-time';

function useRange(start = 0.0, end = 1.0) {
  const time = useTime();
  const d = end - start;
  return start + (time % d);
}

export default useRange;
