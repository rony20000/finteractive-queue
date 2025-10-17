import { useState, useCallback } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useHistory<T>(initialValue: T) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialValue,
    future: [],
  });

  const push = useCallback((newValue: T) => {
    setState(prevState => ({
      past: [...prevState.past, prevState.present],
      present: newValue,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setState(prevState => {
      if (prevState.past.length === 0) return prevState;
      const newPast = prevState.past.slice(0, -1);
      const newPresent = prevState.past[prevState.past.length - 1];
      return {
        past: newPast,
        present: newPresent,
        future: [prevState.present, ...prevState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(prevState => {
      if (prevState.future.length === 0) return prevState;
      const newPresent = prevState.future[0];
      const newFuture = prevState.future.slice(1);
      return {
        past: [...prevState.past, prevState.present],
        present: newPresent,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((newValue: T) => {
    setState({
      past: [],
      present: newValue,
      future: [],
    });
  }, []);

  return {
    value: state.present,
    push,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    reset,
  };
}

