// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import React unit test tools
import 'cypress-react-unit-test';

// Fixes incorrect React version
// https://github.com/bahmutov/cypress-react-unit-test/issues/51
Cypress.on('window:load', win => {
  win.ReactDOM = window.ReactDOM || win.ReactDOM;
});
