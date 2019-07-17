import { useState, useEffect } from 'react';

function isBlob(b) {
  return (
    b.size !== undefined &&
    b.type !== undefined &&
    typeof b.slice === 'function'
  );
}

export const ResultType = {
  ARRAY_BUFFER: 'arraybuffer',
  BINARY_STRING: 'binarystring',
  DATA_URL: 'dataurl',
  TEXT: 'text',
};

function toMethodName(resultType) {
  switch (resultType) {
    case ResultType.ARRAY_BUFFER:
      return 'readAsArrayBuffer';
    case ResultType.BINARY_STRING:
      return 'readAsBinaryString';
    case ResultType.DATA_URL:
      return 'readAsDataURL';
    case ResultType.TEXT:
      return 'readAsText';
    default:
      return 'readAsArrayBuffer';
  }
}

function useBlob(blob, resultType = 'arraybuffer') {
  const [data, setData] = useState();

  useEffect(() => {
    if (!blob || !isBlob(blob)) {
      setData();
      return;
    }

    let reader = new FileReader();

    const f = e => {
      setData(e.target.result);
      reader.removeEventListener('load', f);
    };

    reader.addEventListener('load', f);
    reader[toMethodName(resultType)](blob);

    return () => {
      reader.removeEventListener('load', f);
      reader = undefined;
    };
  }, [blob, resultType]);

  return data;
}

useBlob.ResultType = ResultType;

export default useBlob;
