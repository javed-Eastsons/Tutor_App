import { All_Booked_Student, All_Booked_Tutor } from "../Actions/types";

const initialstate = {
  All_Booked_Student: [],
  All_Booked_Tutor: [],
};

const TutorBooingReducer = (state = initialstate, action) => {
  console.log("Booked Student", action.payload);
  switch (action.type) {
    case All_Booked_Student:
      return { ...state, All_Booked_Student: action.payload };
    case All_Booked_Tutor:
      return { ...state, All_Booked_Tutor: action.payload };
  }

  return state;
};

export default TutorBooingReducer;
