import { useState, useEffect, useMemo, useCallback } from 'react';

const isWebSocketEnabled = 'WebSocket' in window;

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);

  const socket = useMemo(() => {
    if (!isWebSocketEnabled) return;
    if (!url) return;

    try {
      return new WebSocket(url);
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  const handleMessage = useCallback(
    ({ data }) => {
      setMessages(msgs => [...msgs, data]);
    },
    [setMessages]
  );

  const handleError = useCallback(err => {
    console.error(err);
  }, []);

  useEffect(() => {
    if (!socket) {
      setMessages([]);
      return;
    }

    const handleOpen = () => socket.addEventListener('message', handleMessage);
    const handleClose = ({ code, reason, wasClean }) =>
      socket.removeEventListener('message', handleMessage);
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
