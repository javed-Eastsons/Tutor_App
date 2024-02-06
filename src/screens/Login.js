import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LoginUser } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/Loader";

const Login = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Name, setName] = React.useState("");

  const [showwhat, setshowwhat] = React.useState("email");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Mobile, setMobile] = React.useState("");
  const [ConfirmEmail, setConfirmEmail] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const showwhatfunc = (data) => {
    setshowwhat(data);
    console.log(data);
    // if (showwhat == 'email')
    //     setshowwhat('mobile')
    // else if (showwhat == 'mobile') {
    //     setshowwhat('email')
    // }
    // else {
    //     setshowwhat('scan')
    // }
  };

  const LoginTOApp = () => {
    //  console.log(FirstName, LastName, Password, Email, ConfirmEmail, Mobile);
    setLoader(true);
    dispatch(LoginUser(Mobile, Email, Password,route?.params?.viaProfile,route?.params?.data, navigation))
      .then((res) => setLoader(false))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));

    console.log("sddddddddd");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: wp(90), alignSelf: "center" }}
      >
        <View style={styles.Headcontainer}>
          <Text style={styles.headtext}>Login</Text>
          <Text style={styles.Firsttext}>
            If this your first time here, Welcome!

          </Text>
          <Text style={styles.Firsttext}>
            If not, Welcome Back!
          </Text>
        </View>

        <View>
          <Text style={styles.TermsCondition}>Login using any option</Text>
        </View>

        {(() => {
          if (showwhat == "email") {
            return (
              <View style={styles.moblieSec}>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("mobile")}
                >
                  <Text style={styles.ButtonText}>Mobile Number</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mobiletoch}
                  onPress={() => showwhatfunc("email")}
                >
                  <Text style={styles.ButtonText}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("QR")}
                >
                  <Text style={styles.ButtonText}>QR Code</Text>
                </TouchableOpacity>
              </View>
            );
          } else if (showwhat == "mobile") {
            return (
              <View style={styles.moblieSec}>
                <TouchableOpacity
                  style={styles.mobiletoch}
                  onPress={() => showwhatfunc("mobile")}
                >
                  <Text style={styles.ButtonText}>Mobile Number</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("email")}
                >
                  <Text style={styles.ButtonText}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("QR")}
                >
                  <Text style={styles.ButtonText}>QR Code</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.moblieSec}>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("mobile")}
                >
                  <Text style={styles.ButtonText}>Mobile Number</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emailtoch}
                  onPress={() => showwhatfunc("email")}
                >
                  <Text style={styles.ButtonText}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mobiletoch}
                  onPress={() => showwhatfunc("QR")}
                >
                  <Text style={styles.ButtonText}>QR Code</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })()}

        {(() => {
          if (showwhat == "email") {
            return (
              <View>
                <View style={styles.searchSection}>
                  <Text style={styles.TextInputText}>Email Address</Text>
                  <TextInput
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    placeholder="Email Address"
                    value={Email}
                    style={styles.input}
                  />
                </View>
                <View style={styles.searchSection}>
                  <Text style={styles.TextInputText}>Password</Text>
                  <TextInput
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={Password}
                    style={styles.input}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.bottomcontent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register', { codeadd: "NO", })}
                    >
                      <Text style={styles.ForgotText}>Create Account</Text>

                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottomcontent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text style={styles.ForgotText}>Forgot Password?</Text>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          } else if (showwhat == "mobile") {
            return (
              <View>
                <View style={styles.searchSection}>
                  <Text style={styles.TextInputText}>Mobile Number</Text>
                  <TextInput
                    onChangeText={(text) => {
                      setMobile(text);
                    }}
                    placeholder="Mobile Number"
                    value={Mobile}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                </View>
                <View style={styles.searchSection}>
                  <Text style={styles.TextInputText}>Password</Text>
                  <View style={styles.Outinput}>
                    <TextInput
                      onChangeText={(text) => {
                        setPassword(text);
                        //    validatePassword(text)
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

                  {/* <Text style={styles.strengthText}>
                    {strength}
                  </Text>
                  <Text style={styles.suggestionsText}>
                    {suggestions.map((suggestion, index) => (
                      <Text key={index}>
                        {suggestion}{'\n'}
                      </Text>))}
                  </Text> */}

                  {/* <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          /> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.bottomcontent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register', { codeadd: "NO", })}
                    >
                      <Text style={styles.ForgotText}>Create Account</Text>

                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottomcontent}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text style={styles.ForgotText}>Forgot Password?</Text>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.searchSection}>
                <Text style={styles.TextInputText}>Scan QR Code</Text>

                <View style={styles.ImageSec}>
                  <View style={styles.Profileimage}>
                    <Image
                      source={require("../Assets/myQR.png")}
                      style={{ height: 100, width: 100 }}
                    />
                  </View>
                </View>
              </View>
            );
          }
        })()}

        <TouchableOpacity
          style={styles.RequsertButton}
          onPress={() => LoginTOApp()}
        >
          <Text style={styles.ReqButtonText}>Sign In </Text>
        </TouchableOpacity>


      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  headtext: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  Firsttext: {
    fontSize: 14,
    color: "grey",
    lineHeight: 15,
    fontFamily: "Poppins-Regular",
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
  searchSection: {
    justifyContent: "space-between",
    paddingBottom: 12,
    alignSelf: "center",
    marginTop: 5,
  },
  TermsCondition: {
    // fontSize: 16,
    color: "grey",
    marginTop: 15,
    fontFamily: "Poppins-SemiBold",
  },
  TextInputText: {
    color: "#131313",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 16,
    paddingBottom: 8,
  },
  ForgotText: {
    textAlign: "right",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  moblieSec: {
    backgroundColor: "lightgrey",
    height: hp(8),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    width: wp(90),
    flexDirection: "row",
  },
  icons: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  mobiletoch: {
    backgroundColor: "#2F5597",
    width: wp(28),
    height: hp(5),
    borderRadius: 30,
    justifyContent: "center",
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(30),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
  },
  ButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
  },
  RequsertButton: {
    backgroundColor: "#2F5597",
    height: hp(7),
    borderRadius: 50,
    width: wp(90),
    alignSelf: "center",
    marginTop: hp(25),
    justifyContent: "center",




    // Elevation for Android
    elevation: 2,
  },
  ReqButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  bottomcontent: {
    justifyContent: "center",

    marginTop: 0,
  },
  loginText: {
    color: "#5E27DA",
    fontSize: 14,
    fontWeight: "700",
    paddingTop: 5,
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



});
