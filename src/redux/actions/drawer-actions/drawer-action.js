import * as TYPES from '../types';

export const setInitialRoute = (initialScreen) => {
  return {
    type: TYPES.SET_INITIAL_ROUTE,
    data: initialScreen,
  };
};
