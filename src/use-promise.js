import { useState, useEffect } from 'react';

export const nothing = Promise.resolve();

function usePromise(promise = nothing) {
    const [[value, error, isPending], setResult] = useState([
        undefined,
        undefined,
        false,
    ]);

    useEffect(() => {
        setResult([value, error, true]);
        promise.then(
            x => setResult([x, undefined, false]),
            e => setResult([undefined, e, false])
        );
    }, [promise]);

    return [value, error, isPending];
}

export default usePromise;
