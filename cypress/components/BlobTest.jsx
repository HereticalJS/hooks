import React, { useMemo } from 'react';
import { usePromise, useBlob } from '../../';

export const image_data_url =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==';

export const image_array =
  [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 0, 0, 0, 0, 58, 126, 155, 85, 0, 0, 0, 10, 73, 68, 65, 84, 24, 87, 99, 248, 15, 0, 1, 1, 1, 0, 90, 77, 111, 241, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];

export const text_data_url = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D';

export const text = 'Hello, World!';

function useFetchedBlob(url) {
  return usePromise(useMemo(
    () => fetch(url).then(res => res.blob()),
    [url],
  ));
}

function arrayFromString(str) {
  return Array.prototype.slice.call(str).map(c => c.charCodeAt(0));
}

export function NotABlob({ data }) {
  const buffer = useBlob(data);
  return `${buffer}`;
}

export function BlobAsArrayBuffer() {
  const [blob] = useFetchedBlob(image_data_url);
  const buffer = useBlob(blob, useBlob.ResultType.ARRAY_BUFFER);
  return `${new Uint8Array(buffer)}`;
}

export function BlobAsBinaryString() {
  const [blob] = useFetchedBlob(image_data_url);
  const str = useBlob(blob, useBlob.ResultType.BINARY_STRING) || '';
  return `${arrayFromString(str)}`;
}

export function BlobAsDataURL() {
  const [blob] = useFetchedBlob(image_data_url);
  const url = useBlob(blob, useBlob.ResultType.DATA_URL) || '';
  return url;
}

export function BlobAsText() {
  const [blob] = useFetchedBlob(text_data_url);
  const text = useBlob(blob, useBlob.ResultType.TEXT) || '';
  return text;
}

