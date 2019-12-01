import React from 'react';
import ReactDOM from 'react-dom';
import { fixScope } from '../support/fix-react-dom-scope';
import BlobTest, { image_data_url } from '../components/BlobTest';

beforeEach(() => fixScope(ReactDOM)(window));

describe('useBlob', () => {
  it('works', () => {
    cy.mount(<BlobTest />);
    cy.contains(image_data_url);
  });
});

