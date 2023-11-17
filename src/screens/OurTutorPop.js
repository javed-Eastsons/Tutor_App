
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

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import OurTutor from "./OurTutor";


const OurTutorPop = ({ props, route }) => {


    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.Headers}>
                <View style={styles.HeadLeft}>
                    <TouchableOpacity >
                        <View style={{ borderWidth: 1, borderColor: 'black', width: hp(5) }} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>

            <ScrollView>

                <View style={{ width: wp(90), alignSelf: "center", flexDirection: "row" }}>
                    <Text

                        style={{ fontSize: 25, color: '#2F5597', transform: [{ rotate: "-30deg" }] }}
                    >Try it!</Text>
                    <Text
                        style={{ marginLeft: 2, marginTop: 20, fontSize: 20, color: '#2F5597', fontStyle: 'italic' }}
                    >The proof is in the pudding</Text>
                </View>

                <View
                    style={{
                        width: "100%",
                        height: 100,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                        marginTop: 20,
                    }}
                >
                    <Image
                        source={require("../Assets/chat5panel.png")}
                        style={{
                            // width: 150,
                            height: 150,
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <View style={styles.usercontainer}>
                    <View style={styles.UserLeft}>
                        <Text style={styles.text1}>Our Tutors</Text>

                    </View>
                </View>
                <View style={styles.postContainer}>

                    <View style={styles.postLeft}>
                        <View style={{
                            justifyContent: "center", alignItems: "center"
                        }}>
                            <Image
                                source={require("../Assets/tutor3.png")}
                                style={styles.posticons}
                            />
                        </View>
                        <TouchableOpacity

                        >


                            <Text style={styles.postSemiText}>
                                We have a large database of qualified tutors. They have a diverse range of qualification & tutoring experience.

                            </Text>
                            <Text style={styles.postText}> You have Choice</Text>

                            {/* <Text style={styles.postSemiText}>
                                •	Assessments marked by Subject Experts                            </Text>
                            <Text style={styles.postSemiText}>
                                •	No more marking during tuition lessons                            </Text>
                            <Text style={styles.postSemiText}>
                                •	Assessment marked with explanation                            </Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.postLeft}>
                        <View>
                            <Image
                                source={require("../Assets/tutor2.png")}
                                style={styles.posticons}
                            />
                        </View>
                        <TouchableOpacity

                        >

                            <Text style={styles.postSemiText}>
                                Tutors can be generally categorized as Full Time or Part Time tutors. There are potential benefits to both tutor types.

                            </Text>
                            <Text style={styles.postText}>What works for you?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.postLeft}>
                        <View>
                            <Image
                                source={require("../Assets/tutor1.png")}
                                style={styles.posticons}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ marginBottom: 10 }}
                        >

                            <Text style={styles.postSemiText}>
                                Our tutors are critical partners in the student’s academic development. You can expect timely success.

                            </Text>
                            <Text style={styles.postText}> Ready to Excel</Text>
                        </TouchableOpacity>
                    </View>


                </View>


            </ScrollView >
        </View >
    );
};

export default OurTutorPop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text1: {
        fontSize: 18,
        fontWeight: "600",
        paddingTop: 10,
        color: "#fff",
        textAlign: "right"
    },
    text2: {
        fontSize: 15,
        fontWeight: "600",
        color: "grey",
    },
    SearchContainer: {
        height: hp(15),
        width: wp(100),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    Boxone: {
        height: hp(15),
        width: wp(30),
        justifyContent: "center",
    },
    ImageSec: {
        height: hp(15),
        backgroundColor: "red",
        justifyContent: "center",
    },
    Profileimage: {
        alignSelf: "center",
    },
    RequsertButton: {
        backgroundColor: "#2F5597",
        height: hp(7),
        borderRadius: 50,
        marginTop: 20,
        width: wp(50),
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    ReqButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    Headers: {
        // backgroundColor: "red",
        height: hp(10),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100),
    },
    Slidericons: {
        alignSelf: "center",
        height: 100,
        width: 100,
        marginBottom: 10,
    },
    SliderContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    Slider: {
        height: hp(30),
        backgroundColor: "#F9F9F9",
        width: wp(70),
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 20,
        justifyContent: "center",
    },
    searchText: {
        textAlign: "center",
        padding: 10,
    },
    postText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2F5597",
        textAlign: 'center'
        // alignSelf: "center"
    },
    postSemiText: {
        fontSize: 12,
        color: "#2F5597",
        textAlign: "center",
        width: wp(60),
    },
    infoWrapper: {
        backgroundColor: "#2F5597",
        height: hp(5),
        width: wp(55),
        alignItems: "center",
        borderRadius: 40,
        justifyContent: "center",
        marginTop: hp(2),
        elevation: 10,
        marginLeft: wp(3),
    },
    infoWrapperText: {
        fontSize: 13,
        color: "#fff",
    },
    sliderText: {
        fontSize: 12,
        lineHeight: 17,
        // fontWeight: '700',
        color: "#000",
        alignSelf: "center",
        textAlign: "center",
    },
    postTextRight: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        bottom: 20,
        left: -10,
        alignSelf: "center",
    },

    usercontainer: {
        height: hp(15),
        backgroundColor: "#2F5597",
        marginTop: 20,
        width: wp(100),


        //justifyContent: "center"
    },
    usericons: {
        height: 50,
        width: 50,
    },
    searchicons: {
        height: 50,
        width: 50,
        alignSelf: "center",
    },
    icons: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    posticons: {
        height: 70,
        width: 70,
        marginLeft: 20,
        marginRight: 10,
        //marginTop: 10
        // alignSelf: "center"
    },
    tickIcon: {
        height: 20,
        width: 20,
        marginRight: 13,
    },
    postRighticons: {
        height: 110,
        width: 110,
        left: -10,
        alignSelf: "flex-end",
    },
    sicons: {
        height: 20,
        width: 20,
    },
    HeadLeft: {
        // width: wp(45),
        // height: hp(10),
        flexDirection: "row",
        marginTop: hp(2),
        alignItems: "center",
    },
    postContainer: {
        // flexDirection: "row",
        width: wp(90),
        marginTop: wp(-20),
        alignSelf: "center",

    },
    postLeft2: {
        // height: hp(10),
        backgroundColor: "#fff",
        paddingVertical: hp(2.5),
        width: wp(90),
        shadowColor: "#000",
        elevation: 10,
        marginTop: 10,
        // paddingTop: 10,
        borderRadius: 10,
        // flexDirection: "row",
        alignItems: "flex-start",
        // alignSelf: "flex-start",
        // marginRight: wp(6),
        // justifyContent: 'flex-start'
    },
    postLeft: {
        // height: hp(10),
        backgroundColor: "#fff",
        paddingVertical: hp(2.5),
        width: wp(90),
        shadowColor: "#000",
        elevation: 10,
        marginTop: 10,
        marginBottom: 20,
        // paddingTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        // alignSelf: "flex-start",
        // marginRight: wp(6),
        // justifyContent: 'flex-start'
    },

    postRight: {
        height: hp(20),
        backgroundColor: "lightblue",
        width: wp(42),
        borderRadius: 20,
    },
    UserLeft: {
        width: wp(90),
        // height: hp(10),
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
        alignItems: "center",
        // flexDirection: "row",

        //alignItems: "center"
    },
    HeadRight: {
        width: wp(45),
        height: hp(10),
        marginTop: hp(2),
        // backgroundColor: "pink",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    tickImage: { height: 15, width: 15 },
    tickWrapper: {
        backgroundColor: "green",
        height: hp(3),
        width: wp(6),
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 5,
        bottom: 1,
    },
});
