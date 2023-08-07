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
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { BookTutor } from "../Redux/Actions/TutorBooking";
import moment from "moment";

var selectArray = [];
var selectFilter = [];

const MakeOffer = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [offerAmount, setofferAmount] = useState(0);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { Tutor_Qualification } = useSelector((state) => state.TutorReducer);
  console.log(route, "routeee");
  console.log(
    Tutor_Qualification,
    "Tutor_QualificationTutor_QualificationTutor_Qualification"
  );
  const [isFocus, setIsFocus] = useState(false);
  const data1 = [
    { label: "Negotiable", value: "1" },
    { label: "Non-Negotiable", value: "2" },
  ];
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));
  const [value, setValue] = useState("Negotiable");
  const [sendOffer, setSendOffer] = useState(0);

  const onSelectedlevel = (selectedItemslevel) => {
    // Set Selected Items

    createlevel(selectedItemslevel);
    setSelectedlevel(selectedItemslevel);
    // console.log('Level', selectedlevel)
  };

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

  const showDatePicker = () => {
    setDatePicker(true);
  };

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
  };

  const RemoveTempExercise = (Ex_array, Ex_Key, Ex_value) => {
    // console.log('sudhanshuuuuuuuuuuuuuuuuuu', JSON.stringify(Ex_array))

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

    selectArray = Ex_array;
    selectFilter = Ex_array;
  };

  const BookTutorProcess = () => {};
  // const SendRequest = (val) => {
  //   setSendOffer(val);

  //   if (value == "Negotiable") {
  //     navigation.navigate("Negotiate", {
  //       amount: offerAmount,
  //       mydate: date,
  //       mytime: time,
  //     });
  //   } else {
  //     navigation.navigate("NonNegotiate", {
  //       amount: offerAmount,
  //       mydate: date,
  //       mytime: time,
  //     });
  //   }
  // };

  const createlevel = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Levels_search"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Levels_search", obj3.Levels_search)) {
        selectFilter.push(obj3);

        // dispatch(GetfilterQualification(route.params.postalcode, route.params.tuition_type, Gender, Status, selectFilter))
      } else {
        RemoveTempExercise(selectFilter, "Levels_search", obj3.Levels_search);
      }
    }
    console.log("Level????????????????", selectFilter);
  };
  console.log(offerAmount, "ADAWDQWD");
  useEffect(() => {
    // console.log(route.params.postalcode, route.params.tuition_type)
    // dispatch(GetAllTutors())
    setUserdata(GET_FILTER_DATA);
    setPostaldata(GET_POSTAL_DATA);
    console.log(
      "🚀 ~ file: OurTutor.js ~ line 506 ~ useEffect ~ GET_POSTAL_DATA",
      GET_POSTAL_DATA
    );
  }, [offerAmount]);

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
      <View style={styles.Container}>
        <View style={styles.LeftImageContainer}>
          <Image
            source={require("../Assets/user.png")}
            style={styles.leftImage}
          />
        </View>
        <View style={styles.UserInfoContainer}>
          <View style={styles.UserInfoContainer1}>
            <Text style={styles.infoText}>Hello</Text>
          </View>
          <View style={{ height: 30, width: 200 }}>
            <Text style={styles.infoText}>University Undergraguate</Text>
          </View>
        </View>
      </View>
      <View style={styles.RatingContainer}>
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
          Step 2 of 5: Tution Fee Confirmation
        </Text>
      </View>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 90,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            paddingLeft: 5,
            paddingRight: 5,
            // flexDirection: 'row',
          }}
        >
          <Text style={styles.BookText1}>
            Message:
            {route?.params?.Amount_type == "Non Negotiable" ? (
              <Text style={styles.BookText2}>
                You have placed an offer, tutor will be informed you will be
                recieve an app notification when the tutor has responded.
              </Text>
            ) : (
              <Text style={styles.BookText2}>
                Your offer is sent to the tutor you will be informed via email
                or app notification when tutor has replied.
              </Text>
            )}
          </Text>
        </View>

        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              height: wp(55),
              width: wp(40),
              backgroundColor: "#fff",
              borderRadius: 20,
              margin: 20,
              elevation: 10,
            }}
          >
            <Image
              source={require("../Assets/Dollar.png")}
              style={styles.Dollaricons}
            />
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                fontWeight: "700",
                color: "#2F5597",
              }}
            >
              Your Offer
            </Text>

            <View
              style={{
                flexDirection: "row",
                height: 50,
                backgroundColor: "#2F5597",
                marginTop: wp(5),
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                SGD
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  width: 45,
                  fontWeight: "600",
                  alignSelf: "center",
                  textAlign: "center",
                }}
              >
                {route?.params?.fees}
              </Text>
              {/* <TextInput
                style={{
                  height: 40,
                  backgroundColor: "#2F5597",
                  width: 45,
                  color: "#fff",
                  fontSize: 18,
                  marginRight: 4,
                  fontWeight: "500",
                  alignSelf: "center",
                }}
                keyboardType="numeric"
                value={offerAmount}
                // value={Tutor_Qualification.FeeOffer}
                onChangeText={(text) => setofferAmount(text)}
                placeholderTextColor="#fff"
                placeholder="0.00"
              /> */}
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                / hour
              </Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                color: "#2F5597",
                fontSize: 14,
                marginTop: wp(3),
              }}
            >
              {route?.params?.Amount_type}
            </Text>
          </View>

          {/* <View style={styles.MainContainer}>
         

            {datePicker && (
              <DateTimePicker
                value={date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
              />
            )}

            {timePicker && (
              <DateTimePicker
                value={time}
                mode={"time"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={false}
                onChange={onTimeSelected}
                style={styles.datePicker}
              />
            )}

            {!datePicker && (
              <View
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Button
                  title="Select Date"
                  color="#2F5597"
                  onPress={showDatePicker}
                />
              </View>
            )}

            {!timePicker && (
              <View style={{ marginLeft: 10, alignSelf: "flex-start" }}>
                <Button
                  title="Select Time"
                  color="#2F5597"
                  onPress={showTimePicker}
                />
              </View>
            )}
          </View> */}

          {/* <View
            style={{
              marginTop: wp(5),
              height: wp(12),
              backgroundColor: "#2F5597",
              borderColor: "#2F5597",
              borderWidth: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                width: wp(45),
                backgroundColor: "#2F5597",
                color: "#fff",
                fontSize: 15,
                fontWeight: "500",
                margin: 10,
                marginLeft: 20,
              }}
            >
              Your Start Date/Time
            </Text>
            <View
              style={{
                width: wp(45),
                height: wp(8),
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>
                {moment(date.toString()).format("ddd,MMMM Do")}{" "}
                {moment(time.toLocaleTimeString("en-US"), "HH:mm").format(
                  "hh:mm A"
                )}
              </Text>
            </View>
          </View> */}

          {/* {sendOffer == 0 ? (
            <View
              style={{
                marginTop: wp(5),
                height: wp(12),
                borderColor: "#2F5597",
                borderWidth: 1,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  width: wp(48),
                  color: "#2F5597",
                  fontSize: 16,
                  fontWeight: "500",
                  margin: 10,
                  marginLeft: 20,
                }}
              >
                SGD {offerAmount}.00 / hour
              </Text>
              <View
                style={{
                  width: wp(40),
                  height: wp(9),
                  borderWidth: 1,
                  borderColor: "#2F5597",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                  placeholderStyle={{ fontSize: 16, color: "#2F5597" }}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={{ color: "#2F5597" }}
                  iconStyle={styles.iconStyle}
                  data={data1}
                  labelField="label"
                  valueField="label"
                  allowFontScaling={false}
                  //   maxHeight={100}
                  placeholder={!isFocus ? " Negotiable " : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.label);
                    setIsFocus(false);
                  }}
                />
                {console.log("country=" + value)}
              </View>
            </View>
          ) : (
            <View />
          )} */}
        </ScrollView>
        <View
          style={{
            height: "10%",
            width: "100%",
            position: "absolute",
            bottom: -30,
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
            <Text style={styles.BookText5}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              // navigation.navigate("MyBookings",{
              //   proceed: true
              // })
              navigation.navigate("StartDT", {
                tutorBookingProcessId: route?.params?.tutorBookingProcessId,
                Amount_type: route?.params?.Amount_type,
                offerStatus: route?.params?.offerStatus,
              })
            }
            disabled={
              route?.params?.tutorBookingStatus === "Accept" &&
              route?.params?.offerStatus == "Accept"
                ? false
                : true
            }
            style={{
              height: "100%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                route?.params?.tutorBookingStatus === "Accept" &&
                route?.params?.offerStatus == "Accept"
                  ? "#F6BE00"
                  : "#ffff",
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
export default MakeOffer;
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

  Dollaricons: {
    height: 50,
    width: 50,
    margin: 5,
    // alignSelf: 'center',
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
    //backgroundColor: '#F5F5F5',
    backgroundColor: "#fff",
    alignSelf: "center",
    // borderRadius: 2,
    borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
    // justifyContent:"center",
    // alignItems:"center",
    //padding: 10,
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
    color: "red",
  },
  TypeImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  TypeImage1: {
    width: 20,
    height: 20,
    // marginTop: 5
  },
  BookText2: {
    fontSize: 12,
    color: "grey",
    fontWeight: "bold",
  },
  SelectMoreContainer: {
    height: 100,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  dropdown: {
    height: 30,
    width: "95%",
    borderColor: "black",

    alignSelf: "center",
    backgroundColor: "#fff",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#2F5597",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  cardFrequency: {
    height: 85,
    width: "100%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  shadowPropFrequency: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  FrequencyDropdown: {
    height: 30,
    width: "45%",
    backgroundColor: "#2F5597",
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  DropdownText: {
    fontSize: 14,
    color: "white",
  },
  DropdownImage: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  BookText5: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
  },

  MainContainer: {
    flex: 1,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});
