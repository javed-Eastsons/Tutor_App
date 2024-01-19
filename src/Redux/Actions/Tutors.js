import {
  ALL_TUTORS,
  REGISTER_MSG,
  OTP_MSG,
  GET_USER_ID,
  Login_Data,
  POST_DETAIL,
  ALL_POSTS_BY_CLIENT,
  LEVEL_LIST,
  GRADE_LIST,
  SINGLE_USER_DETAILS,
  SUBJECT_LIST,
  SINGLE_USER,
  VIEW_ASSIGNMENT,
  FAV_ASSIGNMENT,
  APPLIED_ASSIGNMENT,
  ALL_FAV_TUTORS,
  INTERESTED_TUTOR,
  INTERESTED_TUTORALL,
  FAVOURITE_STATUS
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const getLevelList = (Login_Data, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/LevelList/LevelList.php";
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
        console.log("Level-List", responseJson);
        if (responseJson.status == true) {
          dispatch({
            type: LEVEL_LIST,
            payload: responseJson,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};


export const getGradeList = (Level, Admission_level) => {

  console.log(Level, Admission_level, "KKKKKKKKKKK1111111111111")
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/GradeListBasedOnLevel/GradeListBasedOnLevel.php";
    let data = new FormData();
    data.append("Level", Level);
    if (Admission_level == undefined) {

      data.append("Admission_level", "");

    }

    else {

      data.append("Admission_level", Admission_level);

    }


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
        console.log("GRADE_LISTYYYYYYYYYYYYYYYYYY", responseJson);
        if (responseJson.status == true) {
          dispatch({
            type: GRADE_LIST,
            payload: responseJson,
          }); // navigation.navigate("Auth4");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const getTutorGradeList = (Level, Admission_level) => {

  console.log(Level, Admission_level, "IUU********888888888888888888")
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/GradeListBasedOnLevel/GradeListBasedOnLevelForTutor.php";
    let data = new FormData();
    data.append("Level", Level);
    if (Admission_level == undefined) {
      data.append("Admission_level", "");
    }
    else {
      data.append("Admission_level", Admission_level);
    }


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
        console.log("getTutorGradeListgetTutorGradeListgetTutorGradeListgetTutorGradeListgetTutorGradeList", responseJson);
        if (responseJson.status == true) {
          dispatch({
            type: GRADE_LIST,
            payload: responseJson,
          }); // navigation.navigate("Auth4");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const getSubjectList = (Level) => {
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/SubjectListBasedOnLevel/SubjectListBasedOnLevel.php";
    let data = new FormData();
    data.append("Level", Level);

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
        console.log("Subject_LIST-API", responseJson);
        if (responseJson.status == true) {
          dispatch({
            type: SUBJECT_LIST,
            payload: responseJson,
          }); // navigation.navigate("Auth4");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const singleUserDetails = (id) => {
  return async (dispatch, getState) => {
    const url1 = `https://colwithfarmchips.co.uk/projects/tutorapp/APIs/UserDetails/SingleUserProfile.php?user_id=${id}`;
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
        console.log("singleUserDetails", responseJson);
        if (responseJson.status == true) {
          dispatch({
            type: SINGLE_USER_DETAILS,
            payload: responseJson?.Single_User_details,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const GetUserProfile = (UserId, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/UserDetails/SingleUserProfile.php?user_id=" +
      UserId;
    console.log(url1, "1111111111111111");
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
        console.log(
          "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
          responseJson.Single_User_details
        );
        if (responseJson.status == true) {
          dispatch({
            type: SINGLE_USER,
            payload: responseJson.Single_User_details,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};
export const GetPostDetail = (Post_ID, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/PostRequirementListingDetails.php?student_post_requirements_id=" +
      Post_ID;
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
            type: POST_DETAIL,
            payload: responseJson.output,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const AllPostsByClient = (Login_Data, navigation) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/StudentPostRequirementListing.php?student_id=" +
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

export const ViewAssignment = (Login_Data, navigation) => {
  console.log(Login_Data);
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/ViewAssignment.php?tutor_login_id=" +
      Login_Data.userid;
    console.log(url1, "POSTSTSTTSTSTSTSTSTSTSTSTSTCODEEEEEE");
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
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: VIEW_ASSIGNMENT,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: VIEW_ASSIGNMENT,
            payload: responseJson.message,
          });
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const FavAssignment = (Login_Data, navigation) => {
  console.log(Login_Data);
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/ViewMyFavouriteAssignment.php?tutor_login_id=" +
      Login_Data.userid;
    // console.log(url1, "POSTSTSTTSTSTSTSTSTSTSTSTSTCODEEEEEE");
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
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: FAV_ASSIGNMENT,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: FAV_ASSIGNMENT,
            payload: responseJson.message,
          });
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const Applied_Assignment = (Login_Data, navigation) => {
  console.log(Login_Data);
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/MyAppliedListByTutor/MyAppliedListByTutor.php?tutor_login_id=" +
      Login_Data.userid;
    console.log(url1, "POSTSTSTTSTSTSTSTSTSTSTSTSTCODEEEEEE");
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
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.output);
        if (responseJson.status == true) {
          dispatch({
            type: APPLIED_ASSIGNMENT,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: APPLIED_ASSIGNMENT,
            payload: responseJson.message,
          });
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const GetAllFavTutor = (studentId) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/FavouriteTutorList/FavouriteTutorList.php?logged_in_student_id=" +
      studentId;

    console.log(url1, "IIIIIIIIIIIIIIIIII");

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
        console.log(
          "ALL_FAVTUTORSALL_FAVTUTORSALL_FAVTUTORS",
          responseJson.Tutor_Favourite_List
        );
        if (responseJson.status == true) {
          dispatch({
            type: ALL_FAV_TUTORS,
            payload: responseJson.Tutor_Favourite_List,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: ALL_FAV_TUTORS,
            payload: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const Get_Filter_Tutor = (loginuser, postId) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/FilterData/StudentPostRequirementListingFilter.php?student_post_requirements_id=" +
      postId;

    console.log(url1, "IIIIIIIIIIIIIIIIII");

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
        console.log(
          "AllFILTERTUTORAllFILTERTUTORAllFILTERTUTORAllFILTERTUTOR",
          responseJson.output
        );

        if (responseJson.status == true) {
          dispatch({
            type: INTERESTED_TUTOR,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: INTERESTED_TUTOR,
            payload: responseJson.message,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const Interested_Tutor = (studentId) => {
  return async (dispatch, getState) => {
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorList/StudentPostRequirementListing.php?student_id=" +
      studentId;

    console.log(url1, "IIIIIIIIIIIIIIIIII");

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
        console.log(
          "ALL_FAVTUTORSALL_FAVTUTORSALL_FAVTUTORS",
          responseJson.output
        );
        if (responseJson.status == true) {
          dispatch({
            type: INTERESTED_TUTOR,
            payload: responseJson.output,
          });
          dispatch({
            type: INTERESTED_TUTORALL,
            payload: responseJson.output,
          });
        } else if (responseJson.status == false) {
          dispatch({
            type: INTERESTED_TUTOR,
            payload: responseJson.message,
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
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.Message);
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
  Mobile,
  imageSource, navigation
) => {
  console.log(FirstName, LastName, Email, country_phone_code, Mobile, Password, imageSource,);
  return async (dispatch, getState) => {
    //const login = await getApiKey();
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log(fcmToken, "registerrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    //let data = JSON.parse(login);
    //var authtoken = data;
    //  console.log(authtoken)
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
     "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/UserRegistration/UserRegistration.php"
    var formData = new FormData();
    formData.append("first_name", FirstName);
    formData.append("last_name", LastName);
    formData.append("email", Email);
    formData.append("country_phone_code", country_phone_code);
    formData.append("mobile", Mobile);
    formData.append("password", Password);
    formData.append("device_token", fcmToken);
    formData.append("device_type", "Android");
    formData.append("profile_image", imageSource);


console.log(formData,'registerPAyLoad')
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
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson.message);
        //  Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          console.log("ww", responseJson.message);
          //   Alert.alert(responseJson.message);
          dispatch({
            type: REGISTER_MSG,
            REG_MSG: responseJson.message,
          });
          navigation.navigate('VerifyOTPScreen', {
            Email: Email,
            FirstName: FirstName,
            LastName: LastName,
            Password: Password,

            country_phone_code: country_phone_code,
            Mobile: Mobile,
            imageSource: imageSource
          })
        } else if (responseJson.status == false) {
          console.log("AAa", responseJson.message);
          Alert.alert(responseJson.message);
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
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
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
        console.log("responseJsonLOGIN", responseJson);

        if (
          responseJson &&
          responseJson.Status == true &&
          responseJson.user_type == "I am an Educator"
        ) {
          await AsyncStorage.setItem("token", responseJson.Access_Token);
          await AsyncStorage.setItem("user_type", responseJson.user_type);
          await AsyncStorage.setItem("user_id", responseJson.user_id);
          await AsyncStorage.setItem("postcode", responseJson.postal_code);
          await AsyncStorage.setItem("profilepic", responseJson.profile_image);

          console.log("Educator succesfull login");

          let obj = {
            userid: responseJson.user_id,
            userType: responseJson.user_type,
            postcode: responseJson.postal_code,
            profilepic: responseJson.profile_image,
          };
          dispatch({
            type: Login_Data,
            payload: obj,
          });
          if (responseJson?.complete_profile == "No") {
            navigation.replace("YourProfle");
          } else {
            navigation.replace("Auth4");
          }
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
            postcode: responseJson.postal_code,
            profilepic: responseJson.profile_image,
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


export const SendOtpforgotpassword = (Email, otp, newpassword, navigation) => {
  console.log(Email, otp, newpassword);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/Forgotpassword/forgotpassword.php";
    var formData = new FormData();

    formData.append("email", Email);
    formData.append('newpassword', newpassword)
    formData.append("otp", otp);
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
        console.log("forgotpasswordforgotpasswordforgotpasswordforgotpasswordforgotpassword", responseJson);

        if (responseJson.status == true) {

          Alert.alert(responseJson.message);


        } else if (responseJson.status == false) {
          Alert.alert(responseJson.message);

        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

// export const OTPVerify = (code) => {
//   // console.log(Mobile, Email, Password)
//   return (dispatch, getState) => {
//     axios.defaults.baseURL = "https://refuel.site";
//     const url1 =
//       axios.defaults.baseURL +
//       "/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php";
//     var formData = new FormData();
//     // formData.append('login_option', 'Mobile Number')

//     // formData.append("OTP_MOBILE", code);
//     formData.append("OTP_EMAIL", code);

//     console.log("FORMDATAAAAA", formData);

//     return fetch(url1, {
//       method: "POST",
//       headers: new Headers({
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//         // "Authorization": authtoken,
//       }),

//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log("RegisterAPI", responseJson);
//         dispatch({
//           type: GET_USER_ID,
//           USER_ID: responseJson?.user_id,
//         });
//         if (responseJson.status == true) {
//           //  navigation.navigate('Auth');
//           console.log("PPPaaa", responseJson.message);
//           Alert.alert('true', responseJson.message)

//           dispatch({
//             type: OTP_MSG,
//             otpmsg: responseJson.message,
//           });
//         } else if (responseJson.status == false) {
//           //  navigation.navigate('Auth');
//           console.log("WWWpppp", responseJson.message);
//           Alert.alert("false", responseJson.message)


//           dispatch({
//             type: OTP_MSG,
//             otpmsg: responseJson.message,
//           });
//         }
//       })
//       .catch((error) => console.log("LLLLLLLLL", error.message));
//   };
// };
export const OTPVerify = (code) => {
  // console.log(Mobile, Email, Password)
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php";
    var formData = new FormData();
    // formData.append('login_option', 'Mobile Number')

    formData.append("OTP_EMAIL", code);

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
export const OTPVerifywithrole = (role, otp, email, navigation) => {
  // console.log(Mobile, Email, Password)
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php";
    var formData = new FormData();
    formData.append("user_type", role);
    formData.append("email", email);

    //  formData.append("OTP_EMAIL", otp);
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
          //  Alert.alert(responseJson.message);
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
  Login_Data,
  imageSource,
  PersonalInfo_Data,
  Tution_Type,
  AcademicHistory_Data,
  TutionStatus_Data,
  Tutoring_Data,
  Extra_info,
  history_academy_arr,
  tutoring_detail_arr,
  secondaryDetails,
  navigation
) => {
  //console.log(Login_Data, "APIID");
  console.log(//PersonalInfo_Data,
    //Tution_Type,
    //AcademicHistory_Data,
    //TutionStatus_Data,
    Tutoring_Data, 'Tutoring_DataTutoring_Data', Tutoring_Data.selectArray, "selectArrayselectArrayselectArrayselectArray", tutoring_detail_arr
  );
  console.log(secondaryDetails, 'secondaryDetailseditProfilesecondaryDetailseditProfile')
  const transformedData = {
    "tutoring_detail_arr": Tutoring_Data.selectArray.map(item => {
      if (Array.isArray(item.Tutoring_Grade) && typeof item.Tutoring_ALL_Subjects === 'string') {
        return {
          ...item,
          "Tutoring_Grade": item.Tutoring_Grade.map(grade => grade?.Tutoring_Grade),
          "Tutoring_ALL_Subjects": item.Tutoring_ALL_Subjects.split(',').map(subject => subject?.Tutoring_ALL_Subjects.trim())
        };
      } else if (typeof item.Tutoring_Grade === 'string' && Array.isArray(item.Tutoring_ALL_Subjects)) {
        return {
          ...item,
          "Tutoring_Grade": item.Tutoring_Grade.split(',').map(grade => grade?.Tutoring_Grade.trim()),
          "Tutoring_ALL_Subjects": item.Tutoring_ALL_Subjects.map(subject => subject?.Tutoring_ALL_Subjects)
        };
      }

      else if (Array.isArray(item.Tutoring_Grade) && Array.isArray(item.Tutoring_ALL_Subjects)) {
        return {
          ...item,
          "Tutoring_Grade": item.Tutoring_Grade.map(grade => grade?.Tutoring_Grade),
          "Tutoring_ALL_Subjects": item.Tutoring_ALL_Subjects.map(subject => subject?.Tutoring_ALL_Subjects)
        };
      }
      else {
        return {
          ...item,
          "Tutoring_Grade": item.Tutoring_Grade.split(',').map(grade => grade.trim()),
          "Tutoring_ALL_Subjects": item.Tutoring_ALL_Subjects.split(',').map(subject => subject.trim())
        }

      }
    })
  };

  // const transformedData = {
  //   "tutoring_detail_arr": Tutoring_Data.selectArray.map(item => ({
  //     ...item,
  //     if(item.Tutoring_Grade === Object && item.Tutoring_ALL_Subjects === String )

  //      {
  //       "Tutoring_Grade": item["Tutoring_Grade"].split(',').map(grade => grade.trim()),
  //       "Tutoring_ALL_Subjects": item["Tutoring_ALL_Subjects"].map(subject => subject.trim())
  //     },
  //   else{
  //     "Tutoring_ALL_Subjects": item["Tutoring_ALL_Subjects"].split(',').map(subject => subject.trim())
  //     "Tutoring_Grade": item["Tutoring_Grade"].split(',').map(grade => grade.trim()),
  //   },
  //   }))
  // };
  //  console.log(typeof (Tutoring_Data.selectArray[0]), "111111111111");
  //  console.log(typeof (Tutoring_Data.selectArray[0].Tutoring_ALL_Subjects), "22222222");
  //console.log(history_academy_arr, "history_academy_arr");
  //console.log(tutoring_detail_arr, "tutoring_detail_arr", Tutoring_Data);

  //console.log(transformedData, "Tutoring_Data_LEVELTutoring_Data_LEVELTutoring_Data_LEVEL");
  console.log(transformedData.tutoring_detail_arr, "GGGGGGGGGGGGGGGGGGGG");
  // console.log(TutionStatus_Data, "WORD_For_YOU");
  data1 = JSON.stringify({
    user_id: Login_Data.userid,
    age: PersonalInfo_Data ? PersonalInfo_Data?.Age : Extra_info.age,
    date_of_year: PersonalInfo_Data?.year,
    flag: PersonalInfo_Data?.selectflag,

    profile_image: imageSource,
    gender: PersonalInfo_Data ? PersonalInfo_Data?.markGender : Extra_info.gender,
    nationality: PersonalInfo_Data ? PersonalInfo_Data?.selectnational : Extra_info.nationality,
    qualification: AcademicHistory_Data ? AcademicHistory_Data?.qualification : Extra_info.qualification,
    name_of_school: AcademicHistory_Data ? AcademicHistory_Data?.school : Extra_info.name_of_school,
    Course_Exam: AcademicHistory_Data ? AcademicHistory_Data?.Course : Extra_info.Course_Exam,
    gra_year: AcademicHistory_Data ? AcademicHistory_Data?.gra_year : Extra_info.gra_year,
    lettitude: Tution_Type ? Tution_Type?.latitude.toString() : Extra_info.lettitude.toString(),
    longitude: Tution_Type ? Tution_Type?.longitude.toString() : Extra_info.longitude.toString(),
    stream: Tutoring_Data ? Tutoring_Data?.stream : Extra_info.stream,
    tutor_status: TutionStatus_Data ? TutionStatus_Data?.WorkAs : Extra_info.tutor_status,
    tuition_type: Tution_Type ? Tution_Type?.TutionType : Extra_info.tuition_type,
    postal_code: Tution_Type ? Tution_Type?.Postal_Code : Extra_info.postal_code,
    location: Tution_Type ? Tution_Type?.address : Extra_info.location,
    travel_distance: Tution_Type ? Tution_Type?.Distance.toString() : Extra_info.travel_distance.toString(),
    personal_statement: TutionStatus_Data ? TutionStatus_Data?.statement : Extra_info.personal_statement,
    HistoryAcademy: AcademicHistory_Data ? AcademicHistory_Data.History : history_academy_arr,
    // TutoringDetail: Tutoring_Data ? Tutoring_Data.selectArray : tutoring_detail_arr,
    TutoringDetail: transformedData.tutoring_detail_arr,
    //   TutoringDetail: Tutoring_Data.selectArray,
  })









  console.log(
    data1,
    "NEWWWWWWWWWWWWWWWNEWWWWWWWWWWWWWWWNEWWWWWWWWWWWWWWWNEWWWWWWWWWWWWWWW"
  );
  return (dispatch, getState) => {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/UserRegistration/CompleteUserProfileLoop.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data1,
    };

    axios
      .request(config)
      // .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, "respone");

        if (responseJson?.status == true) {
          dispatch(GetUserProfile(Login_Data.userid))
          Alert.alert(responseJson?.message);
          navigation.replace("Auth4");
        } else if (responseJson?.status == false) {
          Alert.alert("Please complete profile to proceed”");
        }
        navigation.replace("Auth4");

      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
};

// export const editProfile = (
//   Login_Data,
//   imageSource,
//   PersonalInfo_Data,
//   Tution_Type,
//   AcademicHistory_Data,
//   TutionStatus_Data,
//   Tutoring_Data,
//   navigation
// ) => {
//   console.log(Login_Data, "APIID");
//   // console.log(imageSource, "imageSourceAPI");
//   // console.log(PersonalInfo_Data, "PersonalInfo_Data");
//   // console.log(AcademicHistory_Data, "AcademicHistory_Data");
//   // console.log(Tution_Type, "Tution_Type");

//   // console.log(Tutoring_Data.selectArray, "Tutoring_Data_LEVEL");
//   // console.log(TutionStatus_Data, "WORD_For_YOU");

//   let data1 = JSON.stringify({
//     user_id: Login_Data.userid,
//     age: PersonalInfo_Data?.Age,
//     profile_image: imageSource,
//     gender: PersonalInfo_Data?.markGender,
//     nationality: PersonalInfo_Data?.selectnational,
//     qualification: AcademicHistory_Data?.qualification,
//     name_of_school: AcademicHistory_Data?.school,
//     Course_Exam: AcademicHistory_Data?.Course,
//     gra_year: AcademicHistory_Data?.gra_year,
//     lettitude: Tution_Type?.latitude,
//     longitude: Tution_Type?.longitude,
//     stream: Tutoring_Data?.stream,
//     tutor_status: TutionStatus_Data?.WorkAs,
//     tuition_type: Tution_Type?.TutionType,
//     postal_code: Tution_Type?.Postal_Code,
//     location: Tution_Type?.address,
//     travel_distance: Tution_Type?.Distance,
//     personal_statement: TutionStatus_Data?.statement,
//     HistoryAcademy: AcademicHistory_Data.History,
//     TutoringDetail: Tutoring_Data.selectArray,
//   });

//   console.log(
//     data1,
//     "payloadpayloadpayloadpayloadpayloadpayloadpayloadpayload"
//   );

//   return (dispatch, getState) => {
//     let config = {
//       method: "POST",
//       maxBodyLength: Infinity,
//       url: "https://refuel.site/projects/tutorapp/APIs/UserRegistration/UpdateUserProfile.php",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data1,
//     };

//     axios
//       .request(config)
//       // .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(JSON.stringify(responseJson.data), "respone");
//         if (responseJson.data.status == true) {
//           Alert.alert(responseJson.data.message);
//           navigation.navigate("Auth4");
//         } else if (responseJson.data.status == false) {
//           Alert.alert("Record not inserted");
//         }
//       })
//       .catch((error) => {
//         console.log(error, "error");
//       });
//   };
// };

export const saveProfile = (
  GET_USER_ID,
  imageSource,
  PersonalInfo_Data,
  Tution_Type,
  AcademicHistory_Data,
  TutionStatus_Data,
  Tutoring_Data,
  navigation
) => {
  // console.log(GET_USER_ID, "APIID");
  // console.log(imageSource, "imageSourceAPI");
  // console.log(PersonalInfo_Data, "PersonalInfo_Data");
  // console.log(AcademicHistory_Data, "AcademicHistory_Data");
  // console.log(Tution_Type, "Tution_Type");

  // console.log(Tutoring_Data.selectArray, "Tutoring_Data_LEVEL");
  console.log(Tutoring_Data.selectArray, "Tutoring_Data.selectArray");

  // let data1 = JSON.stringify({
  //   user_id: GET_USER_ID,
  //   age: PersonalInfo_Data?.Age,
  //   date_of_year: PersonalInfo_Data?.year,
  //   flag: PersonalInfo_Data?.selectflag,
  //   profile_image: imageSource,
  //   gender: PersonalInfo_Data?.markGender,
  //   nationality: PersonalInfo_Data?.selectnational,
  //   qualification: AcademicHistory_Data?.qualification,
  //   name_of_school: AcademicHistory_Data?.school,
  //   Course_Exam: AcademicHistory_Data?.Course,
  //   gra_year: AcademicHistory_Data?.gra_year,
  //   lettitude: Tution_Type?.latitude,
  //   longitude: Tution_Type?.longitude,
  //   stream: Tutoring_Data?.stream,
  //   tutor_status: TutionStatus_Data?.WorkAs,
  //   tuition_type: Tution_Type?.TutionType,
  //   postal_code: Tution_Type?.Postal_Code,
  //   location: Tution_Type?.address,
  //   travel_distance: Tution_Type?.Distance,
  //   personal_statement: TutionStatus_Data?.statement,
  //   HistoryAcademy: AcademicHistory_Data.History,
  //   TutoringDetail: Tutoring_Data.selectArray,
  // });

  let data1 =
  {
    "user_id": GET_USER_ID,
    "age": PersonalInfo_Data?.Age,
    "date_of_year": PersonalInfo_Data?.year,
    "flag": PersonalInfo_Data?.selectflag,
    "profile_image": imageSource,
    "gender": PersonalInfo_Data?.markGender,
    "nationality": PersonalInfo_Data?.selectnational,
    "qualification": AcademicHistory_Data?.qualification,
    "name_of_school": AcademicHistory_Data?.school,
    "Course_Exam": AcademicHistory_Data?.Course,
    "gra_year": AcademicHistory_Data?.gra_year,
    "tutor_status": TutionStatus_Data?.WorkAs,
    "tuition_type": Tution_Type?.TutionType,
    "location": Tution_Type?.address,
    "postal_code": Tution_Type?.Postal_Code,
    "travel_distance": Tution_Type?.Distance,
    "personal_statement": TutionStatus_Data?.statement,
    "lettitude": Tution_Type?.latitude,
    "longitude": Tution_Type?.longitude,



    "HistoryAcademy": AcademicHistory_Data.History,

    "TutoringDetail":Tutoring_Data.selectArray

  }
  console.log(
    data1,
    "payloadpayloadpayloadpayloadpayloadpayloadpayloadpayload"
  );

  return (dispatch, getState) => {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/UserRegistration/CompleteUserProfileLoop.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data1,
    };

    axios
      .request(config)
      // .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(JSON.stringify(responseJson.data), "respone");
        if (responseJson.data.status == true) {
          await AsyncStorage.setItem("user_type", responseJson.data.user_type);
          await AsyncStorage.setItem("user_id", responseJson.data.user_id);
          await AsyncStorage.setItem("postcode", responseJson.data.postal_code);
          await AsyncStorage.setItem(
            "profilepic",
            responseJson.data.profile_image
          );

          let obj = {
            userid: responseJson.data.user_id,
            userType: responseJson.data.user_type,
            postcode: responseJson.data.postal_code,
            profilepic: responseJson.data.profile_image,
          };
          dispatch({
            type: Login_Data,
            payload: obj,
          });
          Alert.alert(responseJson.data.message);
          // console.log(responseJson.data);
          navigation.navigate("Auth4");
        } else if (responseJson.data.status == false) {
          Alert.alert("Please complete profile to proceed”");
        }
      })
      .catch((error) => {
        console.log(error, "error");
        Alert.alert(error)
      });
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
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorBookings/DateAndTimeOfferUpdate.php";

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

export const FavouriteAssignment = (loginuser, postId, Fav, val) => {
  console.log(loginuser, postId, Fav);
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorFavouriteAssignment/TutorFavouriteAssignment.php";

    let data = new FormData();
    data.append("tutor_login_id", loginuser);
    data.append("student_post_requirements_id", postId);
    data.append("favourite", Fav);

    console.log(
      data,
      "formdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdata"
    );
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

export const FavouriteTutorByStudent = (loginuser, tutorid, val) => {
  console.log(loginuser, tutorid, val);
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/FavouriteTutorByStudent/FavouriteTutorByStudent.php";

    let data = new FormData();
    data.append("logged_in_student_id", loginuser);
    data.append("tutor_id", tutorid);
    data.append("favourite_status", val);

    console.log(
      data,
      "formdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdataformdata"
    );
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
          dispatch({
            type: FAVOURITE_STATUS,
            payload: responseJson?.Favourite,
          });
          // Alert.alert(responseJson.message);
          // navigation.navigate("Auth4");
        } else if (responseJson.status == false) {
          Alert.alert("Something Wrong");
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const ConfirmofferDateTime = (tutorBookingProcessId, student_id) => {
  return (dispatch, getState) => {
    const url =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorBookings/DateAndTimeOfferUpdate.php";

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
          dispatch({
            type: FAVOURITE_STATUS,
            payload: responseJson?.Favourite,
          });
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
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorBookings/NegotiateOfferAmountUpdate.php";
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
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorBookings/OfferStatus.php";

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
  Postal_Code_Address,
  Tutor_Detail,
  navigation
) => {
  return (dispatch, getState) => {
    // console.log(student_id,'student_id')
    // let data = {
    //   logged_in_user_id: student_id.toString(),

    //   Student_Level_Grade_Subjects: Student_Detail?.Student_Data,

    //   student_tution_type: Tution_Type?.TutionType,
    //   student_postal_code: Tution_Type?.Postal_Code,
    //   student_postal_address: Postal_Code_Address,
    //   tutor_id: "4",
    //   tutor_duration_weeks: Tutor_Qualification?.frequency,
    //   tutor_duration_hours: Tutor_Qualification?.duration,
    //   tutor_tution_fees: Tutor_Qualification?.FeeOffer,
    //   tutor_tution_schedule_time: "12:30",
    //   tutor_tution_offer_amount_type:
    //     Tutor_Qualification?.feetype === "Place Offer"
    //       ? "Non Negotiable"
    //       : "Negotiable",
    //   tutor_tution_offer_amount: Tutor_Qualification?.FeeOffer,
    //   // booked_date: "17-07-2023",

    //   Qualifications: Tutor_Qualification?.TutorQualification,

    //   Tutor_Schedules_Slot_Time: Tutor_Schedule?.Tutor_schedules,
    // };
    let data = {
      "logged_in_user_id": student_id,
      "Student_Level_Grade_Subjects": Student_Detail?.Student_Data,


      "student_tution_type": Tution_Type?.TutionType,
      "student_postal_code": Tution_Type?.Postal_Code,
      "student_postal_address": Postal_Code_Address,
      "tutor_id": Tutor_Detail?.tutorid,
      "tutor_duration_weeks": Tutor_Qualification?.frequency,
      "tutor_duration_hours": Tutor_Qualification?.duration,
      "tutor_tution_fees": Tutor_Qualification?.FeeOffer,
      "tutor_tution_schedule_time": "12:30",
      "tutor_tution_offer_amount_type": Tutor_Qualification?.feetype === "Place Offer"
        ? "Non Negotiable"
        : "Negotiable",
      "tutor_tution_offer_amount": Tutor_Qualification?.FeeOffer,


      "Qualifications": Tutor_Qualification?.TutorQualification,
      "Tutor_Schedules_Slot_Time": Tutor_Schedule?.Tutor_schedules
    }
    console.log(data, "newdataaaaaaaa");
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorBookings/StudentPostRequirementLoopData.php",
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

          navigation.navigate("MyPosts");
        } else if (response.data.status == false) {
          Alert.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(data, "formdata");
  };
};
