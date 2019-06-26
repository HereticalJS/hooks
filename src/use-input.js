import useProp from './use-prop';

function useInput(element, value = '') {
  return useProp(element, value, 'value', 'onChange', e => e.target.value);
}

export default useInput;
