import { useEffect } from 'react';

export function useRealTimeFeed(callback, interval = 10000) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, interval);
    return () => clearInterval(id);
  }, [callback, interval]);
}
