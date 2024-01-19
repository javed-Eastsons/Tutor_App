import {
  GET_POSTAL_DATA,
  GET_FILTER_DATA,
  GET_QUICK_DATA,
  GET_FILTER_ASSIGNMENT,
  Login_Data,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import axios, * as others from "axios";
import { Alert } from "react-native";

export const GetfilterQualification = (
  postalcode,
  tuition_type,
  gender,
  status,
  shortarray,
  navigation
) => {
  var mainarray = [];
  var item = {};
  item["tuition_type"] = tuition_type;
  item["postal_code"] = postalcode;
  item["Gender"] = gender;
  item["Time_status"] = status;
  mainarray.push(item);
  mainarray.push(shortarray);
  console.log("mainarray", mainarray);

  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCodeAndFilters.php";

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
        // console.log("PPPPPPPPPPPPPPPPPPPPPPP", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.Status == true) {
          console.log("ww", responseJson.Tutor_Search_Data);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_FILTER_DATA,
            FILTER_DATA: responseJson.Tutor_Search_Data,
          });

          // navigation.navigate('OurTutor')
        } else if (responseJson.Status == false) {
          console.log("AAa", responseJson.Message);
          // Alert.alert(responseJson.Message);
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetFilterBySubjects = (
  Level,
  PostalCode,
  Subjects,

  navigation
) => {
  let data = {
    postal_code: PostalCode,
    TutoringLevel: Level,
    subjects: Subjects,
  };
  // console.log("mainarraymainarraymainarraymainarray", data);

  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/FilterData/TutorFilterData.php";

    console.log(url1);
    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("PPPPPPPPPPPPPPPPPPPPPPP", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          // console.log("ww", responseJson.Filter_Data_Records);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_FILTER_DATA,
            FILTER_DATA: responseJson.Filter_Data_Records,
          });

          // navigation.navigate('OurTutor')
        } else if (responseJson.status == false) {
          console.log("AAaaaaaaaaaaaaaaaaa", responseJson.message);
          dispatch({
            type: GET_FILTER_DATA,
            FILTER_DATA: [],
          });
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetFilterAssignment = (
  Level,

  navigation
) => {
  let data = {
    Levels_search: Level,
  };
  // console.log("mainarraymainarraymainarraymainarray", data);

  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/FilterViewAssignmentByLavel/FilterViewAssignmentByLavel.php";

    console.log(url1);
    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("PPPPPPPPPPPPPPPPPPPPPPP", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.Status == true) {
          // console.log("ww", responseJson.Filter_Data_Records);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_FILTER_ASSIGNMENT,
            paload: responseJson.Filter_Data,
          });

          // navigation.navigate('OurTutor')
        } else if (responseJson.Status == false) {
          console.log("AAa", responseJson.message);
          dispatch({
            type: GET_FILTER_ASSIGNMENT,
            paload: responseJson.Filter_Data,
          });
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetfilterSubject = (
  postalcode,
  tuition_type,
  shortarray,
  navigation
) => {
  var mainarray = [];
  var item = {};
  item["tuition_type"] = tuition_type;
  item["postal_code"] = postalcode;
  mainarray.push(item);
  mainarray.push(shortarray);
  console.log("mainarray", mainarray);

  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCodeAndLevelsAndSubjects.php";

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
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);
        //   Alert.alert(responseJson.message)
        if (responseJson.Status == true) {
          console.log("ww", responseJson.Tutor_Search_Data);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_FILTER_DATA,
            FILTER_DATA: responseJson.Tutor_Search_Data,
          });

          // navigation.navigate('OurTutor')
        } else if (responseJson.Status == false) {
          console.log("AAa", responseJson.Message);
          Alert.alert(responseJson.Message);
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetResultAfterPostcode = (postalcode, Login_Data, navigation) => {
  Alert.alert('hello world')
  console.log(postalcode, Login_Data, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCode.php";
    var formData = new FormData();
    formData.append("tuition_type", "Home Tuition");
    formData.append("postal_code", postalcode);
    if (Login_Data.userid == undefined) {
      formData.append("logged_in_student_id", "");
    } else {
      formData.append("logged_in_student_id", Login_Data.userid);
    }

    console.log(url1, "url1url1url1url1url1", formData);

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
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
          // console.log(
          //   "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
          //   responseJson.message
          // );
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_POSTAL_DATA,
            POSTAL_DATA: responseJson.data,
          });

          navigation.navigate("OurTutor", {
            postalcode: postalcode,
            tuition_type: "Home Tuition",
          });
        } else if (responseJson.status == false) {
          //  console.log("AAa", responseJson.message);
          Alert.alert(responseJson.message);
          // dispatch({

          //     type: REGISTER_MSG,
          //     REG_MSG: responseJson.message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const GetResultAfterPostcodeLatLong = (postalcode, lat, long, navigation) => {
  console.log(postalcode, lat, long, navigation, "PPPPPPPPPPPPPPPPPP");
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearchListingByDistance/TutorSearchListingByDistance.php";
    // var formData = new FormData();
    // formData.append("tuition_type", "Home Tuition");
    // formData.append("postal_code", postalcode);
    // if (Login_Data.userid == undefined) {
    //   formData.append("logged_in_student_id", "");
    // } else {
    //   formData.append("logged_in_student_id", Login_Data.userid);
    // }
    const _body = {
      postal_code: postalcode,
      student_lat: lat,
      student_long: long,

    };


    console.log(url1, "url1url1url1url1url1", _body);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(_body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
          console.log(
            "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
            responseJson.Search_Data_Records
          );
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_POSTAL_DATA,
            POSTAL_DATA: responseJson.Search_Data_Records,
          });

          navigation.navigate("OurTutor", {
            postalcode: postalcode,
            lat: lat,
            long: long,
            tuition_type: "Home Tuition",
          });
        } else if (responseJson.status == false) {
          //  console.log("AAa", responseJson.message);
          Alert.alert(responseJson.message);
          // dispatch({

          //     type: REGISTER_MSG,
          //     REG_MSG: responseJson.message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetResultAfterPostcodeLatLong1 = (postalcode, lat, long, levels, navigation) => {
  console.log(postalcode, lat, long, levels, navigation, "IIIIIIIIIIIIIIIIIIII");
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearchListingByDistance/TutorSearchListingByDistance.php";
    // var formData = new FormData();
    // formData.append("tuition_type", "Home Tuition");
    // formData.append("postal_code", postalcode);
    // if (Login_Data.userid == undefined) {
    //   formData.append("logged_in_student_id", "");
    // } else {
    //   formData.append("logged_in_student_id", Login_Data.userid);
    // }
    const _body = {
      postal_code: postalcode,
      student_lat: lat,
      student_long: long,
      gender: "Female",
      tutor_status: "Full Time",
      stream: ["Express", "NT", "IP"],
      nationality: ["Australia", "America"],
      subjects: ["Mathematics H1", "Physics H1"],
      TutoringLevel: levels,
      grade: ["N2", "P2"],
      qualification: ["MBA", "BA", "A Level"]
    };


    console.log(url1, "url1url1url1url1url1", _body);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        //  "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(_body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
          console.log(
            "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
            responseJson.Search_Data_Records
          );
          Alert.alert(responseJson.message)
          dispatch({
            type: GET_POSTAL_DATA,
            POSTAL_DATA: responseJson.Search_Data_Records,
          });

          // navigation.navigate("OurTutor", {
          //   postalcode: postalcode,
          //   lat: lat,
          //   long: long,
          //   tuition_type: "Home Tuition",
          // });
        } else if (responseJson.status == false) {
          //  console.log("AAa", responseJson.message);
          Alert.alert(responseJson.message);
          // dispatch({

          //     type: REGISTER_MSG,
          //     REG_MSG: responseJson.message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const GetQuickData = (postalcode, navigation) => {
  console.log(
    "🚀 ~ file: TutorSearchAction.js ~ line 202 ~ GetQuickData ~ postalcode",
    postalcode
  );
  // alert("hiii", );
  const _body = [
    {
      tuition_type: "Home Tuition",
      postal_code: "12345",
    },
    [
      {
        Levels_search: "AEIS (Secondary)",
      },
      {
        subject_search: "English",
      },
    ],
  ];

  return (dispatch, getState) => {
    // alert("hiii 1");
    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      "https://colwithfarmchips.co.uk/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCodeAndLevelsAndSubjects.php";

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Authorization": authtoken,
      }),

      body: JSON.stringify(_body),
    })
      .then((response) => {
        console.log("Repone Quick Data", response);
        return response.json();
      })
      .then((responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.Status == true) {
          dispatch({
            type: GET_QUICK_DATA,
            QUICK_DATA: responseJson,
          });

          navigation.navigate("OurTutor", {
            postalcode: postalcode,
            tuition_type: "Home Tuition",
          });
        } else if (responseJson.status == false) {
          console.log("@@@@@@@@>>>>>>>>>>", responseJson.Message);
          Alert.alert(responseJson.Message);
        }
      })
      .catch((error) => console.log("@@@@@@???????", error.message));
  };
};
