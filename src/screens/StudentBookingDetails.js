import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Modal,
  ImageBase,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ItemBox from "./ItemBox";
import RNPickerSelect from "react-native-picker-select";
//import CheckBox from '@react-native-community/checkbox';
import { GetAllTutors } from "../Redux/Actions/Tutors";
import {
  GetfilterSubject,
  GetfilterQualification,
} from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { Dropdown } from "react-native-element-dropdown";

const StudentBookingDetails = ({ route }) => {
  console.log(
    "🚀 ~ file: StudentBookingDetails.js ~ line 35 ~ StudentBookingDetails ~ route",
    route
  );
  const navigation = useNavigation();
  const data = route.params.data;
  console.log(
    "🚀 ~ file: StudentBookingDetails.js ~ line 38 ~ StudentBookingDetails ~ data",
    data
  );
  const { Student_Detail } = useSelector((state) => state.TutorReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Headers}>
        <View style={styles.HeadLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../Assets/baricon.png")}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.HeadRight}>
          <Image source={require("../Assets/bell.png")} style={styles.icons} />
          <Image
            source={require("../Assets/search.png")}
            style={styles.icons}
          />
          <Image source={require("../Assets/chat.png")} style={styles.icons} />
        </View>
      </View>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Let's Book!</Text>
      </View>
      <View
        style={{
          height: 70,
          width: "90%",
          alignSelf: "center",
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 60,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../Assets/user.png")}
            style={styles.leftImage}
          />
        </View>
        <View style={{ height: 60, width: 200 }}>
          <View style={{ height: 30, width: 200 }}>
            <Text style={styles.infoText}>Hello</Text>
          </View>
          <View style={{ height: 30, width: 200 }}>
            <Text style={styles.infoText}>University Undergraguate</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 20, width: "90%", alignSelf: "center" }}>
        <View style={{ width: 40, marginLeft: 5 }}>
          <StarRating
            fullStarColor="orange"
            disabled={false}
            maxStars={5}
            // rating={item.Average_rating}
            starSize={15}
            // selectedStar={(rating) => setStrCount(rating)}
          />
        </View>
      </View>
      <View style={[styles.cardLeft, styles.shadowPropLeft]}>
        <Text style={styles.infoText1}>
          Step 1 of 5: Booking Information required
        </Text>
      </View>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 40,
            width: "100%",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Text style={styles.BookText1}>Student's Details......</Text>
          <View style={{ position: "absolute", right: 10 }}>
            <Image
              source={require("../Assets/Student.png")}
              style={styles.TypeImage}
            />
          </View>
        </View>
        <View style={{ height: 20, width: "93%", alignSelf: "center" }}>
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
                {route.params.value}
                {Student_Detail.Level}
              </Text>
              <Text style={styles.Information}>
                {route.params.value1}
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
              <Text style={styles.Information}>{route.params.value2}</Text>
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
                  source={require("../Assets/Edit.png")}
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
                <Image source={require("../Assets/Deletes.png")} />
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
              source={require("../Assets/Plus.png")}
              style={{ height: 20, width: 20, position: "absolute", right: 15 }}
            />
          </TouchableOpacity>
        </View>
        <Text>{console.log(Student_Detail, "PPPPPPPPPPPP")}</Text>
        <View
          style={{
            height: "10%",
            width: "100%",
            position: "absolute",
            bottom: 5,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("")}
            style={{
              height: "100%",
              width: "50%",
              backgroundColor: "#C0C0C0",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <Text style={styles.BookText}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("TutorQualification")}
            style={{
              height: "100%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F6BE00",
              borderRadius: 3,
            }}
          >
            <Text style={styles.infoText1}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default StudentBookingDetails;
const styles = StyleSheet.create({
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
