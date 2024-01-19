import { ALL_TUTORS, REGISTER_MSG, OTP_MSG, GET_USER_ID } from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";

export const GetAllTutors = () => {
  return async (dispatch, getState) => {
    //const login = await getApiKey();

    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/TutorList.php";

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

          console.log("Educator succesfull login");
          navigation.replace("Auth");
        } else if (
          responseJson.Status == true &&
          responseJson.user_type == "I am looking for a Tutor"
        ) {
          await AsyncStorage.setItem("token", responseJson.Access_Token);
          await AsyncStorage.setItem("user_type", responseJson.user_type);

          console.log("Client succesfull login");
          navigation.replace("Auth2");
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

    formData.append("OTP_MOBILE", otp);

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
  Age,
  Gender,
  Nationality,
  GET_USER_ID,
  postalcode,
  tuition_type,
  shortarray,
  navigation
) => {
  var mainarray = [];
  var item = {};
  item["user_id"] = GET_USER_ID;
  item["age"] = Age;
  item["gender"] = Gender;
  item["nationality"] = Nationality;
  mainarray.push(item);
  mainarray.push(shortarray);
  console.log("mainarray", mainarray);

  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/CompleteUserProfile.php";

    console.log(url1);
    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(mainarray),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("completeProfileAPI", responseJson);
        Alert.alert(responseJson.message);
        //   Alert.alert(responseJson.message)
        if (responseJson.Status == true) {
          console.log("ww", responseJson.Tutor_Search_Data);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_FILTER_DATA,
            FILTER_DATA: responseJson.Tutor_Search_Data,
          });
        } else if (responseJson.Status == false) {
          console.log("AAa", responseJson.Message);
          Alert.alert(responseJson.Message);
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};
