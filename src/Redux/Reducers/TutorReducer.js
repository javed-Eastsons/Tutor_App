import {
  ALL_TUTORS,
  OTP_MSG,
  REGISTER_MSG,
  GET_USER_ID,
  PersonalInfo_Data,
  Tution_Type,
  AcademicHistory_Data,
  Tutoring_Data,
  TutionStatus_Data,
} from "../Actions/types";

const initialstate = {
  GET_ALLTUTORS: [],
  Registermsg: "",
  otpmsgs: "",
  GET_USER_ID: "",
  PersonalInfo_Data: "",
  Tution_Type: "",
  AcademicHistory_Data: "",
  Tutoring_Data: "",
  TutionStatus_Data: "",
};

const TutorReducer = (state = initialstate, action) => {
  console.log("chatttttttttttttttttttttt", action.otpmsg);
  switch (action.type) {
    case ALL_TUTORS:
      return { ...state, GET_ALLTUTORS: action.ALLTUTORS };

    case REGISTER_MSG:
      return { ...state, Registermsg: action.REG_MSG };

    case OTP_MSG:
      return { ...state, otpmsgs: action.otpmsg };
    case GET_USER_ID:
      return { ...state, GET_USER_ID: action.USER_ID };
    case PersonalInfo_Data:
      return { ...state, PersonalInfo_Data: action.payload };
    case Tution_Type:
      return { ...state, Tution_Type: action.payload };
    case AcademicHistory_Data:
      return { ...state, AcademicHistory_Data: action.payload };
    case Tutoring_Data:
      return { ...state, Tutoring_Data: action.payload };
    case TutionStatus_Data:
      return { ...state, TutionStatus_Data: action.payload };
  }

  return state;
};

export default TutorReducer;
