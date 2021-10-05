import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  initialScreen: 'App',
};
const drawerReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.SET_INITIAL_ROUTE:
      return {
        ...state,
        initialScreen: actions.data,
      };
    default:
      return state;
  }
};
export default drawerReducer;
