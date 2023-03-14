import { ALL_TUTORS, REGISTER_MSG, OTP_MSG } from "./types";
import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert } from "react-native";


export const GetAllTutors = () => {
    return async (dispatch, getState) => {

        //const login = await getApiKey();

        //let data = JSON.parse(login);
        //var authtoken = data;
        //  console.log(authtoken)
        const url1 = 'https://refuel.site/projects/tutorapp/APIs/TutorList/TutorList.php';

        await fetch(url1,
            {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "Authorization": authtoken,
                }),
            }).then(response => response.json())
            .then((responseJson) => {
                console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson.Message)
                if (responseJson.status == true) {
                    dispatch({
                        type: ALL_TUTORS,
                        ALLTUTORS: responseJson.Message
                    });



                }
            })
            .catch(error => console.log(error))


    }
}


export const RegisterUser = (FirstName, LastName, Password, Email, Mobile) => {
    console.log(FirstName, LastName, Email, Mobile, Password)
    return (dispatch, getState) => {

        //const login = await getApiKey();
        //let data = JSON.parse(login);
        //var authtoken = data;
        //  console.log(authtoken)
        axios.defaults.baseURL = 'https://refuel.site';
        const url1 = axios.defaults.baseURL + '/projects/tutorapp/APIs/UserRegistration/UserRegistration.php';
        var formData = new FormData();
        formData.append('first_name', FirstName)
        formData.append('last_name', LastName)
        formData.append('email', Email)
        formData.append('mobile', Mobile)
        formData.append('password', Password)
        console.log("FORMDATAAAAA", formData)

        return fetch(url1,
            {

                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // "Authorization": authtoken,
                }),

                body: formData,
            }).then(response => response.json())
            .then((responseJson) => {
                // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson.message)
                //   Alert.alert(responseJson.message)
                if (responseJson.status == true) {

                    console.log('ww', responseJson.message)
                    // Alert.alert(responseJson.message)
                    dispatch({

                        type: REGISTER_MSG,
                        REG_MSG: responseJson.message


                    });



                }

                else if (responseJson.status == false) {

                    console.log('AAa', responseJson.message)
                   // Alert.alert(responseJson.message)
                    dispatch({

                        type: REGISTER_MSG,
                        REG_MSG: responseJson.message


                    });



                }
            })
            .catch(error => console.log('LLLLLLLLL', error.message))


    }
}




export const LoginUser = (Mobile, Email, Password, navigation) => {
    console.log(Mobile, Email, Password)
    return (dispatch, getState) => {


        axios.defaults.baseURL = 'https://refuel.site';
        const url1 = axios.defaults.baseURL + '/projects/tutorapp/APIs/UserLogin/UserLogin.php';
        var formData = new FormData();
        formData.append('login_option', 'Mobile Number')
        //  formData.append('last_name', LastName)
        //formData.append('email', Email)
        formData.append('mobile', Mobile)
        // formData.append('emailid', Email)
        formData.append('userpass', Password)
        console.log("FORMDATAAAAA", formData)

        return fetch(url1,
            {

                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // "Authorization": authtoken,
                }),

                body: formData,
            }).then(response => response.json())
            .then(async(responseJson) => {
                console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson)
               
                if (responseJson.Status == true) {
                    
                    await AsyncStorage.setItem("token",responseJson.Access_Token).then(res=>{
                        console.log("succesfull login")
                        navigation.replace('Auth')})
                    //  console.log(responseJson.Message)

                    // dispatch({

                    //     type: ALL_TUTORS,
                    //     ALLTUTORS: responseJson.Message


                    // });


                }

                else if (responseJson.status == false) {

                    Alert.alert(responseJson.message)
                    //  navigation.navigate('Auth');
                    //  console.log(responseJson.Message)

                    // dispatch({

                    //     type: ALL_TUTORS,
                    //     ALLTUTORS: responseJson.Message


                    // });



                }
            })
            .catch(error => console.log('LLLLLLLLL', error.message))


    }
}





export const OTPVerify = (code) => {
    // console.log(Mobile, Email, Password)
    return (dispatch, getState) => {


        axios.defaults.baseURL = 'https://refuel.site';
        const url1 = axios.defaults.baseURL + '/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php';
        var formData = new FormData();
        // formData.append('login_option', 'Mobile Number')

        formData.append('OTP_MOBILE', code)

        console.log("FORMDATAAAAA", formData)

        return fetch(url1,
            {

                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // "Authorization": authtoken,
                }),

                body: formData,
            }).then(response => response.json())
            .then((responseJson) => {
                //  console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson)
                if (responseJson.status == true) {
                    //  navigation.navigate('Auth');
                    console.log('PPPaaa', responseJson.message)

                    dispatch({

                        type: OTP_MSG,
                        otpmsg: responseJson.message


                    });



                }

                else if (responseJson.status == false) {
                    //  navigation.navigate('Auth');
                    console.log('WWWpppp', responseJson.message)

                    dispatch({

                        type: OTP_MSG,
                        otpmsg: responseJson.message
                    });
                }
            })
            .catch(error => console.log('LLLLLLLLL', error.message))


    }
}





export const OTPVerifywithrole = (role, otp, navigation) => {
    // console.log(Mobile, Email, Password)
    return (dispatch, getState) => {


        axios.defaults.baseURL = 'https://refuel.site';
        const url1 = axios.defaults.baseURL + '/projects/tutorapp/APIs/UserRegistration/UserRegistrationOTP.php';
        var formData = new FormData();
        formData.append('user_type', role)

        formData.append('OTP_MOBILE', otp)

        console.log("FORMDATAAAAA", formData)

        return fetch(url1,
            {

                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // "Authorization": authtoken,
                }),

                body: formData,
            }).then(response => response.json())
            .then((responseJson) => {
                //  console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', responseJson)
                if (responseJson.status == true && role == 'I am an Educator') {
                    navigation.navigate('Auth2');
                    console.log('PPPaaa', responseJson.message)

                    // dispatch({

                    //     type: OTP_MSG,
                    //     otpmsg: responseJson.message


                    // });



                }

                else if (responseJson.status == true && role == 'I am looking for a Tutor') {
                    navigation.replace('Auth');
                    console.log('PPPaaa', responseJson.message)

                    // dispatch({

                    //     type: OTP_MSG,
                    //     otpmsg: responseJson.message


                    // });



                }

                else if (responseJson.status == false) {
                    //  navigation.navigate('Auth');
                    //   console.log('WWWpppp', responseJson.message)
                    Alert.alert(responseJson.message)
                    // dispatch({

                    //     type: OTP_MSG,
                    //     otpmsg: responseJson.message


                    // });



                }
            })
            .catch(error => console.log('LLLLLLLLL', error.message))


    }
}





