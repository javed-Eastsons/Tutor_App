import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
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

import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/Loader";
import { Dropdown } from "react-native-element-dropdown";
import { countryCode } from "../common/countrycode";

const Register = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Mobile, setMobile] = React.useState("");
  const [ConfirmEmail, setConfirmEmail] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [showemail, setShowEmail] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVerfyModalVisible, setVerifyModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [enable, setEnable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState([]);

  const { Registermsg } = useSelector((state) => state.TutorReducer);
  const { otpmsgs } = useSelector((state) => state.TutorReducer);

  // console.log('LLLLLLLLLLLLLLLLLLLLLL', Registermsg)
  //   console.log('SSSSSSSSSSSSSSSSSSSSSSS', otpmsgs)

  // useEffect(() => {

  //     console.log(route.params.codeadd);
  //     if (route.params.codeadd == 'yes') {
  //         setModalVisible(true)
  //         // toggleModal()
  //     }
  //     else {
  //         setModalVisible(false)
  //     }

  // }, [])

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

    if (FirstName == "") {
      Alert.alert("Enter First Name");
    } else if (LastName == "") {
      Alert.alert("Enter Last Name");
    } else if (Password == "") {
      Alert.alert("Enter Password");
    } else if (Email == "") {
      Alert.alert("Enter Email");
    } else if (ConfirmEmail != Email) {
      Alert.alert("Email does not match");
    } else if (Mobile == "") {
      Alert.alert("Enter Mobile Number");
    } else {
      dispatch(
        RegisterUser(FirstName, LastName, Password, Email, value, Mobile)
      );

      console.log("sddddddddd");

      // Alert.alert(Registermsg);
      //  setVerifyModalVisible(!isVerfyModalVisible);
      setModalVisible(!isModalVisible);
    }
  };

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
    console.log("AAAAAAAAAAAAAAAA", role, otp);
    //navigation.navigate('Auth');
    dispatch(OTPVerifywithrole(role, otp, navigation));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: wp(92), alignSelf: "center" }}
      >
        <View style={styles.Headcontainer}>
          <Text style={styles.headtext}>Create Account</Text>
          <Text style={styles.Firsttext}>
            Good Choice! Create an Account & experiance all {"\n"} the
            intersting features
          </Text>
        </View>
        <View style={styles.ImageSec}>
          <View style={styles.Profileimage}>
            <Image source={require("../Assets/usericon.png")} />
          </View>
        </View>
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
          <TextInput
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Password"
            value={Password}
            style={styles.input}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.TermsCondition}>
            I agree to the Terms & Conditions, and the {"\n"} Privacy Policy
          </Text>
          <TouchableOpacity
            onPress={() => setEnable(!enable)}
            style={
              enable
                ? {
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    borderColor: "lightgrey",
                    padding: 2,
                    backgroundColor: "#2F5597",
                    marginLeft: wp(10),
                    borderWidth: 3,
                  }
                : {
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    borderColor: "lightgrey",
                    marginLeft: wp(10),
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
              <Text style={styles.ButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emailtoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Mobile Number</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.moblieSec}>
            <TouchableOpacity
              style={styles.emailtoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mobiletoch}
              onPress={() => showcontent()}
            >
              <Text style={styles.ButtonText}>Mobile Number</Text>
            </TouchableOpacity>
          </View>
        )}

        {showemail == false ? (
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
                }}
                placeholder="Confirm Email"
                value={ConfirmEmail}
                style={styles.input}
              />
            </View>
          </View>
        ) : (
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
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
              />
              <TextInput
                onChangeText={(text) => {
                  setMobile(text);
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
            <TouchableOpacity
              style={styles.RequsertButton}
              //onPress={() => navigation.navigate('OTPScreen')}
              onPress={() => VerifytoggleModal()}
            >
              <Text style={styles.ReqButtonText}>Request OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomcontent}>
          <Text style={styles.AlreadyText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login Here </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        {/* <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'center', position: 'absolute', bottom: 0, height: hp(45), width: wp(100), backgroundColor: '#fff' }}>
         */}
        <View style={styles.BlueContainer1}>
          <Text style={styles.BlueText}>Almost Done</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            height: hp(40),
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
              top: hp(-5),
            }}
          >
            <View style={styles.Rolecontainer}>
              <Image
                source={require("../Assets/bell.png")}
                style={styles.icons}
              />
              <Text style={styles.ModelText1}>
                I am looking for {"\n"}a Tutor
              </Text>
              <TouchableOpacity
                onPress={() => selectrole("I am looking for a Tutor")}
                // onPress={() => navigation.navigate('Auth')}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  borderColor: "lightgrey",
                  borderWidth: 1,
                }}
              ></TouchableOpacity>
            </View>

            <View style={styles.Rolecontainer}>
              <Image
                source={require("../Assets/bell.png")}
                style={styles.icons}
              />
              <Text style={styles.ModelText1}>I am an {"\n"}Educator</Text>
              <TouchableOpacity
                //onPress={() => navigation.navigate('Auth2')}
                onPress={() => selectrole("I am an Educator")}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  borderColor: "lightgrey",
                  borderWidth: 1,
                }}
              ></TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </View> */}
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
            height: hp(80),
            width: wp(100),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.BlueContainer}>
            <Text style={styles.BlueText}>Verify Mobile Number</Text>
          </View>
          <View
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignSelf: "center",
              position: "absolute",
              top: hp(20),
              height: hp(45),
              width: wp(90),
              backgroundColor: "#fff",
            }}
          >
            <View style={styles.ModelTextContainer}>
              <Text style={styles.ModelText}>Verification Code</Text>
              <Text style={styles.ModelText2}>
                We have sent the code verification to your mobile number
              </Text>
            </View>
            <OTPTextView
              containerStyle={{ flex: 1, marginHorizontal: 16 }}
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
            {/* <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={4}
        /> */}
            {/* <OTPInputView
              handleChange={code => console.log(code)}
              numberOfInputs={4}
              style={{width: '60%', height: 100, alignSelf: 'center'}}
              pinCount={4}
              code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={otp => setOtp(otp)}
              //autoFocusOnLoad
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                verifyOTP(code);

                // navigation.navigate('Register', {
                //     codeadd: 'yes'
                // })
                console.log(`Code is ${code}, you are good to go!`);
              }}
            /> */}
            {/* <OtpInputs

          handleChange={(code) => console.log(code)}
          numberOfInputs={4}
        /> */}
            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: "#2F5597",
                width: wp(70),
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => {
                verifyOTP();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    fontWeight: "bold",
    color: "#000",
  },
  Firsttext: {
    fontSize: 12,
    fontWeight: "600",
    color: "grey",
    lineHeight: 20,
  },
  ModelTextContainer: {
    padding: 20,
  },
  ModelText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
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
    marginTop: hp(10),
  },
  BlueContainer1: {
    height: hp(15),
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
    width: wp("90%"),
    // fontFamily: 'SharpSansDispNo1-Semibold',
    paddingLeft: 12,
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
    // fontFamily: 'SharpSansDispNo1-Book',
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 8,
  },
  TextInputText1: {
    color: "#131313",
    // fontFamily: 'SharpSansDispNo1-Book',
    fontSize: 14,
    //  paddingLeft: 10,

    lineHeight: 16,
    paddingBottom: 8,
  },
  TextInputText2: {
    color: "#131313",
    // fontFamily: 'SharpSansDispNo1-Book',
    fontSize: 14,
    lineHeight: 16,
    marginLeft: wp(5),
    paddingBottom: 8,
  },
  TermsCondition: {
    // backgroundColor: "red",
    color: "#131313",
    // fontFamily: 'SharpSansDispNo1-Book',
    fontSize: 14,
    fontWeight: "600",
  },
  Rolecontainer: {
    //flexDirection: "row",

    width: wp(40),
    height: hp(30),
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
    fontSize: 16,
    fontWeight: "700",
    color: "grey",
    paddingTop: 10,
    paddingBottom: 10,
    width: wp(50),
    textAlign: "center",
    // alignSelf: "flex-end"
  },
  icons: {
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
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(40),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  RequsertButton: {
    backgroundColor: "#2F5597",
    height: hp(7),
    borderRadius: 50,
    marginTop: 15,
    justifyContent: "center",
  },
  ReqButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  bottomcontent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loginText: {
    color: "#2F5597",
    fontSize: 14,
    fontWeight: "700",
    paddingTop: 5,
  },
});
