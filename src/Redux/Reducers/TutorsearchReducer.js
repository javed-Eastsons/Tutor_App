import {
  GET_POSTAL_DATA,
  GET_FILTER_DATA,
  GET_QUICK_DATA,
  GET_FILTER_ASSIGNMENT,
} from "../Actions/types";

const initialstate = {
  GET_POSTAL_DATA: [],
  GET_FILTER_DATA: [],
  GET_QUICK_DATA: [],
  GET_FILTER_ASSIGNMENT: [],
};

const TutorsearchReducer = (state = initialstate, action) => {
  // console.log("chatttttttttttttttttttttt", action.payload);
  switch (action.type) {
    case GET_POSTAL_DATA:
      return { ...state, GET_POSTAL_DATA: action.POSTAL_DATA };

    case GET_FILTER_DATA:
      return { ...state, GET_FILTER_DATA: action.FILTER_DATA };

    case GET_QUICK_DATA:
      return { ...state, GET_QUICK_DATA: action.QUICK_DATA };
    case GET_FILTER_ASSIGNMENT:
      return { ...state, GET_FILTER_ASSIGNMENT: action.paload };
  }

  return state;
};

export default TutorsearchReducer;
