import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
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
import { Tutor_Qualification } from "../Redux/Actions/types";

var selectArray = [];
var selectFilter = [];

const TutorQualification = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const [offerAmount, setofferAmount] = useState("");
  const [value2, setValue2] = useState(null);
  const [value1, setValue1] = useState(null);
  // console.log("@@@@@@", value);

  // console.log("!!!!!", value1);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [feeOffer, setFeeOffer] = useState(false);

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Place Offer",
      value: "Non Negotiable",
    },
    {
      id: "2",
      label: "Negotiable",
      value: "Negotiable",
    },
  ]);

  const onPressRadioButton = (radioButtonsArray) => {
    console.log("PKKKKKKKKKKKKKKK", radioButtonsArray);
    var selection = radioButtonsArray[0].selected;
    // setRadioButtons(radioButtonsArray);
    console.log("PK+++++++++++++++++++++K", selection);
    if (selection == true) {
      setFeeOffer("Non Negotiable");
    } else {
      setFeeOffer("Negotiable");
    }
  };

  console.log(feeOffer, ">>>>>>>>>>>>>feeoffer");
  console.log(">>>>>>", value2, value1, feeOffer, offerAmount);
  const data = [
    { label: "A Level", value: "A Level", id: 1 },
    { label: "IB (Diploma)", value: "IB (Diploma)", id: 2 },
    { label: "Polytechnic Diploma", value: "Polytechnic Diploma", id: 3 },
    {
      label: "University Undergraduate",
      value: "University Undergraduate",
      id: 3,
    },
    { label: "University Graduate", value: "University Graduate", id: 4 },
    { label: "Ex School Teacher", value: "Ex School Teacher", id: 5 },
    { label: "Current School Teacher", value: "Current School Teacher", id: 6 },
  ];
  const frequency = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label2: "1 Lesson a week", value: "1 Lesson a week" },
    { label2: "2 Lesson a week", value: "2 Lesson a week" },
    { label2: "3 Lesson a week", value: "3 Lesson a week" },
    { label2: "4 Lesson a week", value: "4 Lesson a week" },
    { label2: "5 Lesson a week", value: "5 Lesson a week" },
    { label2: "6 Lesson a week", value: "6 Lesson a week" },
    { label2: "7 Lesson a week", value: "7 Lesson a week" },
  ];

  const duration = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label2: "1.5 hr each lesson", value: "1.5 hr each lesson" },
    { label2: "2 hr each lesson", value: "2 hr each lesson" },
    { label2: "2.5 hr each lesson", value: "2.5 hr each lesson" },
    { label2: "3 hr each lesson", value: "3 hr each lesson" },
    { label2: "3.5 hr each lesson", value: "3.5 hr each lesson" },
  ];

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

  const createlevel = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["qualification"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "qualification", obj3.qualification)) {
        selectFilter.push(obj3);

        // dispatch(GetfilterQualification(route.params.postalcode, route.params.tuition_type, Gender, Status, selectFilter))
      } else {
        RemoveTempExercise(selectFilter, "qualification", obj3.qualification);
      }
    }
    console.log("qualification????????????????", selectFilter);
  };

  const GoToNext = () => {
    console.log(">>>>>>", value2, value1, feeOffer, offerAmount);

    let obj = {
      TutorQualification: selectFilter,
      frequency: value2,
      duration: value1,
      feetype: feeOffer,
      FeeOffer: offerAmount,
    };

    dispatch({
      type: Tutor_Qualification,
      payload: obj,
    });

    console.log(obj, "Final DATAAAAAAAAAAAA");

    navigation.navigate("TutionSchedulePicker");
  };

  useEffect(() => {
    // console.log(route.params.postalcode, route.params.tuition_type)
    // dispatch(GetAllTutors())
    setUserdata(GET_FILTER_DATA);
    setPostaldata(GET_POSTAL_DATA);
    console.log(
      "🚀 ~ file: OurTutor.js ~ line 506 ~ useEffect ~ GET_POSTAL_DATA",
      GET_POSTAL_DATA
    );
  }, []);

  return (
    <KeyboardAvoidingView
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    // style={styles.Feecontainer}
    >
      <ScrollView>
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
            <Image
              source={require("../Assets/bell.png")}
              style={styles.icons}
            />
            <Image
              source={require("../Assets/search.png")}
              style={styles.icons}
            />
            <Image
              source={require("../Assets/chat.png")}
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
            <Text style={styles.BookText1}>Tutor's Qualification</Text>
            <View style={{ position: "absolute", right: 10 }}>
              <Image
                source={require("../Assets/Qualification.png")}
                style={styles.TypeImage}
              />
            </View>
          </View>
          <View style={{ height: 20, width: "93%", alignSelf: "center" }}>
            <Text style={styles.BookText2}>you may select more than one</Text>
          </View>
          <View style={styles.SelectMoreContainer}>
            <MultiSelect
              items={data}
              uniqueKey="label"
              onSelectedItemsChange={onSelectedlevel}
              selectedItems={selectedlevel}
              selectText="Select one or more"
              // searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log("SSSSSSSSSSSSSS", text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="label"
              searchInputStyle={{ color: "#CCC" }}
              styleRowList={{ width: "90%", borderRadius: 20 }}
              // submitButtonColor="#000"
              //submitButtonText="Submit"
              styleDropdownMenu={{ backgroundColor: "red" }}
              hideSubmitButton
              styleItemsContainer={{
                height: 100,
              }}
            />
          </View>
          <View style={[styles.cardFrequency, styles.shadowPropFrequency]}>
            <Text style={styles.BookText1}>Frequency & Duration</Text>
            <View style={{ position: "absolute", right: 10 }}>
              <Image
                source={require("../Assets/Duration.png")}
                style={styles.TypeImage}
              />
            </View>
            <View
              style={{
                height: 40,
                width: "100%",
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.FrequencyDropdown}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus2 && { borderColor: "black" },
                  ]}
                  placeholderStyle={{
                    fontSize: 12,
                    color: "#fff",
                    textAlign: "center",
                  }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{ color: "grey", fontSize: 12 }}
                  data={frequency}
                  labelField="label2"
                  valueField="value"
                  allowFontScaling={false}
                  placeholder={
                    !isFocus2 ? "Select Frequency" : "Select Frequency"
                  }
                  value={value2}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={(item) => {
                    setValue2(item.value);
                    setIsFocus2(false);
                  }}
                />
                {/* <Text style={styles.DropdownText}>First Lesson a week</Text> */}
                {/* <View>
                <Image
                  source={require("../Assets/downbutton.png")}
                  style={styles.DropdownImage}
                />
              </View> */}
              </View>
              <View style={styles.FrequencyDropdown}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus2 && { borderColor: "black" },
                  ]}
                  placeholderStyle={{
                    fontSize: 12,
                    color: "#fff",
                    textAlign: "center",
                  }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{ color: "grey", fontSize: 12 }}
                  data={duration}
                  labelField="label2"
                  valueField="value"
                  allowFontScaling={false}
                  placeholder={
                    !isFocus2 ? " Select Duration " : "Select Duration"
                  }
                  value={value1}
                  onFocus={() => setIsFocus1(true)}
                  onBlur={() => setIsFocus1(false)}
                  onChange={(item) => {
                    setValue1(item.value);
                    setIsFocus1(false);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={[styles.TuitionFrequency, styles.shadowPropFrequency]}>
            <Text style={styles.BookText1}>Tution Fee Offer</Text>
            <View style={{ position: "absolute", right: 10 }}>
              <Image
                source={require("../Assets/Dollar.png")}
                style={styles.TypeImage}
              />
            </View>

            <View
              style={{
                height: 40,
                width: "100%",
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout="row"
              />
            </View>
            {/* {feeOffer == "Place Offer" ? ( */}
            <View
              style={{
                flexDirection: "row",
                height: 50,
                borderWidth: 0.5,
                // backgroundColor: "#2F5597",
                // marginTop: wp(5),
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                SGD
              </Text>

              <TextInput
                style={{
                  height: 50,
                  backgroundColor: "lightgrey",
                  width: 60,
                  color: "#000",
                  fontSize: 18,
                  marginRight: 4,
                  marginLeft: 4,
                  fontWeight: "500",
                  justifyContent: "center",
                  paddingTop: 5,
                  justifyContent: "center",
                  paddingLeft: 10,
                }}
                keyboardType="numeric"
                value={offerAmount}
                onChangeText={(text) => setofferAmount(text)}
                placeholderTextColor="#fff"
                placeholder="0.00"
              />
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                / hour
              </Text>
            </View>
            {/* ) : (
              <View />
            )} */}
          </View>

          <View
            style={{
              height: "10%",
              width: "100%",
              //position: "absolute",
              // bottom: 5,
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
              onPress={
                () => GoToNext()
                // navigation.navigate("BookingInformationConfirmation")
              }
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default TutorQualification;
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
  Feecontainer: {
    flex: 1,
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
    height: 150,
    width: "100%",
    alignSelf: "center",

    backgroundColor: "white",
  },
  dropdown: {
    height: 30,
    width: "100%",
    //borderColor: "black",
    // borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 15,
    //marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#2F5597",
  },
  selectedTextStyle: {
    fontSize: 12,
    color: "#fff",

    textAlign: "center",
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
  TuitionFrequency: {
    height: 150,
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
    fontSize: 12,
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
});
