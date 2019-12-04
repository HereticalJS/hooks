import { useState, useEffect } from 'react';
import useFold from './use-fold';

const concat = (acc = [], x) => [...acc, x];

/**
 * Transforms states in time into states in space, and expose a function to
 * reset them.
 * It also take a lot of spaces if you are not watching. XD
 */
function useSpace(state) {
  return useFold(state, concat, []);
}

export default useSpace;
