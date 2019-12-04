import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import { usePromise, useBlob, useFile } from '../../src';

const image_data_url =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==';

const image_array =
  [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 0, 0, 0, 0, 58, 126, 155, 85, 0, 0, 0, 10, 73, 68, 65, 84, 24, 87, 99, 248, 15, 0, 1, 1, 1, 0, 90, 77, 111, 241, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130];

const text_data_url = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D';

const text = 'Hello, World!';

function useFetchedBlob(url) {
  return usePromise(useMemo(
    () => fetch(url).then(res => res.blob()),
    [url],
  ));
}

function arrayFromString(str) {
  return Array.prototype.slice.call(str).map(c => c.charCodeAt(0));
}

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useFile`', () => {
  it('should be an alias of `useBlob`', () => {
    expect(useFile).to.equal(useBlob);
  });
});

describe('`useBlob`', () => {
  it('should ignore anything but a blob', () => {
    function NotABlob({ data }) {
      const buffer = useBlob(data);
      return `${buffer}`;
    }

    cy.mount(<NotABlob data={'foobar'} />);
    cy.contains('undefined');
  });

  it('should read a blob as an array buffer', () => {
    function BlobAsArrayBuffer() {
      const [blob] = useFetchedBlob(image_data_url);
      const buffer = useBlob(blob, useBlob.ResultType.ARRAY_BUFFER);
      return `${new Uint8Array(buffer)}`;
    }

    cy.mount(<BlobAsArrayBuffer />);
    cy.contains(image_array.toString());
  });

  it('should read a blob as an binary string', () => {
    function BlobAsBinaryString() {
      const [blob] = useFetchedBlob(image_data_url);
      const str = useBlob(blob, useBlob.ResultType.BINARY_STRING) || '';
      return `${arrayFromString(str)}`;
    }

    cy.mount(<BlobAsBinaryString />);
    cy.contains(image_array.toString());
  });

  it('should read a blob as a data URL', () => {
    function BlobAsDataURL() {
      const [blob] = useFetchedBlob(image_data_url);
      const url = useBlob(blob, useBlob.ResultType.DATA_URL) || '';
      return url;
    }

    cy.mount(<BlobAsDataURL />);
    cy.contains(image_data_url);
  });

  it('should read a blob as a text string', () => {
    function BlobAsText() {
      const [blob] = useFetchedBlob(text_data_url);
      const text = useBlob(blob, useBlob.ResultType.TEXT) || '';
      return text;
    }

    cy.mount(<BlobAsText />);
    cy.contains(text);
  });

  it('should be able to read different blobs', () => {
    function BlobSwitch() {
      const [url, setURL] = useState(image_data_url);
      const [blob] = useFetchedBlob(url);
      const str = useBlob(blob, useBlob.ResultType.BINARY_STRING) || '';
      return (
        <div>
          <ul>
            <li>{str}</li>
            <li>{`${arrayFromString(str)}`}</li>
          </ul>
          <button
            id="btn"
            onClick={() => setURL(text_data_url)}
          >
            click
          </button>
        </div>
      );
    }

    cy.mount(<BlobSwitch />);
    cy.contains(image_array.toString());
    cy.get('#btn')
      .click();
    cy.contains(text);
  });
});
