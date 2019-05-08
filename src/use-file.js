import { useState, useEffect } from 'react';

function useFile(file) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!file) return;

    let reader = new FileReader();

    const f = e => {
      setData(e.target.result);
      reader.removeEventListener('load', f);
    };

    reader.addEventListener('load', f);
    reader.readAsArrayBuffer(file);

    return () => {
      reader.removeEventListener('load', f);
      reader = undefined;
    };
  }, [file]);

  return data;
}

export default useFile;
