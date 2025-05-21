import { useReducer, useCallback, useMemo } from 'react';

type State<T> = {
  items: T[];
  order: number[];
  nextID: number;
};

type Action<T> =
  | { type: 'add'; payload: { valueToAdd: T } }
  | { type: 'remove'; payload: { indexToRemove: number } }
  | { type: 'set'; payload: { values: T[] } }
  | { type: 'reset' }
  | { type: 'reorder'; payload: { order: number[] } };

const initialState = { items: [], order: [], nextID: -1 };

const createReducer = <T>() => (
  state: State<T>,
  action: Action<T>
): State<T> => {
  switch (action.type) {
    case 'add': {
      const { valueToAdd } = action.payload;
      const nextID = state.nextID + 1;

      return {
        ...state,
        nextID,
        items: [...state.items, valueToAdd],
        order: [...state.order, nextID],
      };
    }
    case 'remove': {
      const { indexToRemove } = action.payload;
      const nextID = state.nextID - 1;
      const items = state.items.filter((_, index) => index !== indexToRemove);
      const order = state.order
        .filter((o) => o !== indexToRemove)
        .map((o) => (o > indexToRemove ? o - 1 : o));

      return { ...state, nextID, items, order };
    }
    case 'set': {
      const { values } = action.payload;
      return {
        items: values,
        order: values.map((_, index) => index),
        nextID: values.length - 1,
      };
    }
    case 'reset':
      return initialState;
    case 'reorder': {
      const { order } = action.payload;

      return { ...state, order };
    }
  }
};

export function useOrderedList<T>() {
  const reducer = createReducer<T>();
  const [{ items, order }, dispatch] = useReducer(reducer, initialState);

  const add = (valueToAdd: T) =>
    dispatch({ type: 'add', payload: { valueToAdd } });

  const remove = (indexToRemove: number) =>
    dispatch({ type: 'remove', payload: { indexToRemove } });

  const set = useCallback(
    (values: T[]) => dispatch({ type: 'set', payload: { values } }),
    [dispatch]
  );

  const reorder = (order: number[]) =>
    dispatch({ type: 'reorder', payload: { order } });

  const orderedItems = useMemo(
    () => order.map((o) => ({ item: items[o], order: o })),
    [order, items]
  );

  return {
    items,
    order,
    add,
    remove,
    set,
    reorder,
    orderedItems,
  };
}
