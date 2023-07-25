import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Button,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { Dropdown } from "react-native-element-dropdown";
import { Student_Detail } from "../../../Redux/Actions/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
//import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../../../common/Loader";
var selectArray = [];
var selectFilter = [];

const StudentBooking = (props) => {
  console.log(props.postalcode, "KKKKKKKKKKKKKKKKKKK");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  console.log("@@@@@@", value);
  console.log(">>>>>>", value2);
  // console.log("!!!!!", value1);
  console.log("!!!!!", selectFilter);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [selectedlevel, setSelectedlevel] = useState([]);

  const data1 = [
    { label: "Pre-School", value: "Pre-School" },
    { label: "Primary", value: "Primary" },
    { label: "Secondary", value: "Secondary" },
    { label: "AEIS", value: "AEIS" },
    { label: "JC/Pre-U", value: "JC/Pre-U" },
    { label: "IB (Diploma)", value: "IB (Diploma)" },
    {
      label: "International School (Grade 1 to 6)",
      value: "International School (Grade 1 to 6)",
    },
    {
      label: "International School (Grade 7 to 10)",
      value: "International School (Grade 7 to 10)",
    },
    {
      label: "International School (Grade 11, 12, 13)",
      value: "International School (Grade 11, 12, 13)",
    },
    { label: "ITE", value: "ITE" },
    { label: "Polytechnic", value: "Polytechnic" },
    { label: "University", value: "University" },
    { label: "Entrance Exams", value: "Entrance Exams" },
    { label: "Foreign Languages", value: "Foreign Languages" },
    { label: "Music", value: "Music" },
    { label: "Computing", value: "Computing" },
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

  const onSelectedlevel = (selectedItemslevel) => {
    // Set Selected Items

    createlevel(selectedItemslevel);
    setSelectedlevel(selectedItemslevel);
    // console.log('Level', selectedlevel)
  };
  const subjectdata = [
    // { label: "Select one or more", value: "Select one or more" },
    { label: "English", value: "English" },
    { label: "Business Studies", value: "Business Studies" },
    { label: "Math", value: "Math" },
  ];
  const subjects = [
    { label1: "English", value1: "English" },
    { label1: "Math", value1: "Math" },
    { label1: "Science", value1: "Science" },
    { label1: "Chinese", value1: "Chinese" },
    { label1: "Economics", value1: "Economics" },
  ];

  const grade_list = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label2: "P1", value2: "P1" },
    { label2: "P2", value2: "P2" },
    { label2: "P3", value2: "P3" },
  ];

  const createlevel = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["subject"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "subject", obj3.subject)) {
        selectFilter.push(obj3);

        // dispatch(GetfilterQualification(route.params.postalcode, route.params.tuition_type, Gender, Status, selectFilter))
      } else {
        RemoveTempExercise(selectFilter, "subject", obj3.subject);
      }
    }
    console.log("subjectss????????????????", selectFilter);
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

  const GoTONext = () => {
    let obj = {
      Level: value,
      Grade: value2,
      Subjects: selectFilter,
    };

    console.log(obj, "GGGGGGGGGGGGGGGGGG");

    dispatch({
      type: Student_Detail,
      payload: obj,
    });
    navigation.navigate("StudentBooking", {
      // value: value,
      // value1: value1,
      // value2: value2,
      // data: data,
    });
  };

  return (
    // <View style={styles.container}>
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 40,
            width: "100%",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Text style={styles.BookText1}>Student's Details</Text>
          <View style={{ position: "absolute", right: 10 }}>
            <Image
              source={require("../../../Assets/TutionType.png")}
              style={styles.TypeImage}
            />
          </View>
        </View>
        <View style={{ height: 40, width: "93%", alignSelf: "center" }}>
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
          {/* <View style={{ flexDirection: "row", height: "15%", width: "100%" }}> */}
          <View style={styles.DetailContainer}>
            <View style={{ height: 100, width: "30%" }}>
              <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>
                Level :
              </Text>
            </View>
            <View style={{ height: 100, width: "60%" }}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                placeholderStyle={{ fontSize: 12 }}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey", fontSize: 12 }}
                data={data1}
                labelField="label"
                valueField="value"
                allowFontScaling={false}
                placeholder={!isFocus ? " " : "..."}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>

          <View style={styles.DetailContainer}>
            <View style={{ height: 100, width: "30%" }}>
              <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>
                Grade :
              </Text>
            </View>
            <View style={{ height: 100, width: "60%" }}>
              <Dropdown
                style={[styles.dropdown, isFocus2 && { borderColor: "black" }]}
                placeholderStyle={{ fontSize: 12 }}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey", fontSize: 12 }}
                data={grade_list}
                labelField="label2"
                valueField="value2"
                allowFontScaling={false}
                placeholder={!isFocus2 ? " " : "..."}
                value={value2}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                  setValue2(item.value2);
                  setIsFocus2(false);
                }}
              />
            </View>
          </View>

          <View style={styles.DetailContainer}>
            <View style={{ height: 100, width: "30%" }}>
              <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>
                Subjects :
              </Text>
            </View>
            <View style={styles.SelectMoreContainer}>
              {/* <Dropdown
                style={[styles.dropdown, isFocus1 && { borderColor: "black" }]}
                placeholderStyle={{ fontSize: 12 }}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ color: "grey", fontSize: 12 }}
                data={subjects}
                labelField="label1"
                valueField="value1"
                allowFontScaling={false}
                placeholder={!isFocus1 ? " " : "..."}
                value={value1}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={(item) => {
                  setValue1(item.value1);
                  setIsFocus1(false);
                }}
              /> */}
              {/* <View style={styles.SelectMoreContainer}> */}
              <MultiSelect
                items={subjectdata}
                uniqueKey="label"
                onSelectedItemsChange={onSelectedlevel}
                selectedItems={selectedlevel}
                //  selectText="Select one or more"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log("SSSSSSSSSSSSSS", text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#000"
                styleTextTag={{ fontSize: 12 }}
                selectedItemTextColor="red"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                itemFontSize={12}
                fontSize={14}
                displayKey="label"
                searchInputStyle={{ color: "#CCC", fontSize: 12 }}
                styleRowList={{ width: "90%" }}
                // submitButtonColor="#000"
                //submitButtonText="Submit"
                styleDropdownMenu={{ backgroundColor: "red" }}
                hideSubmitButton
                styleItemsContainer={{}}
              />
              {/* </View> */}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => GoTONext()}
            style={{
              height: 35,
              width: 100,
              backgroundColor: "#F6BE00",
              marginTop: 20,
              alignSelf: "flex-end",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              bottom: 10,
              right: 10,
              position: "absolute",
              //   right: -230,
            }}
          >
            <Text style={styles.ButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // </View>
  );
};

export default StudentBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // backgroundColor: 'pink',
    // padding: 10,
  },
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
  DetailContainer: {
    flexDirection: "row",
    height: "20%",
    width: "100%",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  SelectMoreContainer: {
    // height: 150,
    width: "60%",
    flex: 1,
  },
  HeadRight: {
    width: wp(45),
    height: hp(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
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
  BookText2: {
    fontSize: 12,
    color: "white",
    // fontWeight:"bold",
    color: "grey",
  },
  ButtonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
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
  Bookcard: {
    //height: "60%",
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
  dropdown: {
    height: 20,
    width: "70%",
    borderColor: "black",
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
    marginTop: 10,
    // marginLeft:10
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
