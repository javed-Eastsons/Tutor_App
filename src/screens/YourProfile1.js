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


const YourProfle = () => {

    const navigation = useNavigation();
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

            <ScrollView>
                <View style={styles.usercontainer}>
                    <View style={styles.UserLeft}>
                        <Text style={styles.text1}>Your Profile</Text>
                        <Text style={styles.text2}>Account is only completly setup with your prrofile</Text>
                    </View>
                </View>

                <View style={styles.ImageSec}>
                    <View style={styles.Profileimage}>
                        <Image source={require('../Assets/usericon.png')} />
                    </View>
                </View>

                <View style={styles.postContainer}>
                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Personal Information</Text>
                    </View>
                    <View style={styles.postLeft1}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons1}
                        />
                        <View>
                            <Text style={styles.postBlueText}>Personal Information</Text>
                            <Text style={styles.postBlueText1}>First, let's get some information about yourself</Text>
                            <TouchableOpacity style={styles.InfoButton}
                                onPress={() => navigation.navigate('PersonalInfo')}
                            //   onPress={VerifytoggleModal}
                            >
                                <Text style={styles.infoButtonText}>Enter Personal Information</Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Academic History</Text>
                    </View>


                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tution Type</Text>
                    </View>

                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tutoring Level, Subjects & Experience</Text>
                    </View>

                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Personal Statement</Text>
                    </View>


                </View>


                <TouchableOpacity style={styles.RequsertButton}
                    onPress={() => navigation.navigate('TutorLanding')}
                //   onPress={VerifytoggleModal}

                >
                    <Text style={styles.ReqButtonText}>Done</Text>
                </TouchableOpacity>



            </ScrollView>

        </View>
    )

}

export default YourProfle;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 10,


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


const YourProfle = () => {

    const navigation = useNavigation();
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

            <ScrollView>
                <View style={styles.usercontainer}>
                    <View style={styles.UserLeft}>
                        <Text style={styles.text1}>Your Profile</Text>
                        <Text style={styles.text2}>Account is only completly setup with your prrofile</Text>
                    </View>
                </View>

                <View style={styles.ImageSec}>
                    <View style={styles.Profileimage}>
                        <Image source={require('../Assets/usericon.png')} />
                    </View>
                </View>

                <View style={styles.postContainer}>
                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Personal Information</Text>
                    </View>
                    <View style={styles.postLeft1}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons1}
                        />
                        <View>
                            <Text style={styles.postBlueText}>Personal Information</Text>
                            <Text style={styles.postBlueText1}>First, let's get some information about yourself</Text>
                            <TouchableOpacity style={styles.InfoButton}
                                onPress={() => navigation.navigate('PersonalInfo')}
                            //   onPress={VerifytoggleModal}
                            >
                                <Text style={styles.infoButtonText}>Enter Personal Information</Text>
                            </TouchableOpacity>
                        </View>

                    </View>



                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Academic History</Text>
                    </View>


                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tution Type</Text>
                    </View>

                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tutoring Level, Subjects & Experience</Text>
                    </View>

                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Personal Statement</Text>
                    </View>


                </View>


                <TouchableOpacity style={styles.RequsertButton}
                    onPress={() => navigation.navigate('TutorLanding')}
                //   onPress={VerifytoggleModal}

                >
                    <Text style={styles.ReqButtonText}>Done</Text>
                </TouchableOpacity>



            </ScrollView>

        </View>
    )

}

export default YourProfle;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // padding: 10,


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
>>>>>>> javedcode
})