import { GET_POSTAL_DATA, GET_FILTER_DATA, GET_QUICK_DATA } from "./types";
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
    axios.defaults.baseURL = "https://refuel.site";
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
        console.log("PPPPPPPPPPPPPPPPPPPPPPP", responseJson);
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
    axios.defaults.baseURL = "https://refuel.site";
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

export const GetResultAfterPostcode = (postalcode, navigation) => {
  console.log(postalcode);
  return (dispatch, getState) => {
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCode.php";
    var formData = new FormData();
    formData.append("tuition_type", "Home Tuition");
    formData.append("postal_code", postalcode);

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
        // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson.message)
        //   Alert.alert(responseJson.message)
        if (responseJson.status == true) {
          console.log("ww", responseJson.Message);
          // Alert.alert(responseJson.message)
          dispatch({
            type: GET_POSTAL_DATA,
            POSTAL_DATA: responseJson.Message,
          });

          navigation.navigate("OurTutor", {
            postalcode: postalcode,
            tuition_type: "Home Tuition",
          });
        } else if (responseJson.status == false) {
          console.log("AAa", responseJson.Message);
          Alert.alert(responseJson.Message);
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
  alert("hiii");
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
    alert("hiii 1");
    axios.defaults.baseURL = "https://refuel.site";
    const url1 =
      "https://refuel.site/projects/tutorapp/APIs/TutorSearch/TutorSearchByTutionServiceAndPostalCodeAndLevelsAndSubjects.php";

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
