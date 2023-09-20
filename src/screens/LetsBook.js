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
import { Tution_Type } from "../Redux/Actions/types";

console.log(Tution_Type, "Tution_TypeTution_TypeTution_TypeTution_Type");

const LetsBook = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const [tuition_type, setTuitionType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const data = route.params.data;
  console.log("🚀 ~ file: LetsBook.js ~ line 40 ~ LetsBook ~ data", data);

  const data1 = [
    { label: "Home Tution", value: "Home Tution" },
    { label: "Online Tution", value: "Online Tution" },
    { label: "Home Work", value: "Home Work" },
  ];
  //   const renderLabel = () => {
  //     if (value || isFocus) {
  //       return (
  //         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
  //           Dropdown label
  //         </Text>
  //       );
  //     }
  //     return null;
  //   };
  const GoTONext = () => {
    navigation.navigate("StudentBookingInfo", {
      data: data,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <View
        style={{ height: 30, width: "90%", alignSelf: "center", marginTop: 30 }}
      >
        <Text style={{ fontSize: 20, color: "#2F5597", fontWeight: "bold" }}>
          Let's Book!
        </Text>
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
            <Text style={styles.infoText}>{data.tutor_code}</Text>
          </View>
          <View style={{ height: 30, width: 200 }}>
            <Text style={styles.infoText}>{data.name_of_school}</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 20, width: "90%", alignSelf: "center" }}>
        <View style={{ width: 40, marginLeft: 5 }}>
          <StarRating
            fullStarColor="orange"
            disabled={false}
            maxStars={5}
            rating={data.Average_rating}
            starSize={15}
            // selectedStar={(rating) => setStrCount(rating)}
          />
        </View>
      </View>
      <View style={[styles.cardLeft, styles.shadowPropLeft]}>
        <Text style={styles.infoText1}>
          Step 1 of 5: Booking Information required.....
        </Text>
      </View>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 50,
            width: "100%",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Text style={styles.BookText1}>Select Tuition Type</Text>
          <View style={{ position: "absolute", right: 10 }}>
            <Image
              source={require("../Assets/TutionType.png")}
              style={styles.TypeImage}
            />
          </View>
        </View>
        <View
          style={{
            height: "80%",
            width: "100%",
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <View style={{ height: 100, width: "30%" }}>
            <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>
              Tution Type :
            </Text>
          </View>

          <View style={{ height: 100, width: "60%" }}>
            {/* {renderLabel()} */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "black" }]}
              placeholderStyle={{ fontSize: 16, color: "black" }}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{ color: "black" }}
              iconStyle={styles.iconStyle}
              data={data1}
              labelField="label"
              valueField="value"
              allowFontScaling={false}
              //   maxHeight={100}
              placeholder={!isFocus ? " Tution Type: " : "..."}
              value={tuition_type}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setTuitionType(item.label);
                setIsFocus(false);
              }}
            />
            {/* // {console.log("Tution TYpe=" + tuition_type)} */}
          </View>
        </View>
        <View
          style={{
            height: "10%",
            width: "100%",
            position: "absolute",
            bottom: 5,
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: "100%",
              width: "40%",
              backgroundColor: "#C0C0C0",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <Text style={styles.BookText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => GoTONext()}
            style={{
              height: "100%",
              width: "40%",
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
export default LetsBook;

const styles = StyleSheet.create({
  leftImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  TypeImage: {
    width: 30,
    height: 30,
    marginTop: 5,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  infoText: {
    fontSize: 15,
    color: "black",
  },
  infoText1: {
    fontSize: 15,
    color: "black",
    alignSelf: "center",
    fontWeight: "700",
  },
  BookText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    fontWeight: "700",
  },
  BookText1: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
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
    elevation: 10,
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
    elevation: 10,
  },
  dropdown: {
    height: 20,
    width: "70%",
    borderColor: "black",
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
    marginTop: 10,
    color: "black",
    // marginLeft:10
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
