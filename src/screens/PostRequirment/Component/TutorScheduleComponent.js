import React, { useState, useEffect } from "react";
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
import Day from "react-native-calendars/src/calendar/day";
import { Tutor_Schedule } from "../../../Redux/Actions/types";

const morning = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"];
const Afternoon = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM"];
const Evening = ["12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
const Night = ["6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];
const Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TutionScheduleComponent = ({}) => {
  const [time, setTime] = useState(morning);
  const [days, setDays] = useState(Days);
  const navigation = useNavigation();
  const [date, setDate] = useState("");
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const { Tutor_Qualification } = useSelector((state) => state.TutorReducer);

  const dispatch = useDispatch();
  // console.log(
  //   Tutor_Qualification,
  //   "Tutor_QualificationTutor_QualificationTutor_Qualification"
  // );
  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);

  const handler = (time) => {
    let picker = selected;
    if (selected.includes(time)) {
      picker = picker.filter((item) => item != time);
    } else {
      const obj3 = {};

      obj3["slot_time"] = time;

      if (!isExistInArray(picker, "slot_time", obj3.slot_time)) {
        picker.push(obj3);
      } else {
        RemoveTempExercise(picker, "slot_time", obj3.slot_time);
      }
    }
    setSelected(picker);
    setSelected1(picker);

    setDate(new Date());
  };

  const handler1 = (time) => {
    console.log(time, "Selected");
    let picker = selected1;
    if (selected1.includes(time)) {
      picker = picker.filter((item) => item != time);
      console.log(picker, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
    } else {
      const obj3 = {};

      obj3["tutor_schedule"] = time;

      if (!isExistInArray(picker, "tutor_schedule", obj3.tutor_schedule)) {
        console.log(picker, "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        picker.push(obj3);
      } else {
        RemoveTempExercise(picker, "tutor_schedule", obj3.tutor_schedule);
      }
    }
    setSelected1(picker);
    setSelected(picker);
    setDate(new Date());
  };

  console.log(selected1, "MMMMMMMMMMMMMMMMM");

  const isExistInArray = (Ex_array, Ex_Key, Ex_value) => {
    var isExist = false;
    Ex_array.forEach(function (element, index) {
      if (
        Ex_array[index] &&
        Ex_array[index].hasOwnProperty(Ex_Key) &&
        Ex_array[index][Ex_Key] === Ex_value
      ) {
        isExist = true;
        return false;
      }
    });

    return isExist;
  };

  const RemoveTempExercise = (Ex_array, Ex_Key, Ex_value) => {
    Ex_array.forEach(function (element, index) {
      if (
        Ex_array[index] &&
        Ex_array[index].hasOwnProperty(Ex_Key) &&
        Ex_array[index][Ex_Key] === Ex_value
      ) {
        console.log("id:" + Ex_value);
        Ex_array.splice(index, 1);
        return false;
      }
    });

    Picker = Ex_array;
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const renderTime1 = (item) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handler1(item.item)}
          style={{
            height: 40,
            width: 50,
            backgroundColor: selected1.some(
              (obj) =>
                obj.hasOwnProperty("tutor_schedule") &&
                obj["tutor_schedule"] === item.item
            )
              ? "#2F5597"
              : "#fff",
            marginBottom: 2,
            borderRadius: 5,
            margin: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: selected1.some(
                (obj) =>
                  obj.hasOwnProperty("tutor_schedule") &&
                  obj["tutor_schedule"] === item.item
              )
                ? "#fff"
                : "#000",
            }}
          >
            {item.item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  console.log("MONNNNNNNNN", selected1);
  // console.log("ABCABC 111", selected);
  const renderTime = (item) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handler(item.item)}
          style={{
            height: 40,
            width: 60,
            backgroundColor: selected.some(
              (obj) =>
                obj.hasOwnProperty("slot_time") &&
                obj["slot_time"] === item.item
            )
              ? "#2F5597"
              : "#fff",
            marginBottom: 2,
            margin: 1,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: selected.some(
                (obj) =>
                  obj.hasOwnProperty("slot_time") &&
                  obj["slot_time"] === item.item
              )
                ? "#fff"
                : "#000",
            }}
          >
            {item.item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const GoToNext = () => {
    let obj = {
      Tutor_schedules: selected1,
      tutor_schedule_time: selected,
    };

    dispatch({
      type: Tutor_Schedule,
      payload: obj,
    });

    console.log(obj, "FINALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    navigation.navigate("PostSummary");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 40,
            width: "100%",
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.BookText1}>
            Tution Schedule Picker (Optional)
          </Text>
        </View>
        <View
          style={{
            height: 40,
            width: "100%",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <CheckBox
                value={toggleCheckBox}
                onValueChange={setToggleCheckBox}
                style={{
                  height: 20,
                  width: 20,
                  borderColor: "#2F5597",
                  marginRight: 10,
                }}
              />
            </View>
            <Text style={styles.BookText1}>Mon-Fri</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: "#2F5597",
                marginRight: 10,
              }}
            ></View>
            <Text style={styles.BookText1}>Sat-Sun</Text>
          </View>
        </View>
        <View style={[styles.cardWeek, styles.shadowPropWeek]}>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={days}
            key={new Date()}
            renderItem={(item) => renderTime1(item)}
            numColumns={7}
          />
        </View>
        {/* <View style={[styles.cardWeek, styles.shadowPropWeek]}>
            <View
              style={{
                height: 40,
                width: 50,
                backgroundColor: "#2F5597",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.WeekText}>Mon</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Tues</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Wed</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Thu</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Fri</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Sat</Text>
            </View>
            <View style={styles.WeeklyContainer}>
              <Text style={styles.WeekText}>Sun</Text>
            </View>
          </View> */}

        <View
          style={{
            height: 250,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 40, width: "40%" }}>
            <TouchableOpacity
              style={[
                styles.cardMorningContainer,
                styles.shadowPropMorningContainer,
              ]}
            >
              <View style={styles.MorningImageContainer}>
                <Image
                  source={require("../../../Assets/Morning.png")}
                  style={styles.icons}
                />
              </View>
              <TouchableOpacity
                onPress={() => setTime(morning)}
                style={{
                  height: 40,
                  width: "70%",
                  justifyContent: "center",
                  //  backgroundColor: time == "morning" ? "#2F5597" : ,

                  alignItems: "center",
                }}
              >
                <Text style={[styles.MorningText]}>12 AM to 5:59 AM</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <View
              style={[
                styles.cardMorningContainer,
                styles.shadowPropMorningContainer,
              ]}
            >
              <View style={styles.MorningImageContainer}>
                <Image
                  source={require("../../../Assets/Afternoon.png")}
                  style={styles.icons}
                />
              </View>
              <TouchableOpacity
                onPress={() => setTime(Afternoon)}
                style={{
                  height: 40,
                  width: "70%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.MorningText}>6 AM to 11:59 AM</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.cardMorningContainer,
                styles.shadowPropMorningContainer,
              ]}
            >
              <View style={styles.MorningImageContainer}>
                <Image
                  source={require("../../../Assets/Evening.png")}
                  style={styles.icons}
                />
              </View>
              <TouchableOpacity
                onPress={() => setTime(Evening)}
                style={{
                  height: 40,
                  width: "70%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.MorningText}>12 PM to 5:59 PM</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setTime(Night)}
              style={[
                styles.cardMorningContainer,
                styles.shadowPropMorningContainer,
              ]}
            >
              <View style={styles.MorningImageContainer}>
                <Image
                  source={require("../../../Assets/Night.png")}
                  style={styles.icons}
                />
              </View>
              <View
                style={{
                  height: 40,
                  width: "70%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.MorningText}>6 PM to 11:59 PM</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.TimeContainer}>
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={time}
              key={new Date()}
              renderItem={(item) => renderTime(item)}
              numColumns={3}
            />
          </View>
        </View>
        <View
          style={{
            height: "10%",
            width: "100%",
            //position: "absolute",
            // bottom: 5,

            flexDirection: "row",

            // alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.circleArrow1}
          >
            <Image
              style={{ transform: [{ rotate: "180deg" }] }}
              source={require("../../../Assets/circleArrow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleArrow}
            onPress={() => GoToNext()}
          >
            {/* //onPress={() => navigation.navigate('OurTutor')}> */}
            {/* {homeTutor === true && ( */}
            <Image source={require("../../../Assets/circleArrow.png")} />
            {/* )} */}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TutionScheduleComponent;
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
  HeadRight: {
    width: wp(45),
    height: hp(5),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  circleArrow: {
    //justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
    width: wp(45),
  },
  circleArrow1: {
    //   justifyContent: "flex-end",
    //   alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
    width: wp(45),
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
    color: "#2F5597",
    fontWeight: "bold",
  },
  dropdown: {
    height: 30,
    width: "70%",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#2F5597",
  },
  BookText5: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
  },
  cardWeek: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  shadowPropWeek: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  WeeklyContainer: {
    height: 40,
    width: 48,
    backgroundColor: "#2F5597",
    marginLeft: 4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  WeekText: {
    fontSize: 14,
    color: "white",
    // fontWeight: "bold",
  },
  cardMorningContainer: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    marginTop: 20,
    flexDirection: "row",
    marginLeft: 5,
  },
  shadowPropMorningContainer: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#2F5597",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  MorningImageContainer: {
    height: 40,
    width: "25%",
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  MorningText: {
    fontSize: 12,
    color: "black",
    // fontWeight: "bold",
  },

  TimeContainer: {
    height: 175,
    width: "55%",
    // backgroundColor:"green",
    alignSelf: "center",
    marginRight: 5,
    padding: 3,
    flexDirection: "row",
  },
  TimeScheduleColum: {
    height: 40,
    width: 60,
    backgroundColor: "#2F5597",

    marginBottom: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TimeScheduleRow: {
    height: 40,
    width: 60,
    backgroundColor: "#2F5597",
    marginLeft: 3,
    marginBottom: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TimeText: {
    fontSize: 12,
    color: "black",
    // fontWeight: "bold",
  },
});
