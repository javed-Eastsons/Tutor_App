import {
    ALL_TUTORS, OTP_MSG, REGISTER_MSG,GET_USER_ID

} from "../Actions/types";

const initialstate = {

    GET_ALLTUTORS: [],
    Registermsg: '',
    otpmsgs: '',
    GET_USER_ID: ''
}

const TutorReducer = (state = initialstate, action) => {


    console.log('chatttttttttttttttttttttt', action.otpmsg)
    switch (action.type) {

        case ALL_TUTORS:

            return { ...state, GET_ALLTUTORS: action.ALLTUTORS }

        case REGISTER_MSG:

            return { ...state, Registermsg: action.REG_MSG }

        case OTP_MSG:

            return { ...state, otpmsgs: action.otpmsg }
            case GET_USER_ID:

            return { ...state, GET_USER_ID: action.USER_ID }

    }

    return state;

}

export default TutorReducer;