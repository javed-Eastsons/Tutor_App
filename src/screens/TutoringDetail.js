import React, { component, useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert
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
import { editProfile, GetUserProfile } from "../Redux/Actions/Tutors";

import { Tutoring_Data } from "../Redux/Actions/types";
import {
  getLevelList,
  getGradeList,
  getSubjectList,
} from "../Redux/Actions/Tutors";

var selectArray = [];
//var gradeArray = [];

const TutoringDetail = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { LEVEL_LIST } = useSelector((state) => state.TutorReducer);
  const { SUBJECT_LIST } = useSelector((state) => state.TutorReducer);
  const { GRADE_LIST } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  const [tutoring, setTutoring] = useState("");
  const [tutoringEdit, setTutoringEdit] = useState("");
  const [levelPop, setlevelpop] = useState(false)
  const [P1, setP1] = useState("");
  const [P2, setP2] = useState("");
  const [P3, setP3] = useState("");
  const [P4, setP4] = useState("");
  const [P5, setP5] = useState("");
  const [gradeArray, setGradeArray] = useState([]);
  const [streamArray, setStreamArray] = useState([]);
  const [admissionArray, setAdmissionArray] = useState([]);
  const [admissionlevel, setAdmissionLevel] = useState("");
  const [streamlevel, setStreamLevel] = useState("");
  const [P6, setP6] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [editGrades, setEditGrades] = useState([])
  const [grade, setGrade] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  //const [records, setRecords] = useState(selectArray);
  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tutSave, setTutSave] = useState(false);
  const [editId, setEditId] = useState(); // ID of the record you want to edit
  const [editTut, setEditTut] = useState(false)
  const [EditLevel, setEditLevel] = useState()
  const [completeEditLevel, setCompleteEditLevel] = useState()
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  // const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = (index) => {
    setExpandedItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  //console.log(records, "recordsrecordsrecordsrecordsrecords");
  console.log(SUBJECT_LIST, "SUBJECT_LISTSUBJECT_LISTSUBJECT_LIST");


  // console.log(grade, "gradeJK");
  // console.log(gradeArray, "gradeArray");
  //console.log(GRADE_LIST, "GRADE->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // console.log(SUBJECT_LIST, "SUBJECT_LIST");

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

  //console.log(selectArray, "selectArrayselectArrayselectArray");

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

    //  gradeArray = Ex_array;
    setGradeArray(Ex_array);
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
  const [levelDetail, setLevelDetail] = useState(false);
  const [levelDetailYear, setLevelDetailYear] = useState("");
  const [levelDetailGrade, setLevelDetailGrade] = useState("");

  const [count, setCount] = useState(0);
  console.log(selectListTutor, "selectListTutor");
  // console.log(levelDetail,'levelDetail')

  const [state, setState] = useState("Select Year");
  const state_list = [
    { label: "0", value: "0" },
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
  const [state2, setState2] = useState("Select Month");
  const state_list2 = [
    { label: "0", value: "0" },
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
  const [tutorSubjectEdit, setTutorSubjectEdit] = useState("");

  const [selectedItems, setselectedItems] = useState([]);
  // console.log(tutorSubject,'tutorSubject')
  // console.log(selectedItems,'selectedItems')

  console.log(route.params.Tutoring_Info, 'Tutoring_InfoTutoring_InfoTutoring_InfoTutoring_InfoTutoring_InfoTutoring_InfoTutoring_InfoTutoring_InfoTutoring_Info')


  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const ALLDATA = () => {

    selectListTutor, gradeArray, state, state2, selectedItems;

    console.log(
      selectListTutor,
      gradeArray,
      state,
      state2,
      selectedItems,
      "ALLDATA"
    );

    // if (P1 == P1) {
    //   setSelectListTutor("");
    const obj3 = [];
    const randomNum = getRandomNumber(1, 9999);


    //  setCount(count + 1);

    console.log(obj3, "AAAAA");
    console.log(editId, 'editId')
    var item1 = {};
    //  item1["tutoring_detail_id"] = count;
    item1["tutoring_detail_id"] = randomNum;
    item1["TutoringLevel"] = selectListTutor;
    item1["AdmissionLevel"] = admissionlevel;
    item1["Tutoring_Grade"] = gradeArray.map((item) => item?.Grade);
    item1["Tutoring_Year"] = state;
    item1["Tutoring_Month"] = state2;
    item1["Tutoring_ALL_Subjects"] = selectedItems;

    if (
      !isExistInArray(
        selectArray,
        "tutoring_detail_id",
        item1.tutoring_detail_id
      )
    ) {
      //  console.log('insert in array');
      // records.push(item1);
      // selectArray.push(item1);
      // setRecords(selectArray);

      if (records == undefined) {
        selectArray.push(item1);
        setRecords(selectArray);
      }
      else {
        records.push(item1)
        setRecords(records);
      }

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


  const UpdateRecord = () => {
    console.log(editId);
    const newData = records.map((record) => {
      if (record.tutoring_detail_id === editId) {
        return {
          ...record,
          TutoringLevel: selectListTutor,
          Tutoring_Grade: gradeArray,
          Tutoring_Year: state,
          Tutoring_Month: state2,
          Tutoring_ALL_Subjects: selectedItems,
          // You can update other fields here as well
        };
      }
      return record;
    });

    setRecords(newData);
    console.log(newData, "newDatanewDatanewDatanewDatanewData");
  };
  const UpdateLevelRecord = () => {
    console.log(editId);
    const newData = records.map((record) => {
      if (record.tutoring_detail_id === editId) {
        return {
          ...record,

          TutoringLevel: selectListTutor,
        };
      }
      return record;
    });

    setRecords(newData);
    setEditTut(false)
    // setTutorSubjectEdit(true)

    setLevelDetailGrade(true)
    // setLevelDetailYear(true)
    console.log(newData, "newDatanewDatanewDatanewDatanewData");
  };
  const UpdateYearRecord = () => {
    console.log(editId);
    const newData = records.map((record) => {
      console.log(record, 'record.Id')
      if (record.tutoring_detail_id === editId) {
        return {
          ...record,

          Tutoring_Year: state,
          Tutoring_Month: state2,

          // You can update other fields here as well
        };
      }
      return record;
    });

    setRecords(newData);
    setEditTut(false)
    if (levelPop == true) {
      handleSubjectEdit()
      setlevelpop(false)
    }
    console.log(newData, "newDatanewDatanewDatanewDatanewData");
  };
  const UpdateGradeRecord = () => {
    console.log(editId);
    const newData = records.map((record) => {
      if (record.tutoring_detail_id === editId) {
        return {
          ...record,

          Tutoring_Grade: gradeArray.map((item) => item?.Grade),
          //AdmissionLevel: admissionArray.map((item) => item?.Admission),
          AdmissionLevel: admissionlevel


          // You can update other fields here as well
        };
      }
      return record;

    });

    setRecords(newData);
    setEditTut(false)
    if (levelPop == true) {
      setLevelDetailYear(true)
    }
    console.log(newData, "newDatanewDatanewDatanewDatanewData");
  };




  const UpdateSubjectRecord = () => {
    console.log(editId);
    console.log(selectedItems, 'subjectss')
    const newData = records.map((record) => {
      if (record.tutoring_detail_id === editId) {
        return {
          ...record,

          Tutoring_ALL_Subjects: selectedItems
          // You can update other fields here as well
        };
      }
      return record;
    });

    setRecords(newData);
    setEditTut(false)

    console.log(newData, "newDatanewDatanewDatanewDatanewData");
  };
  const EDITDATA = (id) => {
    setEditId(id)

    if (editTut == true) {
      setEditTut(false)
    }
    else {
      setEditTut(true)
    }




  };
  const editLevel = (level) => {
    setTutoringEdit(true)
    dispatch(getGradeList(level));

  }


  // console.log(gradeArray, 'UUUUUUUUUUUUUUUUUUUUUUUUU')

  const SelectAllOption = () => {
    if (GRADE_LIST?.Grade_List) {
      const allGrades = GRADE_LIST.Grade_List.map((item) => item.grade_name);

      // Check if allGrades are already in gradeArray
      const areAllGradesSelected = allGrades.every((grade) =>
        gradeArray.some((obj) => obj.Grade === grade)
      );

      if (!areAllGradesSelected) {
        // Add all grades to gradeArray
        const updatedGradeArray = [
          ...gradeArray,
          ...allGrades.map((grade) => ({ Grade: grade })),
        ];
        setGradeArray(updatedGradeArray);
      } else {
        // Remove all grades from gradeArray
        const filteredGradeArray = gradeArray.filter(
          (obj) => !allGrades.includes(obj.Grade)
        );
        setGradeArray(filteredGradeArray);
      }
    }
  };

  console.log(gradeArray, "AllArrayAllArray");
  console.log(admissionArray, "admissionArrayadmissionArray");

  // const SelectAllOption = () => {
  //   if (GRADE_LIST?.Grade_List) {
  //     const allGrades = GRADE_LIST.Grade_List.map((item) => item.grade_name);
  //     // Update the gradeArray with all grades
  //     console.log(allGrades, "allGradesallGradesallGrades");

  //     const obj3 = [];

  //     setCount(count + 1);

  //     console.log(obj3, "AAAAA");

  //     var item1 = {};
  //     item1["Grade"] = allGrades;

  //     if (!isExistInArray(gradeArray, "Grade", item1.Grade)) {
  //       //  console.log('insert in array');
  //       gradeArray.push(item1);
  //       // selectArray.push(obj3);
  //     } else {
  //       RemoveTempExercise(gradeArray, "Grade", item1.Grade);
  //     }
  //     //  setGradeArray(allGrades);
  //   }
  // };

  // console.log(
  //   gradeArray,
  //   //selectArray.Tutoring_ALL_Subjects[1],
  //   "@@@@@@@@@@@@@@@@@@@@@@@@@"
  // );

  const gradeData = (val) => {
    console.log(val, "@@@@@AAAAJJJJ@@@@");

    // if (P1 == P1) {
    //   setSelectListTutor("");
    const obj3 = [];

    setCount(count + 1);

    console.log(obj3, "AAAAA");

    var item1 = {};
    item1["Grade"] = val;

    if (!isExistInArray(gradeArray, "Grade", item1.Grade)) {
      //  console.log('insert in array');
      gradeArray.push(item1);
      // selectArray.push(obj3);
    } else {
      RemoveTempExercise(gradeArray, "Grade", item1.Grade);
    }
    // }
  };


  const AdmissionLevel = (val) => {
    console.log(val, selectListTutor, "@@@@@AAAAJJJJ@@@@");

    setLoader1(true)
    setAdmissionLevel(val)
    setGradeArray([])
    setAdmissionArray([]);
    const selectedGrade = { "Admission": val };
    setAdmissionArray([selectedGrade]);
    dispatch(getGradeList(selectListTutor, val));

    setTimeout(() => {
      setLoader1(false)
    }, 2000);



  };


  const SecAdmissionLevel = (val) => {
    console.log(val, selectListTutor, "@@@@@AAAAJJJJ@@@@");
    // setLoader(true)
    setAdmissionLevel(val)
    setAdmissionArray([]);
    const selectedGrade = { "Admission": val };
    setAdmissionArray([selectedGrade]);
    dispatch(getGradeList(selectListTutor, val));

  };

  const StreamLevel = (val) => {
    console.log(val, selectListTutor, "@@@@@AAAAJJJJ@@@@");
    //  setLoader(true)
    setStreamLevel(val)
    setGradeArray([]);
    const selectedGrade = { "Grade": val };

    // setGradeArray([selectedGrade]);
    setGradeArray([selectedGrade]);
    dispatch(getGradeList(selectListTutor, val));


  };





  //  console.log(count, "countttttttttttt");
  // console.log(
  //   gradeArray,
  //   //selectArray.Tutoring_ALL_Subjects[1],
  //   "selectArrayselectArray@@@@@@@@@@@@@@@@@@@@@@@@@"
  // );

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
  const handleGradeEdit = (level, selectedgrade, admission) => {
    setSelectListTutor(level)
    // setAdmissionArray()
    setAdmissionLevel(admission)
    console.log(level, selectedgrade, admission, '999999999999999999')
    setLoader(true)
    dispatch(getGradeList(level, admission));

    // setSelectListTutor(level)
    //setEditLevel(level)
    console.log(level, selectedgrade, 'ZZZZZZZZZZZZZ', editLevel)

    if (typeof selectedgrade === 'string' && typeof admission === 'string') {
      const gradesArray = selectedgrade.split(","); // Split the string into an array
      const admissionArray = admission.split(","); // Split the string into an array

      const transformedGrades = gradesArray.map(grade => ({ "Grade": grade })); // Transform each element
      const transformedAdmission = admissionArray.map(admission => ({ "Admission": admission })); // Transform each element

      console.log(level, selectedgrade, "IIIIIIIIIIIIIIIIII", transformedGrades)
      setGradeArray(transformedGrades)
      setAdmissionArray(transformedAdmission)

    }

    else if (Array.isArray(selectedgrade) && typeof admission === 'string') {
      //const gradesArray = selectedgrade.split(","); // Split the string into an array
      const admissionArray = admission.split(","); // Split the string into an array

      const transformedGrades = selectedgrade.map(grade => ({ "Grade": grade })); // Transform each element
      const transformedAdmission = admissionArray.map(admission => ({ "Admission": admission })); // Transform each element

      console.log(level, selectedgrade, "IIIIIIIIIIIIIIIIII", transformedGrades)
      setGradeArray(transformedGrades)
      setAdmissionArray(transformedAdmission)

    }
    else {
      const transformedGrades = selectedgrade.map(grade => ({ "Grade": grade }));
      const transformedAdmission = admission.map(admission => ({ "Admission": admission })); // Transform each element

      console.log(level, selectedgrade, "IIIIIIIIIIIIIIIIII", transformedGrades)
      setGradeArray(transformedGrades)
      setAdmissionArray(transformedAdmission)
    }
    setTimeout(() => {
      setLoader(false)
    }, 2000);

    // const transformedGrades = selectedgrade.map(grade => ({ "Grade": grade }));

    setLevelDetailGrade(true)

    //gradeArray.splice(0, gradeArray.length)

    setEditLevel(level)
  }




  const handleTutExp = (year, month) => {
    //console.log(year, month, '33333333333333333')
    setState(year),
      setState2(month)
    setLevelDetailYear(true)

  }

  //console.log(editLevel, 'editleveleditleveleditleveleditleveleditlevel')
  const addNewTutoring = () => {
    setselectedItems([])
    setTutoring(true)
  }
  const handleSubjectEdit = (level, subjects) => {

    console.log(level, '999999999', subjects)

    if (typeof subjects === 'string') {
      const transformedsubject = subjects.split(","); // Split the string into an array

      // const transformedsubject = subjectArray.map(grade => ({ "Grade": grade })); // Transform each element
      console.log(level, subjects, "IIIIIIIIIIIIIIIIII", transformedsubject)
      setselectedItems(transformedsubject)

    }
    else {
      const transformedsubject = subjects;
      console.log(level, subjects, "IIIIIIIIIIIIIIIIII", transformedsubject)
      setselectedItems(transformedsubject)
    }


    dispatch(getSubjectList(level));
    setTutorSubjectEdit(true)
    //setselectedItems([])

    setEditLevel(level)
  }







  const savedata = () => {



    // dispatch(editProfile(selectListTutor,state,state2,selectArray, GET_USER_ID));
    //   console.log(selectListTutor, state, state2, selectArray, GET_USER_ID, 'OOOOOOOOOOOOOOOOOOAAAAAAAAA');
    setTutSave(true);


    console.log(records, 'recordsrecordsrecordsrecordsAAAAAAA')
    // let obj = {
    //   selectListTutor: selectListTutor,
    //   state: state,
    //   state2: state2,
    //   selectArray: selectArray,
    //   GET_USER_ID: GET_USER_ID,
    //   tutSave: tutSave,
    //   // selectArray: records

    // };
    // const convertedData = records.map(item => {
    //   // Check if the properties exist and are non-null
    //   const tutoringAllSubjects = item?.Tutoring_ALL_Subjects
    //     ? item.Tutoring_ALL_Subjects.split(',')
    //     : [];
    //   const tutoringGrade = item?.Tutoring_Grade
    //     ? item.Tutoring_Grade.split(',')
    //     : [];

    //   // Create a new object with the converted values
    //   return {
    //     ...item,
    //     Tutoring_ALL_Subjects: tutoringAllSubjects,
    //     Tutoring_Grade: tutoringGrade
    //   };
    // });







    // console.log(convertedData, 'convertedDataconvertedDataconvertedData')

    let obj = {
      selectArray: records
    }

    dispatch({
      type: Tutoring_Data,
      payload: obj,
    });

    console.log(obj, 'KKKKKKKKKKKKKKKKKKKKKKKK',)

    if (route.params.RouteFrom == "Update") {
      navigation.navigate("UpdateProfile", {
        selectListTutor: selectListTutor,
        state: state,
        state2: state2,
        selectArray: selectArray,
        GET_USER_ID: GET_USER_ID,
      });
    } else {
      navigation.navigate("YourProfle", {
        selectListTutor: selectListTutor,
        state: state,
        state2: state2,
        selectArray: selectArray,
        GET_USER_ID: GET_USER_ID,
      });
    }
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

  // const SelectAllOption = () => {
  //   setp1fun("P1");
  //   setp2fun("P2");
  //   setp3fun("P3");
  //   setp4fun("P4");
  //   setp5fun("P5");
  //   setp6fun("P6");
  // };

  useEffect(() => {
    dispatch(getLevelList());
  }, []);

  useEffect(() => {
    dispatch(getGradeList(EditLevel ? (EditLevel, "") : (selectListTutor, "")));
  }, [selectListTutor, EditLevel]);


  // useEffect(() => {
  //   dispatch(getGradeList(EditLevel ? EditLevel : selectListTutor));
  // }, [selectListTutor, EditLevel]);


  useEffect(() => {
    dispatch(getSubjectList(selectListTutor));
  }, [selectListTutor, editTut]);

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);


  //console.log(route.params.Tutoring_Info.selectArray, 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')

  useEffect(() => {
    setLoader(true);
    setUserDetail(SINGLE_USER);
    if (route.params.Tutoring_Info.selectArray == undefined) {
      // setSchool1(userDetail[0]?.Extra_info[0]?.name_of_school);
      // setCourses(userDetail[0]?.Extra_info[0]?.Course_Exam);
      /// setGradYear(userDetail[0]?.Extra_info[0]?.gra_year);
      setRecords(userDetail[0]?.tutoring_detail_arr);
    }
    else {
      setRecords(route.params.Tutoring_Info.selectArray);
    }
    // setRecords(userDetail[0]?.tutoring_detail_arr);

    // setSchool1(userDetail[0]?.Extra_info[0]?.name_of_school);
    // setCourses(userDetail[0]?.Extra_info[0]?.Course_Exam);
    // setGradYear(userDetail[0]?.Extra_info[0]?.gra_year);
    // setRecords(userDetail[0]?.history_academy_arr);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [SINGLE_USER]);


  //console.log(records, 'UUUUUUUUUUUUUUUUUU')


  const deleteRecord = (idToDelete) => {
    Alert.alert(
      'Are you sure',
      'you want to delete ?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'Yes',
          onPress: () => {
            const updatedRecords = records.filter(
              (record) => record.tutoring_detail_id !== idToDelete
            );
            console.log(updatedRecords, "AAAAAAAAAAAA");
            setRecords(updatedRecords);
          },
        },

        {
          text: 'No',
          onPress: () => { cancelable: false },
        },


      ],

    );
  };


  const selectLevelFunc = () => {
    selectListTutor == "" ? (() => { })() : setLevelDetail();
    dispatch(getGradeList(selectListTutor));
    dispatch(getSubjectList(selectListTutor));
    setLoader1(true);
    setTimeout(() => {
      setLoader1(false);
    }, 4000);
  };

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
          <View>
            <Image source={require("../Assets/chat.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}>Support</Text>
          </View>
          <View>
            <Image source={require("../Assets/bell.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}></Text>

          </View>

          {/* <Image source={require("../Assets/bell.png")} style={styles.icons} />

          <Image
            source={require("../Assets/search.png")}
            style={styles.icons}
          />
          <Image source={require("../Assets/chat.png")} style={styles.icons} /> */}
        </View>
      </View>
      {loader == true ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator style={{ alignSelf: "center" }} size={"small"} />
        </View>
      ) : (
        <View style={styles.container}>
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
              List your Tutoring Levels, Subjects & Experience.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addNewTutoring()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: wp(5),
              marginTop: hp(2),
            }}
          >
            <View
              style={{
                backgroundColor: "#2F5597",
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

          {/* {console.log(records, "LLPPPPPPPPPPPPPLLPPPPPPPPPPPPPLLPPPPPPPPPPPPPLLPPPPPPPPPPPPP")} */}

          <ScrollView style={{ height: 300 }}>
            {records &&
              records.map((item, index) => (
                <View
                  style={{
                    justifyContent: 'space-between',
                    backgroundColor: 'red',
                    marginHorizontal: wp(5),
                    backgroundColor: '#fff',
                    elevation: 10,
                    paddingVertical: hp(1),
                    marginTop: hp(2),
                    marginBottom: hp(2),

                  }}
                  key={item.tutoring_detail_id}
                >
                  {/* <Text style={{ marginLeft: wp(3), color: "#000", fontSize: 14 }}>
                      {item.Id}
                    </Text> */}

                  <View style={{ flexDirection: "row", width: wp(90) }}>
                    <View style={{ width: wp(80) }} key={index} >


                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                          }}
                        >
                          {item.TutoringLevel}
                        </Text>
                        {/* {
                          editTut == true && editId === item.tutoring_detail_id ?
                            <TouchableOpacity
                              onPress={() => editLevel(item.TutoringLevel)}
                            >
                              <Image
                                source={require("../Assets/pencilEdit.png")}
                              />
                            </TouchableOpacity>

                            : null
                        } */}

                      </View>
                      {
                        item.AdmissionLevel ?
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                marginLeft: wp(3),
                                color: "#000",
                                fontSize: 14,
                              }}
                            >
                              {item.AdmissionLevel}
                            </Text>
                            {/* {
                              editTut == true && editId === item.tutoring_detail_id ?
                                <TouchableOpacity
                                  onPress={() => setTutoring(true)}
                                >
                                  <Image
                                    source={require("../Assets/greyedit.png")}
                                  />

                                </TouchableOpacity>

                                : null
                            } */}

                          </View>
                          : null
                      }

                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                          }}
                        >
                          {/* {item.Tutoring_Grade + ", "} */}
                          {item.Tutoring_Grade.join(', ')}
                        </Text>
                        {
                          editTut == true && editId === item.tutoring_detail_id ?
                            <TouchableOpacity
                              onPress={() => {
                                handleGradeEdit(item.TutoringLevel, item.Tutoring_Grade, item.AdmissionLevel)
                              }}
                            >
                              <Image
                                source={require("../Assets/greyedit.png")}
                                style={{ height: 20, width: 20 }}
                              />
                            </TouchableOpacity>

                            : null
                        }

                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                          }}
                        >
                          {item.Tutoring_Year} Years {item.Tutoring_Month} Months
                        </Text>
                        {
                          editTut == true && editId === item.tutoring_detail_id ?
                            <TouchableOpacity
                              onPress={() => {
                                handleTutExp(item.Tutoring_Year, item.Tutoring_Month)

                              }}
                            >
                              <Image
                                source={require("../Assets/greyedit.png")}
                                style={{ height: 20, width: 20 }}
                              />
                            </TouchableOpacity>

                            : null
                        }

                      </View>
                      <View style={{
                        flexDirection: "row", overflow: 'hidden', // Hide the overflow content
                        // maxHeight: isCollapsed ? hp(3) : hp(10),
                        maxHeight: expandedItemIndex === index ? hp(10) : hp(3),
                        //  backgroundColor: "red"
                      }}>
                        <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                            //    backgroundColor: "red",
                            width: wp(60)
                          }}
                        >
                          {item.Tutoring_ALL_Subjects.join(', ')}
                          {/* {item.Tutoring_ALL_Subjects + ","} */}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                          }}
                        >

                        </Text>

                        {/* <Text
                          style={{
                            marginLeft: wp(3),
                            color: "#000",
                            fontSize: 14,
                          }}
                        >
                          {item.Tutoring_ALL_Subjects.split(',').map((subject, index) => (
                            <Text key={index}>
                              {subject.trim()}
                              {index < item.Tutoring_ALL_Subjects.split(',').length - 1 ? '\n' : ''}
                            </Text>
                          ))}
                        </Text> */}

                        {
                          editTut == true && editId === item.tutoring_detail_id ?
                            <TouchableOpacity
                              onPress={() => {
                                handleSubjectEdit(item.TutoringLevel, item.Tutoring_ALL_Subjects)
                              }}
                            >
                              <Image
                                source={require("../Assets/greyedit.png")}
                                style={{ height: 20, width: 20 }}
                              />
                            </TouchableOpacity>

                            : null
                        }

                      </View>
                      <TouchableOpacity onPress={() => toggleCollapse(index)}>
                        <Text style={{ paddingLeft: 10, color: '#2F5597' }}>
                          {expandedItemIndex === index ? 'See Less' : 'See More'}</Text>
                      </TouchableOpacity>


                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => EDITDATA(item.tutoring_detail_id)}
                        style={{
                          height: 50,
                          backgroundColor: "#2F5597",
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../Assets/Pencil.png")}
                        // style={{ height: hp(3), width: wp(5) }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => deleteRecord(item.tutoring_detail_id)}
                        style={{
                          height: 50,
                          backgroundColor: "#2F5597",
                          justifyContent: "center",
                          marginTop: 15,
                          alignItems: "center",
                        }}
                      >

                        <Image source={require("../Assets/delete.png")}

                          style={{ height: hp(4), width: wp(7) }}
                        />
                      </TouchableOpacity>
                    </View>
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
                      onPress={() => {
                        setTutoring(false);
                        setSelectListTutor("");
                      }}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />

                      {/* {console.log(selectListTutor, 'selectListTutorselectListTutorselectListTutorselectListTutor')} */}
                    </TouchableOpacity>
                    {selectListTutor == "" ?
                      <View />

                      :
                      <TouchableOpacity
                        //  onPress={() => AddQualification(TutorLevel)}
                        onPress={() => selectLevelFunc()}
                        // onPress={() =>
                        //   selectListTutor == ""
                        //     ? (() => {
                        //         setTutoring(false);
                        //       })()
                        //     : setLevelDetail()
                        // }
                        style={styles.tickWrapper}
                      >
                        <Image
                          source={require("../Assets/right.png")}
                          style={styles.tickImage}
                        />
                      </TouchableOpacity>
                    }

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
                        onPress={() => {
                          setSelectListTutor(item.school_level_name),
                            setGradeArray([]);
                        }}
                        //    onPress={() => setTutorLevel(item.label)}
                        //  onPress={() => AddQualification(item.label)}
                        style={{
                          height: hp(4),
                          alignItems: "center",
                          width: wp(90),
                          alignSelf: "center",
                          flexDirection: "row",
                          backgroundColor:
                            selectListTutor == item.school_level_name
                              ? "#2F5597"
                              : "#fff",
                          // marginTop: hp(2),
                        }}
                      >
                        <Text
                          style={{
                            color:
                              selectListTutor == item.school_level_name
                                ? "#fff"
                                : "#000",
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
                      onPress={() => {
                        setSelectListTutor("");
                        setGradeArray([]);
                        setLevelDetail(false);
                        setAdmissionLevel("")



                      }
                      }
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    {/* // {console.log(gradeArray, 'gradeArraygradeArraygradeArraygradeArray')} */}
                    {console.log(state, 'statestatestatestatestate')}
                    {console.log(state2, '222222222222')}

                    {(gradeArray == [] || gradeArray == undefined || gradeArray == "") || (state == "Select Year" || state == "" || state == undefined) || (state2 == "Select Month" || state2 == "" || state2 == undefined) ?
                      <View />
                      :
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
                    }

                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
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

                    {selectListTutor == "Secondary" ?
                      <View />
                      :

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

                    }

                  </View>

                  {loader1 == true ? (
                    <View>
                      <ActivityIndicator size="small" />
                    </View>
                  ) : (

                    <View
                      style={{
                        marginHorizontal: wp(5),
                        marginTop: hp(3),
                        flexDirection: "row",
                      }}
                    >
                      {console.log(admissionlevel, 'admissionleveladmissionleveladmissionleveladmissionlevel')}
                      {/* {console.log(selectListTutor, 'selectListTutorselectListTutorselectListTutorselectListTutor')} */}
                      {/* {GRADE_LIST?.Grade_List &&
                        GRADE_LIST?.Grade_List?.map((item) => {
                          return (
                            <View
                              style={{
                                width: wp(15),
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <TouchableOpacity

                                onPress={() => gradeData(item?.grade_name)}
                                style={{
                                  height: hp(4),
                                  width: wp(8),
                                  borderWidth: 1,
                                  borderColor: "lightgrey",
                                  backgroundColor: gradeArray.some(
                                    (obj) =>
                                      obj.hasOwnProperty("Grade") &&
                                      obj["Grade"] === item.grade_name
                                  )
                                    ? "#2F5597"
                                    : "#fff",

                                }}
                              ></TouchableOpacity>
                              <Text
                                style={{
                                  color: "grey",
                                  fontSize: 10,
                                  fontWeight: "700",
                                }}
                              >



                                {item?.grade_name}



                              </Text>
                            </View>
                          );
                        })} */}


                      <View
                        style={{}}>
                        {selectListTutor === "AEIS" && GRADE_LIST && Array.isArray(GRADE_LIST.Grade_List) && (
                          <>
                            <View style={{ flexDirection: "row" }}>


                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",


                                }}
                              >
                                <TouchableOpacity
                                  // key={item.id}
                                  //  onPress={() => AdmissionLevel(item?.school_level_name)}
                                  onPress={() => AdmissionLevel("Primary")}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: admissionArray[0]?.Admission === "Primary" ? "#2F5597" : "#fff",
                                  }}

                                >


                                </TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >



                                  {/* {item?.school_level_name} */}
                                  Primary



                                </Text>

                              </View>
                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",


                                }}
                              >
                                <TouchableOpacity
                                  // key={item.id}
                                  //  onPress={() => AdmissionLevel(item?.school_level_name)}
                                  onPress={() => AdmissionLevel("Secondary")}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: admissionArray[0]?.Admission === "Secondary" ? "#2F5597" : "#fff",
                                  }}

                                >


                                </TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >



                                  {/* {item?.school_level_name} */}
                                  Secondary



                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>


                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.map((item) => (
                                <>
                                  {/* {item.school_level_name && ( */}

                                  {/* )} */}


                                  <View>
                                    {loader == true ? (
                                      <View>
                                        <ActivityIndicator size="small" />
                                      </View>
                                    ) :
                                      admissionlevel && admissionlevel.trim() !== "" && item.grade_name && (
                                        <View style={{ marginTop: 20 }}>
                                          <View
                                            style={{
                                              width: wp(15),
                                              alignItems: "center",
                                              justifyContent: "center",


                                            }}
                                          >


                                            <TouchableOpacity
                                              key={item.id}
                                              onPress={() => gradeData(item?.grade_name)}
                                              style={{
                                                height: hp(4),
                                                width: wp(8),
                                                borderWidth: 1,
                                                borderColor: "lightgrey",
                                                backgroundColor: gradeArray.some(
                                                  (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                                ) ? "#2F5597" : "#fff",
                                              }}

                                            >


                                            </TouchableOpacity>
                                            <Text
                                              style={{
                                                color: "grey",
                                                fontSize: 10,
                                                fontWeight: "700",
                                              }}
                                            >



                                              {item?.grade_name}



                                            </Text>
                                          </View>
                                        </View>
                                      )
                                    }
                                  </View>

                                </>

                              ))}
                            </View>


                            {/* {admissionlevel && admissionlevel.trim() !== "" && (
                              <View style={{ flexDirection: "row" }}>
                                {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.map((item) => (
                                  <View
                                    style={{
                                      width: wp(15),
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >


                                    <TouchableOpacity
                                      key={item.id}
                                      onPress={() => gradeData(item?.grade_name)}
                                      style={{
                                        height: hp(4),
                                        width: wp(8),
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        backgroundColor: gradeArray.some(
                                          (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                        ) ? "#2F5597" : "#fff",
                                      }}

                                    >


                                    </TouchableOpacity>
                                    <Text
                                      style={{
                                        color: "grey",
                                        fontSize: 10,
                                        fontWeight: "700",
                                      }}
                                    >



                                      {item?.grade_name}



                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )
                            } */}

                          </>
                        )}

                        {selectListTutor === "Secondary" && (
                          <>
                            <View style={{
                              flexDirection: "row",
                              // marginTop: hp(3)
                            }}>
                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.Grades?.map((item) => (
                                <View
                                  style={{
                                    width: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TouchableOpacity
                                    key={item.id}
                                    onPress={() => SecAdmissionLevel(item?.grade_name)}
                                    style={{
                                      height: hp(4),
                                      width: wp(8),
                                      borderWidth: 1,
                                      borderColor: "lightgrey",
                                      backgroundColor: admissionArray[0]?.Admission === item.grade_name ? "#2F5597" : "#fff",
                                    }}
                                  ></TouchableOpacity>
                                  <Text
                                    style={{
                                      color: "grey",
                                      fontSize: 10,
                                      fontWeight: "700",
                                    }}
                                  >



                                    {item?.grade_name}



                                  </Text>
                                </View>
                              ))}
                            </View>

                            <View style={{ flexDirection: "row", marginTop: hp(2) }}>
                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.Streams?.map((item) => (
                                <View
                                  style={{
                                    width: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TouchableOpacity
                                    key={item.id}
                                    onPress={() => StreamLevel(item?.stream_name)}
                                    style={{
                                      height: hp(4),
                                      width: wp(8),
                                      borderWidth: 1,
                                      borderColor: "lightgrey",
                                      backgroundColor: gradeArray[0]?.Grade === item.stream_name ? "#2F5597" : "#fff",

                                    }}
                                  ></TouchableOpacity>
                                  <Text
                                    style={{
                                      color: "grey",
                                      fontSize: 10,
                                      fontWeight: "700",
                                    }}
                                  >



                                    {item?.stream_name}



                                  </Text>
                                </View>
                              ))}
                            </View>
                          </>
                        )}


                        {selectListTutor !== "AEIS" && selectListTutor !== "Secondary" && GRADE_LIST && Array.isArray(GRADE_LIST.Grade_List) && (
                          <View style={{ flexDirection: "row", marginTop: hp(3) }}>
                            {GRADE_LIST.Grade_List.map((item) => (
                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                key={item.id}
                              >
                                <TouchableOpacity
                                  onPress={() => gradeData(item?.grade_name)}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: gradeArray.some(
                                      (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                    ) ? "#2F5597" : "#fff",
                                  }}
                                ></TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >
                                  {item?.grade_name}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>


                      {/* {selectListTutor === "AEIS" ?

                        <View
                          style={{
                            marginHorizontal: wp(5),
                            //marginTop: hp(3),
                            flexDirection: "row",
                          }}
                        >
                          {GRADE_LIST?.Grade_List &&
                            GRADE_LIST?.Grade_List?.map((item) => {
                              return (
                                <View
                                  style={{
                                    width: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TouchableOpacity
                                    key={item.id}
                                    onPress={() => gradeData(item?.grade_name)}
                                    style={{
                                      height: hp(4),
                                      width: wp(8),
                                      borderWidth: 1,
                                      borderColor: "lightgrey",
                                      backgroundColor: gradeArray.some(
                                        (obj) =>
                                          obj.hasOwnProperty("Grade") &&
                                          obj["Grade"] === item.grade_name
                                      )
                                        ? "#2F5597"
                                        : "#fff",

                                    }}
                                  ></TouchableOpacity>
                                  <Text
                                    style={{
                                      color: "grey",
                                      fontSize: 10,
                                      fontWeight: "700",
                                    }}
                                  >


                                    {item?.school_level_name}



                                  </Text>
                                </View>
                              );
                            })}

                        </View>
                        : selectListTutor === "Secondary" ?
                          <>
                            <View
                              style={{
                                marginHorizontal: wp(5),
                                marginTop: hp(3),
                                flexDirection: "row",
                              }}
                            >
                              {GRADE_LIST?.Grade_List?.Grades &&
                                GRADE_LIST?.Grade_List?.Grades?.map((item) => {
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
                                        key={item.id}
                                        onPress={() => gradeData(item?.grade_name)}
                                        style={{
                                          height: hp(4),
                                          width: wp(8),
                                          borderWidth: 1,
                                          borderColor: "lightgrey",
                                          backgroundColor: gradeArray.some(
                                            (obj) =>
                                              obj.hasOwnProperty("Grade") &&
                                              obj["Grade"] === item.grade_name
                                          )
                                            ? "#2F5597"
                                            : "#fff",
                                          // gradeArray.map((item) => item?.Grade) ==
                                          // item?.grade_name
                                          //   ? "#2F5597"
                                          //   : "#fff",
                                        }}
                                      ></TouchableOpacity>
                                      <Text
                                        style={{
                                          color: "grey",
                                          fontSize: 10,
                                          fontWeight: "700",
                                        }}
                                      >


                                        {
                                          item?.grade_name}


                                      
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>

                            <View
                              style={{
                                marginHorizontal: wp(5),
                                marginTop: hp(2),
                                flexDirection: "row",
                              }}
                            >

                              {GRADE_LIST?.Grade_List?.Grades &&
                                GRADE_LIST?.Grade_List?.Streams?.map((item) => {
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
                                        key={item.id}
                                        onPress={() => gradeData(item?.grade_name)}
                                        style={{
                                          height: hp(4),
                                          width: wp(8),
                                          borderWidth: 1,
                                          borderColor: "lightgrey",
                                          backgroundColor: gradeArray.some(
                                            (obj) =>
                                              obj.hasOwnProperty("Grade") &&
                                              obj["Grade"] === item.grade_name
                                          )
                                            ? "#2F5597"
                                            : "#fff",
                                          // gradeArray.map((item) => item?.Grade) ==
                                          // item?.grade_name
                                          //   ? "#2F5597"
                                          //   : "#fff",
                                        }}
                                      ></TouchableOpacity>
                                      <Text
                                        style={{
                                          color: "grey",
                                          fontSize: 10,
                                          fontWeight: "700",
                                        }}
                                      >


                                        {
                                          item?.stream_name}


                                    
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>
                          </>
                          :
                          <View
                            style={{
                              marginHorizontal: wp(5),
                              marginTop: hp(3),
                              flexDirection: "row",
                            }}
                          >

                           {GRADE_LIST?.Grade_List &&
                              GRADE_LIST?.Grade_List?.map((item) => {
                                return (
                                  <View
                                    style={{
                                      width: wp(15),
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <TouchableOpacity

                                      onPress={() => gradeData(item?.grade_name)}
                                      style={{
                                        height: hp(4),
                                        width: wp(8),
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        backgroundColor: gradeArray.some(
                                          (obj) =>
                                            obj.hasOwnProperty("Grade") &&
                                            obj["Grade"] === item.grade_name
                                        )
                                          ? "#2F5597"
                                          : "#fff",

                                      }}
                                    ></TouchableOpacity>
                                    <Text
                                      style={{
                                        color: "grey",
                                        fontSize: 10,
                                        fontWeight: "700",
                                      }}
                                    >



                                      {item?.grade_name}



                                    </Text>
                                  </View>
                                );
                              })} 
                          </View>
                      } */}
                    </View>

                  )}



                  <View>
                    <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 13,
                          fontWeight: "800",
                        }}
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
              visible={levelDetailYear}
              onRequestClose={() => {
                setLevelDetailYear(false);
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
                      onPress={() => setLevelDetailYear(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        UpdateYearRecord()
                        setLevelDetailYear(false);
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
                      Select Level Details
                    </Text>
                  </View>




                  <View>
                    <View style={{ marginTop: hp(2), marginLeft: wp(5) }}>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 13,
                          fontWeight: "800",
                        }}
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
                        placeholder={state}
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
                        placeholder={state2}
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
              visible={tutoringEdit}
              onRequestClose={() => {
                setTutoringEdit(false);
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
                      onPress={() => setTutoringEdit(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      //  onPress={() => AddQualification(TutorLevel)}
                      onPress={() => {
                        UpdateLevelRecord()
                        setlevelpop(true)
                        // selectLevelFunc()
                        setTutoringEdit(false)
                      }}
                      // onPress={() =>
                      //   selectListTutor == ""
                      //     ? (() => {
                      //         setTutoring(false);
                      //       })()
                      //     : setLevelDetail()
                      // }
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
                      Select Tutoring Level11
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
                        onPress={() => {
                          setSelectListTutor(item.school_level_name),
                            setGradeArray([]);
                        }}
                        //    onPress={() => setTutorLevel(item.label)}
                        //  onPress={() => AddQualification(item.label)}
                        style={{
                          height: hp(4),
                          alignItems: "center",
                          width: wp(90),
                          alignSelf: "center",
                          flexDirection: "row",
                          backgroundColor:
                            selectListTutor == item.school_level_name
                              ? "#2F5597"
                              : "#fff",
                          // marginTop: hp(2),
                        }}
                      >
                        <Text
                          style={{
                            color:
                              selectListTutor == item.school_level_name
                                ? "#fff"
                                : "#000",
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
              visible={levelDetailGrade}
              onRequestClose={() => {
                setLevelDetailGrade(false);
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
                      onPress={() => setLevelDetailGrade(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        UpdateGradeRecord()
                        setLevelDetailGrade(false);
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
                    {selectListTutor == "Secondary" ?

                      <View />
                      :
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
                    }
                  </View>

                  {loader1 == true ? (
                    <View>
                      <ActivityIndicator size="small" />
                    </View>
                  ) : (

                    <View
                      style={{
                        marginHorizontal: wp(5),
                        marginTop: hp(3),
                        flexDirection: "row",
                      }}
                    >

                      <View
                        style={{}}>
                        {selectListTutor === "AEIS" && GRADE_LIST && Array.isArray(GRADE_LIST.Grade_List) && (
                          <>
                            <View style={{ flexDirection: "row" }}>


                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",


                                }}
                              >
                                <TouchableOpacity
                                  // key={item.id}
                                  //  onPress={() => AdmissionLevel(item?.school_level_name)}
                                  onPress={() => AdmissionLevel("Primary")}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: admissionArray[0]?.Admission === "Primary" ? "#2F5597" : "#fff",
                                  }}

                                >


                                </TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >



                                  {/* {item?.school_level_name} */}
                                  Primary



                                </Text>

                              </View>
                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",


                                }}
                              >
                                <TouchableOpacity
                                  // key={item.id}
                                  //  onPress={() => AdmissionLevel(item?.school_level_name)}
                                  onPress={() => AdmissionLevel("Secondary")}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: admissionArray[0]?.Admission === "Secondary" ? "#2F5597" : "#fff",
                                  }}

                                >


                                </TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >



                                  {/* {item?.school_level_name} */}
                                  Secondary



                                </Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>


                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.map((item) => (
                                <>
                                  {/* {item.school_level_name && ( */}

                                  {/* )} */}


                                  <View>
                                    {loader == true ? (
                                      <View>
                                        <ActivityIndicator size="small" />
                                      </View>
                                    ) :
                                      admissionlevel && admissionlevel.trim() !== "" && item.grade_name && (
                                        <View style={{ marginTop: 20 }}>
                                          <View
                                            style={{
                                              width: wp(15),
                                              alignItems: "center",
                                              justifyContent: "center",


                                            }}
                                          >


                                            <TouchableOpacity
                                              key={item.id}
                                              onPress={() => gradeData(item?.grade_name)}
                                              style={{
                                                height: hp(4),
                                                width: wp(8),
                                                borderWidth: 1,
                                                borderColor: "lightgrey",
                                                backgroundColor: gradeArray.some(
                                                  (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                                ) ? "#2F5597" : "#fff",
                                              }}

                                            >


                                            </TouchableOpacity>
                                            <Text
                                              style={{
                                                color: "grey",
                                                fontSize: 10,
                                                fontWeight: "700",
                                              }}
                                            >



                                              {item?.grade_name}



                                            </Text>
                                          </View>
                                        </View>
                                      )
                                    }
                                  </View>

                                </>

                              ))}
                            </View>


                            {/* {admissionlevel && admissionlevel.trim() !== "" && (
                              <View style={{ flexDirection: "row" }}>
                                {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.map((item) => (
                                  <View
                                    style={{
                                      width: wp(15),
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >


                                    <TouchableOpacity
                                      key={item.id}
                                      onPress={() => gradeData(item?.grade_name)}
                                      style={{
                                        height: hp(4),
                                        width: wp(8),
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        backgroundColor: gradeArray.some(
                                          (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                        ) ? "#2F5597" : "#fff",
                                      }}

                                    >


                                    </TouchableOpacity>
                                    <Text
                                      style={{
                                        color: "grey",
                                        fontSize: 10,
                                        fontWeight: "700",
                                      }}
                                    >



                                      {item?.grade_name}



                                    </Text>
                                  </View>
                                ))}
                              </View>
                            )
                            } */}

                          </>
                        )}

                        {selectListTutor === "Secondary" && (
                          <>
                            <View style={{
                              flexDirection: "row",
                              // marginTop: hp(3)
                            }}>
                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.Grades?.map((item) => (
                                <View
                                  style={{
                                    width: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TouchableOpacity
                                    key={item.id}
                                    onPress={() => SecAdmissionLevel(item?.grade_name)}
                                    style={{
                                      height: hp(4),
                                      width: wp(8),
                                      borderWidth: 1,
                                      borderColor: "lightgrey",
                                      backgroundColor: admissionArray[0]?.Admission === item.grade_name ? "#2F5597" : "#fff",
                                    }}
                                  ></TouchableOpacity>
                                  <Text
                                    style={{
                                      color: "grey",
                                      fontSize: 10,
                                      fontWeight: "700",
                                    }}
                                  >



                                    {item?.grade_name}



                                  </Text>
                                </View>
                              ))}
                            </View>

                            <View style={{ flexDirection: "row", marginTop: hp(2) }}>
                              {GRADE_LIST?.Grade_List && GRADE_LIST?.Grade_List?.Streams?.map((item) => (
                                <View
                                  style={{
                                    width: wp(15),
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <TouchableOpacity
                                    key={item.id}
                                    onPress={() => StreamLevel(item?.stream_name)}
                                    style={{
                                      height: hp(4),
                                      width: wp(8),
                                      borderWidth: 1,
                                      borderColor: "lightgrey",
                                      backgroundColor: gradeArray[0]?.Grade === item.stream_name ? "#2F5597" : "#fff",

                                    }}
                                  ></TouchableOpacity>
                                  <Text
                                    style={{
                                      color: "grey",
                                      fontSize: 10,
                                      fontWeight: "700",
                                    }}
                                  >



                                    {item?.stream_name}



                                  </Text>
                                </View>
                              ))}
                            </View>
                          </>
                        )}


                        {selectListTutor !== "AEIS" && selectListTutor !== "Secondary" && GRADE_LIST && Array.isArray(GRADE_LIST.Grade_List) && (
                          <View style={{ flexDirection: "row", marginTop: hp(3) }}>
                            {GRADE_LIST.Grade_List.map((item) => (
                              <View
                                style={{
                                  width: wp(15),
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                key={item.id}
                              >
                                <TouchableOpacity
                                  onPress={() => gradeData(item?.grade_name)}
                                  style={{
                                    height: hp(4),
                                    width: wp(8),
                                    borderWidth: 1,
                                    borderColor: "lightgrey",
                                    backgroundColor: gradeArray.some(
                                      (obj) => obj.hasOwnProperty("Grade") && obj["Grade"] === item.grade_name
                                    ) ? "#2F5597" : "#fff",
                                  }}
                                ></TouchableOpacity>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontSize: 10,
                                    fontWeight: "700",
                                  }}
                                >
                                  {item?.grade_name}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                      {/* {GRADE_LIST && Array.isArray(GRADE_LIST.Grade_List) && (
                        GRADE_LIST?.Grade_List &&
                        GRADE_LIST?.Grade_List.map((item) => {
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
                                  backgroundColor: gradeArray.some(
                                    (obj) =>
                                      obj.hasOwnProperty("Grade") &&
                                      obj["Grade"] === item.grade_name
                                  )
                                    ? "#2F5597"
                                    : "#fff",
                                  // gradeArray.map((item) => item?.Grade) ==
                                  // item?.grade_name
                                  //   ? "#2F5597"
                                  //   : "#fff",
                                }}
                              ></TouchableOpacity>
                              <Text
                                style={{
                                  color: "grey",
                                  fontSize: 14,
                                  fontWeight: "800",
                                }}
                              >
                                {item?.grade_name}
                              </Text>
                            </View>
                          );
                        }))} */}
                    </View>
                  )}


                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={tutorSubjectEdit}
              onRequestClose={() => {
                setTutorSubjectEdit(false);
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
                      onPress={() => setTutorSubjectEdit(false)}
                      style={styles.crossImageWrapper}
                    >
                      <Image
                        source={require("../Assets/closeingray.png")}
                        style={styles.crossImage}
                      />
                    </TouchableOpacity>

                    {console.log(selectedItems, 'selectedItemsselectedItemsselectedItems')}

                    {selectedItems == "" || selectedItems == [] || selectedItems == undefined ?
                      <View />
                      :

                      <TouchableOpacity
                        //  onPress={() => setTutorSubject(false)}
                        onPress={() => {
                          UpdateSubjectRecord()
                          setTutorSubjectEdit(false)
                        }}
                        style={styles.tickWrapper}
                      >
                        <Image
                          source={require("../Assets/right.png")}
                          style={styles.tickImage}
                        />
                      </TouchableOpacity>

                    }


                  </View>

                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 20, fontWeight: "800" }}
                    >
                      Select Tutoring Subjects11
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
                      Select multiple (if required)
                    </Text>
                  </View>

                  {/* {console.log(SUBJECT_LIST && SUBJECT_LIST?.Subject_List, 'SUBJECT_LIST?.Subject_ListSUBJECT_LIST?.Subject_ListSUBJECT_LIST?.Subject_ListSUBJECT_LIST?.Subject_ListSUBJECT_LIST?.Subject_List')} */}

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
                      tagRemoveIconColor="#2F5597"
                      tagBorderColor="#2F5597"
                      tagTextColor="#2F5597"
                      selectedItemTextColor="#2F5597"
                      selectedItemIconColor="#2F5597"
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
                      onPress={() => {

                        ALLDATA()
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
                      tagRemoveIconColor="#2F5597"
                      tagBorderColor="#2F5597"
                      tagTextColor="#2F5597"
                      selectedItemTextColor="#2F5597"
                      selectedItemIconColor="#2F5597"
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
            style={{
              flex: 0.1,
              justifyContent: "flex-end",
              paddingBottom: hp(3),
            }}
          >
            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.circleArrow}
            >
              <Image
                style={{ transform: [{ rotate: "180deg" }] }}
                source={require("../Assets/circleArrow.png")}
              />
            </TouchableOpacity> */}
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
      )}
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
  modalWrapp: { height: hp(55), width: wp(100), backgroundColor: "#fff" },
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
