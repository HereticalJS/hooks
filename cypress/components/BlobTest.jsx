import React, { useMemo } from 'react';
import { usePromise, useBlob } from '../../';

export const image_data_url =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==';

export default function BlobTest() {
  const [blob] = usePromise(useMemo(
    () => fetch(image_data_url).then(res => res.blob()),
    [image_data_url],
  ));
  const url = useBlob(blob, useBlob.ResultType.DATA_URL) || '';
  return url;
}

