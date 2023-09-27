import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
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
import {
  GetBookedStudentList,
  GetBookedTutorDetail,
} from "../../Redux/Actions/TutorBooking";
import moment from "moment";
import { OfferStatus } from "../../Redux/Actions/TutorBooking";
var selectArray = [];
var selectFilter = [];

const TutorAcceptCancel = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [offerAmount, setofferAmount] = useState(0);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { Tutor_Qualification } = useSelector((state) => state.TutorReducer);
  const { Booking_Detail } = useSelector((state) => state.TutorBooingReducer);
  const [allBookedStudent, setAllBookedStudent] = useState([]);
  const [loader, setLoader] = React.useState(false);

  const { All_Booked_Student } = useSelector(
    (state) => state.TutorBooingReducer
  );
  const { All_Booked_Tutor_Detail } = useSelector(
    (state) => state.TutorBooingReducer
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

  useEffect(() => {
    let obj = {
      tutorId: All_Booked_Tutor_Detail[0]?.tutor_id,
      BookingId: route.params.BookingId,
    };

    dispatch(GetBookedTutorDetail(obj, navigation));
  }, []);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [All_Booked_Tutor_Detail]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      let obj = {
        tutorId: All_Booked_Tutor_Detail[0]?.tutor_id,
        BookingId: route.params.BookingId,
      };

      dispatch(GetBookedTutorDetail(obj, navigation));
    });

    return unsubscribe;
  }, [navigation, All_Booked_Tutor_Detail]);

  const TutorAcceptCancel = (Offerstatus) => {
    setLoader(true);
    let obj = {
      tutorId: All_Booked_Tutor_Detail[0]?.tutor_id,
      BookingId: route.params.BookingId,
    };
    setTimeout(() => {
      dispatch(
        OfferStatus(
          route.params.BookingId,
          Offerstatus,
          All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount_type,
          route.params.tutorId,
          navigation
        )
      );

      dispatch(GetBookedTutorDetail(obj, navigation));

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
              {sendOffer == 0 ? (
                <Text style={styles.BookText2}>
                  Please offer the Tutor a fee.If fee is Non-negotiable,tutor
                  can only accept or cancel this bookingwwww
                </Text>
              ) : (
                <Text style={styles.BookText2}>
                  You have place an offer.Tutor will be informed.you will be
                  recieve an app notification when the tutor has responded
                </Text>
              )}
            </Text>
          </View>

          <ScrollView style={{ marginBottom: 20 }}>
            <View
              style={{
                height: wp(50),
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
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                >
                  SGD {All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount}
                </Text>

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
                {All_Booked_Tutor_Detail[0]?.tutor_tution_offer_amount_type}
              </Text>
            </View>
            {All_Booked_Tutor_Detail[0]?.offer_status == "Accept" ? (
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
            ) : (
              <View />
            )}
          </ScrollView>
          <View
            style={{
              height: "10%",
              width: "100%",
              position: "absolute",
              bottom: -25,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => TutorAcceptCancel("Cancel")}
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

            {All_Booked_Tutor_Detail[0]?.offer_status == "Accept" ? (
              <TouchableOpacity
                // onPress={() => TutorAcceptCancel("Accept")}
                //  onPress={() => navigation.navigate("MakeOffer")}
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: 3,
                }}
              >
                <Text style={styles.infoText1}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => TutorAcceptCancel("Accept")}
                //  onPress={() => navigation.navigate("MakeOffer")}
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
export default TutorAcceptCancel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    // backgroundColor:'pink'
  },

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
