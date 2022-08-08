import { useEffect, useRef } from 'react';

/**
 * useInterval custom hook used to execute callback after given interval
 * @param {callback} callback function which you want to execute after every interval
 * @param {Number} delay in microseconds
 * 
 */

 export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}