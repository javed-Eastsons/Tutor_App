import React, { useState, useEffect, useCallback } from "react";
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
  Alert,
  RefreshControl,
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
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../Redux/Actions/Tutors";
import { editProfile } from "../Redux/Actions/Tutors";
import { AcademicHistory_Data } from "../Redux/Actions/types";
var selectArray = [];

const AcademicInfo = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fArr = [];
  console.log(selectArray, "selectArray");

  ("");

  const [showemail, setShowEmail] = React.useState("Qualification");
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const [selectQualification, setselectQualification] = useState(false);
  const [details, setDetails] = useState(false);
  const [detailsE, setDetailsE] = useState(false);

  const [show, setShow] = useState(false);
  const [sections, setSections] = useState([]);

  const AddSubjectSection = () => {
    const newSection = {
      subject: "",
      grade: "",
    };
    setSections([...sections, newSection]);
  };

  console.log(sections, "sectionssectionssectionssectionssections");

  const handleSubjectChange = (text, index) => {
    const updatedSections = [...sections];
    updatedSections[index].subject = text;
    setSections(updatedSections);
  };

  const handleGradeChange = (text, index) => {
    const updatedSections = [...sections];
    updatedSections[index].grade = text;
    setSections(updatedSections);
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      courses: "A Level",
    },
    {
      id: 2,
      courses: "IB (Diploma)",
    },
    {
      id: 3,
      courses: "Poly Diploma",
    },
    {
      id: 4,
      courses: "University Undergraduate",
    },
    {
      id: 5,
      courses: "University Graduate",
    },
    {
      id: 6,
      courses: "Ex School Teacher",
    },
    {
      id: 7,
      courses: "Current School Teacher",
    },
  ]);

  const [qualification, setQualification] = useState("");
  //const [selectedCourse, setSelectedCourse] = useState("");

  const [national, setNational] = useState("");
  const [school, setSchool] = useState([]);
  const [school1, setSchool1] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [courses, setCourses] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [year, setYear] = useState("");
  const [count, setCount] = useState(1);
  const [detailNo, setDetailNo] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

  const [historyModal, setHistoryModal] = useState(false);
  const [historyModal1, setHistoryModal1] = useState(false);
  const [examName, setExamName] = useState("");
  const [records, setRecords] = useState(selectArray);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editId, setEditId] = useState(); // ID of the record you want to edit

  // console.log(
  //   qualification,
  //   Experience,
  //   school,
  //   grade,
  //   subject,
  //   state,
  //   year,
  //   "him"
  // );

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
    setQualification(userDetail[0]?.Extra_info[0]?.qualification);
    setSchool1(userDetail[0]?.Extra_info[0]?.name_of_school);
    setCourses(userDetail[0]?.Extra_info[0]?.Course_Exam);
    setGradYear(userDetail[0]?.Extra_info[0]?.gra_year);
    setRecords(userDetail[0]?.history_academy_arr);
  }, [SINGLE_USER, setQualification]);

  const [state, setState] = useState("Select One Option");
  const state_list = [
    { label: "Select One Option", value: "Select One Option" },
    { label: "GCE O Level", value: "GCE O Level" },
    { label: "GCE A Level", value: "GCE A Level" },
    { label: "IB (Diploma)", value: "IB (Diploma)" },
    { label: "Polytechnic Diploma", value: "Polytechnic Diploma" },
    { label: "IGCSE", value: "IGCSE" },
    { label: "Others", value: "Others" },
  ];
  const [otherExam, setOtherExam] = useState("");
  const [countD, setCountD] = useState(1);

  const [Experience, setExperience] = useState("Select One Option");
  const Experience_List = [
    { label: "Select One Option", value: "Select One Option" },
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
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
  ];

  console.log(school, Experience, "sch, exp");
  console.log(examName, state, "examName, Exam");

  const addDetails = () => {
    setCount((prev) => prev + 1);
    setDetailNo(count + 1);
  };

  console.log(detailNo, "detailN0");

  const saveacademicinfo = () => {
    console.log(
      "LLLLLL",
      qualification,
      Experience,
      school1,
      courses,
      gradYear,
      selectArray
    );
    // dispatch(editProfile(selectedCourse,school,grade,subject,courses, GET_USER_ID));
    let obj = {
      qualification: qualification,
      Experience: Experience,
      school: school1,
      Course: courses,
      // subject: subject,
      exam: state == "Others" ? otherExam : state,
      gra_year: gradYear,
      History: selectArray,
      GET_USER_ID: GET_USER_ID,
    };
    dispatch({
      type: AcademicHistory_Data,
      payload: obj,
    });

    navigation.navigate("YourProfle");
  };

  const deleteRecord = (idToDelete) => {
    const updatedRecords = records.filter(
      (record) => record.HistoryID !== idToDelete
    );
    console.log(updatedRecords, "AAAAAAAAAAAA");
    setRecords(updatedRecords);
  };

  const AddHistoryModal = () => {
    setHistoryModal(true);
    setSchool("");
    setState("");
    setSubject("");
    setGrade("");
  };
  const handleEdit = (idToEdit, school, exam, subject, grade) => {
    console.log(idToEdit);

    setSchool(school);
    setState(exam);
    setSubject(subject);
    setGrade(grade);
    setShowEditModal(true);
    setEditId(idToEdit);
  };

  const UpdateRecord = () => {
    console.log(editId);
    const newData = records.map((record) => {
      if (record.HistoryID === editId) {
        return {
          ...record,
          exam: state,
          grade: grade,
          school: school,
          subject: subject,
          // You can update other fields here as well
        };
      }
      return record;
    });

    setRecords(newData);
    console.log(newData, "newDatanewDatanewDatanewDatanewData");
    setShowEditModal(false);
  };
  const CrossButton = () => {
    setHistoryModal(false);
    setSchool("");
    setGrade("");
    setSubject("");
    setState("Select One Option");
  };

  const onChangeSchool = (text) => {
    console.log(text, "onchange");
    setSchool(text);
    console.log(school, "state");
    fArr.push(school);
  };

  console.log(
    subjects.map((item) => item?.courses),
    "sub"
  );

  const checkQual = () => {
    console.log(qualification, "SSSSSSSSSSSSSSSSSS");

    if (
      qualification == "Ex School Teacher" ||
      qualification == "Current School Teacher"
    ) {
      setDetails(true);
    } else {
      setDetailsE(true);
    }
  };

  const EditQualDetail = () => {
    console.log(qualification, "PPPPPPPPPPPPPPPPP");

    if (
      qualification == "Ex School Teacher" ||
      qualification == "Current School Teacher"
    ) {
      setDetails(true);
    } else {
      setDetailsE(true);
    }
  };

  const qualModalClose = () => {
    setselectQualification(false);
    setSchool([]);
    setExperience("Select One Option");
  };

  const onDeleteE = () => {
    setSchool([]);
    setState("Select One Option");
    setExamName("");
  };
  const onDelete = () => {
    setSchool([]);
    setExperience("Select One Option");
  };
  const onDeleteGradYear = () => {
    setSchool([]);
    setCourses("");
    setGradYear("");
  };
  const onEditE = () => {
    if (
      qualification == "Ex School Teacher" ||
      qualification == "Current School Teacher"
    ) {
      setDetails(true);
    } else {
      setDetailsE(true);
    }
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
      onRefresh();
      console.log(selectArray, "NEWARRAY");
    });

    selectArray = Ex_array;
  };

  const addHistoryData = (school, state) => {
    console.log(school, state, "@@@@@AAAAJJJJ@@@@");

    // if (P1 == P1) {
    //   setSelectListTutor("");
    const obj3 = [];

    setCountD(countD + 1);

    console.log(obj3, "AAAAA");

    var item1 = {};
    // item1["history_academy_id"] = countD;
    item1["HistoryID"] = countD;
    item1["school"] = school;
    item1["exam"] = state == "Others" ? otherExam : state;
    item1["result"] = sections;
    // item1["subject"] = subject;
    // item1["grade"] = grade;
    console.log(item1, "itemasssssssssssss");

    if (!isExistInArray(selectArray, "school", item1.school)) {
      //  console.log('insert in array');
      // records.push(item1);

      selectArray.push(item1);
      setRecords(selectArray);
    } else {
      RemoveTempExercise(selectArray, "school", item1.school);
    }
    // }
    CrossButton();
    setSections([]);
  };

  console.log(records, "QQQQQQQQQQQQQQQQQQQQQQ");

  const onTickFunc = () => {
    console.log(school, state, "PPPPPPPPPPPPPPPPPPPPPP");
    // addHistoryData(school, state, subject, grade);
    addHistoryData(school, state);
    // setHistoryModal(false);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
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

      <View style={styles.moblieSec}>
        <TouchableOpacity
          style={[
            styles.mobiletoch,
            {
              backgroundColor:
                showemail == "Qualification" ? "#2F5597" : "lightgrey",
            },
          ]}
          onPress={() => setShowEmail("Qualification")}
        >
          <Text
            style={[
              styles.ButtonText,
              { color: showemail == "Qualification" ? "#fff" : "#000" },
            ]}
          >
            Qualification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.emailtoch,
            {
              backgroundColor: showemail == "History" ? "#2F5597" : "lightgrey",
            },
          ]}
          onPress={() => setShowEmail("History")}
        >
          <Text
            style={[
              styles.ButtonText,
              { color: showemail == "History" ? "#fff" : "#000" },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {showemail == "Qualification" && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <TouchableOpacity
              onPress={() => setselectQualification(true)}
              style={{
                borderWidth: 1,
                borderColor: "lightgrey",
                height: hp(8),
                paddingHorizontal: wp(2),
                width: wp(90),
                marginLeft: wp(5),
              }}
            >
              <Text
                style={{
                  color: "lightgrey",
                  fontSize: 14,
                  paddingTop: hp(0.5),
                }}
              >
                Select your Current Qualification. You can add detail after
                selection
              </Text>
            </TouchableOpacity>

            {qualification ? (
              <>
                <TouchableOpacity
                  style={{
                    height: hp(6),
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    marginLeft: wp(5),
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: wp(90),
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    marginTop: hp(2),
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 13, marginLeft: wp(4) }}
                    >
                      {qualification}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setselectQualification(true)}
                    style={{
                      backgroundColor: "lightblue",
                      height: hp(6),
                      width: wp(15),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/Pencil.png")}
                      style={{ height: hp(3), width: wp(5) }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    checkQual();
                  }}
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
                    <Text
                      style={{ fontSize: 25, color: "#fff", fontWeight: "800" }}
                    >
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
                    Add Detail (optional)
                  </Text>
                </TouchableOpacity>
                {school != [] && Experience != "Select One Option" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: wp(5),
                      backgroundColor: "#fff",
                      elevation: 10,
                      height: hp(12),
                      marginTop: hp(2),
                    }}
                  >
                    <View style={{ marginLeft: wp(3) }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#2F5597",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {school}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 13 }}>
                        Year in Service / {Experience}
                      </Text>
                      {/* <Text style={{ color: '#000', fontSize: 14, }}>{year}</Text> */}
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => setDetails(true)}
                        style={{
                          backgroundColor: "lightblue",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../Assets/Pencil.png")}
                          style={{ height: hp(3), width: wp(5) }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#2F5597",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 5,
                        }}
                        onPress={onDelete}
                      >
                        <Image
                          source={require("../Assets/delete.png")}
                          style={{ height: hp(4), width: wp(7) }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {school1 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: wp(5),
                      backgroundColor: "#fff",
                      elevation: 10,
                      height: hp(12),
                      marginTop: hp(2),
                    }}
                  >
                    <View style={{ marginLeft: wp(3) }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#2F5597",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {school1}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 13 }}>
                        Course: {courses}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 13 }}>
                        Year/Graduation: {gradYear}
                      </Text>
                      {/* <Text style={{ color: '#000', fontSize: 14, }}>{year}</Text> */}
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => EditQualDetail()}
                        //onPress={() => setDetails(true)}
                        style={{
                          backgroundColor: "lightblue",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../Assets/Pencil.png")}
                          style={{ height: hp(3), width: wp(5) }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#2F5597",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 5,
                        }}
                        onPress={onDeleteGradYear}
                      >
                        <Image
                          source={require("../Assets/delete.png")}
                          style={{ height: hp(4), width: wp(7) }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                {school != [] &&
                state != "Select One Option" &&
                examName != "" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginHorizontal: wp(5),
                      backgroundColor: "#fff",
                      elevation: 10,
                      height: hp(12),
                      marginTop: hp(2),
                    }}
                  >
                    <View style={{ marginLeft: wp(3) }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#2F5597",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {school}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 13 }}>
                        {state}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 13 }}>
                        {examName}
                      </Text>
                      {/* <Text style={{ color: '#000', fontSize: 14, }}>{year}</Text> */}
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={onEditE}
                        style={{
                          backgroundColor: "lightblue",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../Assets/Pencil.png")}
                          style={{ height: hp(3), width: wp(5) }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#2F5597",
                          borderRadius: 6,
                          height: hp(6),
                          width: wp(14),
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 5,
                        }}
                        onPress={onDeleteE}
                      >
                        <Image
                          source={require("../Assets/delete.png")}
                          style={{ height: hp(4), width: wp(7) }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </>
            ) : null}

            <Modal
              animationType="slide"
              transparent={true}
              visible={selectQualification}
              onRequestClose={qualModalClose}
            >
              <View style={styles.modalWrapper2}>
                <View style={styles.modalWrapp}>
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginRight: wp(4),
                      marginTop: hp(2),
                    }}
                  >
                    {qualification ? (
                      <TouchableOpacity
                        onPress={() => setselectQualification(false)}
                        style={styles.tickWrapper}
                      >
                        <Image
                          source={require("../Assets/right.png")}
                          style={styles.tickImage}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={{ marginTop: hp(4) }} />
                    )}
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                    >
                      Select Qualification
                    </Text>
                  </View>
                  <View style={{ marginLeft: wp(5), marginTop: hp(2) }}>
                    <Text
                      style={{ color: "#000", fontSize: 18, fontWeight: "800" }}
                    >
                      Select one option
                    </Text>
                  </View>

                  <FlatList
                    data={subjects}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                    // showsVerticalScrollIndicator={true}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => setQualification(item.courses)}
                        style={{
                          height: hp(4.5),
                          alignItems: "center",
                          width: wp(90),
                          flexDirection: "row",
                          backgroundColor:
                            item.courses == qualification ? "#2F5597" : "#fff",
                          marginTop: hp(2),
                        }}
                      >
                        <Text
                          style={{
                            color:
                              qualification == item.courses ? "#fff" : "#000",
                            fontSize: 13,
                            marginLeft: wp(4),
                          }}
                        >
                          {item.courses}
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
              visible={details}
              onRequestClose={() => setDetails(false)}
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
                      onPress={() => setDetails(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setDetails(false)}
                      style={styles.tickWrapper}
                    >
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                    >
                      Add Detail
                    </Text>
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      top: hp(12),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}>
                      {" "}
                      Name of last / Current School{" "}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(3),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      placeholder="National University of Singapore"
                      placeholderTextColor={"lightgrey"}
                      style={{
                        marginLeft: wp(2),
                        width: wp(75),
                        color: "#000",
                      }}
                      value={school}
                      onChangeText={(text) => {
                        onChangeSchool(text);
                      }}
                    />
                    <TouchableOpacity
                      onPress={(text) => {
                        onChangeSchool(text);
                      }}
                    >
                      <Image
                        source={require("../Assets/School.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      top: hp(21),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Year In Service </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(4),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => setExperience(value)}
                      items={Experience_List}
                      value={Experience}
                      placeholder={{}}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: wp(77),
                          justifyContent: "space-between",
                          paddingHorizontal: wp(4),
                        }}
                      >
                        {Experience_List.map(
                          (item) =>
                            item.value === Experience && (
                              <Text
                                key={item.value}
                                style={{
                                  fontSize: 13,
                                  color: "#000",
                                  marginTop: 10,
                                }}
                              >
                                {item.label}
                              </Text>
                            )
                        )}
                        <Image
                          source={require("../Assets/downbutton.png")}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            marginTop: hp(1),
                          }}
                        />
                      </View>
                    </RNPickerSelect>
                    <Image
                      source={require("../Assets/Course.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>
                  {/* <View style={{ position: 'absolute', top: hp(22), left: wp(10), zIndex: 999, backgroundColor: '#fff' }}>
                                        <Text style={{ color: '#000' }}>   Course   </Text>
                                    </View> */}

                  {/* <View style={{ borderWidth: 1, marginTop: hp(4), flexDirection: 'row', alignItems: 'center', borderColor: 'lightgrey', marginHorizontal: wp(5), height: hp(6), borderRadius: 4, }}>
                                        <TextInput
                                            placeholder='Engineering'
                                            placeholderTextColor={'lightgrey'}
                                            style={{ marginLeft: wp(2), width: wp(75) }}
                                            value={courses}
                                            onChangeText={(text) => setCourses(text)} />

                                        <Image source={require('../Assets/Course.png')}
                                            style={{ height: hp(3), width: wp(6) }}
                                        />
                                    </View> */}
                  {/* <View style={{ position: 'absolute', bottom: hp(13), left: wp(10), zIndex: 999, backgroundColor: '#fff' }}>
                                        <Text style={{ color: '#000' }}>   Year/Graduation   </Text>
                                    </View> */}

                  {/* <View style={{ borderWidth: 1, marginTop: hp(4), flexDirection: 'row', alignItems: 'center', borderColor: 'lightgrey', marginHorizontal: wp(5), height: hp(6), borderRadius: 4, }}>
                                        <TextInput
                                            placeholder='2018'
                                            placeholderTextColor={'lightgrey'}
                                            style={{ marginLeft: wp(2), width: wp(75) }}
                                            value={year}
                                            onChangeText={(text) => setYear(text)} />

                                        <Image source={require('../Assets/Year.png')}
                                            style={{ height: hp(3), width: wp(6) }}
                                        />
                                    </View> */}

                  <View
                    style={{
                      alignItems: "flex-end",
                      marginRight: wp(5),
                      marginTop: hp(1.5),
                    }}
                  >
                    <Text style={{ color: "lightgrey", fontSize: 14 }}>
                      up to 35 characters per block
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Modal when not a ex teacher and current teacher */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={detailsE}
              onRequestClose={() => setDetailsE(false)}
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
                      onPress={() => setDetailsE(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setDetailsE(false);
                      }}
                      style={styles.tickWrapper}
                    >
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                    >
                      Add Details
                    </Text>
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      top: hp(12),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Name of Schoolaaa</Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(3),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      placeholder="National University of Singapore"
                      placeholderTextColor={"lightgrey"}
                      style={{
                        marginLeft: wp(2),
                        width: wp(75),
                        color: "#000",
                      }}
                      value={school1}
                      onChangeText={(text) => setSchool1(text)}
                    />
                    <Image
                      source={require("../Assets/School.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: hp(21),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Course</Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(3),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      placeholder="National University of Singapore"
                      placeholderTextColor={"lightgrey"}
                      style={{
                        marginLeft: wp(2),
                        width: wp(75),
                        color: "#000",
                      }}
                      value={courses}
                      onChangeText={(value) => setCourses(value)}
                    />
                    <Image
                      source={require("../Assets/Course.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      top: hp(31),
                      left: wp(12),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Year/Graduation</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(4),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      placeholder="2021"
                      placeholderTextColor={"lightgrey"}
                      style={{
                        marginLeft: wp(2),
                        width: wp(75),
                        color: "#000",
                      }}
                      value={gradYear}
                      onChangeText={(text) => {
                        setGradYear(text);
                      }}
                    />
                    <Image
                      source={require("../Assets/Course.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
            {/* modal end */}
          </View>
          <View
            style={{
              flex: 0.1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
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

            <TouchableOpacity
              onPress={() => setShowEmail("History")}
              style={styles.circleArrow}
            >
              <Image source={require("../Assets/circleArrow.png")} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showemail == "History" && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <TouchableOpacity
              onPress={() => setHistoryModal(true)}
              style={{
                borderWidth: 1,
                borderColor: "lightgrey",
                height: hp(8),
                paddingHorizontal: wp(2),
                width: wp(90),
                marginLeft: wp(5),
              }}
            >
              <Text
                style={{
                  color: "lightgrey",
                  fontSize: 14,
                  paddingTop: hp(0.5),
                }}
              >
                You can list the School Name, Exam & Results in this section
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //  onPress={() => setHistoryModal(true)}
              onPress={() => AddHistoryModal()}
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
                <Text
                  style={{ fontSize: 25, color: "#fff", fontWeight: "800" }}
                >
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
                Add History (optional)
              </Text>
            </TouchableOpacity>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {records &&
                records.map((item) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: wp(5),
                        backgroundColor: "#fff",
                        elevation: 10,

                        marginTop: hp(2),
                        marginBottom: hp(2),
                      }}
                    >
                      <View
                        style={{
                          marginLeft: wp(3),
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#2F5597",
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          {item?.school}
                        </Text>
                        {/* <Text style={{ color: "#000", fontSize: 14 }}>
                          {Experience}
                          </Text> */}
                        <Text style={{ color: "#000", fontSize: 14 }}>
                          {item?.exam}
                        </Text>

                        <View>
                          <View
                            style={{ flexDirection: "row", marginBottom: 5 }}
                          >
                            <Text
                              style={{
                                width: wp(50),
                                color: "#000",
                                fontSize: 14,
                              }}
                            >
                              Subject
                            </Text>

                            <Text
                              style={{
                                width: wp(15),
                                color: "#000",
                                fontSize: 14,
                              }}
                            >
                              Grade
                            </Text>
                          </View>
                          {item.Results &&
                            item.Results.map((item1, resultIndex) => (
                              <>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginBottom: 5,
                                    borderBottomWidth: 1,
                                  }}
                                >
                                  <Text
                                    style={{
                                      width: wp(50),
                                      color: "#000",
                                      fontSize: 14,
                                    }}
                                  >
                                    {item1?.Result_subject} {"  "}
                                  </Text>

                                  <Text
                                    style={{
                                      width: wp(10),
                                      color: "#000",
                                      fontSize: 14,
                                    }}
                                  >
                                    {item1?.Result_grade}
                                  </Text>
                                </View>
                              </>
                            ))}
                        </View>

                        {/* <Text style={{ color: "#000", fontSize: 14 }}>
                        {item?.subject}
                      </Text>
                      <Text style={{ color: "#000", fontSize: 14 }}>
                        {item?.grade}
                      </Text> */}
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            handleEdit(
                              item.HistoryID,
                              item.school,
                              item.exam,
                              item.subject,
                              item.grade
                            )
                          }
                          style={{
                            backgroundColor: "lightblue",
                            borderRadius: 6,
                            height: hp(6),
                            width: wp(14),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../Assets/Pencil.png")}
                            style={{ height: hp(3), width: wp(6) }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#2F5597",
                            marginTop: 5,
                            borderRadius: 6,
                            height: hp(6),
                            width: wp(14),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          // onPress={() =>RemoveTempExercise(selectArray, "grade", item?.grade)
                          onPress={() => deleteRecord(item.HistoryID)}
                        >
                          <Image
                            source={require("../Assets/delete.png")}
                            style={{ height: hp(4), width: wp(7) }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={historyModal}
              onRequestClose={() => {
                setHistoryModal(false);
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
                      onPress={() => CrossButton()}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.tickWrapper}
                      onPress={() => onTickFunc()}
                    >
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 20,
                          fontWeight: "800",
                        }}
                      >
                        Add History
                      </Text>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        top: hp(12),
                        left: wp(10),
                        zIndex: 999,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Text style={{ color: "#000" }}> Name of School </Text>
                    </View>

                    <View
                      style={{
                        borderWidth: 1,
                        marginTop: hp(3),
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "lightgrey",
                        marginHorizontal: wp(5),
                        height: hp(6),
                        borderRadius: 4,
                      }}
                    >
                      <TextInput
                        placeholder="Pioneer Junior College"
                        placeholderTextColor={"lightgrey"}
                        style={{
                          marginLeft: wp(2),
                          width: wp(75),
                          color: "#000",
                        }}
                        value={school}
                        onChangeText={(text) => setSchool(text)}
                      />

                      <Image
                        source={require("../Assets/School.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: hp(21),
                        left: wp(10),
                        zIndex: 999,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Text style={{ color: "#000" }}> Exam </Text>
                    </View>

                    <View
                      style={{
                        borderWidth: 1,
                        marginTop: hp(4),
                        flexDirection: "row",
                        alignItems: "center",
                        borderColor: "lightgrey",
                        marginHorizontal: wp(5),
                        height: hp(6),
                        borderRadius: 4,
                      }}
                    >
                      <RNPickerSelect
                        onValueChange={(value) => setState(value)}
                        items={state_list}
                        value={state}
                        placeholder={{}}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: wp(77),
                            justifyContent: "space-between",
                            paddingHorizontal: wp(4),
                          }}
                        >
                          {state_list.map(
                            (item) =>
                              item.value === state && (
                                <Text
                                  key={item.value}
                                  style={{
                                    fontSize: 13,
                                    color: "#000",
                                    marginTop: 10,
                                  }}
                                >
                                  {item.label}
                                </Text>
                              )
                          )}
                          <Image
                            source={require("../Assets/downbutton.png")}
                            style={{
                              height: hp(3),
                              width: wp(6),
                              marginTop: hp(1),
                            }}
                          />
                        </View>
                      </RNPickerSelect>
                      <Image
                        source={require("../Assets/Exam.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </View>

                    {state == "Others" ? (
                      <View>
                        <View
                          style={{
                            position: "absolute",
                            top: hp(1),
                            left: wp(10),
                            zIndex: 999,
                            backgroundColor: "#fff",
                          }}
                        >
                          <Text style={{ color: "#000" }}> Exam Name</Text>
                        </View>

                        <View
                          style={{
                            borderWidth: 1,
                            marginTop: hp(3),
                            flexDirection: "row",
                            alignItems: "center",
                            borderColor: "lightgrey",
                            marginHorizontal: wp(5),
                            height: hp(6),
                            borderRadius: 4,
                          }}
                        >
                          <TextInput
                            placeholder="IGCSE"
                            placeholderTextColor={"lightgrey"}
                            style={{
                              marginLeft: wp(2),
                              width: wp(75),
                              color: "#000",
                            }}
                            value={otherExam}
                            onChangeText={(value) => setOtherExam(value)}
                          />

                          <Image
                            source={require("../Assets/Exam.png")}
                            style={{ height: hp(3), width: wp(6) }}
                          />
                        </View>
                      </View>
                    ) : null}

                    <View>
                      {sections.map((section, index) => (
                        <View style={{ flexDirection: "row" }} key={index}>
                          <View>
                            <View
                              style={{
                                position: "absolute",
                                top: hp(1.5),
                                left: wp(10),
                                zIndex: 999,
                                backgroundColor: "#fff",
                              }}
                            >
                              <Text style={{ color: "#000" }}> Subject </Text>
                            </View>

                            <View
                              style={{
                                borderWidth: 1,
                                marginTop: hp(3),
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: wp(5),
                                borderColor: "lightgrey",
                                width: wp(45),
                                height: hp(6),
                                borderRadius: 4,
                              }}
                            >
                              <TextInput
                                placeholder="Subject"
                                placeholderTextColor={"lightgrey"}
                                style={{
                                  marginLeft: wp(2),
                                  width: wp(34),
                                  color: "#000",
                                }}
                                value={section.subject}
                                onChangeText={(text) =>
                                  handleSubjectChange(text, index)
                                }
                              />

                              <Image
                                source={require("../Assets/Course.png")}
                                style={{ height: hp(3), width: wp(6) }}
                              />
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                position: "absolute",
                                top: hp(1.5),
                                left: wp(10),
                                zIndex: 999,
                                backgroundColor: "#fff",
                              }}
                            >
                              <Text style={{ color: "#000" }}> Grade </Text>
                            </View>

                            <View
                              style={{
                                borderWidth: 1,
                                marginTop: hp(3),
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: wp(3),
                                borderColor: "lightgrey",
                                width: wp(35),
                                height: hp(6),
                                borderRadius: 4,
                              }}
                            >
                              <TextInput
                                placeholder="Grade"
                                placeholderTextColor={"lightgrey"}
                                style={{
                                  marginLeft: wp(2),
                                  width: wp(22),
                                  color: "#000",
                                }}
                                value={section.grade}
                                onChangeText={(text) =>
                                  handleGradeChange(text, index)
                                }
                              />

                              <Image
                                source={require("../Assets/Grade.png")}
                                style={{ height: hp(3), width: wp(6) }}
                              />
                            </View>
                            {/* Render subject and grade input fields for each section */}

                            <TouchableOpacity
                              onPress={() => deleteSection(index)}
                              style={{
                                height: hp(3),
                                width: wp(6),
                                marginTop: hp(3),
                                marginLeft: wp(1),
                              }}
                            >
                              {/* Render a delete button for each section */}
                              <Image
                                source={require("../Assets/Deletes.png")}
                                style={{
                                  height: 20,
                                  width: 20,

                                  marginLeft: wp(1),
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>

                    {/* <View style={{ flexDirection: "row" }}>
                    <View>
                      <View
                        style={{
                          position: "absolute",
                          top: hp(1.5),
                          left: wp(10),
                          zIndex: 999,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Text style={{ color: "#000" }}> Subject </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: hp(3),
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: wp(5),
                          borderColor: "lightgrey",
                          width: wp(45),
                          height: hp(6),
                          borderRadius: 4,
                        }}
                      >
                        <TextInput
                          placeholder="Subject"
                          placeholderTextColor={"lightgrey"}
                          style={{
                            marginLeft: wp(2),
                            width: wp(34),
                            color: "#000",
                          }}
                          value={subject}
                          onChangeText={(text) => setSubject(text)}
                        />

                        <Image
                          source={require("../Assets/Course.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: hp(1.5),
                          left: wp(10),
                          zIndex: 999,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Text style={{ color: "#000" }}> Grade </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: hp(3),
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: wp(3),
                          borderColor: "lightgrey",
                          width: wp(35),
                          height: hp(6),
                          borderRadius: 4,
                        }}
                      >
                        <TextInput
                          placeholder="Grade"
                          placeholderTextColor={"lightgrey"}
                          style={{
                            marginLeft: wp(2),
                            width: wp(22),
                            color: "#000",
                          }}
                          value={grade}
                          onChangeText={(text) => DeleteSubjectSection(text)}
                        />

                        <Image
                          source={require("../Assets/Grade.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </View>
                      <TouchableOpacity>
                        <Image
                          source={require("../Assets/Deletes.png")}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            marginTop: hp(3),
                            marginLeft: wp(1),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View> */}
                    <TouchableOpacity
                      onPress={() => AddSubjectSection(true)}
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
                        <Text
                          style={{
                            fontSize: 25,
                            color: "#fff",
                            fontWeight: "800",
                          }}
                        >
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
                        Add Result (optional)
                      </Text>
                    </TouchableOpacity>
                    <View style={{ height: 20 }}></View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={showEditModal}
              onRequestClose={() => {
                setShowEditModal(false);
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
                      onPress={() => setShowEditModal(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.tickWrapper}
                      onPress={() => UpdateRecord()}
                    >
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                    >
                      Edit History
                    </Text>
                  </View>

                  <View
                    style={{
                      position: "absolute",
                      top: hp(12),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Name of School </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(3),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      placeholder="Pioneer Junior College"
                      placeholderTextColor={"lightgrey"}
                      style={{
                        marginLeft: wp(2),
                        width: wp(75),
                        color: "#000",
                      }}
                      value={school}
                      onChangeText={(text) => setSchool(text)}
                    />

                    <Image
                      source={require("../Assets/School.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: hp(21),
                      left: wp(10),
                      zIndex: 999,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={{ color: "#000" }}> Exam </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      marginTop: hp(4),
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "lightgrey",
                      marginHorizontal: wp(5),
                      height: hp(6),
                      borderRadius: 4,
                    }}
                  >
                    <RNPickerSelect
                      onValueChange={(value) => setState(value)}
                      items={state_list}
                      value={state}
                      placeholder={{}}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: wp(77),
                          justifyContent: "space-between",
                          paddingHorizontal: wp(4),
                        }}
                      >
                        {state_list.map(
                          (item) =>
                            item.value === state && (
                              <Text
                                key={item.value}
                                style={{
                                  fontSize: 13,
                                  color: "#000",
                                  marginTop: 10,
                                }}
                              >
                                {item.label}
                              </Text>
                            )
                        )}
                        <Image
                          source={require("../Assets/downbutton.png")}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            marginTop: hp(1),
                          }}
                        />
                      </View>
                    </RNPickerSelect>
                    <Image
                      source={require("../Assets/Exam.png")}
                      style={{ height: hp(3), width: wp(6) }}
                    />
                  </View>

                  {state == "Others" ? (
                    <View>
                      <View
                        style={{
                          position: "absolute",
                          top: hp(1),
                          left: wp(10),
                          zIndex: 999,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Text style={{ color: "#000" }}> Exam Name</Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: hp(3),
                          flexDirection: "row",
                          alignItems: "center",
                          borderColor: "lightgrey",
                          marginHorizontal: wp(5),
                          height: hp(6),
                          borderRadius: 4,
                        }}
                      >
                        <TextInput
                          placeholder="IGCSE"
                          placeholderTextColor={"lightgrey"}
                          style={{
                            marginLeft: wp(2),
                            width: wp(75),
                            color: "#000",
                          }}
                          value={otherExam}
                          onChangeText={(value) => setOtherExam(value)}
                        />

                        <Image
                          source={require("../Assets/Exam.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </View>
                    </View>
                  ) : null}
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <View
                        style={{
                          position: "absolute",
                          top: hp(1.5),
                          left: wp(10),
                          zIndex: 999,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Text style={{ color: "#000" }}> Subject </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: hp(3),
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: wp(5),
                          borderColor: "lightgrey",
                          width: wp(45),
                          height: hp(6),
                          borderRadius: 4,
                        }}
                      >
                        <TextInput
                          placeholder="Subject"
                          placeholderTextColor={"lightgrey"}
                          style={{
                            marginLeft: wp(2),
                            width: wp(34),
                            color: "#000",
                          }}
                          value={subject}
                          onChangeText={(text) => setSubject(text)}
                        />

                        <Image
                          source={require("../Assets/Course.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: hp(1.5),
                          left: wp(10),
                          zIndex: 999,
                          backgroundColor: "#fff",
                        }}
                      >
                        <Text style={{ color: "#000" }}> Grade </Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: hp(3),
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: wp(3),
                          borderColor: "lightgrey",
                          width: wp(35),
                          height: hp(6),
                          borderRadius: 4,
                        }}
                      >
                        <TextInput
                          placeholder="Grade"
                          placeholderTextColor={"lightgrey"}
                          style={{
                            marginLeft: wp(2),
                            width: wp(22),
                            color: "#000",
                          }}
                          value={grade}
                          onChangeText={(text) => setGrade(text)}
                        />

                        <Image
                          source={require("../Assets/Grade.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </View>
                      <TouchableOpacity>
                        <Image
                          source={require("../Assets/Deletes.png")}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            marginTop: hp(3),
                            marginLeft: wp(1),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 0.1, paddingBottom: hp(5) }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.circleArrow}
            >
              <Image
                style={{ transform: [{ rotate: "180deg" }] }}
                source={require("../Assets/circleArrow.png")}
              />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => saveacademicinfo()}
                // onPress={() => navigation.navigate('YourProfle', {
                //     complete: 'Academiccomplete'
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
      )}
    </View>
  );
};

export default AcademicInfo;

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
    marginTop: hp(2),
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

    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(10),
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
    marginHorizontal: wp(5),
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
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  crossImage: { height: hp(4), width: wp(8) },
  tickWrapper: {
    backgroundColor: "green",
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: { height: hp(2), width: wp(7) },
});
