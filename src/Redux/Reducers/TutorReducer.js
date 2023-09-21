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
  Student_Detail,
  Tutor_Qualification,
  Tutor_Schedule,
  Login_Data,
  SINGLE_USER_DETAILS,
  Tutor_Detail,
  Postal_Code_Address,
  ALL_POSTS_BY_CLIENT,
  POST_DETAIL,
  LEVEL_LIST,
  GRADE_LIST,
  SUBJECT_LIST,
  ALL_FAV_TUTORS,
  SINGLE_USER,
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
  Student_Detail: "",
  Tutor_Qualification: "",
  Tutor_Schedule: "",
  Login_Data: "",
  Tutor_Detail: "",
  POST_DETAIL: [],
  Postal_Code_Address: "",
  ALL_POSTS_BY_CLIENT: [],
  LEVEL_LIST: "",
  GRADE_LIST: "",
  SINGLE_USER: [],
  SUBJECT_LIST: "",
  SINGLE_USER_DETAILS: "",
  ALL_FAV_TUTORS: [],
};

const TutorReducer = (state = initialstate, action) => {
  console.log("Studenttttt", action.payload);
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
    case Student_Detail:
      return { ...state, Student_Detail: action.payload };
    case Tutor_Qualification:
      return { ...state, Tutor_Qualification: action.payload };
    case Tutor_Schedule:
      return { ...state, Tutor_Schedule: action.payload };
    case Login_Data:
      return { ...state, Login_Data: action.payload };
    case Tutor_Detail:
      return { ...state, Tutor_Detail: action.payload };
    case Postal_Code_Address:
      return { ...state, Postal_Code_Address: action.payload };
    case ALL_POSTS_BY_CLIENT:
      return { ...state, ALL_POSTS_BY_CLIENT: action.payload };
    case POST_DETAIL:
      return { ...state, POST_DETAIL: action.payload };
    case LEVEL_LIST:
      return { ...state, LEVEL_LIST: action.payload };
    case GRADE_LIST:
      return { ...state, GRADE_LIST: action.payload };
    case SUBJECT_LIST:
      return { ...state, SUBJECT_LIST: action.payload };
    case SINGLE_USER:
      return { ...state, SINGLE_USER: action.payload };
    case SINGLE_USER_DETAILS:
      return { ...state, SINGLE_USER_DETAILS: action.payload };
    case ALL_FAV_TUTORS:
      return { ...state, ALL_FAV_TUTORS: action.payload };
  }

  return state;
};

export default TutorReducer;
