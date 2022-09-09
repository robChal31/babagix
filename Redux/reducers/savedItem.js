import { ADD_TO_SAVED, CLEAR_SAVED, REMOVE_FROM_SAVED } from "../constants";

const savedItem = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_SAVED:
      return [...state, action.payload];
    case REMOVE_FROM_SAVED:
      return state.filter((e) => e._id !== action.payload._id);
    case CLEAR_SAVED:
      return (state = []);
  }
  return state;
};

export default savedItem;
