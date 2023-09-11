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
import StudentDetailComponent from "./StudentDetailComponent";
import {
  getLevelList,
  getGradeList,
  getSubjectList,
} from "../../../Redux/Actions/Tutors";

import { Loader } from "../../../../../../common/Loader";
import StudentDetail from "../StudentDetail";
var selectArray = [];
var selectFilter = [];
var SelectDetail = [];

const StudentBookingComponent = (props) => {
  const dispatch = useDispatch();
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

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [moredetail, setMoreDetail] = useState("showSection");
  const [selectedlevel, setSelectedlevel] = useState([]);
  const [records, setRecords] = useState(selectArray);

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const { LEVEL_LIST } = useSelector((state) => state.TutorReducer);
  const { SUBJECT_LIST } = useSelector((state) => state.TutorReducer);

  const { GRADE_LIST } = useSelector((state) => state.TutorReducer);

  console.log("@@@@@@", value);
  // console.log(">>>>>>", value2);
  console.log(LEVEL_LIST?.Level_list, "LEVEL_LIST-REDUX");
  console.log(SUBJECT_LIST, "SUBJECT_LIST");

  const AddMoreDetail = () => {
    setMoreDetail("showSection");
    setValue("");
    setValue2("");
    setSelectedlevel("");
  };

  const GoToNext = () => {
    console.log(records, "QQQQQQQQQQQQQQQQQQQ");
    obj = {
      Student_Data: records,
      // Level: value,
      // Grade: value2,
      // Subjects: selectFilter,
    };

    console.log(obj, "GGGGGGGGGGGGGGGGGG");

    dispatch({
      type: Student_Detail,
      payload: obj,
    });
    navigation.navigate("PostTutorQualification", {
      // value: value,
      // value1: value1,
      // value2: value2,
      // data: data,
    });
  };

  // const GoToNext = () => {
  //   navigation.navigate("PostTutorQualification");
  // };

  const ClickOnDone = () => {
    setMoreDetail("AddDataIn");

    console.log(value, value2, selectedlevel, "LLLLLLLLLLLLLLLLLLLLL");

    const obj3 = [];

    setCount(count + 1);

    console.log(obj3, "AAAAA");

    var item1 = {};
    item1["Id"] = count;
    item1["Level"] = value;
    item1["Grade"] = value2;
    item1["ALL_Subjects"] = selectedlevel;

    if (!isExistInArray(selectArray, "Level", item1.Level)) {
      records.push(item1);
    } else {
      RemoveTempExercise(selectArray, "Level", item1.Level);
    }
  };

  console.log(records, "Final Dataaaaaaa");
  console.log(selectArray, "Final seconds");

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

  const deleteRecord = (idToDelete) => {
    const updatedRecords = records.filter((record) => record.Id !== idToDelete);
    console.log(updatedRecords, "AAAAAAAAAAAA");
    setRecords(updatedRecords);
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
        obj3["subject"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "subject", obj3.subject)) {
        selectFilter.push(obj3);

        // dispatch(GetfilterQualification(route.params.postalcode, route.params.tuition_type, Gender, Status, selectFilter))
      }

      // else {
      //   RemoveTempExercise(selectFilter, "subject", obj3.subject);
      // }
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
  let obj = {};

  // console.log(SelectDetail, "SelectDetailSelectDetailSelectDetailSelectDetail");
  useEffect(() => {
    selectArray = [];
    dispatch(getLevelList());
  }, []);
  useEffect(() => {
    dispatch(getGradeList(value));
  }, [value]);
  console.log(GRADE_LIST, "GRADE_LIST-REDUX");

  useEffect(() => {
    dispatch(getSubjectList(value));
  }, [value]);
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
              source={require("../../../Assets/Student.png")}
              style={styles.TypeImage}
            />
          </View>
        </View>
        <View style={{ height: 40, width: "93%", alignSelf: "center" }}>
          <Text style={styles.BookText2}>
            you can add multiple student's details.One at a time...
          </Text>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View
            style={{
              height: "80%",
              width: "100%",
              padding: 10,
              // backgroundColor: "#fff",
            }}
          >
            {records.map((item) => (
              <View>
                <View
                  key={item.Id}
                  style={{
                    height: 90,
                    width: "100%",
                    // paddingHorizontal: 10,
                    flexDirection: "row",
                    marginBottom: 15,
                    elevation: 2,
                    backgroundColor: "#fff",
                  }}
                >
                  <View
                    style={{
                      height: 90,
                      width: "10%",
                      backgroundColor: "purple",
                      elevation: 3,
                    }}
                  ></View>
                  <View style={{ height: 100, width: "80%" }}>
                    <Text style={styles.Information}>{item.Level}</Text>
                    <Text style={styles.Information}>{item.Grade}</Text>
                    <Text style={styles.Information}>
                      {item.ALL_Subjects + " "}
                    </Text>
                    {/* {item.ALL_Subjects.map((subject, index) => (
                     <Text style={{ flexDirection: "row" }} key={index}>
                       {subject}
                     </Text>
                   ))} */}

                    {/* {item.Subjects &&
                     Student_Detail.Subjects.map((item) => {
                       return (
                         <Text key={item} style={styles.Information}>
                           {item.subject}
                         </Text>
                       );
                     })} */}
                    {/* {Student_Detail.Subjects &&
                     Student_Detail.Subjects.map((item) => {
                       return (
                         <Text key={item} style={styles.Information}>
                           {item.subject}
                         </Text>
                       );
                     })} */}
                    <Text style={styles.Information}></Text>
                  </View>
                  <View style={{ height: 80, width: "10%" }}>
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../../../Assets/Edit.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteRecord(item.Id)}
                      style={{
                        height: 40,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image source={require("../../../Assets/Deletes.png")} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <Text
                 style={{ color: "#2F5597" }}
                 ellipsizeMode="clip"
                 numberOfLines={1}
               >
                 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                 - - -
               </Text> */}
              </View>
            ))}

            {moredetail == "AddDataIn" ? (
              <TouchableOpacity
                style={{ height: 30, width: "100%" }}
                onPress={() => {
                  AddMoreDetail();
                }}
              >
                <Image
                  source={require("../../../Assets/Plus.png")}
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                    right: 15,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {moredetail == "showSection" || records == [] ? (
              <View
                style={{
                  height: "80%",
                  width: "100%",
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <View style={styles.DetailContainer}>
                  <View style={{ height: 100, width: "30%" }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        color: "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Level :
                    </Text>
                  </View>
                  <View style={{ width: "60%" }}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "black" },
                      ]}
                      placeholderStyle={{ fontSize: 12 }}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={{ color: "grey", fontSize: 12 }}
                      data={LEVEL_LIST?.Level_list}
                      labelField="school_level_name"
                      valueField="school_level_name"
                      allowFontScaling={false}
                      placeholder={!isFocus ? " " : "..."}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.school_level_name);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.DetailContainer}>
                  <View style={{ height: 100, width: "30%" }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        color: "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Grade :
                    </Text>
                  </View>
                  <View style={{ width: "60%" }}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus2 && { borderColor: "black" },
                      ]}
                      placeholderStyle={{ fontSize: 12 }}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={{ color: "grey", fontSize: 12 }}
                      data={GRADE_LIST?.Grade_List}
                      labelField="grade_name"
                      valueField="grade_name"
                      allowFontScaling={false}
                      placeholder={!isFocus2 ? " " : "..."}
                      value={value2}
                      onFocus={() => setIsFocus2(true)}
                      onBlur={() => setIsFocus2(false)}
                      onChange={(item) => {
                        setValue2(item.grade_name);
                        setIsFocus2(false);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.DetailContainer}>
                  <View style={{ height: 100, width: "30%" }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,
                        color: "black",
                        fontFamily: "Poppins-Regular",
                      }}
                    >
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
                      items={SUBJECT_LIST?.Subject_List}
                      uniqueKey="subjects_name"
                      onSelectedItemsChange={onSelectedlevel}
                      selectedItems={selectedlevel}
                      //  selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#000"
                      styleTextTag={{ fontSize: 12 }}
                      selectedItemTextColor="red"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      itemFontSize={12}
                      fontSize={14}
                      displayKey="subjects_name"
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
                  onPress={() => ClickOnDone()}
                  style={{
                    height: 35,
                    width: 100,
                    backgroundColor: "#F6BE00",

                    alignSelf: "flex-end",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    bottom: 0,
                    right: 10,
                    position: "absolute",
                    //   right: -230,
                  }}
                >
                  <Text style={styles.ButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity style={styles.circleArrow} onPress={() => GoToNext()}>
          <Image source={require("../../../Assets/circleArrow.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    // </View>
  );
};

export default StudentBookingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // backgroundColor: 'pink',
    // padding: 10,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: "#000",
  },
  DetailContainer: {
    flexDirection: "row",
    height: "20%",
    width: "100%",
  },
  circleArrow: {
    flex: 0.1,
    marginTop: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
  },
  SelectMoreContainer: {
    // height: 150,
    width: "100%",
    flex: 1,
    alignSelf: "center",
  },
  dropdown: {
    //  height: 100,
    // width: "70%",
    borderColor: "black",
    // borderWidth: 0.5,
    // borderRadius: 8,
    // paddingHorizontal: 8,
    marginTop: 10,
    color: "black",
    // marginLeft:10
  },
  ButtonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
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
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  HeadRight: {
    width: wp(45),
    height: hp(10),
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
  leftImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
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
    color: "grey",
    fontFamily: "Poppins-SemiBold",
  },
  TypeImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  BookText2: {
    // fontWeight:"bold",
    fontSize: 12,
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  Information: {
    color: "black",
    marginTop: 5,
    marginLeft: 10,
    fontFamily: "Poppons-Regular",
  },
  InfoImage: {},
  BookText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    fontWeight: "700",
  },
});
