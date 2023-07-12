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
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const PersonalInfo = () => {


    const [showwhat, setshowwhat] = React.useState('email');
    const [Password, setPassword] = React.useState('');
    const [Mobile, setMobile] = React.useState('');
    const [ConfirmEmail, setConfirmEmail] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setDate(currentDate);
        setShow(false);

        console.log('QQQQQQQQQQQQQQQQQ', isDisplayDate)

    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(moment(currentMode).format("YYYY-MM-DD"));

        console.log('ppppppppppppppppppppppp', displaymode, isDisplayDate)



    };
    const displayDatepicker = () => {
        showMode('date');
        // setShow(true);
        // setShow(false)
        //   console.log('ppppppppppppppppppppppp', mydate)
        // console.log('uuuuuuuuuuuuuuuuuuuuuuu')

    };

    const navigation = useNavigation();

    const showwhatfunc = (data) => {

        setshowwhat(data)
        console.log(data)
        // if (showwhat == 'email')
        //     setshowwhat('mobile')
        // else if (showwhat == 'mobile') {
        //     setshowwhat('email')
        // }
        // else {
        //     setshowwhat('scan')
        // }

    }

    return (
        <View style={styles.container}>
            <View style={styles.Headers}>
                <View style={styles.HeadLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={require('../Assets/baricon.png')}
                            style={styles.icons}
                        />
                    </TouchableOpacity>
                    <Image source={require('../Assets/bell.png')}
                        style={styles.icons}
                    />


                </View>
                <View style={styles.HeadRight}>

                    {/* <Image source={require('../Assets/search.png')}
                        style={styles.icons}
                    /> */}
                    <Image source={require('../Assets/chat.png')}
                        style={styles.icons}
                    />
                </View>

            </View>
            <View style={{ alignItems: "center" }}>


                {(() => {
                    if (showwhat == 'email') {
                        return (

                            <View style={styles.moblieSec}>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('mobile')}
                                >
                                    <Text style={styles.ButtonText}>Year of Birth</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mobiletoch}
                                    onPress={() => showwhatfunc('email')}
                                >
                                    <Text style={styles.ButtonText}>Gender</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('QR')}
                                >
                                    <Text style={styles.ButtonText}>Nationalaity</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                    else if (showwhat == 'mobile') {
                        return (

                            <View style={styles.moblieSec}>
                                <TouchableOpacity style={styles.mobiletoch}
                                    onPress={() => showwhatfunc('mobile')}
                                >
                                    <Text style={styles.ButtonText}>Year of Birth</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('email')}
                                >
                                    <Text style={styles.ButtonText}>Gender</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('QR')}
                                >
                                    <Text style={styles.ButtonText}>Nationalaity</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }

                    else {
                        return (
                            <View style={styles.moblieSec}>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('mobile')}
                                >
                                    <Text style={styles.ButtonText}>Year of Birth</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emailtoch}
                                    onPress={() => showwhatfunc('email')}
                                >
                                    <Text style={styles.ButtonText}>Gender</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mobiletoch}
                                    onPress={() => showwhatfunc('QR')}
                                >
                                    <Text style={styles.ButtonText}>Nationalaity</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }


                })()}

                {(() => {
                    if (showwhat == 'email') {
                        return (

                            <View>
                                <View style={styles.searchSection}>
                                    <Text style={styles.TextInputText}>Email Address</Text>
                                    <Button onPress={() => displayDatepicker()} title="Show date picker!" />
                                    {isDisplayDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={mydate}
                                            mode={displaymode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={() => changeSelectedDate}
                                        />
                                    )}

                                    <Text>{moment(mydate).format("DD-MM-YYYY ")}</Text>
                                    <Text>{moment(displaymode).format("DD-MM-YYYY ")}</Text>
                                    <TextInput
                                        onChangeText={(text) => { setEmail(text) }}
                                        placeholder="Your Name"
                                        value={Email}

                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.searchSection}>
                                    <Text style={styles.TextInputText}>Password</Text>
                                    <TextInput
                                        onChangeText={(text) => { setPassword(text) }}
                                        placeholder="Password"
                                        value={Password}

                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.bottomcontent}>
                                    <Text style={styles.ForgotText}>Forgot Password</Text>


                                </View>
                            </View>
                        )
                    }

                    else if (showwhat == 'mobile') {
                        return (
                            <View>
                                <View style={styles.searchSection}>
                                    <Text style={styles.TextInputText}>Mobile Number</Text>
                                    <TextInput
                                        onChangeText={(text) => { setMobile(text) }}
                                        placeholder="Your Name"
                                        value={Mobile}
                                        keyboardType="number-pad"
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.searchSection}>
                                    <Text style={styles.TextInputText}>Password</Text>
                                    <TextInput
                                        onChangeText={(text) => { setPassword(text) }}
                                        placeholder="Password"
                                        value={Password}

                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.bottomcontent}>
                                    <Text style={styles.ForgotText}>Forgot Password</Text>


                                </View>
                            </View>
                        )
                    }

                    else {
                        return (
                            <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>Scan QR Code</Text>

                                <View style={styles.ImageSec}>
                                    <View style={styles.Profileimage}>
                                        <Image source={require('../Assets/myQR.png')}
                                            style={{ height: 100, width: 100 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    }


                })()}
            </View>

        </View>
    )

}

export default PersonalInfo;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 10,


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
        flexDirection: "row"
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center"
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(25),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center"
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(30),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30
    },
    text1: {
        fontSize: 20,
        fontWeight: '700'
    },
    text2: {
        fontSize: 16,
        fontWeight: '600'
    },
    SearchContainer: {
        height: hp(15),
        width: wp(100),
        //  backgroundColor: "red",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },
    Boxone: {
        height: hp(15),
        width: wp(30),

        // backgroundColor: "yellow",
        //   alignSelf: "center",
        justifyContent: "center",


    },
    ImageSec: {
        height: hp(15),
        //  backgroundColor: "red",
        justifyContent: "center"
    },
    Profileimage: {
        alignSelf: "center"
    },
    RequsertButton: {
        backgroundColor: "#2F5597",
        height: hp(7),
        borderRadius: 50,
        marginTop: 20,
        width: wp(50),
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    InfoButton: {
        backgroundColor: "#2F5597",
        height: hp(5),
        borderRadius: 50,
        marginTop: 10,
        width: wp(50),
        alignSelf: "flex-start",
        justifyContent: "center",
        marginBottom: 20
    },
    infoButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 12

    }, ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18

    },
    Headers: {
        // backgroundColor: "red",
        height: hp(10),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100)
    },
    Slidericons: {
        alignSelf: "center",
        height: 100,
        width: 100,
        marginBottom: 10

    },
    SliderContainer: {

        marginTop: 30,
        marginBottom: 20
    },
    Slider: {
        height: hp(30),
        backgroundColor: "#F9F9F9",
        width: wp(70),
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: "center"

    },
    searchText: {
        textAlign: "center",
        padding: 10
    },
    postText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'grey',
        alignSelf: "center"

    },
    postBlueText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2F5597',
        alignSelf: "flex-start"
    },

    postBlueText1: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2F5597',
        alignSelf: "center"
    },
    sliderText: {
        fontSize: 12,
        lineHeight: 17,
        // fontWeight: '700',
        color: '#000',
        alignSelf: "center",
        textAlign: "center"
    },
    postTextRight: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        bottom: 20,
        left: -10,
        alignSelf: "center"

    },

    usercontainer: {
        height: hp(10),
        // backgroundColor: "red",
        width: wp(90),
        alignSelf: "center",
        flexDirection: "row",
        //justifyContent: "center"
    },
    usericons: {
        height: 50,
        width: 50,
    },
    searchicons: {
        height: 50,
        width: 50,
        alignSelf: "center"
    },
    icons: {

        height: 30,
        width: 30,
        marginRight: 10
    },
    posticons: {

        height: 20,
        width: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: "center"
    },
    posticons1: {

        height: 20,
        width: 20,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: "center"
    },
    postRighticons: {
        height: 110,
        width: 110,
        left: -10,
        alignSelf: 'flex-end'

    },
    sicons: {

        height: 20,
        width: 20,

    },
    HeadLeft: {
        width: wp(45),
        height: hp(10),
        flexDirection: "row",

        alignItems: "center"
    },
    postContainer: {

        // flexDirection: "row",
        width: wp(90),
        marginTop: 20,
        alignSelf: "center"


    },
    postLeft: {

        height: hp(10),
        backgroundColor: "#fff",
        width: wp(90),
        shadowColor: '#000',
        elevation: 10,
        marginTop: 10,
        paddingTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignSelf: "flex-start",
        marginRight: wp(6),
        justifyContent: 'flex-start'

    },
    postLeft1: {

        height: hp(15),
        backgroundColor: "#fff",
        width: wp(90),
        shadowColor: '#000',
        elevation: 10,
        marginTop: 10,
        paddingTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignSelf: "flex-start",
        marginRight: wp(6),
        justifyContent: 'flex-start'

    },
    postRight: {

        height: hp(20),
        backgroundColor: "lightblue",
        width: wp(42),
        borderRadius: 20,


    },
    UserLeft: {
        //   width: wp(35),
        height: hp(10),
        // flexDirection: "row",


        //alignItems: "center"
    },
    toggleicons: {
        height: 30,
        width: 30,
        marginLeft: 10,


    },
    UserRight: {
        width: wp(55),
        height: hp(8),
        flexDirection: "row",
        //   backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
        // flexDirection: "row",


        //alignItems: "center"
    },
    HeadRight: {
        width: wp(45),
        height: hp(10),
        // backgroundColor: "pink",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})