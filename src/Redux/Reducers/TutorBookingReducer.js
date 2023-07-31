import {
  All_Booked_Student,
  All_Booked_Tutor,
  Booking_Detail,
  All_Booked_Tutor_Detail,
} from "../Actions/types";

const initialstate = {
  All_Booked_Student: [],
  All_Booked_Tutor: [],
  All_Booked_Tutor_Detail: [],
};

const TutorBooingReducer = (state = initialstate, action) => {
  console.log("Booked Student", action.payload);
  switch (action.type) {
    case All_Booked_Student:
      return { ...state, All_Booked_Student: action.payload };
    case All_Booked_Tutor:
      return { ...state, All_Booked_Tutor: action.payload };
    case Booking_Detail:
      return { ...state, Booking_Detail: action.payload };
    case All_Booked_Tutor_Detail:
      return { ...state, All_Booked_Tutor_Detail: action.payload };
  }

  return state;
};

export default TutorBooingReducer;
