import { useState, useEffect } from 'react';

function useGenerator(iter) {
	const [state, setState] = useState();

	useEffect(() => {
		if (!iter) return;

		let id;
		const step = () => {
			const { done, value } = iter.next();
			if (done) {
				if (value !== undefined) {
					setState(value);
				}
				return;
			}
			setState(value);
			id = setTimeout(step, 0);
		}
		id = setTimeout(step, 0);

		return () => {
			clearTimeout(id);
			id = undefined;
			setState();
		}
	}, [iter]);

	return state;
}

export default useGenerator;
