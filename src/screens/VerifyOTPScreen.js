import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import OTPTextView from "react-native-otp-textinput";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import {
  RegisterUser,
  OTPVerify,
  OTPVerifywithrole,
} from "../Redux/Actions/Tutors";
//import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from "@react-native-community/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/Loader";
import { Dropdown } from "react-native-element-dropdown";
import { countryCode } from "../common/countrycode";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

import axios, * as others from "axios";

const VerifyOTPScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userrole, setUserRole] = useState("");
  const [Mobile, setMobile] = React.useState("");
  const [ConfirmEmail, setConfirmEmail] = React.useState("");
  const [ConfirmEmailmsg, setConfirmEmailMsg] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [showemail, setShowEmail] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTermsModalVisible, setTermsModalVisible] = useState(false);
  const [isVerfyModalVisible, setVerifyModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');
  const [iconArraow, setIconArrow] = useState("");

  const [enable, setEnable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [imageSource1, setImageSource1] = useState("");
  const [newImg, setNewImg] = useState(null);

  const { Registermsg } = useSelector((state) => state.TutorReducer);
  const { otpmsgs } = useSelector((state) => state.TutorReducer);



  console.log(route.params.Email, 'IIIIIIIIIIIIII', route.params.FirstName, route.params.LastName, route.params.Password, route.params.Email, route.params.country_phone_code, route.params.Mobile, route.params.imageSource)







  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);

    };


  }, [seconds]);



  const isSubmitDisabled = otp.length !== 4;

  const verifyOTP = () => {
    setLoader(true);
    //console.log('LLLLLLLLLLPPPPPPPPPPPPP', otpcode);
    let otpcode = otp;
    setOtp(otpcode);



    axios.defaults.baseURL = "https://colwithfarmchips.co.uk";
    const url1 =
      axios.defaults.baseURL +
      "/projects/tutorapp/APIs/UserRegistration/OTPVerify.php";
    var formData = new FormData();
    // formData.append("user_type", role);
    formData.append("email", route.params.Email);

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
        console.log("OTPVERIFYYYYYYYYYYYYYYY", responseJson);

        if (responseJson.status == true) {
          setModalVisible(true);
          console.log("PPPaaa", responseJson.message);
          setTimeout(() => {
            setLoader(false);
          }, 2000);

          //  Alert.alert(responseJson.message);
        } else if (responseJson.status == false) {
          //  navigation.navigate('Auth');
          //   console.log('WWWpppp', responseJson.message)
          Alert.alert(responseJson.message);
          // dispatch({
          setTimeout(() => {
            setLoader(false);
          }, 2000);

          //     type: OTP_MSG,
          //     otpmsg: responseJson.message

          // });
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));


    //  setLoader(true);
    //  console.log('newwwwwwwwwwwwwww', otp)
    // dispatch(OTPVerifywithrole(otpcode)) 
    // dispatch(OTPVerify(otpcode))
    //   .then((res) => setLoader(false))
    //   .finally(() => setLoader(false));
    console.log("isVerfyModalVisible=", isVerfyModalVisible);
    //Alert.alert(otpmsgs)
    setVerifyModalVisible(false);
    setModalVisible(true);
  };

  const selectrole = (role) => {

    setUserRole(role)
    console.log("AAAAAAAAAAAAAAAA", role, otp, route.params.Email);
    //navigation.navigate('Auth');
    setLoader(true);


    dispatch(OTPVerifywithrole(role, otp, route.params.Email, navigation));

    setModalVisible(false);
    setUserRole("")
    setTimeout(() => {
      setLoader(false);
    }, 2000);




  };




  let options = {
    title: "You can choose one image",
    maxWidth: 256,
    maxHeight: 256,
    storageOptions: {
      skipBackup: true,
    },
  };

  const openCamera = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // console.log(response);
        setNewImg(response.assets[0].uri);
        AsyncStorage.setItem("profileImage", response);
      }
      setShowPopup(false);
    });
  };
  const openImageLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // console.log(response.assets[0].uri);
        setNewImg(response.assets[0].uri);
        AsyncStorage.setItem("profileImage", response.assets[0].uri);
      }
      setShowPopup(false);
    });
  };
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  toDataURL(newImg).then((dataUrl) => {
    var base64result = dataUrl.split(",")[1];

    // console.log("RESULT:", base64result);
    setImageSource(base64result);
    setImageSource1(dataUrl);
  });

  const CancelTerms = () => {

    setTermsModalVisible(false)
    setEnable(false)
  }

  const AgreeTerms = () => {

    setTermsModalVisible(false)
    setEnable(true)
  }
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
    dispatch(
      RegisterUser(route.params.FirstName, route.params.LastName, route.params.Password, route.params.Email, route.params.country_phone_code, route.params.Mobile, route.params.imageSource)
    );


  };
  //console.log(imageSource, "imageSourceimageSourceimageSourceimageSourceimageSource")
  // console.log(imageSource1, "imageSource1imageSource1imageSource1imageSource1")


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Loader flag={loader} />


      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignSelf: "center",
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(60),
          width: wp(100),
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.BlueContainer}>
          <Text style={styles.BlueText}>Verify Email Address222</Text>
        </View>
        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            alignSelf: "center",
            position: "absolute",
            top: hp(8),
            height: hp(45),
            width: wp(90),
            backgroundColor: "#fff",
            elevation: 20,
            color: '#000'
          }}
        >
          <View style={styles.ModelTextContainer}>
            <Text style={styles.ModelText}>Verification Code</Text>
            <Text style={styles.ModelText2}>
              OTP is sent to your email address
            </Text>
          </View>
          <OTPTextView
            containerStyle={{ marginHorizontal: 16 }}
            handleTextChange={(text) => setOtp(text)}
            inputCount={4}
            keyboardType="numeric"
            //  defaultValue={OTP}
            borderWidth={0}
            backgroundColor={"grey"}
            borderBottomWidth={0}
            size={10}
            borderRadius={10}
            width={65}
            height={66}
            tintColor={"#fff"}
          />
          <View
            style={{

              alignSelf: "center", marginTop: 10,

            }}
          >


            {seconds > 0 || minutes > 0 ? (
              <Text
                style={{
                  color: 'green',
                  width: wp(90), alignSelf: "center", marginBottom: wp(2),
                  textAlign: "center",
                }}
              >
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            ) : (
              <Text
                style={{
                  color: 'red',
                  width: wp(90), alignSelf: "center", marginBottom: wp(2),
                  textAlign: "center",
                }}
              >Didn't recieve code?</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => resendOTP()}
            disabled={seconds > 0 || minutes > 0}
            style={{


              width: wp(90), alignSelf: "center", marginBottom: wp(2)

            }}

          >


            <Text style={{
              color: seconds > 0 || minutes > 0 ? "#bdc2dc" : "#2F5597",
              fontWeight: seconds > 0 || minutes > 0 ? "400" : "700",
              textAlign: "center", color: '#2F5597', fontSize: 12
            }}>Resend OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: isSubmitDisabled ? "#bdc2dc" : "#2F5597",
              width: wp(70),
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
            onPress={() => {
              verifyOTP();
            }}
            disabled={isSubmitDisabled}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>




      <Modal
        isVisible={isTermsModalVisible}
      //    onBackdropPress={() => setTermsModalVisible(false)}
      >
        {/* <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'center', position: 'absolute', bottom: 0, height: hp(45), width: wp(100), backgroundColor: '#fff' }}>
         */}
        <View
          style={{
            //  height: "50%",
            marginTop: "auto",
            position: "absolute",
            bottom: -20,
            left: -20,
            width: wp(100),
          }}
        >
          <View style={styles.BlueContainer1}>
            <Text style={styles.BlueText}>Terms & Condition</Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              // position: "absolute",
              // bottom: 0,
              height: hp(75),
              width: wp(100),
              backgroundColor: "#fff",
            }}
          >
            <View style={styles.ModelTextContainer}>
              <Text style={styles.TermModelText}> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.</Text>
            </View>
            <View style={{ alignContent: "flex-end", flexDirection: 'row', width: wp(60), alignSelf: 'center', justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => CancelTerms()}
                style={{
                  backgroundColor: "#2F5597",
                  width: wp(20),
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 1,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => AgreeTerms()}
                style={{
                  backgroundColor: "#2F5597",
                  width: wp(20),
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 1,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>Agree</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Modal>


      <Modal
        isVisible={isModalVisible}
      // onBackdropPress={() => setModalVisible(false)}
      >
        {/* <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'center', position: 'absolute', bottom: 0, height: hp(45), width: wp(100), backgroundColor: '#fff' }}>
         */}
        <View
          style={{
            //  height: "50%",
            marginTop: "auto",
            position: "absolute",
            bottom: -20,
            left: -20,
            width: wp(100),
          }}
        >
          <View style={styles.BlueContainer1}>
            <Text style={styles.BlueText}>Almost Done</Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              // position: "absolute",
              // bottom: 0,
              height: hp(25),
              width: wp(100),
              backgroundColor: "#fff",
            }}
          >
            {/* <View style={styles.ModelTextContainer}>
                        <Text style={styles.ModelText}>Tell me, what do you want to do today?</Text>
                    </View> */}
            <View
              style={{
                alignSelf: "center",
                width: wp(90),
                flexDirection: "row",
                top: hp(-3),
              }}
            >
              <View style={styles.Rolecontainer}>
                <Image
                  source={require("../Assets/Tutor_icon.png")}
                  style={styles.icons}
                />
                <Text style={styles.ModelText1}>
                  I am looking for {"\n"}a Tutor
                </Text>
                <View style={{
                  elevation: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,

                  height: 20,
                  width: 20,
                  color: '#000'
                }}>
                  <TouchableOpacity
                    onPress={() => selectrole("I am looking for a Tutor")}
                    // onPress={() => navigation.navigate('Auth')}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      backgroundColor: userrole == "I am looking for a Tutor" ? "#2F5597" : "",
                      borderColor: "lightgrey",
                      borderWidth: 2,
                    }}
                  ></TouchableOpacity>
                </View>
              </View>

              <View style={styles.Rolecontainer}>
                <Image
                  source={require("../Assets/Educator_icon.png")}
                  style={styles.icons}
                />
                <Text style={styles.ModelText1}>I am an {"\n"}Educator</Text>
                <View style={{
                  elevation: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  height: 20,

                  width: 20,
                  color: '#000'
                }}>
                  <TouchableOpacity
                    //onPress={() => navigation.navigate('Auth2')}
                    onPress={() => selectrole("I am an Educator")}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      backgroundColor: userrole == "I am an Educator" ? "#2F5597" : "",
                      borderColor: "lightgrey",
                      borderWidth: 2,
                    }}
                  ></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* </View> */}
        </View>
      </Modal>

      <Modal
        isVisible={isVerfyModalVisible}
        //  onBackdropPress={() => setVerifyModalVisible(false)}
        onModalHide={() => setModalVisible(true)}
      >
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: hp(60),
            width: wp(100),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.BlueContainer}>
            <Text style={styles.BlueText}>Verify Email Address1111</Text>
          </View>
          <View
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignSelf: "center",
              position: "absolute",
              top: hp(8),
              height: hp(45),
              width: wp(90),
              backgroundColor: "#fff",
              elevation: 20,
              color: '#000'
            }}
          >
            <View style={styles.ModelTextContainer}>
              <Text style={styles.ModelText}>Verification Code</Text>
              <Text style={styles.ModelText2}>
                OTP is sent to your email address
              </Text>
            </View>
            <OTPTextView
              containerStyle={{ marginHorizontal: 16 }}
              handleTextChange={(text) => setOtp(text)}
              inputCount={4}
              keyboardType="numeric"
              //  defaultValue={OTP}
              borderWidth={0}
              backgroundColor={"grey"}
              borderBottomWidth={0}
              size={10}
              borderRadius={10}
              width={65}
              height={66}
              tintColor={"#fff"}
            />
            <View
              style={{

                alignSelf: "center", marginTop: 10,

              }}
            >


              {seconds > 0 || minutes > 0 ? (
                <Text
                  style={{
                    color: 'green',
                    width: wp(90), alignSelf: "center", marginBottom: wp(2),
                    textAlign: "center",
                  }}
                >
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'red',
                    width: wp(90), alignSelf: "center", marginBottom: wp(2),
                    textAlign: "center",
                  }}
                >Didn't recieve code?</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => resendOTP()}
              disabled={seconds > 0 || minutes > 0}
              style={{


                width: wp(90), alignSelf: "center", marginBottom: wp(2)

              }}

            >


              <Text style={{
                color: seconds > 0 || minutes > 0 ? "#bdc2dc" : "#2F5597",
                fontWeight: seconds > 0 || minutes > 0 ? "400" : "700",
                textAlign: "center", color: '#2F5597', fontSize: 12
              }}>Resend OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: isSubmitDisabled ? "#bdc2dc" : "#2F5597",
                width: wp(70),
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => {
                verifyOTP();
              }}
              disabled={isSubmitDisabled}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView >
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: -25,
  },
  headtext: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Poppins-Bold",
  },
  Firsttext: {
    fontSize: 12,
    color: "grey",
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  ModelTextContainer: {
    padding: 20,
  },
  ModelText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  TermModelText: {
    fontSize: 12,
    // fontWeight: "700",
    justifyContent: "center"
  },

  ModelText2: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 20,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#000",
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  BlueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    width: wp(85),
    alignSelf: "center",
    marginTop: 15,
  },

  BlueContainer: {
    height: hp(15),
    backgroundColor: "#2F5597",
    borderTopLeftRadius: 20,
    width: wp(100),
    alignSelf: "center",
    borderTopRightRadius: 20,
    // marginTop: hp(10),
  },
  strengthText: {
    //fontWeight: 'bold',
    fontSize: 10,
    color: '#007700',
  },
  circleArrow: {
    //flex: 0.1,
    alignSelf: "flex-end"
    // justifyContent: "center",
    // alignItems: "flex-end",
    // paddingRight: wp(4.5),
    // paddingBottom: hp(4),
  },
  suggestionsText: {
    color: 'red',
    fontSize: 10,
    paddingLeft: 15
  },
  BlueContainer1: {
    height: hp(10),
    backgroundColor: "#2F5597",
    borderTopLeftRadius: 20,
    width: wp(100),
    alignSelf: "center",
    borderTopRightRadius: 20,
    //  marginTop: hp(10),
  },
  ImageSec: {
    height: hp(15),
    //  backgroundColor: "red",
    justifyContent: "center",
  },
  Profileimage: {
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    fontSize: 14,
    paddingLeft: 10,
    width: wp(90),
    // fontFamily: 'SharpSansDispNo1-Semibold',

    color: "#131313",
    height: 45,
  },
  passinput: {
    // borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    fontSize: 14,
    paddingLeft: 10,
    width: wp(80),
    // fontFamily: 'SharpSansDispNo1-Semibold',

    color: "#131313",
    height: 45,
  },
  Outinput: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    flexDirection: "row",
    fontSize: 14,
    width: wp(90),
    // fontFamily: 'SharpSansDispNo1-Semibold',

    color: "#131313",
    height: 45,
  },

  input1: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    width: wp(44),
    fontSize: 14,
    // width: wp('42%'),
    // fontFamily: 'SharpSansDispNo1-Semibold',
    paddingLeft: 12,

    color: "#131313",
    height: 45,
  },

  input2: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 20,
    fontSize: 14,
    width: wp("42%"),
    // fontFamily: 'SharpSansDispNo1-Semibold',
    paddingLeft: 12,
    marginLeft: wp(5),
    color: "#131313",
    height: 45,
  },

  searchSection: {
    justifyContent: "space-between",
    paddingBottom: 12,
    alignSelf: "center",
    marginTop: 5,
  },
  TextInputText: {
    color: "#131313",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 8,
  },
  TextInputText1: {
    color: "#131313",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    //  paddingLeft: 10,

    lineHeight: 16,
    paddingBottom: 8,
  },
  TextInputText2: {
    color: "#131313",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 16,
    marginLeft: wp(5),
    paddingBottom: 8,
  },
  TermsCondition: {
    // backgroundColor: "red",
    color: "#131313",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  Rolecontainer: {
    //flexDirection: "row",

    width: wp(35),
    height: hp(22),
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "center",
    marginRight: 30,
    borderRadius: 30,

    elevation: 10,
    shadowColor: "#000",
    alignItems: "center",
  },
  ModelText1: {
    fontSize: 12,
    fontWeight: "700",
    color: "grey",
    paddingTop: 10,
    paddingBottom: 10,
    width: wp(50),
    textAlign: "center",
    // alignSelf: "flex-end"
  },
  icons: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  icons1: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  moblieSec: {
    backgroundColor: "lightgrey",
    height: hp(8),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  mobiletoch: {
    backgroundColor: "#2F5597",
    width: wp(40),
    height: hp(6),
    borderRadius: 30,
    justifyContent: "center",
    fontFamily: "Poppins-Regular",
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(40),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    fontFamily: "Poppins-Regular",
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  RequsertButton: {
    height: hp(5),
    width: wp(80),
    alignSelf: "center",
    borderRadius: 50,
    marginTop: 15,
    justifyContent: "center",
  },
  ReqButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  bottomcontent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  AlreadyText: {
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  loginText: {
    color: "#2F5597",
    fontSize: 12,
    paddingTop: 5,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },

  usercontainer: {
    alignSelf: "flex-start",
    // backgroundColor: "red",
    width: wp(20),
    marginTop: 10,
    //backgroundColor: "yellow",

    //alignSelf: "center",
    //  flexDirection: "row",
    //justifyContent: "center"
  },
});
