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
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import CountDown from "react-native-countdown-component";
import { offerDateTime, ConfirmofferDateTime } from "../Redux/Actions/Tutors";
import { Loader } from "../common/Loader";

var selectArray = [];
var selectFilter = [];

const StartDT = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [offerAmount, setofferAmount] = useState(0);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { All_Booked_Tutor } = useSelector((state) => state.TutorBooingReducer);
  const [isFocus, setIsFocus] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [currentTimeDate, setcurrentTimeDate] = useState(false);
  const [nextButton, setNextButton] = useState(false);
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
  const [loader, setLoader] = useState(false);
  console.log(All_Booked_Tutor[0], "jkkkk");

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

  const showselectedTimeDate = () => {
    setcurrentTimeDate(true);
    setNextButton(true);
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
    setLoader(true);
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
        route?.params?.student_id,
        Time,
        Date
      )
    );
    setNextButton(false);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };
  const confirmdateTimeOffer = () => {
    setLoader(true);
    dispatch(
      ConfirmofferDateTime(
        route?.params?.tutorBookingProcessId,
        route?.params?.student_id
      )
    );
    setTimeout(() => {
      setLoader(false);
    }, 2000);
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

  const student_offer_date = All_Booked_Tutor[0]?.student_offer_date;
  const student_offer_time = All_Booked_Tutor[0]?.student_offer_time;
  console.log(student_offer_date, student_offer_time, "PPPPPPPPPPPPPPPPPPPPP");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader flag={loader} />
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
        <Text style={styles.infoText1}>Step 3 of 5: Start Date & Time</Text>
      </View>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 25,
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
            <Text style={styles.BookText2}>Let's fix a start date & Time</Text>
          </Text>
        </View>

        {/* <ScrollView style={{ marginBottom: 20 }}> */}

        {/* timer start */}
        {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <CountDown
                        until={86400}
                        //duration of countdown in seconds
                        timetoShow={('H', 'M', 'S')}
                        //formate to show
                        onFinish={() => alert('finished')}
                        digitStyle={{ backgroundColor: '#000' }}
                        digitTxtStyle={{ color: '#fff' }}
                        //on Finish call
                        onPress={() => alert('hello')}
                        //on Press call
                        size={20}
                    />
                </View> */}

        {/* timer end */}

        <View style={styles.MainContainer}>
          {/* <Text style={styles.text}>Date = {date.toDateString()}</Text>
                            <Text style={styles.text}>Time = {time.toLocaleTimeString('en-US')}</Text> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: 20,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "35%",
              }}
            >
              <View style={{ width: "70%" }}>
                <TouchableOpacity onPress={showTimePicker}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#000",
                      marginBottom: 20,
                      width: "100%",
                    }}
                  >
                    {time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Select"
                  color="#2F5597"
                  //onPress={showTimePicker}
                  onPress={() => showselectedTimeDate()}
                />
              </View>
            </View>
            <View
              style={{ height: "100%", width: 2, backgroundColor: "grey" }}
            ></View>
            <ScrollView horizontal={true}>
              <View style={{ width: "100%" }}>
                <CalendarPicker
                  height={217}
                  width={230}
                  onDateChange={onDateChange}
                />
              </View>
            </ScrollView>
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
          {/* {datePicker && (
                            <DateTimePicker
                                value={date}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={onDateSelected}
                                style={styles.datePicker}
                            />
                        )}

                        {timePicker && (
                            <DateTimePicker
                                value={time}
                                mode={'time'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={false}
                                onChange={onTimeSelected}
                                style={styles.datePicker}
                            />
                        )}

                        {!datePicker && (
                            <View style={{ marginLeft: 10, marginBottom: 10, alignSelf: 'flex-start' }}>
                                <Button title="Select Date" color="#2F5597" onPress={showDatePicker} />
                            </View>
                        )}

                        {!timePicker && (
                            <View style={{ marginLeft: 10, alignSelf: 'flex-start' }}>
                                <Button title="Select Time" color="#2F5597" onPress={showTimePicker} />
                            </View>
                        )} */}
        </View>
        {student_offer_date && student_offer_time ? (
          <View
            style={{
              marginTop: wp(15),
              height: wp(12),
              backgroundColor: "#2F5597",
              borderColor: "#2F5597",
              borderWidth: 1,
              flexDirection: "row",
              marginBottom: 7,
              width: wp(100),
            }}
          >
            <Text
              style={{
                width: wp(40),
                backgroundColor: "#2F5597",
                color: "#fff",
                fontSize: 12,
                fontWeight: "500",
                margin: 10,
              }}
            >
              Your Start Date/Time
            </Text>
            <View
              style={{
                width: wp(60),
                height: wp(8),
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>
                {" "}
                {moment(student_offer_date, "MM-DD-YYYY").format(
                  "ddd,DD MMM YYYY"
                )}{" "}
                {student_offer_time}
              </Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        {currentTimeDate == true ? (
          <View
            style={{
              marginTop: wp(15),
              height: wp(12),
              backgroundColor: "#2F5597",
              borderColor: "#2F5597",
              borderWidth: 1,
              flexDirection: "row",
              marginBottom: 7,
              width: wp(100),
            }}
          >
            <Text
              style={{
                width: wp(40),
                backgroundColor: "#2F5597",
                color: "#fff",
                fontSize: 12,
                fontWeight: "500",
                margin: 10,
              }}
            >
              Your Start Date/Time
            </Text>
            <View
              style={{
                width: wp(60),
                height: wp(8),
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>
                {" "}
                {moment(selectedStartDate, "MM-DD-YYYY").format(
                  "ddd,DD MMM YYYY"
                )}{" "}
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}

        {All_Booked_Tutor[0]?.tutor_offer_date &&
        All_Booked_Tutor[0]?.tutor_offer_time ? (
          <View
            style={{
              height: wp(12),
              backgroundColor: "green",
              borderColor: "#2F5597",
              borderWidth: 1,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                width: wp(40),
                backgroundColor: "green",
                color: "#fff",
                fontSize: 12,
                fontWeight: "500",
                margin: 10,
              }}
            >
              Tutor's Start Date/Time
            </Text>
            <View
              style={{
                width: wp(60),
                height: wp(8),
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>
                {" "}
                {moment(
                  All_Booked_Tutor[0]?.tutor_offer_date,
                  "MM-DD-YYYY"
                ).format("ddd,DD MMM YYYY")}{" "}
                {All_Booked_Tutor[0]?.tutor_offer_time}
              </Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <View></View>

        {/* </ScrollView> */}
        <View
          style={{
            height: "10%",
            width: "100%",
            position: "absolute",
            bottom: -50,
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

          {All_Booked_Tutor[0]?.tutor_accept_date_time_status === "Accept" ? (
            <TouchableOpacity
              onPress={() => {
                confirmdateTimeOffer();
                navigation.navigate("MakePayment");
              }}
              style={{
                height: "100%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F6BE00",
                borderRadius: 3,
              }}
            >
              <Text style={styles.infoText1}>Confirm</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (!student_offer_date && !student_offer_time) {
                  dateTimeOffer();
                  // navigation.navigate('')
                } else {
                  confirmdateTimeOffer();
                  navigation.navigate("MakePayment");
                }
              }}
              disabled={
                nextButton == true ||
                (All_Booked_Tutor[0]?.offer_status === "Accept" &&
                  All_Booked_Tutor[0]?.student_offer_date != "" &&
                  All_Booked_Tutor[0]?.tutor_accept_date_time_status != "")
                  ? false
                  : true
              }
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  nextButton == true ||
                  (All_Booked_Tutor[0]?.offer_status === "Accept" &&
                    All_Booked_Tutor[0]?.student_offer_date != "" &&
                    All_Booked_Tutor[0]?.tutor_accept_date_time_status != "")
                    ? "#F6BE00"
                    : "#fff",
                borderRadius: 3,
              }}
            >
              <Text style={styles.infoText1}>
                {(All_Booked_Tutor[0]?.offer_status === "Accept" &&
                  All_Booked_Tutor[0]?.student_offer_date == "") ||
                (All_Booked_Tutor[0]?.student_offer_date != "" &&
                  All_Booked_Tutor[0]?.student_offer_time == "") ||
                (All_Booked_Tutor[0]?.student_offer_time != "" &&
                  All_Booked_Tutor[0]?.tutor_accept_date_time_status == "")
                  ? "Next"
                  : "Confirm"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default StartDT;
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
    // marginBottom: 10,
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
    // paddingLeft: 20,
    alignItems: "center",
    height: "45%",
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
