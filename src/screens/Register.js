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

import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { CanceledError } from "axios";
const Register = ({ route }) => {
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

  const [imageSource1, setImageSource1] = useState("");
  const [newImg, setNewImg] = useState(null);

  const { Registermsg } = useSelector((state) => state.TutorReducer);
  const { otpmsgs } = useSelector((state) => state.TutorReducer);

  useEffect(() => {
    setLoader(true);
    setImageSource1("");
    setImageSource("");
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);


  const data = countryCode;
  // [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];
  const showcontent = () => {
    if (showemail == false) {
      setShowEmail(true);
    } else {
      setShowEmail(false);
    }
  };

  const toggleModal = () => {
    console.log("sddddddddd");
    setModalVisible(!isModalVisible);
  };


  const validatePassword = (input) => {
    let newSuggestions = [];
    if (input.length < 8) {
      newSuggestions.push('Password should be at least 8 characters long')
    }
    if (!/\d/.test(input)) {
      newSuggestions.push('Add at least one number')
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push('Include both upper and lower case letters')
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push('Include at least one special character')
    }

    setSuggestions(newSuggestions);

    // Determine password strength based on suggestions 
    if (newSuggestions.length === 0) {
      setStrength('Very Strong');
    }
    else if (newSuggestions.length <= 1) {
      setStrength('Strong')
    }
    else if (newSuggestions.length <= 2) {
      setStrength('Moderate')
    }
    else if (newSuggestions.length <= 3) {
      setStrength('Weak')
    }
    else {
      setStrength('Too Weak')
    }
  }


  const ConfirmEmailAdd = (input) => {

    if (input != Email) {
      setConfirmEmailMsg('Email does not match')
    }
    else {
      setConfirmEmailMsg("")

    }

  }


  const ConfirmMobileAdd = (input) => {

    if (input.length >= 7) {
      setIconArrow("show")
    }

    else {
      setIconArrow("")

    }

  }


  const VerifytoggleModal = () => {
    console.log(
      "AAAAAAAAAA",
      FirstName,
      LastName,
      Password,
      Email,
      Mobile,
      ConfirmEmail
    );

    let check = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/


    if (FirstName == "") {
      Alert.alert("Enter First Name");
    }

    else if (LastName == "") {
      Alert.alert("Enter Last Name");
    }

    // else if (Password.match(check)) {
    //   Alert.alert("password should at leat one number,lower,upper character ");
    // }

    else if (Email == "") {
      Alert.alert("Enter Email");
    } else if (ConfirmEmail != Email) {
      Alert.alert("Email does not match");
    }
    else if (value == "") {
      Alert.alert("Choose Country Code");
    }
    else if (Mobile == "") {
      Alert.alert("Enter Mobile Number");
    }
    else if (value == "") {
      Alert.alert("Choose Country Code");
    }
    // else if (imageSource == "") {
    //   Alert.alert("Please choose a profile pic");
    // }

    else {
      dispatch(
        RegisterUser(FirstName, LastName, Password, Email, value, Mobile, imageSource)
      );

      console.log("sddddddddd");

      // Alert.alert(Registermsg);
      setVerifyModalVisible(!isVerfyModalVisible);
      //  setModalVisible(!isModalVisible);
    }
  };

  const isSubmitDisabled = otp.length !== 4;

  const verifyOTP = () => {
    //console.log('LLLLLLLLLLPPPPPPPPPPPPP', otpcode);
    let otpcode = otp;
    setOtp(otpcode);
    setLoader(true);
    //  console.log('newwwwwwwwwwwwwww', otp)
    dispatch(OTPVerify(otpcode))
      .then((res) => setLoader(false))
      .finally(() => setLoader(false));
    console.log("isVerfyModalVisible=", isVerfyModalVisible);
    //Alert.alert(otpmsgs)
    setVerifyModalVisible(false);
  };

  const selectrole = (role) => {
    setUserRole(role)
    console.log("AAAAAAAAAAAAAAAA", role, otp);
    //navigation.navigate('Auth');
    setLoader(true);

    setTimeout(() => {
      // dispatch(
      //   RegisterUser(
      //     FirstName,
      //     LastName,
      //     Password,
      //     Email,
      //     value,
      //     Mobile,
      //     role,
      //     navigation
      //   )
      // );
      dispatch(OTPVerifywithrole(role, otp, navigation));

      setModalVisible(false);
      setLoader(false);
    }, 3000);
  };

  // useEffect(() => {
  //   Get_Image();
  // }, []);
  const shadowStyles = {
    ...Platform.select({
      android: {
        elevation: 20,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
    }),
  };
  const Get_Image = async () => {
    const img = await AsyncStorage.getItem("profileImage");
    setNewImg(img);
  };

  let options = {
    title: "You can choose one image",
    maxWidth: 256,
    maxHeight: 256,
    storageOptions: {
      skipBackup: true,
    },
  };
  const requestPermission = () => {
    openCamera();
    // request(PERMISSIONS.IOS.CAMERA).then((result) => {
    //   // console.log("requestPermission -> result", result);
    //   if (result === "granted") openCamera();
    // });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

  //console.log(imageSource, "imageSourceimageSourceimageSourceimageSourceimageSource")
  // console.log(imageSource1, "imageSource1imageSource1imageSource1imageSource1")

  const showSelectionPopup = () => (
    <TouchableOpacity
      onPress={() => setShowPopup(false)}
      style={{
        // position: "absolute",
        // top: 2,
        justifyContent: "center",
        alignItems: "center",
        //right: 0,

        // backgroundColor: 'rgba(0,0,0,0.2)',
        //zIndex: 10,
        //height: "100%",
        //width: "40%",
      }}
    >
      <View
        style={{
          height: 70,
          width: 200,
          // backgroundColor: 'red',
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={openImageLibrary}
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../Assets/gallery.png")}
            style={styles.icons1}
          />
        </TouchableOpacity>

        <View style={{ height: 0, width: "50%", backgroundColor: "grey" }} />
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Image
            source={require("../Assets/camra.png")}
            style={styles.icons1}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Loader flag={loader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: wp(92), alignSelf: "center" }}
      >
        <View style={styles.bottomcontent}>
          <Text style={styles.AlreadyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login Here </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Headcontainer}>
          <Text style={styles.headtext}>Create Account</Text>
          <Text style={styles.Firsttext}>
            Good Choice! Create an Account & experiance all {"\n"}the
            intersting features.
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", width: wp(90), justifyContent: "center", alignSelf: "center" }}
        >
          <View style={styles.usercontainer}>
            {showPopup && showSelectionPopup()}
          </View>

          <TouchableOpacity
            style={{
              width: "30%",
              //height: 100,
              borderRadius: 50,
              //     justifyContent: "center",
              //  alignItems: "center",
              alignItems: "flex-end",
              // backgroundColor: "red",
              // marginTop: 65,s
            }}
            onPress={() => setShowPopup(true)}
          >
            {/* {console.log(imageSource1, "LLLLLLLLLLLLLLLLLLLLLLL")} */}
            {imageSource1 == "" ? (
              <Image
                source={require("../Assets/Profile.png")}
                style={{
                  width: 100,
                  height: 100,

                  //  backgroundColor: "grey",
                }}
              />
            ) : (
              <>
                <View
                  style={{
                    width: 25,
                    position: "relative",
                    top: 10,
                    left: 20,
                    //padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    //  borderColor: '#000',
                    borderRadius: 20,
                    //   borderWidth: 2,
                    height: 25,
                  }}
                >
                  <Image
                    source={require("../Assets/pencilEdit.png")}
                    style={{
                      width: 15,
                      height: 15,

                      //  backgroundColor: "grey",
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    borderRadius: 50,
                    marginTop: -20,
                    paddingBottom: 10,
                    ...shadowStyles,
                  }}
                >
                  <Image
                    source={{ uri: imageSource1 }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,

                    }}
                  />
                </View>


              </>
            )}
          </TouchableOpacity>
          <View
            style={{
              width: "30%",
            }}
          >

          </View>

        </View>

        {/* <View style={styles.ImageSec}>
          <View style={styles.Profileimage}>
            <Image source={require("../Assets/usericon.png")} />
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,

            justifyContent: "space-between",
            width: wp(90),
          }}
        >
          <View style={styles.searchSection}>
            <Text style={styles.TextInputText1}>First Name</Text>
            <TextInput
              onChangeText={(text) => {
                setFirstName(text);
              }}
              placeholder="First Name"
              value={FirstName}
              style={styles.input1}
            />
          </View>

          <View style={styles.searchSection}>
            <Text style={styles.TextInputText1}>Last Name</Text>
            <TextInput
              onChangeText={(text) => {
                setLastName(text);
              }}
              placeholder="Last Name"
              value={LastName}
              style={styles.input1}
            />
          </View>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.TextInputText}>Password</Text>
          <View style={styles.Outinput}>
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
                validatePassword(text)
              }}
              secureTextEntry={!showPassword}
              placeholder="Password"
              value={Password}
              style={styles.passinput}
            />

            <TouchableOpacity
              onPress={() => toggleShowPassword()}
              style={{ justifyContent: "center", }}
            >
              {showPassword ?
                <Image
                  source={require("../Assets/view.png")}
                  style={styles.icons}
                />
                :
                <Image
                  source={require("../Assets/hide.png")}
                  style={styles.icons}
                />
              }
            </TouchableOpacity>
          </View>

          <Text style={styles.strengthText}>
            {strength}
          </Text>
          <Text style={styles.suggestionsText}>
            {suggestions.map((suggestion, index) => (
              <Text key={index}>
                {suggestion}{'\n'}
              </Text>))}
          </Text>

          {/* <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          /> */}
        </View>

        <View style={{ flexDirection: "row", width: wp(90), alignSelf: "center", justifyContent: "center" }}>
          <Text style={styles.TermsCondition}>
            View T&C and Privacy Policy
          </Text>
          <TouchableOpacity
            //  onPress={() => setEnable(!enable)}
            onPress={() => setTermsModalVisible(true)}
            style={
              enable
                ? {
                  height: 20,
                  width: 20,

                  borderRadius: 20,
                  alignSelf: "flex-end",
                  borderColor: "lightgrey",
                  padding: 2,
                  marginLeft: 10,
                  backgroundColor: "#2F5597",
                  // marginLeft: wp(10),
                  borderWidth: 3,
                }
                : {
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  borderRadius: 20,
                  borderColor: "lightgrey",
                  // marginLeft: wp(10),
                  borderWidth: 1,
                }
            }
          ></TouchableOpacity>
        </View>

        {showemail == false ? (
          <View style={styles.moblieSec}>
            <TouchableOpacity
              style={styles.mobiletoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Mobile Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emailtoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.moblieSec}>
            <TouchableOpacity
              style={styles.emailtoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Mobile Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mobiletoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        )}

        {showemail == false ? (
          <View>
            <Text style={styles.TextInputText}>Mobile Number</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Dropdown
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#D3D3D3",
                  borderRadius: 20,
                  fontSize: 14,
                  // width:wp(30),
                  marginRight: 5,
                  // fontFamily: 'SharpSansDispNo1-Semibold',
                  paddingLeft: 12,
                  color: "#131313",
                  height: 45,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder="Code"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />

              <TextInput
                onChangeText={(text) => {
                  setMobile(text);
                  ConfirmMobileAdd(text)
                }}
                placeholder="Mobile Number"
                value={Mobile}
                keyboardType="number-pad"
                style={{
                  flex: 1.5,
                  borderWidth: 1,
                  borderColor: "#D3D3D3",
                  borderRadius: 20,
                  fontSize: 14,
                  // width:wp(50),
                  // fontFamily: 'SharpSansDispNo1-Semibold',
                  paddingLeft: 12,
                  color: "#131313",
                  height: 45,
                }}
              />
            </View>
            <View>
              {iconArraow == "show" ?
                <View style={{ height: wp(20), justifyContent: "center", }}>
                  <TouchableOpacity
                    onPress={() => showcontent()}
                    style={styles.circleArrow}>
                    <Image source={require("../Assets/circleArrow.png")} />
                  </TouchableOpacity>
                </View>
                :

                <View />
              }

            </View>
            {/* <TouchableOpacity
              disabled={!enable}
              style={[
                styles.RequsertButton,
                { backgroundColor: enable ? "#2F5597" : "#bdc2dc" },
              ]}
             
              onPress={() => VerifytoggleModal()}
            >
              <Text style={styles.ReqButtonText}>Request OTP</Text>
            
            </TouchableOpacity> */}
          </View>

        ) : (
          <View>
            <View style={styles.searchSection}>
              <Text style={styles.TextInputText}>Email Address</Text>
              <TextInput
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholder="Email"
                value={Email}
                style={styles.input}
              />
            </View>
            <View style={styles.searchSection}>
              <Text style={styles.TextInputText}>Confirm Email Address</Text>
              <TextInput
                onChangeText={(text) => {
                  setConfirmEmail(text);
                  ConfirmEmailAdd(text)
                }}
                placeholder="Confirm Email"
                value={ConfirmEmail}
                style={styles.input}
              />
              <Text style={styles.suggestionsText}>
                {ConfirmEmailmsg}
              </Text>
            </View>
            {console.log(!enable, 'HHHHHHHHHHHHH', enable, FirstName)}
            <TouchableOpacity
              disabled={
                !enable ||
                (FirstName === "" || LastName === "" || Password === "" || ConfirmEmail === "" || Email === "" || Mobile === "")
              }

              // disabled={enable && FirstName && LastName == "" && Password == "" && ConfirmEmail == "" && Email == "" && Mobile == ""}
              style={[
                styles.RequsertButton,
                { backgroundColor: enable && FirstName != "" && LastName != "" && Password != "" && ConfirmEmail != "" && Email != "" && Mobile != "" ? "#2F5597" : "#bdc2dc" },
              ]}

              onPress={() => VerifytoggleModal()}
            >
              <Text style={styles.ReqButtonText}>Request OTP</Text>

            </TouchableOpacity>
            <View style={{ height: wp(10) }}></View>
          </View>
        )}


      </ScrollView>


      <Modal
        isVisible={isTermsModalVisible}
        onBackdropPress={() => setTermsModalVisible(false)}
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
        onBackdropPress={() => setModalVisible(false)}
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
        onBackdropPress={() => setVerifyModalVisible(false)}
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
            <Text style={styles.BlueText}>Verify Email Address</Text>
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

            <TouchableOpacity style={{ width: wp(90), alignSelf: "center", marginTop: wp(15), marginBottom: wp(2) }}>
              <Text style={{ textAlign: "center", color: '#2F5597', fontSize: 12 }}>Resend OTP</Text>
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

export default Register;

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
