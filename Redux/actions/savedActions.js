import { ADD_TO_SAVED, REMOVE_FROM_SAVED, CLEAR_SAVED } from "../constants";

export const addToSaved = (payload) => {
  return {
    type: ADD_TO_SAVED,
    payload,
  };
};

export const removeFromSaved = (payload) => {
  return {
    type: REMOVE_FROM_SAVED,
    payload,
  };
};

export const clearSaved = () => {
  return {
    type: CLEAR_SAVED,
  };
};
