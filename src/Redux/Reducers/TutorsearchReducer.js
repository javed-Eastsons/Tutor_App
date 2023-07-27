import {
  GET_POSTAL_DATA,
  GET_FILTER_DATA,
  GET_QUICK_DATA,
} from "../Actions/types";

const initialstate = {
  GET_POSTAL_DATA: [],
  GET_FILTER_DATA: [],
  GET_QUICK_DATA: [],
};

const TutorsearchReducer = (state = initialstate, action) => {
  console.log("chatttttttttttttttttttttt", action.type);
  switch (action.type) {
    case GET_POSTAL_DATA:
      return { ...state, GET_POSTAL_DATA: action.POSTAL_DATA };

    case GET_FILTER_DATA:
      return { ...state, GET_FILTER_DATA: action.FILTER_DATA };

    case GET_QUICK_DATA:
      return { ...state, GET_QUICK_DATA: action.QUICK_DATA };
  }

  return state;
};

export default TutorsearchReducer;
