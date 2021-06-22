import types from "./types";

export const updateToken = (token) => ({
  type: types.UPDATE_TOKEN,
  token,
});
