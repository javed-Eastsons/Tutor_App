import {
  ALL_TUTORS,
  REGISTER_MSG,
  OTP_MSG,
  GET_USER_ID,
  Tutor_Booking,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const BookTutor = (
  Tution_Type,
  Student_Detail,
  Tutor_Qualification,

  Tutor_Schedule,
  navigation
) => {
  console.log(navigation, "navigationnavigationnavigation");

  let Booking = {
    student_id: "291",
    student_level: Student_Detail.Level,
    student_grade: Student_Detail.Grade,
    student_tution_type: Tution_Type.tuition_type,
    tutor_id: "401",
    tutor_duration_weeks: Tutor_Qualification.frequency,
    tutor_duration_hours: Tutor_Qualification.duration,
    tutor_tution_fees: Tutor_Qualification.FeeOffer,
    tutor_tution_schedule_time: "12:30",
    tutor_tution_offer_amount_type: Tutor_Qualification.feetype,
    tutor_tution_offer_amount: Tutor_Qualification.FeeOffer,
    booked_date: "17-07-2023",
    Subjects: Student_Detail.Subjects,
    Qualifications: Tutor_Qualification.TutorQualification,
    Tutor_schedules: Tutor_Schedule.Tutor_schedules,
    Slots_time: Tutor_Schedule.tutor_schedule_time,
  };

  console.log(Booking);
  return (dispatch, getState) => {
    // axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/TutorBookingsProcess.php";

    fetch(url1, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        student_id: "295",
        student_level: Student_Detail.Level,
        student_grade: Student_Detail.Grade,
        student_tution_type: Tution_Type.tuition_type,
        tutor_id: "401",
        tutor_duration_weeks: Tutor_Qualification.frequency,
        tutor_duration_hours: Tutor_Qualification.duration,
        tutor_tution_fees: Tutor_Qualification.FeeOffer,
        tutor_tution_schedule_time: "12:30",
        tutor_tution_offer_amount_type: Tutor_Qualification.feetype,
        tutor_tution_offer_amount: Tutor_Qualification.FeeOffer,
        booked_date: "17-07-2023",
        Subjects: Student_Detail.Subjects,
        Qualifications: Tutor_Qualification.TutorQualification,
        Tutor_schedules: Tutor_Schedule.Tutor_schedules,
        Slots_time: Tutor_Schedule.tutor_schedule_time,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", Booking);
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
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
          navigation.navigate("MakeOffer");
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
