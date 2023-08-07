import React, { useState, useEffect, useMemo } from "react";
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
  ActivityIndicator,
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
import { RadioButton } from "react-native-paper";
import { OfferStatus } from "../../Redux/Actions/TutorBooking";
import { NegotiateOfferAmountUpdate } from "../../Redux/Actions/TutorBooking";
import { GetBookedStudentList } from "../../Redux/Actions/TutorBooking";

import moment from "moment";

var selectArray = [];
var selectFilter = [];

const TutorAcceptNegotiate = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [offerAmount, setofferAmount] = useState(0);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { All_Booked_Tutor_Detail } = useSelector(
    (state) => state.TutorBooingReducer
  );

  console.log(
    All_Booked_Tutor_Detail,
    "tutor_booking_process_idtutor_booking_process_idtutor_booking_process_idtutor_booking_process_id"
  );
  const { Login_Data } = useSelector((state) => state.TutorReducer);
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
  const [valueR, setValueR] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  // console.log(valueR, "radiooo");

  const GoToNext = () => {
    // console.log(
    //   route.params.BookingId,
    //   All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount,
    //   valueR
    // );

    setLoader(true);

    if (valueR == "Accept") {
      setTimeout(() => {
        dispatch(
          OfferStatus(
            route.params.BookingId,
            valueR,
            All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount_type,
            navigation
          )
        );
        dispatch(GetBookedStudentList(Login_Data, navigation));
        // setAllBookedStudent(All_Booked_Student);
        setLoader(false);
      }, 5000);
    } else {
      setTimeout(() => {
        dispatch(
          NegotiateOfferAmountUpdate(
            route.params.BookingId,
            All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount_type,
            All_Booked_Tutor_Detail[0]?.tutor_id,
            offerAmount,
            navigation
          )
        );
        dispatch(GetBookedStudentList(Login_Data, navigation));
        // setAllBookedStudent(All_Booked_Student);
        setLoader(false);
      }, 5000);
    }

    navigation.navigate("MyBookingTutor");

    // valueR === "Accept"
    // ? navigation.navigate("StartDT")
    // : navigation.navigate("MyBookings")
  };

  const GoToAccept = () => {
    setLoader(true);
    setTimeout(() => {
      dispatch(
        OfferStatus(
          route.params.BookingId,
          "Accept",
          "Non Negotiable",
          navigation
        )
      );
      dispatch(GetBookedStudentList(Login_Data, navigation));
      // setAllBookedStudent(All_Booked_Student);
      setLoader(false);
    }, 5000);
  };
  if (loader) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          style={{
            alignSelf: "center",
          }}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.Headers}>
          <View style={styles.HeadLeft}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../../Assets/baricon.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HeadRight}>
            <Image
              source={require("../../Assets/bell.png")}
              style={styles.icons}
            />
            <Image
              source={require("../../Assets/search.png")}
              style={styles.icons}
            />
            <Image
              source={require("../../Assets/chat.png")}
              style={styles.icons}
            />
          </View>
        </View>
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderText}>Let's Book!</Text>
        </View>
        <View style={styles.Container}>
          <View style={styles.LeftImageContainer}>
            <Image
              source={require("../../Assets/user.png")}
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
              height: 50,
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
              <Text style={styles.BookText2}>Tutor has made a new offer</Text>
            </Text>
          </View>

          <ScrollView style={{ marginBottom: 20 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
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
                  source={require("../../Assets/Dollar.png")}
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
                  Client's Offer
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
                  {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_student ==
                  "0.00" ? (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                    >
                      SGD{" "}
                      {All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                    >
                      SGD{" "}
                      {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_student}
                    </Text>
                  )}

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

                {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_student ==
                "0.00" ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2F5597",
                      fontSize: 14,
                      marginTop: wp(3),
                    }}
                  >
                    {value}
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2F5597",
                      fontSize: 14,
                      marginTop: wp(3),
                    }}
                  >
                    Non Negotiable
                  </Text>
                )}
              </View>

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
                  source={require("../../Assets/Dollar.png")}
                  style={styles.Dollaricons}
                />
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: "center",
                    fontWeight: "700",
                    color: "green",
                  }}
                >
                  Your Offer
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    height: 50,
                    backgroundColor: "green",
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

                  {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor ==
                  "0.00" ? (
                    <TextInput
                      style={{
                        height: 40,
                        backgroundColor: "red",
                        width: 50,
                        color: "#fff",
                        fontSize: 18,
                        marginRight: 4,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                      keyboardType="numeric"
                      value={offerAmount}
                      onChangeText={(text) => setofferAmount(text)}
                      placeholderTextColor="#fff"
                      placeholder="0.00"
                    />
                  ) : (
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                    >
                      {" " +
                        All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor}
                    </Text>
                  )}

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
                    color: "green",
                    fontSize: 14,
                    marginTop: wp(3),
                  }}
                >
                  {value}
                </Text>
              </View>
            </View>

            {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor == "0.00" ? (
              <RadioButton.Group
                onValueChange={(value) => setValueR(value)}
                value={valueR}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}
                >
                  <View style={styles.radioBtn}>
                    <Text style={{ color: "#2F5597", marginTop: 7 }}>
                      Accept
                    </Text>
                    <RadioButton value="Accept" />
                  </View>
                  <View style={styles.radioBtn}>
                    <Text style={{ color: "#2F5597", marginTop: 7 }}>
                      Negotiate
                    </Text>
                    <RadioButton value="Negotiate" />
                  </View>
                </View>
              </RadioButton.Group>
            ) : (
              <View />
            )}

            {All_Booked_Tutor_Detail[0]?.offer_status == "Accept" &&
            All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor == "0.00" ? (
              <View
                style={{
                  marginTop: wp(5),
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
                    fontSize: 16,
                    fontWeight: "500",
                    margin: 10,
                    textAlign: "center",
                  }}
                >
                  Agreed Fee is SGD{" "}
                  {All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount} /hour
                </Text>
              </View>
            ) : All_Booked_Tutor_Detail[0]?.offer_status == "Accept" &&
              All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor !=
                "0.00" ? (
              <View
                style={{
                  marginTop: wp(5),
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
                    fontSize: 16,
                    fontWeight: "500",
                    margin: 10,
                    textAlign: "center",
                  }}
                >
                  Agreed Fee is SGD{" "}
                  {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_tutor} /hour
                </Text>
              </View>
            ) : (
              <Text>ff</Text>
            )}
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

            {All_Booked_Tutor_Detail[0]?.amount_negotiate_by_student ==
            "0.00" ? (
              <TouchableOpacity
                disabled={valueR === "" ? true : false}
                onPress={() => GoToNext()}
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: valueR === "" ? "#fff" : "#F6BE00",
                  borderRadius: 3,
                }}
              >
                <Text style={styles.infoText1}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => GoToAccept()}
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F6BE00",
                  borderRadius: 3,
                }}
              >
                <Text style={styles.infoText1}>Accept</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default TutorAcceptNegotiate;
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
  radioBtn: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 18,
    paddingHorizontal: 20,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
});
