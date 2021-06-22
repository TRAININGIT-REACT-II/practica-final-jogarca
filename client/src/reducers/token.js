import types from "../actions/types";
import { DEFAULT_TOKEN } from "../constants/DefaultToken";

// Estado inicial
const initialState = { DEFAULT_TOKEN };

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TOKEN:
      return { token: action.token };
    default:
      return state;
  }
};

export default reducer;
