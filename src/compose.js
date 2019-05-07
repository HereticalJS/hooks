function compose(...fns) {
    return function(x) {
        // loop as a foldr
        let result = x;
        for (let i = fns.length - 1; i >= 0; --i) {
            if (!(typeof fns[i] === 'function')) continue;
            result = fns[i](result);
        }
        return result;
    };
}

export default compose;
