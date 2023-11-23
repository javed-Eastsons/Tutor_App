import React, { useState } from "react";

import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Text,
    Image,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import axios, * as others from "axios";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LoginUser, SendOtpforgotpassword } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../common/Loader";

const ForgotPassword = () => {
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
    const [emailText, setEmailText] = React.useState("enable");
    const [otpText, setOTPText] = React.useState("disable");
    const [passwordText, setPasswordText] = React.useState("disable");
    const [otp, setOTP] = React.useState("");
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
        dispatch(LoginUser(Mobile, Email, Password, navigation))
            .then((res) => setLoader(false))
            .catch((err) => console.log(err))
            .finally(() => setLoader(false));

        console.log("sddddddddd");
    };

    const ResetAll = () => {
        setEmail("")
        setPassword("")
        setOTP("")
        setEmailText("enable");
        setOTPText("disable");
        setPasswordText("disable");

    }

    const SendOTP = () => {

        // if (Email == "") {
        //     Alert.alert("Enter Email");
        // }
        // else {


        setLoader(true)



        //dispatch(SendOtpforgotpassword(Email, otp, Password, navigation))


        console.log(Email, otp, Password, "FORGOTFORGOTFORGOTFORGOTFORGOTFORGOT")


        axios.defaults.baseURL = "https://refuel.site";
        const url1 =
            axios.defaults.baseURL +
            "/projects/tutorapp/APIs/Forgotpassword/forgotpassword.php";
        var formData = new FormData();

        formData.append("email", Email);
        formData.append('newpassword', Password)
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

                    setEmailText("disable")
                    setOTPText("enable")
                    setPasswordText("enable")
                    setEmail("")
                    setTimeout(() => {
                        setLoader(false)
                    }, 2000);

                } else if (responseJson.status == false) {
                    Alert.alert(responseJson.message);
                    setEmailText("enable")
                    setOTPText("disable")
                    setPasswordText("disable")
                    setOTP("")
                    setPassword("")
                    setTimeout(() => {
                        setLoader(false)
                    }, 2000);
                }
            })
            .catch((error) => console.log("LLLLLLLLL", error.message));


        // }
    }
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


                {/* <View>
                    <Text style={styles.TermsCondition}>Login using any option</Text>
                </View> */}

                {/* {(() => {
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
                })()} */}

                {/* {(() => {
                    if (showwhat == "email") {
                        return ( */}
                <View>

                    {/* <View style={styles.searchSection}>
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
                    </View> */}
                    {/* <View style={styles.bottomcontent}>
                        <TouchableOpacity
                            onPress={() => console.log("hi")}
                        >
                            <Text style={styles.ForgotText}>Forgot Password?</Text>

                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style={{ marginTop: hp(15) }}>
                    <View style={styles.Headcontainer}>
                        <Text style={styles.headtext}>Forgot Password</Text>

                    </View>
                    <View style={styles.searchSection}>
                        <Text style={styles.TextInputText}>Email Address</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                            placeholder="Email Address"
                            editable={emailText == "disable" ? false : true}
                            selectTextOnFocus={emailText == "disable" ? false : true}
                            value={Email}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.searchSection}>
                        <Text style={styles.TextInputText}>OTP</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setOTP(text);
                            }}
                            placeholder="Enter OTP"
                            value={otp}
                            editable={otpText == "disable" ? false : true}
                            selectTextOnFocus={otp == "disable" ? false : true}

                            // editable={false}
                            // selectTextOnFocus={false}
                            style={styles.input}

                        />
                    </View>
                    <View style={styles.searchSection}>
                        <Text style={styles.TextInputText}>New Password</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                            placeholder="Enter New Password"
                            editable={passwordText == "disable" ? false : true}
                            selectTextOnFocus={passwordText == "disable" ? false : true}

                            // editable={false}
                            // selectTextOnFocus={false}
                            value={Password}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ marginTop: 10, flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: wp(90) }}>


                        < TouchableOpacity
                            style={styles.RequsertButton}
                            onPress={() => SendOTP()}
                        >
                            <Text style={styles.ReqButtonText}>Submit </Text>
                        </TouchableOpacity >
                        < TouchableOpacity
                            style={styles.RequsertButton}
                            onPress={() => ResetAll()}
                        >
                            <Text style={styles.ReqButtonText}>Reset </Text>
                        </TouchableOpacity >
                    </View>
                </View>


            </ScrollView>
        </View >
    );
};

export default ForgotPassword;

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
        height: hp(5),
        borderRadius: 10,
        width: wp(40),
        // alignSelf: "center",
        //marginTop: hp(25),

        justifyContent: "center",




        // Elevation for Android
        elevation: 2,
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
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
