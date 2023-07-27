import { combineReducers } from "redux";
import TutorReducer from "./TutorReducer";
import TutorsearchReducer from "./TutorsearchReducer";
import TutorBooingReducer from "./TutorBookingReducer";
export default combineReducers({
  TutorReducer,
  TutorsearchReducer,
  TutorBooingReducer,
});
