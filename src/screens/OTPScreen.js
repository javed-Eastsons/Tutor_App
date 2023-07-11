<<<<<<< HEAD
import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import OTPInputView from '@twotalltotems/react-native-otp-input'


const OTPScreen = () => {
    const navigation = useNavigation();

    // const [isVerfyModalVisible, setVerifyModalVisible] = useState(false);
    const [otp, setOtp] = useState('');



    return (
        <View style={styles.container}>
            <View style={styles.BlueContainer}>
                <Text style={styles.BlueText}>Verify Mobile Number</Text>
            </View>
            <View style={{
                borderTopLeftRadius: 50, borderTopRightRadius: 50, alignSelf: 'center',
                position: 'absolute', top: hp(12),
                height: hp(45), width: wp(90), backgroundColor: '#fff'
            }}>

                <View style={styles.ModelTextContainer}>
                    <Text style={styles.ModelText}>Verification Code</Text>
                    <Text style={styles.ModelText2}>We have sent the code verification to your mobile number</Text>
                </View>

                {/* <OTPInputView
                    //  handleChange={(code) => console.log(code)}
                    numberOfInputs={5}

                    style={{ width: '60%', height: 100, alignSelf: 'center', }}
                    pinCount={5}

                    code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={otp => setOtp(otp)}

                    autoFocusOnLoad={true}
                    secureTextEntry={true}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}

                    onCodeFilled={(code => {
                        navigation.navigate('Register', {
                            codeadd: 'yes'
                        })
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                /> */}


            </View>


        </View>
    )
}
export default OTPScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //  padding: 25,
        //paddingBottom: -25

    },
    headtext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    Firsttext: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey',
        lineHeight: 20

    },
    ModelTextContainer: {

        padding: 20,
        textAlign: "center"
    },
    ModelText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: "center"
    },

    ModelText2: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
        paddingTop: 20
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderColor: "#03DAC6",
        borderRadius: 50,
        backgroundColor: "lightgrey",


        color: '#000',


    },


    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
        borderRadius: 50,
        backgroundColor: "lightgrey"
    },

    BlueText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        width: wp(85),
        alignSelf: "center",
        marginTop: 15
    },

    BlueContainer: {
        height: hp(15),
        backgroundColor: "#2F5597",
        borderTopLeftRadius: 20,
        width: wp(100),
        marginTop: 20,
        alignSelf: "center",
        borderTopRightRadius: 20
    },

    ImageSec: {
        height: hp(15),
        //  backgroundColor: "red",
        justifyContent: "center"
    },
    Profileimage: {
        alignSelf: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('90%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        color: '#131313',
        height: 45

    },

    input1: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('42%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,

        color: '#131313',
        height: 45

    },

    input2: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('42%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        marginLeft: wp(5),
        color: '#131313',
        height: 45

    },

    searchSection: {
        justifyContent: 'space-between',
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 5

    },
    TextInputText: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8
    },
    TextInputText1: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8
    },
    TextInputText2: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        marginLeft: wp(5),
        paddingBottom: 8
    },
    TermsCondition: {

        // backgroundColor: "red",
        color: '#131313',
        //fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        fontWeight: '600'

    },
    Rolecontainer: {
        flexDirection: "row",
        height: hp(8),
        width: wp(90),
        // backgroundColor: "red",
        alignSelf: "center",
        alignItems: "center"

    },
    ModelText1: {
        fontSize: 16,
        fontWeight: '700',
        color: 'lightgrey',
        width: wp(50)
        // alignSelf: "flex-end"

    },
    icons: {

        height: 40,
        width: 40,
        marginRight: 10
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row"
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(40),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center"
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(40),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center"
    },
    RequsertButton: {
        backgroundColor: "#2F5597",
        height: hp(7),
        borderRadius: 50,
        marginTop: 15,
        justifyContent: "center"
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18

    },
    bottomcontent: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 15
    },
    loginText: {
        color: '#2F5597',
        fontSize: 14,
        fontWeight: '700',
        paddingTop: 5
    }

=======
import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import OTPInputView from '@twotalltotems/react-native-otp-input'


const OTPScreen = () => {
    const navigation = useNavigation();

    // const [isVerfyModalVisible, setVerifyModalVisible] = useState(false);
    const [otp, setOtp] = useState('');



    return (
        <View style={styles.container}>
            <View style={styles.BlueContainer}>
                <Text style={styles.BlueText}>Verify Mobile Number</Text>
            </View>
            <View style={{
                borderTopLeftRadius: 50, borderTopRightRadius: 50, alignSelf: 'center',
                position: 'absolute', top: hp(12),
                height: hp(45), width: wp(90), backgroundColor: '#fff'
            }}>

                <View style={styles.ModelTextContainer}>
                    <Text style={styles.ModelText}>Verification Code</Text>
                    <Text style={styles.ModelText2}>We have sent the code verification to your mobile number</Text>
                </View>

                {/* <OTPInputView
                    //  handleChange={(code) => console.log(code)}
                    numberOfInputs={5}

                    style={{ width: '60%', height: 100, alignSelf: 'center', }}
                    pinCount={5}

                    code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={otp => setOtp(otp)}

                    autoFocusOnLoad={true}
                    secureTextEntry={true}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}

                    onCodeFilled={(code => {
                        navigation.navigate('Register', {
                            codeadd: 'yes'
                        })
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                /> */}


            </View>


        </View>
    )
}
export default OTPScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //  padding: 25,
        //paddingBottom: -25

    },
    headtext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    Firsttext: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey',
        lineHeight: 20

    },
    ModelTextContainer: {

        padding: 20,
        textAlign: "center"
    },
    ModelText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: "center"
    },

    ModelText2: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
        paddingTop: 20
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderColor: "#03DAC6",
        borderRadius: 50,
        backgroundColor: "lightgrey",


        color: '#000',


    },


    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
        borderRadius: 50,
        backgroundColor: "lightgrey"
    },

    BlueText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        width: wp(85),
        alignSelf: "center",
        marginTop: 15
    },

    BlueContainer: {
        height: hp(15),
        backgroundColor: "#2F5597",
        borderTopLeftRadius: 20,
        width: wp(100),
        marginTop: 20,
        alignSelf: "center",
        borderTopRightRadius: 20
    },

    ImageSec: {
        height: hp(15),
        //  backgroundColor: "red",
        justifyContent: "center"
    },
    Profileimage: {
        alignSelf: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('90%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        color: '#131313',
        height: 45

    },

    input1: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('42%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,

        color: '#131313',
        height: 45

    },

    input2: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 20,
        fontSize: 14,
        width: wp('42%'),
        // fontFamily: 'SharpSansDispNo1-Semibold',
        paddingLeft: 12,
        marginLeft: wp(5),
        color: '#131313',
        height: 45

    },

    searchSection: {
        justifyContent: 'space-between',
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 5

    },
    TextInputText: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8
    },
    TextInputText1: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8
    },
    TextInputText2: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        marginLeft: wp(5),
        paddingBottom: 8
    },
    TermsCondition: {

        // backgroundColor: "red",
        color: '#131313',
        //fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        fontWeight: '600'

    },
    Rolecontainer: {
        flexDirection: "row",
        height: hp(8),
        width: wp(90),
        // backgroundColor: "red",
        alignSelf: "center",
        alignItems: "center"

    },
    ModelText1: {
        fontSize: 16,
        fontWeight: '700',
        color: 'lightgrey',
        width: wp(50)
        // alignSelf: "flex-end"

    },
    icons: {

        height: 40,
        width: 40,
        marginRight: 10
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row"
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(40),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center"
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(40),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center"
    },
    RequsertButton: {
        backgroundColor: "#2F5597",
        height: hp(7),
        borderRadius: 50,
        marginTop: 15,
        justifyContent: "center"
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18

    },
    bottomcontent: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 15
    },
    loginText: {
        color: '#2F5597',
        fontSize: 14,
        fontWeight: '700',
        paddingTop: 5
    }

>>>>>>> javedcode
})