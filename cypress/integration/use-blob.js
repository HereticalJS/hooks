import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import {
  image_data_url,
  image_array,
  text,
  NotABlob,
  BlobAsArrayBuffer,
  BlobAsBinaryString,
  BlobAsDataURL,
  BlobAsText,
} from '../components/BlobTest';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useBlob`', () => {
  it('should ignore anything but a blob', () => {
    cy.mount(<NotABlob data={'foobar'} />);
    cy.contains('undefined');
  });

  it('should read a blob as an array buffer', () => {
    cy.mount(<BlobAsArrayBuffer />);
    cy.contains(image_array.toString());
  });

  it('should read a blob as an binary string', () => {
    cy.mount(<BlobAsBinaryString />);
    cy.contains(image_array.toString());
  });

  it('should read a blob as a data URL', () => {
    cy.mount(<BlobAsDataURL />);
    cy.contains(image_data_url);
  });

  it('should read a blob as a text string', () => {
    cy.mount(<BlobAsText />);
    cy.contains(text);
  });
});

