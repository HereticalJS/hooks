import React, { cloneElement, useCallback, useState } from 'react';

const id = x => x;

function useProp(element, value, valueKey, handlerKey, selector = id) {
  const [state, setState] = useState(value);
  const handler = useCallback(
    (...args) => setState(selector(...args)),
    [selector]
  );
  const elem = cloneElement(
    element,
    {
      [valueKey]: state,
      [handlerKey]: handler,
    }
  )
  return [state, elem];
}

export default useProp;
