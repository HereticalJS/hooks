import { useState, useEffect } from 'react';

const { createObjectURL, revokeObjectURL } =
  'webkitURL' in window ? webkitURL : URL;

function useObjectURL(blob) {
  const [url, setUrl] = useState();
  useEffect(() => {
    if (!blob) return;
    setUrl(createObjectURL(blob));
    return () => revokeObjectURL(url);
  }, [blob]);
  return url;
}

export default useObjectURL;
