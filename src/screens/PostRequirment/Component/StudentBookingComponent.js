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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { Dropdown } from "react-native-element-dropdown";
import { Student_Detail } from "../Redux/Actions/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
//import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../../../../../../common/Loader";
var selectArray = [];
var selectFilter = [];

const StudentBookingComponent = (props) => {
  const navigation = useNavigation();
  const { Student_Detail } = useSelector((state) => state.TutorReducer);

  const GoToNext = () => {
    navigation.navigate("PostTutorQualification");
  };

  return (
    // <View style={styles.container}>
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 40,
            width: "100%",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Text style={styles.BookText1}>Student's Details...</Text>
          <View style={{ position: "absolute", right: 10 }}>
            <Image
              source={require("../../../Assets/Student.png")}
              style={styles.TypeImage}
            />
          </View>
        </View>
        <View style={{ height: 40, width: "93%", alignSelf: "center" }}>
          <Text style={styles.BookText2}>
            you can add multiple student's details.One at a time...
          </Text>
        </View>
        <View
          style={{
            height: "80%",
            width: "100%",
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              height: 80,
              width: "100%",
              paddingHorizontal: 10,
              flexDirection: "row",
            }}
          >
            <View style={{ height: 100, width: "90%" }}>
              <Text style={styles.Information}>
                {/* {route.params.value} */}
                {Student_Detail.Level}
              </Text>
              <Text style={styles.Information}>
                {/* {route.params.value1} */}
                {Student_Detail.Grade}
              </Text>
              {Student_Detail.Subjects &&
                Student_Detail.Subjects.map((item) => {
                  return (
                    <Text key={item} style={styles.Information}>
                      {item.subject}
                    </Text>
                  );
                })}
              <Text style={styles.Information}>
                {/* {route.params.value2} */}
              </Text>
            </View>
            <View style={{ height: 80, width: "10%" }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("../../../Assets/Deletes.png")} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text
            style={{ color: "#2F5597" }}
            ellipsizeMode="clip"
            numberOfLines={1}
          >
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            -
          </Text> */}
          <TouchableOpacity style={{ height: 30, width: "100%" }}>
            <Image
              source={require("../../../Assets/Plus.png")}
              style={{ height: 20, width: 20, position: "absolute", right: 15 }}
            />
          </TouchableOpacity>
        </View>
        <Text>{console.log(Student_Detail, "PPPPPPPPPPPP")}</Text>
      </View>
      <TouchableOpacity style={styles.circleArrow} onPress={() => GoToNext()}>
        {/* //onPress={() => navigation.navigate('OurTutor')}> */}
        {/* {homeTutor === true && ( */}
        <Image source={require("../../../Assets/circleArrow.png")} />
        {/* )} */}
      </TouchableOpacity>
    </SafeAreaView>
    // </View>
  );
};

export default StudentBookingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // backgroundColor: 'pink',
    // padding: 10,
  },
  circleArrow: {
    flex: 0.1,
    marginTop: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
  },
  Headers: {
    height: hp(8),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },
  HeadLeft: {
    width: wp(45),
    height: hp(10),
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  HeadRight: {
    width: wp(45),
    height: hp(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  HeaderContainer: {
    height: 30,
    width: "90%",
    alignSelf: "center",
  },
  HeaderText: {
    fontSize: 20,
    color: "#2F5597",
    fontWeight: "bold",
  },
  leftImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLeft: {
    height: 30,
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    // borderRadius: 2,
    borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowPropLeft: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  infoText1: {
    fontSize: 15,
    color: "black",
    alignSelf: "center",
    fontWeight: "700",
  },
  Bookcard: {
    height: "60%",
    width: "100%",
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    // borderRadius: 2,
    borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
    // justifyContent:"center",
    // alignItems:"center",
    padding: 10,
  },
  BookshadowProp: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  BookText1: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
  },
  TypeImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  BookText2: {
    fontSize: 12,
    color: "white",
    // fontWeight:"bold",
    color: "grey",
  },
  Information: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
    marginTop: 5,
    marginLeft: 10,
  },
  InfoImage: {},
  BookText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    fontWeight: "700",
  },
});
