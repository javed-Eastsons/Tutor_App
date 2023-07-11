import {
    ALL_TUTORS, OTP_MSG, REGISTER_MSG,

} from "../Actions/types";

const initialstate = {

    GET_ALLTUTORS: [],
    Registermsg: '',
    otpmsgs: ''
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

    }

    return state;

}

export default TutorReducer;