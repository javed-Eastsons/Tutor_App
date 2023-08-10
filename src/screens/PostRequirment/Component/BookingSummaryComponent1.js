import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
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
import CheckBox from "@react-native-community/checkbox";
import { BookTutor } from "../../../Redux/Actions/TutorBooking";

const BookingSummaryComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { Tutor_Schedule } = useSelector((state) => state.TutorReducer);
  const { Tution_Type } = useSelector((state) => state.TutorReducer);
  const { Student_Detail } = useSelector((state) => state.TutorReducer);
  const { Tutor_Qualification } = useSelector((state) => state.TutorReducer);

  const [tutiontype, setTutionType] = useState("tutiontype");
  const [qualification, setQualification] = useState("qualification");
  const [lesson, setLesson] = useState("lesson");
  const [offerprice, setOfferPrice] = useState("offerprice");
  const [timeslots, setTimeSlots] = useState("timeslots");
  const [currentTab, setCurrentTab] = useState("tutiontype");

  const SelectTab = (selectedval) => {
    setCurrentTab(selectedval);
  };

  const PostReqData = () => {
    Alert.alert("Post It API Under Process");
  };

  console.log(
    Tutor_Schedule,
    "Tutor_ScheduleTutor_ScheduleTutor_ScheduleTutor_Schedule",
    Tution_Type,
    "Tution_Type",
    Student_Detail,
    "Student_Detail",
    Tutor_Qualification,
    "Tutor_Qualification"
  );

  const BookTutorProcess = () => {
    dispatch(
      BookTutor(
        Tution_Type,
        Student_Detail,
        Tutor_Qualification,
        Tutor_Schedule,
        navigation
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 100,
            width: "100%",
            padding: 5,
            backgroundColor: "#E0E0E0",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 40,
                width: "70%",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text style={styles.BookText1}>{Tution_Type.TutionType}</Text>
              <Text style={styles.BookText1}>{Tution_Type.Postal_Code}</Text>
            </View>
            <View
              style={{
                height: 40,
                width: "30%",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Image
                style={styles.TypeImage}
                source={require("../../../Assets/HomeTution.png")}
              />
            </View>
          </View>
          <View style={{ height: 30, width: "100%", flexDirection: "row" }}>
            <View
              style={{
                height: 50,
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={styles.PostalText}>Postal Code Edit Here</Text> */}
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.TypeImage1}
                source={require("../../../Assets/Edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 100,
            width: "100%",
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => SelectTab("tutiontype")}
            style={[styles.cardFourBoxes, styles.shadowPropFourBoxes]}
          >
            <Image
              source={require("../../../Assets/Student.png")}
              style={styles.TypeImage3}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SelectTab("qualification")}
            style={[styles.cardFourBoxes1, styles.shadowPropFourBoxes1]}
          >
            <Image
              source={require("../../../Assets/Qualification.png")}
              style={styles.TypeImage3}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SelectTab("duration")}
            style={[styles.cardFourBoxes1, styles.shadowPropFourBoxes1]}
          >
            <Image
              source={require("../../../Assets/Duration.png")}
              style={styles.TypeImage3}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SelectTab("doller")}
            style={[styles.cardFourBoxes1, styles.shadowPropFourBoxes1]}
          >
            <Image
              source={require("../../../Assets/Dollar.png")}
              style={styles.TypeImage3}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => SelectTab("time")}
            style={[styles.cardFourBoxes1, styles.shadowPropFourBoxes1]}
          >
            <Image
              source={require("../../../Assets/Time.png")}
              style={styles.TypeImage3}
            />
          </TouchableOpacity>
        </View>

        {currentTab == "tutiontype" ? (
          <View style={{ height: 120, width: "100%", padding: 10 }}>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              >
                <Text style={styles.Information}>{Student_Detail.Level}</Text>
              </View>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              ></View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.Information}>{Student_Detail.Grade}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              >
                {Student_Detail.Subjects &&
                  Student_Detail.Subjects.map((item) => {
                    return (
                      <Text key={item} style={styles.Information}>
                        {item.subject}
                      </Text>
                    );
                  })}
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Deletes.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: "#2F5597" }}
              ellipsizeMode="clip"
              numberOfLines={1}
            >
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - -
            </Text>
          </View>
        ) : currentTab == "qualification" ? (
          <View style={{ height: 120, width: "100%", padding: 10 }}>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              {Tutor_Qualification.TutorQualification &&
                Tutor_Qualification.TutorQualification.map((item) => {
                  return (
                    <Text key={item} style={styles.Information}>
                      {item.qualification}
                    </Text>
                  );
                })}
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{ color: "#2F5597" }}
              ellipsizeMode="clip"
              numberOfLines={1}
            >
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - -
            </Text>
          </View>
        ) : currentTab == "duration" ? (
          <View style={{ height: 120, width: "100%", padding: 10 }}>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              >
                <Text style={styles.Information}>
                  {Tutor_Qualification.duration}
                </Text>
                <Text style={styles.Information}>
                  {Tutor_Qualification.frequency}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{ color: "#2F5597" }}
              ellipsizeMode="clip"
              numberOfLines={1}
            >
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - -
            </Text>
          </View>
        ) : currentTab == "doller" ? (
          <View style={{ height: 120, width: "100%", padding: 10 }}>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              >
                <Text style={styles.Information}>
                  {Tutor_Qualification.FeeOffer}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              <View
                style={{ height: 20, width: "70%", justifyContent: "center" }}
              >
                <Text style={styles.Information}>
                  {Tutor_Qualification.feetype}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{ color: "#2F5597" }}
              ellipsizeMode="clip"
              numberOfLines={1}
            >
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - -
            </Text>
          </View>
        ) : (
          <View style={{ height: 120, width: "100%", padding: 10 }}>
            <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              {Tutor_Schedule.Tutor_schedules &&
                Tutor_Schedule.Tutor_schedules.map((item) => {
                  return (
                    <Text key={item} style={styles.Information}>
                      {item.tutor_schedule}
                    </Text>
                  );
                })}
              {Tutor_Schedule.tutor_schedule_time &&
                Tutor_Schedule.tutor_schedule_time.map((item) => {
                  return (
                    <Text key={item} style={styles.Information}>
                      {item.slot_time}
                    </Text>
                  );
                })}
              <TouchableOpacity
                style={{
                  height: 30,
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../Assets/Edit.png")}
                  style={{ height: 20, width: 20, position: "absolute" }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{ color: "#2F5597" }}
              ellipsizeMode="clip"
              numberOfLines={1}
            >
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - -
            </Text>
          </View>
        )}

        <View
          style={{
            height: "15%",
            width: "100%",
            marginTop: hp(12),
            backgroundColor: "#2F5597",
            justifyContent: "center",
            // alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => PostReqData()}
            style={styles.circleArrow1}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Post It{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default BookingSummaryComponent;

const styles = StyleSheet.create({
  Headers: {
    height: hp(5),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
    // backgroundColor:'red'
  },
  HeadLeft: {
    width: wp(45),
    height: hp(5),
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  Information: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",

    marginLeft: 10,
  },
  HeadRight: {
    width: wp(45),
    height: hp(5),
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
  Container: {
    height: 70,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  LeftImageContainer: {
    height: 60,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  leftImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  UserInfoContainer: {
    height: 60,
    width: 200,
  },
  UserInfoContainer1: {
    height: 30,
    width: 200,
  },
  RatingContainer: {
    height: 20,
    width: "90%",
    alignSelf: "center",
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
    borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
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
    color: "grey",
    fontWeight: "bold",
  },
  PostalText: {
    fontSize: 14,
    color: "grey",
    fontWeight: "500",
  },
  BookText5: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
  },
  TypeImage: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
  },
  TypeImage1: {
    width: 20,
    height: 20,
  },
  TypeImage3: {
    width: 50,
    height: 50,
  },
  cardFourBoxes: {
    height: 70,
    width: "18%",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft:3
  },
  shadowPropFourBoxes: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardFourBoxes1: {
    height: 70,
    width: "18%",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  shadowPropFourBoxes1: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});