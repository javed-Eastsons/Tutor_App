import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Button,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../common/Loader";
import PostHeader from "./Component/Header";
import TuitionServicesHorizontal from "./Component/TutionServiceHorizontal";
import StudentDetailComponent from "./Component/StudentDetailComponent";
import StudentBookingComponent from "./Component/StudentBookingComponent";
import TutorQualificationComponent from "./Component/TutorQualificationComponent";
import TutionScheduleComponent from "./Component/TutorScheduleComponent";

const PostTutorSchedule = ({ route }) => {
  const [loader, setLoader] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Loader flag={loader} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Platform.OS === "ios" && { flex: 1 }}
        keyboardVerticalOffset={40}
      >
        <ScrollView>
          <PostHeader />

          <TutionScheduleComponent />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostTutorSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // backgroundColor: 'pink',
    // padding: 10,
  },
  whitebox: {
    height: hp(20),
    width: wp(30),
    borderRadius: 20,
    backgroundColor: "#fff",
    //backgroundColor: 'red',
    top: 20,
    marginRight: 10,
    zIndex: 99999,
  },

  LittlemoreContainer: {
    height: hp(15),
    width: wp(100),
    //backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LittlLeft: {
    height: hp(15),
    width: wp(50),
    justifyContent: "center",

    // backgroundColor: 'red'
  },
  LittlRight: {
    height: hp(15),
    width: wp(40),
    justifyContent: "center",
    //  backgroundColor: "yellow",
    alignItems: "flex-end",
  },
  logoicon: {
    height: 100,
    width: 100,

    borderRadius: 100 / 2,
  },

  Headers: {
    // backgroundColor: "red",
    height: hp(10),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },

  Text1: {
    color: "#2F5597",
    fontSize: 24,
    fontWeight: "700",
  },
  blueContiner: {
    backgroundColor: "#2F5597",
    height: hp(15),
    // height:hp(30),
    // flexDirection: "row",
    // backgroundColor:'red',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  blueContiner1: {
    //   backgroundColor: "#2F5597",
    //  height: hp(15),
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -hp(8),
    // backgroundColor:'yellow'
  },
  Text2: {
    color: "grey",
    fontSize: 16,
  },

  usercontainer: {
    height: hp(10),
    // backgroundColor: "red",
    width: wp(100),
    flexDirection: "row",
    justifyContent: "center",
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
  bicons: {
    height: 40,
    width: 40,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    paddingTop: 5,
    elevation: 5,
    // padding:10
  },
  posticons: {
    height: 110,
    width: 110,
    alignSelf: "center",
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
    width: wp(45),
    height: hp(10),
    flexDirection: "row",

    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(10),
    // backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  circleArrow: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
  },
  forwardArrowWrapper: {
    borderWidth: 0.2,
    borderColor: "#000",
    width: wp(50),
    alignSelf: "center",
    justifyContent: "center",
    height: hp(5),
    marginTop: hp(2),
  },
  forwardArrowTextWrapper: {
    color: "#000",
    fontSize: 10,
    marginLeft: wp(1),
    marginTop: -hp(2),
  },
  forwardArrowImage: { height: hp(2), width: wp(4), marginLeft: wp(2) },
  inputWrapper: {
    backgroundColor: "#fff",
    height: hp(5),
    width: wp(38),
    elevation: 6,
    marginTop: hp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  tutorWrapper: {
    marginTop: hp(7),
    justifyContent: "center",
    alignItems: "center",
  },
  tutorText: { fontSize: 11, color: "#000" },
});
