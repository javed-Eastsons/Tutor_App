import {
  ALL_TUTORS,
  REGISTER_MSG,
  OTP_MSG,
  GET_USER_ID,
  Login_Data,
  ALL_POSTS_BY_CLIENT,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const AllPostsByClient = (Login_Data, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorList/StudentPostRequirementListing.php?student_id=" +
      Login_Data.userid;
    console.log(url1, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
            type: ALL_POSTS_BY_CLIENT,
            payload: responseJson.output,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const GetAllTutors = () => {
  return async (dispatch, getState) => {
    //const login = await getApiKey();

    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorList/TutorList.php";

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
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.Message);
        if (responseJson.status == true) {
          dispatch({
            type: ALL_TUTORS,
            ALLTUTORS: responseJson.Message,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const RegisterUser = (
  FirstName,
  LastName,
  Password,
  Email,
  country_phone_code,
  Mobile
) => {
  console.log(FirstName, LastName, Email, country_phone_code, Mobile, Password);
  return async (dispatch, getState) => {
    //const login = await getApiKey();
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log(fcmToken, "registerrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/UserRegistration.php";
    var formData = new FormData();
    formData.append("first_name", FirstName);
    formData.append("last_name", LastName);
    formData.append("email", Email);
    formData.append("country_phone_code", country_phone_code);
    formData.append("mobile", Mobile);
    formData.append("password", Password);
    formData.append("device_token", fcmToken);
    formData.append("device_type", "Android");

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
        // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson.message)
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          console.log("ww", responseJson.message);
          Alert.alert(responseJson.message);
          dispatch({
            type: REGISTER_MSG,
            REG_MSG: responseJson.message,
          });
        } else if (responseJson.status == false) {
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

export const LoginUser = (Mobile, Email, Password, navigation) => {
  console.log(Mobile, Email, Password);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserLogin/UserLogin.php";
    var formData = new FormData();
    formData.append("login_option", "Mobile Number");
    //  formData.append('last_name', LastName)
    //formData.append('email', Email)
    formData.append("mobile", Mobile);
    // formData.append('emailid', Email)
    formData.append("userpass", Password);
    console.log("FORMDATAAAAA", formData);

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
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (
          responseJson.Status == true &&
          responseJson.user_type == "I am an Educator"
        ) {
          await AsyncStorage.setItem("token", responseJson.Access_Token);
          await AsyncStorage.setItem("user_type", responseJson.user_type);
          await AsyncStorage.setItem("user_id", responseJson.user_id);

          console.log("Educator succesfull login");

          let obj = {
            userid: responseJson.user_id,
            userType: responseJson.user_type,
          };
          dispatch({
            type: Login_Data,
            payload: obj,
          });
          navigation.replace("Auth4");
        } else if (
          responseJson.Status == true &&
          responseJson.user_type == "I am looking for a Tutor"
        ) {
          await AsyncStorage.setItem("token", responseJson.Access_Token);
          await AsyncStorage.setItem("user_type", responseJson.user_type);
          await AsyncStorage.setItem("user_id", responseJson.user_id);
          let obj = {
            userid: responseJson.user_id,
            userType: responseJson.user_type,
          };
          dispatch({
            type: Login_Data,
            payload: obj,
          });
          console.log("Client succesfull login");
          navigation.replace("Auth");
          // await AsyncStorage.setItem("token",responseJson.Access_Token)
          // .then(res=>{
          //     console.log("Client succesfull login")
          //     navigation.replace('Auth2')})
        } else if (responseJson.status == false) {
          Alert.alert(responseJson.message);
          //  navigation.navigate('Auth');
          //  console.log(responseJson.Message)

          // dispatch({

          //     type: ALL_TUTORS,
          //     ALLTUTORS: responseJson.Message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const OTPVerify = (code) => {
  // console.log(Mobile, Email, Password)
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php";
    var formData = new FormData();
    // formData.append('login_option', 'Mobile Number')

    formData.append("OTP_MOBILE", code);

    console.log("FORMDATAAAAA", formData);

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
        console.log("RegisterAPI", responseJson);
        dispatch({
          type: GET_USER_ID,
          USER_ID: responseJson?.user_id,
        });
        if (responseJson.status == true) {
          //  navigation.navigate('Auth');
          console.log("PPPaaa", responseJson.message);

          dispatch({
            type: OTP_MSG,
            otpmsg: responseJson.message,
          });
        } else if (responseJson.status == false) {
          //  navigation.navigate('Auth');
          console.log("WWWpppp", responseJson.message);

          dispatch({
            type: OTP_MSG,
            otpmsg: responseJson.message,
          });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const OTPVerifywithrole = (role, otp, navigation) => {
  // console.log(Mobile, Email, Password)
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php";
    var formData = new FormData();
    formData.append("user_type", role);

    formData.append("OTP_EMAIL", otp);
    //formData.append("OTP_MOBILE", otp);

    console.log("FORMDATAAAAA", formData);

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
        console.log("RegisterAPI", responseJson);
        dispatch({
          type: GET_USER_ID,
          USER_ID: responseJson?.user_id,
        });
        if (responseJson.status == true && role == "I am an Educator") {
          navigation.navigate("Auth2");
          console.log("PPPaaa", responseJson.message);
          Alert.alert(responseJson.message);
        } else if (
          responseJson.status == true &&
          role == "I am looking for a Tutor"
        ) {
          navigation.replace("Auth");
          Alert.alert(responseJson.message);
          console.log("PPPaaa", responseJson.message);

          // dispatch({

          //     type: OTP_MSG,
          //     otpmsg: responseJson.message

          // });
        } else if (responseJson.status == false) {
          //  navigation.navigate('Auth');
          //   console.log('WWWpppp', responseJson.message)
          Alert.alert(responseJson.message);
          // dispatch({

          //     type: OTP_MSG,
          //     otpmsg: responseJson.message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const editProfile = (
  GET_USER_ID,
  imageSource,
  PersonalInfo_Data,
  Tution_Type,
  AcademicHistory_Data,
  TutionStatus_Data,
  Tutoring_Data,
  navigation
) => {
  console.log(GET_USER_ID, "APIID");
  console.log(imageSource, "imageSourceAPI");
  console.log(PersonalInfo_Data, "PersonalInfo_Data");
  console.log(AcademicHistory_Data, "AcademicHistory_Data");
  console.log(Tution_Type, "Tution_Type");

  console.log(Tutoring_Data, "Tutoring_Data_LEVEL");
  console.log(TutionStatus_Data, "WORD_For_YOU");

  let data1 = JSON.stringify([
    {
      user_id: GET_USER_ID,
      age: PersonalInfo_Data?.Age,
      profile_image: imageSource,
      gender: PersonalInfo_Data?.markGender,
      nationality: PersonalInfo_Data?.selectnational,
      qualification: AcademicHistory_Data?.qualification,
      name_of_school: AcademicHistory_Data?.school,
      Course_Exam: AcademicHistory_Data?.exam,
      tutor_status: TutionStatus_Data?.WorkAs,
      tuition_type: Tution_Type?.TutionType,
      postal_code: Tution_Type?.Postal_Code,
      location: Tution_Type?.address,
      tutor_tutoring_experience_years: Tutoring_Data?.state,
      tutor_tutoring_experience_months: Tutoring_Data?.state2,
      personal_statement: TutionStatus_Data?.statement,
    },
    Tutoring_Data?.selectArray,
  ]);

  console.log(
    data1,
    "payloadpayloadpayloadpayloadpayloadpayloadpayloadpayload"
  );

  return (dispatch, getState) => {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://refuel.site/projects/tutorapp/APIs/UserRegistration/CompleteUserProfile.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data1,
    };

    axios
      .request(config)
      // .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson.data), "respone");
        if (responseJson.data.status == true) {
          Alert.alert(responseJson.data.message);
          navigation.navigate("Auth4");
        } else if (responseJson.data.status == false) {
          Alert.alert("Record not inserted");
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
    // );

    // axios.defaults.baseURL = 'https://refuel.site';
    // const url1 = axios.defaults.baseURL + '/projects/tutorapp/APIs/UserRegistration/CompleteUserProfile.php';

    // console.log(url1)
    // return fetch(url1,
    //     {

    //         method: 'POST',
    //         headers: new Headers({
    //             'Accept': 'application/json',
    //             "Content-Type": "application/json",
    //             // "Authorization": authtoken,
    //         }),

    //         body: btnP === true ? data : JSON.stringify(mainarray)

    //     }).then(response => response.json())
    //     .then((responseJson) => {
    //         console.log('completeProfileAPI', responseJson)
    //         Alert.alert(responseJson.message)
    //         //   Alert.alert(responseJson.message)
    //         if (responseJson.Status == true) {

    //             console.log('ww', responseJson.Tutor_Search_Data)
    //             // Alert.alert(responseJson.message)
    //             dispatch({

    //                 type: GET_FILTER_DATA,
    //                 FILTER_DATA: responseJson.Tutor_Search_Data

    //             });

    //         }

    //         else if (responseJson.Status == false) {

    //             console.log('AAa', responseJson.Message)
    //             Alert.alert(responseJson.Message)

    //         }
    //     })
    //     .catch(error => console.log('LLLLLLLLL', error.message))
  };
};

export const offerDateTime = (
  tutorBookingProcessId,
  student_id,
  Time,
  Date
) => {
  return (dispatch, getState) => {
    const url =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/DateAndTimeOfferUpdate.php";

    let data = new FormData();
    data.append("tutor_booking_process_id", tutorBookingProcessId);
    data.append("student_id", student_id);
    data.append("student_offer_date", Date);
    data.append("student_offer_time", Time);

    console.log(data, "formdata");
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.status == true) {
          Alert.alert(responseJson.message);
          // navigation.navigate("Auth4");
        } else if (responseJson.status == false) {
          Alert.alert("Record not inserted");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));

    // let config = {
    //   method: "POST",
    //   maxBodyLength: Infinity,
    //   url: "https://refuel.site/projects/tutorapp/APIs/TutorBookings/AcceptOfferDateTime.php",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data1,
    // };

    // axios
    //   .request(config)
    //   // .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(JSON.stringify(responseJson.data), "respone");
    //     if (responseJson.data.status == true) {
    //       Alert.alert(responseJson.data.message);
    //       navigation.navigate("Auth4");
    //     } else if (responseJson.data.status == false) {
    //       Alert.alert("Record not inserted");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "error");
    //   });
  };
};

export const ConfirmofferDateTime = (tutorBookingProcessId, student_id) => {
  return (dispatch, getState) => {
    const url =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/DateAndTimeOfferUpdate.php";

    let data = new FormData();
    data.append("tutor_booking_process_id", tutorBookingProcessId);
    data.append("student_id", student_id);

    data.append("student_date_time_offer_confirmation", "Confirmed");

    console.log(data, "formdata");
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.status == true) {
          Alert.alert(responseJson.message);
          // navigation.navigate("Auth4");
        } else if (responseJson.status == false) {
          Alert.alert("Record not inserted");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));

    // let config = {
    //   method: "POST",
    //   maxBodyLength: Infinity,
    //   url: "https://refuel.site/projects/tutorapp/APIs/TutorBookings/AcceptOfferDateTime.php",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data1,
    // };

    // axios
    //   .request(config)
    //   // .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(JSON.stringify(responseJson.data), "respone");
    //     if (responseJson.data.status == true) {
    //       Alert.alert(responseJson.data.message);
    //       navigation.navigate("Auth4");
    //     } else if (responseJson.data.status == false) {
    //       Alert.alert("Record not inserted");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "error");
    //   });
  };
};

export const negotiateByStudent = (
  tutorBookingProcessId,
  tutor_tution_offer_amount_type,
  student_id,
  offerAmount,
  value
) => {
  return (dispatch, getState) => {
    const url =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/NegotiateOfferAmountUpdate.php";
    let data = new FormData();
    data.append("tutor_booking_process_id", tutorBookingProcessId);
    data.append("tutor_tution_offer_amount_type", "Negotiable");
    data.append("student_id", student_id);
    data.append("amount_negotiate_by_student", offerAmount);
    data.append("negotiate_by_student_amount_type", value);

    console.log(data, "formdata");
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.status == true) {
          Alert.alert(responseJson.message);
          // navigation.navigate("Auth4");
        } else if (responseJson.status == false) {
          Alert.alert("Record not inserted");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const acceptOffer = (
  tutorBookingProcessId,
  tutor_tution_offer_amount_type,
  offer_status
) => {
  return (dispatch, getState) => {
    const url =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/OfferStatus.php";

    let data = new FormData();
    data.append("tutor_booking_process_id", tutorBookingProcessId);
    data.append(
      "tutor_tution_offer_amount_type",
      tutor_tution_offer_amount_type
    );
    data.append("offer_status", "Accept");

    console.log(data, "formdata");
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        if (responseJson.status == true) {
          Alert.alert(responseJson.message);
          // navigation.navigate("Auth4");
        } else if (responseJson.status == false) {
          Alert.alert("Record not inserted");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const studentPostRequirement = (
  Tutor_Schedule,
  Tution_Type,
  Student_Detail,
  Tutor_Qualification,
  student_id,
  Postal_Code_Address
) => {
  return (dispatch, getState) => {
    const url =
      "https://refuel.site/projects/tutorapp/APIs/TutorBookings/StudentPostRequirement.php";

    console.log(
      Tutor_Schedule,
      Tution_Type,
      Student_Detail,
      Tutor_Qualification,
      student_id,
      "postReqData"
    );

    let data = JSON.stringify({
      student_id: student_id,
      student_level: Student_Detail?.Level,
      student_grade: Student_Detail?.Grade,
      student_tution_type: Tution_Type?.TutionType,
      student_postal_code: Tution_Type?.Postal_Code,
      student_postal_address: Postal_Code_Address,
      tutor_id: "4",
      tutor_duration_weeks: Tutor_Qualification?.frequency,
      tutor_duration_hours: Tutor_Qualification?.duration,
      // "tutor_tution_fees": Tutor_Qualification?.FeeOffer,
      // "tutor_tution_schedule_time": "12:30",
      tutor_tution_offer_amount_type:
        Tutor_Qualification?.feetype === "Place Offer"
          ? "Non Negotiable"
          : "Negotiable",
      tutor_tution_offer_amount: Tutor_Qualification?.FeeOffer,
      // "booked_date": "17-07-2023",
      Subjects: Student_Detail?.Subjects,
      Qualifications: Tutor_Qualification?.TutorQualification,
      Tutor_schedules: Tutor_Schedule?.Tutor_schedules,
      Slots_time: Tutor_Schedule?.tutor_schedule_time,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://refuel.site/projects/tutorapp/APIs/TutorBookings/StudentPostRequirement.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status == true) {
          Alert.alert(response.data.message);
          // navigation.navigate("Auth4");
        } else if (response.data.status == false) {
          Alert.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data, "formdata");
  };
};
