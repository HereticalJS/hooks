import { useState, useMemo, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export default function useObservable(input$, initialState) {
  const [state, setState] = useState(initialState);
  const state$ = useMemo(() => new BehaviorSubject(initialState), []);

  useEffect(() => {
    const sub = state$.subscribe(x => setState(x));
    return sub.unsubscribe.bind(sub);
  }, [state$]);

  useEffect(() => {
    const sub = input$.subscribe(state$.next.bind(state$));
    return sub.unsubscribe.bind(sub);
  }, [input$]);

  return state;
}
