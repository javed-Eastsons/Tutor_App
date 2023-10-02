import {
  ALL_TUTORS,
  REGISTER_MSG,
  All_Booked_Student,
  OTP_MSG,
  All_Booked_Tutor,
  GET_USER_ID,
  Booking_Detail,
  Tutor_Booking,
  All_Booked_Tutor_Detail,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const currentDate = moment().format("DD-MM-YYYY");

export const AcceptFinalOffer = (TutId, BookingId, OfferStatus, navigation) => {
  console.log(TutId, BookingId, OfferStatus);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorBookings/DateAndTimeOfferUpdate.php";

    var formData = new FormData();
    formData.append("tutor_booking_process_id", BookingId);
    formData.append("tutor_id", TutId);
    formData.append("tutor_accept_date_time_status", OfferStatus);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          console.log("ww", responseJson.message);
          navigation.navigate("MyBookingTutor");
          Alert.alert(responseJson.message);
          // dispatch({
          //   type: REGISTER_MSG,
          //   REG_MSG: responseJson.message,
          // });
        } else if (responseJson.status == false) {
          // navigation.navigate("TutorAcceptCancel");
          console.log("AAa", responseJson.message);
          // Alert.alert(responseJson.message)
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const NegotiateOfferAmountUpdate = (
  bookingId,
  tutorId,
  offerAmount,
  NewofferType,
  obj,
  navigation
) => {
  console.log(bookingId, tutorId, offerAmount, NewofferType);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorBookings/NegotiateOfferAmountUpdate.php";
    var formData = new FormData();
    formData.append("tutor_booking_process_id", bookingId);
    formData.append("tutor_tution_offer_amount_type", "Negotiable");
    formData.append("tutor_id", tutorId);
    formData.append("amount_negotiate_by_tutor", offerAmount);
    formData.append("negotiate_by_tutor_amount_type", NewofferType);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          dispatch(GetBookedTutorDetail(obj));
          // console.log("ww", responseJson.message);
          //  navigation.navigate("TutorAcceptCancel");
          // Alert.alert(responseJson.message)
          // dispatch({
          //   type: REGISTER_MSG,
          //   REG_MSG: responseJson.message,
          // });
        } else if (responseJson.status == false) {
          // navigation.navigate("TutorAcceptCancel");
          console.log("AAa", responseJson.message);
          // Alert.alert(responseJson.message)
          dispatch({
            type: REGISTER_MSG,
            REG_MSG: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
};
export const OfferStatus = (
  bookingId,
  offerstatus,
  OfferType,
  tutorId,
  obj,
  navigation
) => {
  console.log(bookingId, offerstatus, OfferType);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorBookings/OfferStatus.php";
    var formData = new FormData();
    formData.append("tutor_booking_process_id", bookingId);
    formData.append("offer_status", offerstatus);
    formData.append("tutor_tution_offer_amount_type", OfferType);
    formData.append("user_id_to_send_notification", tutorId);
    //  console.log(url1, "PPPPPPPPPPPPPPPPPPPPPPPP");
    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log("OFFERRRRRRRRRRRRRRRRRRRRRRRR", responseJson.message);
        // Alert.alert(responseJson.message);
        if (responseJson.status == true) {
          dispatch(GetBookedTutorDetail(obj));
          // console.log("ww", responseJson.message);
          //  navigation.navigate("TutorAcceptCancel");
          // Alert.alert(responseJson.message)
          // dispatch({
          //   type: REGISTER_MSG,
          //   REG_MSG: responseJson.message,
          // });
        } else if (responseJson.status == false) {
          // navigation.navigate("TutorAcceptCancel");
          console.log("AAa", responseJson.message);
          // Alert.alert(responseJson.message)
          dispatch({
            type: REGISTER_MSG,
            REG_MSG: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const BookingStatus = (
  bookingId,
  bookingstatus,
  TutorID,
  navigation
) => {
  console.log(bookingId, bookingstatus, TutorID);
  return (dispatch, getState) => {
    //const login = await getApiKey();
    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorBookings/BookingStatus.php";
    var formData = new FormData();
    formData.append("tutor_booking_process_id", bookingId);
    formData.append("tutor_booking_status", bookingstatus);
    formData.append("user_id_to_send_notification", TutorID);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          // navigation.navigate("TutorAcceptCancel");
          navigation.navigate("MyBookingTutor");
          console.log("ww", responseJson.message);

          // Alert.alert(responseJson.message)
          // dispatch({
          //   type: REGISTER_MSG,
          //   REG_MSG: responseJson.message,
          // });
        } else if (responseJson.status == false) {
          navigation.navigate("MyBookingTutor");
          console.log("AAa", responseJson.message);
          // Alert.alert(responseJson.message)
          dispatch({
            type: REGISTER_MSG,
            REG_MSG: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const GetBookedTutorDetail = (bookingData, navigation) => {
  console.log(bookingData);
  return async (dispatch, getState) => {
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorList/BookedBySingleTutorDetails.php?tutor_id=" +
      bookingData?.tutorId +
      "&tutor_booking_process_id=" +
      bookingData?.BookingId;

    console.log(url1, "Studenttttttttttttttttttttttttttt1");

    await fetch(url1, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: All_Booked_Tutor_Detail,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          // Alert.alert(responseJson.message);
          console.log(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const GetBookedTutorList = (Login_Data, navigation) => {
  return async (dispatch, getState) => {
    //const login = await getApiKey();

    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorList/TutorListing.php?student_id=" +
      Login_Data?.userid;

    //console.log(url1, "Studenttttttttttttttttttttttttttt1");

    await fetch(url1, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: All_Booked_Tutor,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const GetBookedStudentList = (Login_Data, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorList/BookedTutorList.php?tutor_id=" +
      Login_Data?.userid;

    console.log(url1, "url1url1url1url1url1url1url1url1url1");

    await fetch(url1, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: All_Booked_Student,
            payload: responseJson.output,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const BookTutor = (
  Tution_Type,
  Student_Detail,
  Tutor_Qualification,
  Tutor_Schedule,
  Login_Data,
  Tutor_Detail,

  navigation
) => {
  console.log(
    //Login_Data,
    Tutor_Qualification,
    Student_Detail.Student_Data,
    Tutor_Schedule.Tutor_schedules,
    Tutor_Detail,
    // navigation,
    "navigationnavigationnavigation"
    //   currentDate
  );

  let Booking = {
    student_id: Login_Data?.userid,
    postal_code: Tution_Type.Postal_Code,
    postal_address: Tution_Type.PostAddress,
    student_tution_type: Tution_Type.TutionType,
    tutor_id: Tutor_Detail?.tutorid,
    tutor_duration_weeks: Tutor_Qualification.frequency,
    tutor_duration_hours: Tutor_Qualification.duration,
    tutor_tution_fees: Tutor_Qualification.FeeOffer,
    tutor_tution_schedule_time: "12:30",
    tutor_tution_offer_amount_type: Tutor_Qualification.feetype,
    tutor_tution_offer_amount: Tutor_Qualification.FeeOffer,
    booked_date: currentDate,
    Student_Level_Grade_Subjects: Student_Detail.Student_Data,
    Qualifications: Tutor_Qualification.TutorQualification,
    Tutor_Schedules_Slot_Time: Tutor_Schedule.Tutor_schedules,
  };

  console.log(Booking, "BookingBookingBookingBooking");

  return (dispatch, getState) => {
    // axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/TutorBookingsProcessLoopData.php";

    fetch(url1, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        student_id: Login_Data?.userid,
        postal_code: Tution_Type.Postal_Code,
        postal_address: Tution_Type.PostAddress,
        student_tution_type: Tution_Type.TutionType,
        tutor_id: Tutor_Detail?.tutorid,
        tutor_duration_weeks: Tutor_Qualification.frequency,
        tutor_duration_hours: Tutor_Qualification.duration,
        tutor_tution_fees: Tutor_Qualification.FeeOffer,
        tutor_tution_schedule_time: "12:30",
        tutor_tution_offer_amount_type: Tutor_Qualification.feetype,
        tutor_tution_offer_amount: Tutor_Qualification.FeeOffer,
        booked_date: currentDate,
        Student_Level_Grade_Subjects: Student_Detail.Student_Data,
        Qualifications: Tutor_Qualification.TutorQualification,
        Tutor_Schedules_Slot_Time: Tutor_Schedule.Tutor_schedules,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", Booking);
        //  console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          console.log("ww", responseJson.message);
          navigation.navigate("MakeOffer");
          Alert.alert(responseJson.message);
          dispatch({
            type: Tutor_Booking,
            BookTutor: responseJson.message,
          });
        } else if (responseJson.status == false) {
          console.log("AAa", responseJson.message);
          // navigation.navigate("MakeOffer");
          Alert.alert(responseJson.message);
          dispatch({
            type: Tutor_Booking,
            BookTutor: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error.message));
  };
};
