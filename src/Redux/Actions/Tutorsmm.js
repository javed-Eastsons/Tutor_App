import {
  ALL_TUTORS,
  REGISTER_MSG,
  OTP_MSG,
  GET_USER_ID,
  Login_Data,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
  return (dispatch, getState) => {
    //const login = await getApiKey();
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
          // Alert.alert(responseJson.message)
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
          navigation.replace("Auth");
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
        } else if (
          responseJson.status == true &&
          role == "I am looking for a Tutor"
        ) {
          navigation.replace("Auth");
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
