import React from 'react';
import ReactDOM from 'react-dom';
import { useWebSocket } from '../../src';
import { fixScope } from '../support/fix-react-dom-scope';
import { WebSocket, Server } from 'mock-socket';

beforeEach(() => fixScope(ReactDOM)(window));

describe('`useWebSocket`', () => {
  const location = 'ws://localhost:8080';
  let server;

  beforeEach(() => {
    window.WebSocket = WebSocket;
    server = new Server(location);
    server.on('connection', (socket) => {
      socket.on('message', (data) => {
        const reversed = Array.prototype.slice.call(data).reverse().join('');
        socket.send(reversed);
      });
    });
  });

  afterEach(() => {
    if (server) {
      server.stop();
      server = undefined;
    }
  })

  it('should be able to communicate with a WebSocket service', () => {
    function Test() {
      const [socket, messages] = useWebSocket(location);

      return (
        <div>
          <ul id="value">
            {messages.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
            <button
              id="send"
              onClick={() => socket.send('hello')}
            >
              send
            </button>
        </div>
      );
    }

    cy.mount(<Test />);
    cy.get('#send').click();
    cy.get('#value').contains('olleh');
  });
});
