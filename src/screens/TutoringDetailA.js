import React, { component, useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
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
// import MultiSelect from 'react-native-multiple-select';
import MultiSelect from "react-native-multiple-select";
import { set } from "immer/dist/internal";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../Redux/Actions/Tutors";

import { Tutoring_Data } from "../Redux/Actions/types";
import { getLevelList, getGradeList, getSubjectList } from "../Redux/Actions/Tutors";

var selectArray = [];
var gradeArray = [];
const TutoringDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { LEVEL_LIST } = useSelector((state) => state.TutorReducer);
  const { SUBJECT_LIST } = useSelector((state) => state.TutorReducer);
  const { GRADE_LIST } = useSelector((state) => state.TutorReducer);
  const [tutoring, setTutoring] = useState("");
  const [P1, setP1] = useState("");
  const [P2, setP2] = useState("");
  const [P3, setP3] = useState("");
  const [P4, setP4] = useState("");
  const [P5, setP5] = useState("");
  const [P6, setP6] = useState("");

  const [grade, setGrade] = useState([]);
  const [gradeList, setGradeList] = useState()
  const [SecondarygradeList, setSecondaryGradeList] = useState()
  console.log(gradeList, "gradeList");
  console.log(SecondarygradeList, "SecondarygradeList");

  console.log(grade, "gradeJK");
  console.log(gradeArray, 'gradeArray')
  console.log(GRADE_LIST, 'GRADE-HIM')
  console.log(SUBJECT_LIST, 'SUBJECT_LIST')

  const AddQualification = (val) => {
    if (P1 == val) {
      setSelectListTutor("");

      var item1 = {};
      item1["tutor_qualification_Subject"] = val;
      //  item1["Tutoring_Level"] = "Primary";
      // item1["Tutoring_Stream"] = "AEIS";

      RemoveTempExercise(
        selectArray,
        "tutor_qualification_Subject",
        item1.tutor_qualification_Subject
      );

      console.log("PPPPPPPPPPPP");
    } else {
      setSelectListTutor(val);

      var item1 = {};
      item1["tutor_qualification_Subject"] = val;
      item1["Tutoring_Level"] = "Primary";
      // item1["Tutoring_Stream"] = "AEIS";

      if (
        !isExistInArray(
          selectArray,
          "tutor_qualification_Subject",
          item1.tutor_qualification_Subject
        )
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(
          selectArray,
          "tutor_qualification_Subject",
          item1.tutor_qualification_Subject
        );
      }
    }
  };

  console.log(selectArray, "selectArrayselectArrayselectArray");

  const setGradeFun = (val) => {
    //   setP1('P1')
    if (P1 == val) {
      setGrade([]);
    } else {
      setGrade(val);
    }
  };

  const setp1fun = (val) => {
    //   setP1('P1')
    if (P1 == val) {
      setP1("");
    } else {
      setP1(val);
    }
  };

  const setp2fun = (val) => {
    // setP1('P1')
    if (P2 == val) {
      setP2("");

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);

      // console.log("PPPPPPPPPPPP");
    } else {
      setP2(val);

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // if (
      //   !isExistInArray(selectArray, "Tutoring_Grade", item1.Tutoring_Grade)
      // ) {
      //   //  console.log('insert in array');
      //   // selectArray.push(item1);
      // } else {
      //   RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);
      // }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setp3fun = (val) => {
    // setP1('P1')
    if (P3 == val) {
      setP3("");

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);

      // console.log("PPPPPPPPPPPP");
    } else {
      setP3(val);

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // if (
      //   !isExistInArray(selectArray, "Tutoring_Grade", item1.Tutoring_Grade)
      // ) {
      //   //  console.log('insert in array');
      //   //   selectArray.push(item1);
      // } else {
      //   RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);
      // }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setp4fun = (val) => {
    // setP1('P1')
    if (P4 == val) {
      setP4("");

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);

      // console.log("PPPPPPPPPPPP");
    } else {
      setP4(val);

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // if (
      //   !isExistInArray(selectArray, "Tutoring_Grade", item1.Tutoring_Grade)
      // ) {
      //   //  console.log('insert in array');
      //   // selectArray.push(item1);
      // } else {
      //   RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);
      // }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setp5fun = (val) => {
    // setP1('P1')
    if (P5 == val) {
      setP5("");

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);

      // console.log("PPPPPPPPPPPP");
    } else {
      setP5(val);

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // if (
      //   !isExistInArray(selectArray, "Tutoring_Grade", item1.Tutoring_Grade)
      // ) {
      //   //  console.log('insert in array');
      //   // selectArray.push(item1);
      // } else {
      //   RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);
      // }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setp6fun = (val) => {
    // setP1('P1')
    if (P6 == val) {
      setP6("");

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);

      // console.log("PPPPPPPPPPPP");
    } else {
      setP6(val);

      // var item1 = {};
      // item1["Tutoring_Grade"] = val;

      // if (
      //   !isExistInArray(selectArray, "Tutoring_Grade", item1.Tutoring_Grade)
      // ) {
      //   //  console.log('insert in array');
      //   // selectArray.push(item1);
      // } else {
      //   RemoveTempExercise(selectArray, "Tutoring_Grade", item1.Tutoring_Grade);
      // }
    }
    console.log("aaaaaaaaaaa", selectArray);
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
  };

  const [listTutor, setlistTutor] = useState([
    {
      id: 1,
      label: "Pre-School",
    },
    {
      id: 2,
      label: "Primary",
    },
    {
      id: 3,
      label: "AEIS",
    },
    {
      id: 4,
      label: "Secondary",
    },
    {
      id: 5,
      label: "JC/Pre-U",
    },
    {
      id: 6,
      label: "IB (Diploma)",
    },
    {
      id: 7,
      label: "International School (Grade 1 to 6)",
    },
    {
      id: 8,
      label: "International School (Grade 7 to 10)",
    },
    {
      id: 9,
      label: "International School (Grade 11, 12)",
    },
    {
      id: 10,
      label: "ITE",
    },
    {
      id: 11,
      label: "Polytechnic",
    },
    {
      id: 12,
      label: "University",
    },
    {
      id: 13,
      label: "Entrance Exams",
    },
    {
      id: 14,
      label: "Foreign Languages",
    },
    {
      id: 15,
      label: "Music",
    },
    {
      id: 16,
      label: "Computing",
    },
  ]);

  const [selectListTutor, setSelectListTutor] = useState("");
  const [TutorLevel, setTutorLevel] = useState("");
  const [levelDetail, setLevelDetail] = useState("");
  const [count, setCount] = useState(0);
  console.log(selectListTutor, 'selectListTutor')
  // console.log(levelDetail,'levelDetail')

  const [state, setState] = useState("Select Year");
  const state_list = [
    { label: "Select Year", value: "Select Year" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];
  const [state2, setState2] = useState("Select Month");
  const state_list2 = [
    { label: "Select Month", value: "Select Month" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
  ];
  console.log(state, state2, "state,state2");

  const [tutorSubject, setTutorSubject] = useState("");

  const [selectedItems, setselectedItems] = useState([]);
  // console.log(tutorSubject,'tutorSubject')
  // console.log(selectedItems,'selectedItems')

  const ALLDATA = () => {
    selectListTutor, gradeArray, state, state2, selectedItems;

    console.log(
      selectListTutor,
      gradeArray,
      state,
      state2,
      selectedItems, 'ALLDATA'
    );

    // if (P1 == P1) {
    //   setSelectListTutor("");
    const obj3 = [];

    setCount(count + 1);

    console.log(obj3, "AAAAA");

    var item1 = {};
    item1["Id"] = count;
    item1["tutor_qualification_Subject"] = selectListTutor;
    item1["Tutoring_Grade"] = gradeArray.map(item => item?.Grade);
    item1["Tutoring_Year"] = state;
    item1["Tutoring_Month"] = state2;
    item1["Tutoring_ALL_Subjects"] = selectedItems;

    if (
      !isExistInArray(
        selectArray,
        "tutor_qualification_Subject",
        item1.tutor_qualification_Subject
      )
    ) {
      //  console.log('insert in array');
      selectArray.push(item1);
      // selectArray.push(obj3);
    } else {
      RemoveTempExercise(
        selectArray,
        "tutor_qualification_Subject",
        item1.tutor_qualification_Subject
      );
    }
    // }

    setTutorSubject(false);
    setP1("");
    setP2("");
    setP3("");
    setP4("");
    setP5("");
    setP6("");
    setSelectListTutor("");
    setState("");
    setState2("");
    setselectedItems([]);
  };



  const gradeData = (val) => {

    console.log(
      val, '@@@@@AAAAJJJJ@@@@'
    );

    // if (P1 == P1) {
    //   setSelectListTutor("");
    const obj3 = [];

    setCount(count + 1);

    console.log(obj3, "AAAAA");

    var item1 = {};
    item1["Grade"] = val;


    if (
      !isExistInArray(
        selectArray,
        "Grade",
        item1.Grade
      )
    ) {
      //  console.log('insert in array');
      gradeArray.push(item1);
      // selectArray.push(obj3);
    } else {
      RemoveTempExercise(
        selectArray,
        "Grade",
        item1.Grade
      );
    }
    // }


  };
  console.log(count, "countttttttttttt");
  console.log(
    selectArray,
    //selectArray.Tutoring_ALL_Subjects[1],
    "selectArrayselectArray@@@@@@@@@@@@@@@@@@@@@@@@@"
  );


  const SelectYear = (val) => {
    if (state == val) {
      setState("");

      var item1 = {};
      item1["Tutoring_year"] = val;

      RemoveTempExercise(selectArray, "Tutoring_year", item1.Tutoring_year);

      console.log("PPPPPPPPPPPP");
    } else {
      setState(val);

      var item1 = {};
      item1["Tutoring_year"] = val;

      if (!isExistInArray(selectArray, "Tutoring_year", item1.Tutoring_year)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Tutoring_year", item1.Tutoring_year);
      }
    }
  };

  const SelectMonth = (val) => {
    if (state2 == val) {
      setState2("");

      var item1 = {};
      item1["Tutoring_month"] = val;

      RemoveTempExercise(selectArray, "Tutoring_month", item1.Tutoring_month);

      console.log("PPPPPPPPPPPP");
    } else {
      setState2(val);

      var item1 = {};
      item1["Tutoring_month"] = val;

      if (
        !isExistInArray(selectArray, "Tutoring_month", item1.Tutoring_month)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Tutoring_month", item1.Tutoring_month);
      }
    }
  };

  const createsubject = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectArray = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};

      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Tutoring_Subjects"] = element;
        // setSelectedQual(element)
      });

      if (
        !isExistInArray(
          selectArray,
          "Tutoring_Subjects",
          obj3.Tutoring_Subjects
        )
      ) {
        selectArray.push(obj3);
      } else {
        RemoveTempExercise(
          selectArray,
          "Tutoring_Subjects",
          obj3.Tutoring_Subjects
        );
      }
    }

    // console.log('LevelSubjects', selectArray)
  };

  const onSelectedItemsChange = (selectedItems) => {
    console.log("PPPPPPPPPPPP", selectedItems);
    // createsubject(selectedItems);
    setselectedItems(selectedItems);
  };

  const savedata = () => {
    // dispatch(editProfile(selectListTutor,state,state2,selectArray, GET_USER_ID));
    console.log(selectListTutor, state, state2, selectArray, GET_USER_ID);

    let obj = {
      selectListTutor: selectListTutor,
      state: state,
      state2: state2,
      selectArray: selectArray,
      GET_USER_ID: GET_USER_ID,
    };
    dispatch({
      type: Tutoring_Data,
      payload: obj,
    });

    navigation.navigate("YourProfle", {
      selectListTutor: selectListTutor,
      state: state,
      state2: state2,
      selectArray: selectArray,
      GET_USER_ID: GET_USER_ID,
    });
  };

  const [multiSelect, setmultiSelect] = useState("");
  // console.log(multiSelect,'multiSelect')

  const items = [
    {
      id: "1",
      name: "English ",
    },
    {
      id: "2",
      name: "English Foundation ",
    },
    {
      id: "3",
      name: "Math ",
    },
    {
      id: "4",
      name: "Math Foundation ",
    },
    {
      id: "5",
      name: "Science ",
    },
    {
      id: "6",
      name: "Science Foundation ",
    },
    {
      id: "7",
      name: "Chinese ",
    },
    {
      id: "8",
      name: "Higher Chinese ",
    },
    {
      id: "9",
      name: "Malay ",
    },
    {
      id: "10",
      name: "Higher Malay ",
    },
    {
      id: "11",
      name: "Tamil ",
    },
    {
      id: "12",
      name: "Higher Tamil ",
    },
    {
      id: "13",
      name: "Hindi ",
    },
  ];

  const SelectAllOption = () => {
    setp1fun("P1");
    setp2fun("P2");
    setp3fun("P3");
    setp4fun("P4");
    setp5fun("P5");
    setp6fun("P6");
  };
  useEffect(() => {
    dispatch(getLevelList());

  }, []);
  useEffect(() => {

    dispatch(getGradeList(selectListTutor));
    if (GRADE_LIST) {
      setGradeList(GRADE_LIST?.Grade_List)
    }

    if (GRADE_LIST && selectListTutor == 'Secondary') {
      setSecondaryGradeList(GRADE_LIST?.Grade_List?.Grades)
    }

  }, [selectListTutor]);

  useEffect(() => {

    dispatch(getSubjectList(selectListTutor));

  }, [selectListTutor]);
  return (
    <View style={styles.container}>
      {/* <View style={{flex:0.9}}> */}
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

      <TouchableOpacity
        style={{
          //borderWidth: 1,
          // borderColor: "lightgrey",
          height: hp(8),
          marginTop: 10,
          paddingHorizontal: wp(2),
          width: wp(90),
          marginLeft: wp(5),
        }}
      >
        <Text style={{ color: "grey", fontSize: 14, paddingTop: hp(0.5) }}>
          You can list your Tutoring Level, Subjects & Experience in this
          section
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTutoring(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: wp(5),
          marginTop: hp(2),
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            height: hp(5),
            width: wp(10),
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 25, color: "#fff", fontWeight: "800" }}>
            +
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: "#2F5597",
            fontWeight: "800",
            marginLeft: wp(2),
          }}
        >
          Add Tutoring Details
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ height: 300 }}>
        {selectArray.map((item) => (
          <View
            style={{
              justifyContent: "space-between",
              backgroundColor: "red",
              marginHorizontal: wp(5),
              backgroundColor: "#fff",
              elevation: 10,
              paddingVertical: hp(1),
              marginTop: hp(2),
            }}
            key={item.Id}
          >
            <Text style={{ marginLeft: wp(3), color: "#000", fontSize: 14 }}>
              {item.Id}
            </Text>
            <Text style={{ marginLeft: wp(3), color: "#000", fontSize: 14 }}>
              {item.tutor_qualification_Subject}
            </Text>
            {item.Tutoring_Grade.map((item) => (
              <Text style={{ color: "#000", marginLeft: wp(3), fontSize: 14 }}>
                {item}
              </Text>
            ))}
            <Text style={{ color: "#000", marginLeft: wp(3), fontSize: 14 }}>
              {item.Tutoring_Grade?.Grade}
            </Text>
            <Text style={{ color: "#000", marginLeft: wp(3), fontSize: 14 }}>
              {item.Tutoring_Year} Years
            </Text>
            <Text style={{ color: "#000", fontSize: 14, marginLeft: wp(3) }}>
              {item.Tutoring_Month} Months
            </Text>

            <View>
              {item.Tutoring_ALL_Subjects.map((subject) => (
                <Text
                  style={{ color: "#000", fontSize: 14, marginLeft: wp(3) }}
                  key={subject}
                >
                  {subject}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* {selectListTutor ? (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: wp(5),
            backgroundColor: "#fff",
            elevation: 10,
            paddingVertical: hp(1),
            marginTop: hp(2),
          }}
        >
          <View style={{ marginLeft: wp(3) }}>
            <Text style={{ color: "#000", fontSize: 14 }}>
              {selectListTutor}
            </Text>
            <Text style={{ color: "#000", fontSize: 14, paddingTop: hp(2) }}>
              {P1} {P2} {P3} {P4} {P5} {P6}
            </Text>
            <Text style={{ color: "#000", fontSize: 14, paddingTop: hp(2) }}>
              {state} Years {state2} Months
            </Text>
            <Text style={{ color: "#000", fontSize: 14, paddingTop: hp(2) }}>
              {selectedItems + ""}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setTutoring(true)}
              style={{
                backgroundColor: "lightblue",
                borderRadius: 6,
                paddingVertical: hp(1.5),
                width: wp(14),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../Assets/bell.png")}
                style={{ height: hp(4), width: wp(7) }}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "grey",
                borderRadius: 6,
                paddingVertical: hp(1.5),
                width: wp(14),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../Assets/delete.png")}
                style={{ height: hp(4), width: wp(7) }}
              />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )} */}

      {/* 
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(5), backgroundColor: '#fff', elevation: 10, paddingVertical: hp(1), marginTop: hp(2) }}>
                <View style={{ marginLeft: wp(3) }}>
                    <Text style={{ color: '#000', fontSize: 14, marginTop: -hp(2) }}>{'Secondary'}</Text>
                    <Text style={{ color: '#000', fontSize: 14, paddingTop: hp(2) }}>{'P1,P2, P3,P4'}</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={() => setTutoring(true)} style={{ backgroundColor: 'lightblue', borderRadius: 6, paddingVertical: hp(1.5), width: wp(14), alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../Assets/bell.png')}
                            style={{ height: hp(4), width: wp(7) }}
                        />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'grey', borderRadius: 6, paddingVertical: hp(1.5), width: wp(14), alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../Assets/delete.png')}
                            style={{ height: hp(4), width: wp(7) }}
                        />
                    </View>
                </View>
            </TouchableOpacity> */}

      <View style={{ flex: 0.9 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={tutoring}
          onRequestClose={() => {
            setTutoring(false);
          }}
        >
          <View style={styles.modalWrapper2}>
            <View style={styles.modalWrapp}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(2),
                  justifyContent: "space-between",
                  marginHorizontal: wp(5),
                }}
              >
                <TouchableOpacity
                  onPress={() => setTutoring(false)}
                  style={styles.crossImageWrapper}
                >
                  <Image
                    source={require("../Assets/closeingray.png")}
                    style={styles.crossImage}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  //  onPress={() => AddQualification(TutorLevel)}
                  onPress={() =>
                    selectListTutor == ""
                      ? setTutoring(false)
                      : setLevelDetail()
                  }
                  style={styles.tickWrapper}
                >
                  <Image
                    source={require("../Assets/right.png")}
                    style={styles.tickImage}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                >
                  Select Tutoring Level
                </Text>
              </View>

              <FlatList
                data={LEVEL_LIST?.Level_list}
                numColumns={1}
                keyExtractor={(item, index) => index}
                // showsVerticalScrollIndicator={true}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectListTutor(item.school_level_name)}
                    //    onPress={() => setTutorLevel(item.label)}
                    //  onPress={() => AddQualification(item.label)}
                    style={{
                      height: hp(4),
                      alignItems: "center",
                      width: wp(90),
                      alignSelf: "center",
                      flexDirection: "row",
                      backgroundColor:
                        selectListTutor == item.school_level_name ? "#2F5597" : "#fff",
                      // marginTop: hp(2),
                    }}
                  >
                    <Text
                      style={{
                        color: selectListTutor == item.school_level_name ? "#fff" : "#000",
                        fontSize: 13,
                        marginLeft: wp(4),
                      }}
                    >
                      {item.school_level_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={levelDetail}
          onRequestClose={() => {
            setLevelDetail(false);
          }}
        >
          <View style={styles.modalWrapper2}>
            <View style={styles.modalWrapp}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(2),
                  justifyContent: "space-between",
                  marginHorizontal: wp(5),
                }}
              >
                <TouchableOpacity
                  onPress={() => setLevelDetail(false)}
                  style={styles.crossImageWrapper}
                >
                  <Image
                    source={require("../Assets/closeingray.png")}
                    style={styles.crossImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTutorSubject(true);
                    setLevelDetail(false);
                    setTutoring(false);
                  }}
                  style={styles.tickWrapper}
                >
                  <Image
                    source={require("../Assets/right.png")}
                    style={styles.tickImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                >
                  Select Level Details
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: hp(3),
                  marginHorizontal: wp(5),
                }}
              >
                <Text
                  style={{ color: "grey", fontSize: 14, fontWeight: "800" }}
                >
                  Select according to preference
                </Text>

                <TouchableOpacity
                  onPress={() => SelectAllOption()}
                  style={{
                    borderWidth: 1,
                    borderColor: "#2F5597",
                    height: hp(5),
                    width: wp(20),
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#2F5597",
                      fontSize: 12,
                      fontWeight: "800",
                    }}
                  >
                    Select All
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(3),
                  flexDirection: "row",
                }}
              >
                {
                  selectListTutor != 'Secondary'  ?


                  gradeList && gradeList?.map((item) => {
                      return (
                        <View
                          style={{
                            width: wp(15),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >

                          <TouchableOpacity
                            //  onPress={() => setP1("P1")}
                            onPress={() => gradeData(item?.grade_name)}
                            style={{
                              height: hp(4),
                              width: wp(8),
                              borderWidth: 1,
                              borderColor: "lightgrey",
                              backgroundColor: gradeArray.map(item => item?.Grade) == item?.grade_name ? "#2F5597" : "#fff",
                            }}
                          ></TouchableOpacity>
                          <Text
                            style={{ color: "grey", fontSize: 14, fontWeight: "800" }}
                          >
                            {item?.grade_name}
                          </Text>
                        </View>
                      )
                    })
                    : null
                }

                {
                  selectListTutor == 'Secondary' && SecondarygradeList ?
                    SecondarygradeList.map((item) => {
                      return (
                        <View
                          style={{
                            width: wp(15),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >

                          <TouchableOpacity
                            //  onPress={() => setP1("P1")}
                            onPress={() => gradeData(item?.grade_name)}
                            style={{
                              height: hp(4),
                              width: wp(8),
                              borderWidth: 1,
                              borderColor: "lightgrey",
                              backgroundColor: gradeArray.map(item => item?.Grade) == item?.grade_name ? "#2F5597" : "#fff",
                            }}
                          ></TouchableOpacity>
                          <Text
                            style={{ color: "grey", fontSize: 14, fontWeight: "800" }}
                          >
                            {item?.grade_name}
                          </Text>
                        </View>
                      )
                    })
                    : null
                }


              </View>
              <View>
                <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                  <Text
                    style={{ color: "grey", fontSize: 13, fontWeight: "800" }}
                  >
                    Select Tutoring Experience
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    position: "absolute",
                    bottom: hp(5),
                    left: wp(13),
                    zIndex: 999,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text style={{ color: "#000" }}> Years </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    marginTop: hp(4),
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "lightgrey",
                    width: wp(40),
                    marginLeft: wp(10),
                    height: hp(6),
                    borderRadius: 4,
                  }}
                >
                  <RNPickerSelect
                    onValueChange={(value) => setState(value)}
                    //onValueChange={(value) => SelectYear(value)}
                    items={state_list}
                    value={state}
                    placeholder={{}}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: wp(40),
                        justifyContent: "space-between",
                        paddingHorizontal: wp(4),
                      }}
                    >
                      {state_list.map(
                        (item) =>
                          item.value === state && (
                            <Text
                              key={item.value}
                              style={{ fontSize: 13, color: "#000" }}
                            >
                              {item.label}
                            </Text>
                          )
                      )}
                      <Image
                        source={require("../Assets/downbutton.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </View>
                  </RNPickerSelect>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: hp(5),
                    right: wp(25),
                    zIndex: 999,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text style={{ color: "#000" }}> Months </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    marginTop: hp(4),
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "lightgrey",
                    width: wp(40),
                    marginLeft: wp(3),
                    height: hp(6),
                    borderRadius: 4,
                  }}
                >
                  <RNPickerSelect
                    onValueChange={(value) => setState2(value)}
                    //  onValueChange={(value) => SelectMonth(value)}
                    items={state_list2}
                    value={state2}
                    placeholder={{}}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: wp(40),
                        justifyContent: "space-between",
                        paddingHorizontal: wp(4),
                      }}
                    >
                      {state_list2.map(
                        (item) =>
                          item.value === state2 && (
                            <Text
                              key={item.value}
                              style={{ fontSize: 13, color: "#000" }}
                            >
                              {item.label}
                            </Text>
                          )
                      )}
                      <Image
                        source={require("../Assets/downbutton.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </View>
                  </RNPickerSelect>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={tutorSubject}
          onRequestClose={() => {
            setTutorSubject(false);
          }}
        >
          <View style={styles.modalWrapper2}>
            <View style={[styles.modalWrapp, { height: hp(76) }]}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(2),
                  justifyContent: "space-between",
                  marginHorizontal: wp(5),
                }}
              >
                <TouchableOpacity
                  onPress={() => setTutorSubject(false)}
                  style={styles.crossImageWrapper}
                >
                  <Image
                    source={require("../Assets/closeingray.png")}
                    style={styles.crossImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  //  onPress={() => setTutorSubject(false)}
                  onPress={() => ALLDATA()}
                  style={styles.tickWrapper}
                >
                  <Image
                    source={require("../Assets/right.png")}
                    style={styles.tickImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                >
                  Select Tutoring Subjects
                </Text>
              </View>

              <View
                style={{
                  marginLeft: wp(5),
                  marginTop: hp(2),
                  marginBottom: hp(2),
                }}
              >
                <Text
                  style={{ color: "#000", fontSize: 20, fontWeight: "800" }}
                >
                  Select mutiple (if required)
                </Text>
              </View>

              <View style={{ marginHorizontal: wp(5) }}>
                <MultiSelect
                  //   hideTags
                  items={SUBJECT_LIST?.Subject_List}
                  uniqueKey="subjects_name"
                  //   ref={(component) => { this.multiSelect = component }}
                  styleInputGroup={{
                    width: wp(90),
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#000",
                  }}
                  styleItemsContainer={{
                    marginTop: 20,
                    height: wp(90),
                    width: wp(90),
                  }}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Selected item"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={(text) => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="subjects_name"
                  searchInputStyle={{ color: "#000", fontSize: 13 }}
                  hideSubmitButton
                //  submitButtonColor="#000"
                //submitButtonText="Submit"
                //   removeSelected
                />
              </View>

              {/* <View> */}
              {/* {multiSelect.getSelectedItemsExt(selectedItems)}
        {/* </View>                */}
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{ flex: 0.1, justifyContent: "flex-end", paddingBottom: hp(3) }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.circleArrow}
        >
          <Image
            style={{ transform: [{ rotate: "180deg" }] }}
            source={require("../Assets/circleArrow.png")}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => savedata()}
            //     onPress = {() => navigation.navigate('YourProfle', {
            // Tutorcomplete: 'Tutorccomplete'
            // })}

            style={{
              backgroundColor: "#2F5597",
              borderRadius: 25,
              height: hp(6),
              width: wp(60),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TutoringDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'pink'
    // padding: 10,
  },

  Headers: {
    // backgroundColor: "red",
    height: hp(10),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },

  Text1: {
    color: "#2F5597",
    fontSize: 24,
    fontWeight: "700",
  },

  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
  },

  HeadLeft: {
    width: wp(45),
    height: hp(10),
    flexDirection: "row",
    marginTop: hp(2),
    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(10),
    marginTop: hp(2),
    // backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  moblieSec: {
    backgroundColor: "lightgrey",
    height: hp(8),
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    width: wp(90),
    marginLeft: wp(5),
  },
  mobiletoch: {
    backgroundColor: "#2F5597",
    width: wp(40),
    height: hp(6),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(40),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
  },

  circleArrow: {
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: wp(4.5),
    paddingBottom: hp(4),
  },
  modalWrapper2: {
    flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalWrapp: { height: hp(48), width: wp(100), backgroundColor: "#fff" },
  crossWRapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  crossImageWrapper: {
    backgroundColor: "red",
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  crossImage: {
    height: 30,
    width: 30,
  },
  tickWrapper: {
    backgroundColor: "green",
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: { height: 20, width: 20 },
});