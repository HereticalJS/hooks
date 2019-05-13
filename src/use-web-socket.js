import { useState, useEffect, useMemo, useCallback } from 'react';
import useSpace from './use-space';

const isWebSocketEnabled = 'WebSocket' in window;

function useWebSocket(url) {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useSpace(message);

  const socket = useMemo(() => {
    if (!isWebSocketEnabled) return;
    if (!url) return;

    try {
      return new WebSocket(url);
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  const handleMessage = useCallback(({ data }) => {
    setMessage(data);
  }, [setMessage]);

  const handleError = useCallback(err => {
    console.error(err);
  }, []);

  useEffect(() => {
    if (!socket) {
      setMessages();
      return;
    }

    const handleOpen = () =>
      socket.addEventListener('message', handleMessage);
    const handleClose = ({ code, reason, wasClean }) => {
      console.log(code, reason, wasClean);
      socket.removeEventListener('message', handleMessage);
    };
    socket.addEventListener('open', handleOpen);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);

    return () => {
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('open', handleOpen);
    };
  }, [socket]);

  return [socket, messages, setMessages];
}

export default useWebSocket;
