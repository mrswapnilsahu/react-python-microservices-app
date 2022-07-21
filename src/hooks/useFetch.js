import { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [ data, setData ] = useState(null);
	const [ isPending, setIsPending ] = useState(true);
	const [ error, setError ] = useState(null);
	
	useEffect(() => {
		const abortCont = new AbortController();
		fetch(url,{signal: abortCont.signal })
			.then((res) => {
				if (!res.ok) {
					//If any error occur while retrieving data from server
					throw Error('Could not fetch data from server');
				}
				return res.json();
			})
			.then((data) => {
				setData(data);
				setIsPending(false);
			})
			.catch((error) => {
				if(error.name === 'AbortError'){
					console.log("Fetch aborted!");
				} else {
					setError(error.message);
					setIsPending(false);
				}
			});
			return () => abortCont.abort();
	}, [url]);

    return {data, isPending, error};
};

export default useFetch;