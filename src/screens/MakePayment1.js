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

import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import { AcceptFinalOffer } from "../Redux/Actions/TutorBooking";
import { Dropdown } from "react-native-element-dropdown";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import CountDown from "react-native-countdown-component";
import { offerDateTime } from "../Redux/Actions/Tutors";
import CountdownTimer from "../screens/TutorBooking/Component/CountdownTimer";

var selectArray = [];
var selectFilter = [];

const MakePayment = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [offerAmount, setofferAmount] = useState(0);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { All_Booked_Student } = useSelector(
    (state) => state.TutorBooingReducer
  );
  const { All_Booked_Tutor } = useSelector((state) => state.TutorBooingReducer);
  console.log(
    All_Booked_Student,
    "All_Booked_StudentAll_Booked_StudentAll_Booked_Student"
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
  const [selectedStartDate, setSelectedStartDate] = useState();

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };
  console.log(selectedStartDate, "selectedStartDate");

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
    console.log(value.toLocaleTimeString(), "time");
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

  const SendRequest = (val) => {
    setSendOffer(val);

    if (value == "Negotiable") {
      navigation.navigate("Negotiate", {
        amount: offerAmount,
        mydate: date,
        mytime: time,
      });
    } else {
      navigation.navigate("NonNegotiate", {
        amount: offerAmount,
        mydate: date,
        mytime: time,
      });
    }
  };
  const dateTimeOffer = () => {
    const Time = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const Date = moment(
      selectedStartDate ? selectedStartDate : date.toString()
    ).format("MM-DD-YYYY");

    dispatch(
      offerDateTime(
        route?.params?.tutorBookingProcessId,
        route?.params?.offerStatus,
        Time,
        Date
      )
    );
  };

  const AcceptOffer = () => {
    console.log(
      "Accepttttttttttttttt",
      All_Booked_Student[0]?.tutor_id,
      All_Booked_Student[0]?.tutor_booking_process_id,
      "Accept"
    );

    dispatch(
      AcceptFinalOffer(
        All_Booked_Student[0]?.tutor_id,
        All_Booked_Student[0]?.tutor_booking_process_id,
        "Accept",
        navigation
      )
    );
  };
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
        <Text style={styles.infoText1}>Step 4 of 5: Make Payment</Text>
      </View>

      <View
        style={{
          backgroundColor: "#F2F2F2",
          height: wp(15),
          paddingTop: 5,
          justifyContent: "center",
          marginLeft: 10,
          flexDirection: "row",
        }}
      >
        <Text style={styles.BookText1}>
          Message:
          <Text style={styles.BookText2}>
            All details have been confirmed.Client is now requested to make
            payment. You will need to hold your Schedule for 24 hrs. No
            cancellation allowed at this point of time{" "}
          </Text>
        </Text>
      </View>

      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        {/* <ScrollView style={{ marginBottom: 20 }}> */}

        {/* timer start */}
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          {/* <CountDown
            until={86400}
            //duration of countdown in seconds
            timetoShow={("H", "M", "S")}
            //formate to show
            onFinish={() => alert("finished")}
            digitStyle={{ backgroundColor: "#000" }}
            digitTxtStyle={{ color: "#fff" }}
            //on Finish call
            onPress={() => alert("hello")}
            //on Press call
            size={20}
          /> */}
          <CountdownTimer initialSeconds={86400} />
        </View>

        {/* timer end */}

        <View style={styles.MainContainer}>
          {/* <Text style={styles.text}>Date = {date.toDateString()}</Text>
                            <Text style={styles.text}>Time = {time.toLocaleTimeString('en-US')}</Text> */}
          <View
            style={{
              // display: "flex",
              flexDirection: "row",
              width: "100%",
              //  backgroundColor: "red",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "25%",
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#000",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Button
                  title="Select"
                  color="#2F5597"
                  onPress={showTimePicker}
                />
              </View>
            </View>
            <View
              style={{ height: "100%", width: 1, backgroundColor: "grey" }}
            ></View>
            {/* <ScrollView horizontal={true}> */}
            <View style={{ width: "75%" }}>
              <CalendarPicker
                // height={hp(100)}
                width={wp(70)}
                onDateChange={onDateChange}
              />
            </View>
            {/* </ScrollView> */}
          </View>

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
        </View>
        {/* {selectedStartDate && time ? ( */}
        <View
          style={{
            backgroundColor: "#2F5597",
            height: wp(12),
            borderColor: "#2F5597",
            borderWidth: 1,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              width: wp(90),
              color: "#fff",
              fontSize: 14,
              fontWeight: "500",
              margin: 10,
              textAlign: "center",
            }}
          >
            Agreed Fee is SGD {All_Booked_Tutor[0]?.tutor_tution_offer_amount}
            /hour
          </Text>
        </View>

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
            // onPress={() => navigation.navigate("")}
            style={{
              height: "100%",
              width: "50%",

              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <Text style={styles.BookText5}>Cancel Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            //   onPress={
            //     () => AcceptOffer()
            //     // navigation.navigate('')
            //   }
            style={{
              height: "100%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F6BE00",

              borderRadius: 3,
            }}
          >
            <Text style={styles.infoText1}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MakePayment;
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
    height: wp(10),
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    // borderRadius: 2,
    borderWidth: 0.2,
    marginTop: 10,
    // marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowPropLeft: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "#2F5597",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
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
    fontSize: 14,
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
    // paddingLeft: 20,
    alignItems: "center",
    marginBottom: wp(5),
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