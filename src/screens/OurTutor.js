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
} from "react-native";
import axios from "axios";
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
  GetQuickData,
} from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";
import MultiSelect from "react-native-multiple-select";
import {
  getLevelList,
  getGradeList,
  getSubjectList,
} from "../Redux/Actions/Tutors";
import { Dropdown } from "react-native-element-dropdown";

var selectArray = [];
var selectFilter = [];

var level = [];

const OurTutor = ({ props, route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Tutor, setTutor] = useState([]);

  const [Primary, setPrimary] = useState("Primary");
  const [selectedlevels, setSelectedLevels] = useState([]);
  const [Secondary, setSecondary] = useState("Secondary");
  const [JCPre, setJCPre] = useState("JC");
  const [IB, setIB] = useState("IB");
  const [isFocus, setIsFocus] = useState(false);

  const [AEIS, setAEIS] = useState("AEIS");

  const [English, setEnglish] = useState("English");
  const [Gender, setGender] = useState("");
  const [Status, setStatus] = useState("");
  const [Math, setMath] = useState("");
  const [Science, setScience] = useState("Science");
  const [Economics, setEconomics] = useState("Economics");
  const [Chinese, setChinese] = useState("Chinese");
  const { GET_POSTAL_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_FILTER_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { GET_QUICK_DATA } = useSelector((state) => state.TutorsearchReducer);
  const { LEVEL_LIST } = useSelector((state) => state.TutorReducer);
  const { SUBJECT_LIST } = useSelector((state) => state.TutorReducer);
  const { GRADE_LIST } = useSelector((state) => state.TutorReducer);
  // console.log(
  //   "🚀 ~ file: OurTutor.js ~ line 62 ~ OurTutor ~ GET_QUICK_DATA",
  //   GET_QUICK_DATA
  // );
  // console.log(
  //   GET_POSTAL_DATA,
  //   "GET_POSTAL_DATAGET_POSTAL_DATAGET_POSTAL_DATAGET_POSTAL_DATA"
  // );
  // console.log("!!!!!!", GET_FILTER_DATA);
  const { GET_ALLTUTORS } = useSelector((state) => state.TutorReducer);

  // console.log("All Tutor", GET_ALLTUTORS);
  // console.log('AAAAAAAAAAAAAAAAAAAAFILTER@@@@@@@@@@@@@@@@@@@@@@@@@@@', GET_FILTER_DATA)
  // console.log(GRADE_LIST, "Filter-Grade");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedQual, setSelectedQual] = useState([]);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const [SelectedGrade, setSelectedGrade] = useState([]);
  const [SelectedStream, setSelectedStream] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selected, setSelected] = useState([]);
  const [allTutor, setAllTutor] = useState([]);
  const [selectListTutor, setSelectListTutor] = useState("");

  const renderList = ({ item, index }) => {
    const { id, Tutoring_Level, Tutoring_Subjects } = item;
    const isSelected = selected.filter((i) => i == Tutoring_Level).length > 0;
    return <TouchableOpacity></TouchableOpacity>;
  };

  const onSelectedItemsChange = (selectedItemsnationality) => {
    // Set Selected Items
    setSelectedItems(selectedItemsnationality);
    createnational(selectedItemsnationality);
    //console.log('Nationality', selectedItems)
  };
  useEffect(() => {
    dispatch(GetAllTutors());
    setAllTutor(GET_ALLTUTORS);

    // setTutor(GET_ALLTUTORS)
  }, []);
  useEffect(() => {
    setAllTutor(GET_ALLTUTORS);
    // setTutor(GET_ALLTUTORS)
  }, [GET_ALLTUTORS]);
  const createnational = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Nationality"] = element;
        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );

        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Nationality", obj3.Qualification)) {
        selectFilter.push(obj3);
      } else {
        RemoveTempExercise(selectFilter, "Nationality", obj3.Qualification);
      }
    }
    console.log("Nationality????????????????", selectFilter);
  };

  const createqual = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Qualification"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Qualification", obj3.Qualification)) {
        selectFilter.push(obj3);

        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );
      } else {
        RemoveTempExercise(selectFilter, "Qualification", obj3.Qualification);
      }
    }
    console.log("Qualification????????????????", selectFilter);
  };

  const onSelectedQualChange = (selectedqualification) => {
    createqual(selectedqualification);
    setSelectedQual(selectedqualification);
  };

  const createlevel = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      // console.log('""""""""""""""', element);
      obj3["Levels_search"] = data;
      // setSelectedQual(element)
      if (!isExistInArray(selectFilter, "Levels_search", obj3.Levels_search)) {
        selectFilter.push(obj3);

        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );
      } else {
        RemoveTempExercise(selectFilter, "Levels_search", obj3.Levels_search);
      }
    }
    console.log("Level????????????????", selectFilter);
  };

  const creategrade = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Grade"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Grade", obj3.Grade)) {
        selectFilter.push(obj3);

        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );
      } else {
        RemoveTempExercise(selectFilter, "Grade", obj3.Grade);
      }
    }
    console.log("Level????????????????", selectFilter);
  };

  const createStream = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Stream"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Stream", obj3.Stream)) {
        selectFilter.push(obj3);

        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );
      } else {
        RemoveTempExercise(selectFilter, "Stream", obj3.Stream);
      }
    }
    console.log("Level????????????????", selectFilter);
  };

  const createSubject = (data) => {
    console.log(data, ":::::::::::::::::::::::::");
    if (data.length == 0) {
      selectFilter = [];
      console.log("ddddddddddddddddddddddd");
    } else {
      const obj3 = {};
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Subject"] = element;
        // setSelectedQual(element)
      });
      if (!isExistInArray(selectFilter, "Subject", obj3.Subject)) {
        selectFilter.push(obj3);

        dispatch(
          GetfilterQualification(
            route.params.postalcode,
            route.params.tuition_type,
            Gender,
            Status,
            selectFilter
          )
        );
      } else {
        RemoveTempExercise(selectFilter, "Subject", obj3.Subject);
      }
    }
    console.log("Level????????????????", selectFilter);
  };
  const onSelectedlevel = (selectedItemslevel) => {
    // Set Selected Items

    createlevel(selectedItemslevel);
    // setSelectedlevel(selectedItemslevel);
    setSelectListTutor(selectedItemslevel);
    // console.log('Level', selectedlevel)
  };

  const onSelectedGrade = (selectedItemslevel) => {
    // Set Selected Items

    creategrade(selectedItemslevel);
    setSelectedGrade(selectedItemslevel);
  };

  const onSelectedStream = (selectedItemslevel) => {
    // Set Selected Items

    createStream(selectedItemslevel);
    setSelectedStream(selectedItemslevel);
  };

  const onSelectedSubject = (selectedItemslevel) => {
    // Set Selected Items

    createSubject(selectedItemslevel);
    setSelectedSubject(selectedItemslevel);
  };

  console.log("Grade", SelectedGrade);

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Female",
      value: "Female",
    },
    {
      id: "2",
      label: "Male",
      value: "Male",
    },
  ]);

  const [statusradioButtons, setstatusRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Full Time",
      value: "Full Time",
    },
    {
      id: "2",
      label: "Part Time",
      value: "Part Time",
    },
  ]);

  const [Level, setLevel] = useState([
    {
      id: 1,
      code: "Primary",
    },
    {
      id: 2,
      code: "Secondary",
    },
    {
      id: 3,
      code: "JC/Pre-U",
    },
    {
      id: 4,
      code: "IB (Diploma)",
    },
    {
      id: 5,
      code: "AEIS",
    },
  ]);

  const onPressRadioButton = (radioButtonsArray) => {
    console.log("PKKKKKKKKKKKKKKK", radioButtonsArray);
    var selection = radioButtonsArray[0].selected;
    // setRadioButtons(radioButtonsArray);
    console.log("PK+++++++++++++++++++++K", selection);
    if (selection == true) {
      setGender("Female");
    } else {
      setGender("Male");
    }
  };

  console.log("PPPPPPPPPPPPPPPPPP", Gender);

  function onPressstatusRadioButton(radioButtonsArray) {
    console.log("PKKKKKKKKKKKKKKK", radioButtonsArray);
    var selection = radioButtonsArray[0].selected;
    // setRadioButtons(radioButtonsArray);
    console.log("PK+++++++++++++++++++++K", selection);
    if (selection == true) {
      setStatus("Full Time");
    } else {
      setStatus("Part Time");
    }
    //  setstatusRadioButtons(radioButtonsArray);
  }

  const items = [
    {
      id: 1,
      country: "Singapore",
      countryFlag: require("../Assets/Singapore.png"),
    },
    {
      id: 2,
      country: "Malaysia",
      countryFlag: require("../Assets/Malaysia.png"),
    },
    {
      id: 3,
      country: "China",
      countryFlag: require("../Assets/china.png"),
    },
    {
      id: 4,
      country: "India",
      countryFlag: require("../Assets/flag.png"),
    },
    {
      id: 5,
      country: "Taiwan",
      countryFlag: require("../Assets/Taiwan.png"),
    },
    {
      id: 6,
      country: "Japan",
      countryFlag: require("../Assets/Japan.png"),
    },
    {
      id: 7,
      country: "United States",
      countryFlag: require("../Assets/US.png"),
    },
    {
      id: 8,
      country: "Canada",
      countryFlag: require("../Assets/Canada.png"),
    },
    {
      id: 9,
      country: "United Kingdom",
      countryFlag: require("../Assets/UK.png"),
    },
    {
      id: 10,
      country: "Philippines",
      countryFlag: require("../Assets/Philippines.png"),
    },
  ];

  const [subjects, setSubjects] = useState([
    {
      id: 6,
      code: "English",
    },
    {
      id: 7,
      code: "Math",
    },
    {
      id: 8,
      code: "Science",
    },
    {
      id: 9,
      code: "Chinese",
    },
    {
      id: 10,
      code: "Economics",
    },
  ]);

  const [userdata, setUserdata] = useState([]);
  const [postaldata, setPostaldata] = useState([]);
  const [quickdata, setQuickdata] = useState([]);

  // console.log(allTutor, "himlocal");
  // const [selectedSubject, setSelectedSubject] = useState('');

  const [pickerServices, setPickerServices] = useState(false);
  const [filterServices, setFilterServices] = useState(false);

  const [selctedSort, setSelectedSort] = useState("");

  const [state, setState] = useState("Select One Option");
  const state_list = [
    // { label: 'Select One Option', value: 'Select One Option' },
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

  const grade_list = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label: "P1", value: "P1" },
    { label: "P2", value: "P2" },
    { label: "P3", value: "P3" },
  ];

  const Stream_list = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label: "IP", value: "IP" },
    { label: "NT", value: "NT" },
  ];

  const subject_list = [
    // { label: 'Select One Option', value: 'Select One Option' },
    { label: "English", value: "English" },
    { label: "Business Studies", value: "Business Studies" },
    { label: "Math", value: "Math" },
  ];

  const [state2, setState2] = useState("Select one or more");
  const state_list2 = [
    { label: "Select one or more", value: "Select one or more" },
    { label: "A Level", value: "A Level" },
    { label: "IB (Diploma)", value: "IB (Diploma)" },
    { label: "Polytechnic Diploma", value: "Polytechnic Diploma" },
    { label: "University Undergraduate", value: "University Undergraduate" },
    { label: "University Graduate", value: "University Graduate" },
    { label: "Ex School Teacher", value: "Ex School Teacher" },
    { label: "Current School Teacher", value: "Current School Teacher" },
  ];

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false);

  const [genderData, setGenderData] = useState([
    {
      id: 1,
      gender: "Female",
    },
    {
      id: 2,
      gender: "Male",
    },
  ]);

  useEffect(() => {
    console.log("!!!!!!! ", GET_FILTER_DATA);
    // dispatch(GetAllTutors())
    setUserdata(GET_FILTER_DATA);
    setPostaldata(GET_POSTAL_DATA);
    // console.log("🚀 ~ file: OurTutor.js ~ line 506 ~ useEffect ~ GET_POSTAL_DATA", GET_POSTAL_DATA)
  }, []);

  useEffect(() => {
    setUserdata(GET_FILTER_DATA);
    setPostaldata(GET_POSTAL_DATA);
    setQuickdata(GET_QUICK_DATA);
  }, [GET_FILTER_DATA, GET_POSTAL_DATA, GET_QUICK_DATA]);

  const setPrimaryFun = () => {
    if (Primary == "") {
      setPrimary("Primary");
      // console.log('IN')

      var item = {};
      var item1 = {};

      item["tuition_type"] = route.params.tuition_type;
      item["postal_code"] = route.params.postalcode;
      item1["Levels_search"] = Primary;
      RemoveTempExercise(selectArray, "Levels_search", "Primary");
    } else {
      setPrimary("");

      var item = {};
      var item1 = {};

      item["tuition_type"] = route.params.tuition_type;
      item["postal_code"] = route.params.postalcode;
      item1["Levels_search"] = Primary;

      if (!isExistInArray(selectArray, "Levels_search", item1.Levels_search)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Levels_search", item1.Levels_search);
      }
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  // const sortFun = () => {

  //     var item = {};
  //     var item1 = {};

  //     item['tuition_type'] = route.params.tuition_type;
  //     item['postal_code'] = route.params.postalcode;
  //     item1['Levels_search'] = selectArray;
  //     RemoveTempExercise(selectArray, 'Levels_search', 'Primary');
  //     dispatch(
  //       GetfilterSubject(
  //         route.params.postalcode,
  //         route.params.tuition_type,
  //         selectArray,
  //       ),
  //     );

  //   }

  //   console.log('aaaaaaaaaaa', selectArray);
  // };

  const setSeconadyFun = () => {
    if (Secondary == "") {
      setSecondary("Secondary");
      console.log("IN");
      var item1 = {};
      item1["Levels_search"] = Secondary;
      RemoveTempExercise(selectArray, "Levels_search", "Secondary");
    } else {
      setSecondary("");
      console.log("OuT");

      var item = {};
      var item1 = {};

      item1["Levels_search"] = Secondary;

      if (!isExistInArray(selectArray, "Levels_search", item1.Levels_search)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Levels_search", item1.Levels_search);
      }
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
    selectFilter = Ex_array;
  };
  const setJCFun = () => {
    if (JCPre == "") {
      setJCPre("JC");
      // console.log('IN')
      var item1 = {};
      item1["Levels_search"] = JCPre;
      RemoveTempExercise(selectArray, "Levels_search", "JC");
    } else {
      setJCPre("");
      console.log("OuT");

      var item1 = {};

      item1["Levels_search"] = JCPre;

      if (!isExistInArray(selectArray, "Levels_search", item1.Levels_search)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Levels_search", item1.Levels_search);
      }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setIBFun = () => {
    if (IB == "") {
      setIB("IB");
      console.log("IN");
      var item1 = {};
      item1["Levels_search"] = IB;
      RemoveTempExercise(selectArray, "Levels_search", "IB");
    } else {
      setIB("");
      console.log("OuT");
      var item1 = {};

      item1["Levels_search"] = IB;

      if (!isExistInArray(selectArray, "Levels_search", item1.Levels_search)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Levels_search", item1.Levels_search);
      }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setAEISFun = () => {
    if (AEIS == "") {
      setAEIS("AEIS");
      console.log("IN");
      var item1 = {};
      item1["Levels_search"] = AEIS;
      RemoveTempExercise(selectArray, "Levels_search", "AEIS");
    } else {
      setAEIS("");
      console.log("OuT");

      var item1 = {};

      item1["Levels_search"] = AEIS;

      if (!isExistInArray(selectArray, "Levels_search", item1.Levels_search)) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "Levels_search", item1.Levels_search);
      }
    }
    console.log("aaaaaaaaaaa", selectArray);
  };

  const setEnglishFun = () => {
    setEnglish("English");
    if (English == "") {
      setEnglish("English");
      console.log("IN");

      var item1 = {};
      item1["subject_search"] = English;
      RemoveTempExercise(selectArray, "subject_search", "English");

      dispatch(
        GetfilterSubject(
          route.params.postalcode,
          route.params.tuition_type,
          selectArray
        )
      );
    } else {
      setEnglish("");
      console.log("OuT");

      var item1 = {};
      item1["subject_search"] = English;

      if (
        !isExistInArray(selectArray, "subject_search", item1.subject_search)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "subject_search", item1.subject_search);
      }

      dispatch(
        GetfilterSubject(
          route.params.postalcode,
          route.params.tuition_type,
          selectArray
        )
      );
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  const setScienceFun = () => {
    console.log("sdgsgsg");
    if (Science == "") {
      setScience("Science");
      console.log("IN");
      var item1 = {};
      item1["subject_search"] = Science;
      RemoveTempExercise(selectArray, "subject_search", "Science");
      dispatch(
        GetfilterSubject(
          route.params.postalcode,
          route.params.tuition_type,
          selectArray
        )
      );
    } else {
      setScience("");
      console.log("OuT");
      var item1 = {};
      item1["subject_search"] = Science;

      if (
        !isExistInArray(selectArray, "subject_search", item1.subject_search)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "subject_search", item1.subject_search);
      }
      dispatch(
        GetfilterSubject(
          route.params.postalcode,
          route.params.tuition_type,
          selectArray
        )
      );

      //  dispatch(GetfilterSubject(route.params.postalcode, route.params.tuition_type, Primary, English))
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  const setMathFun = () => {
    if (Math == "") {
      setMath("Math");
      console.log("IN");
      var item1 = {};
      item1["subject_search"] = Math;
      RemoveTempExercise(selectArray, "subject_search", "Math");
      dispatch(
        GetfilterSubject(
          route.params.postalcode,
          route.params.tuition_type,
          selectArray
        )
      );
    } else {
      setMath("");
      console.log("OuT");
      var item1 = {};
      item1["subject_search"] = Math;

      if (
        !isExistInArray(selectArray, "subject_search", item1.subject_search)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "subject_search", item1.subject_search);
      }

      //  dispatch(GetfilterSubject(route.params.postalcode, route.params.tuition_type, Primary, English))
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  const setChineseFun = () => {
    if (Chinese == "") {
      setChinese("Chinese");
      console.log("IN");
      var item1 = {};
      item1["subject_search"] = Chinese;
      RemoveTempExercise(selectArray, "subject_search", "Chinese");
    } else {
      setChinese("");
      console.log("OuT");
      var item1 = {};
      item1["subject_search"] = Chinese;

      if (
        !isExistInArray(selectArray, "subject_search", item1.subject_search)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "subject_search", item1.subject_search);
      }

      //  dispatch(GetfilterSubject(route.params.postalcode, route.params.tuition_type, Primary, English))
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  const setEconimicsFun = () => {
    if (Economics == "") {
      setEconomics("Economics");
      console.log("IN");
      var item1 = {};
      item1["subject_search"] = Economics;
      RemoveTempExercise(selectArray, "subject_search", "Economics");
    } else {
      setEconomics("");
      console.log("OuT");
      var item1 = {};
      item1["subject_search"] = Economics;

      if (
        !isExistInArray(selectArray, "subject_search", item1.subject_search)
      ) {
        //  console.log('insert in array');
        selectArray.push(item1);
      } else {
        RemoveTempExercise(selectArray, "subject_search", item1.subject_search);
      }

      //  dispatch(GetfilterSubject(route.params.postalcode, route.params.tuition_type, Primary, English))
    }

    console.log("aaaaaaaaaaa", selectArray);
  };

  useEffect(() => {
    dispatch(getLevelList());
  }, []);
  useEffect(() => {
    dispatch(getGradeList(selectListTutor));
  }, [selectListTutor]);

  useEffect(() => {
    dispatch(getSubjectList(selectListTutor));
  }, [selectListTutor]);

  const FetchDetail = (time) => {
    let picker = selectedlevels;
    if (picker.includes(time)) {
      // Remove the time from the array if it already exists
      picker = picker.filter((item) => item !== time);
    } else {
      // Add the time to the array if it doesn't exist
      picker.push(time);
    }

    // Update the state with the modified picker array
    setSelectedLevels([...picker]); // Create a new array to trigger a state update

    // Perform any other necessary actions, such as updating the date
  };

  console.log(selectedlevels, "selectedselectedselectedselected");

  return (
    <>
      <View style={styles.container}>
        {/* <View style={{height: 70, width: '100%', justifyContent: 'center'}}> */}
        {/* <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}
            onPress={() => navigation.navigate('TutorSearch')}>
            {/* <Icon name="chevron-back-outline" size={30} color={Colors.text} /> */}
        {/* <View style={{justifyContent: 'center'}}>
              <Image
                source={require('../Assets/back.png')}
                style={{width: 30, height: 30, marginHorizontal: 15}}
              />
            </View>
            {/* <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "grey", textAlignVertical:'center' }}
            >
              Back
            </Text> */}
        {/*  </TouchableOpacity> */}
        {/* </View> */}
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

        <View style={styles.LittlemoreContainer}>
          <View style={styles.LittlLeft}>
            <Text style={styles.Text1}>Our Tutors</Text>
            {/* <Text style={styles.Text2}>….for your selection....</Text> */}
          </View>
          <View style={styles.LittlRight}>
            <View style={styles.rightImageWrapper}>
              <Image
                source={require("../Assets/HeartIcon.png")}
                //  resizeMode='contain'
                style={styles.logoicon}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("MapScreen")}
              style={styles.rightSecondImageWrapper}
            >
              <Image
                source={require("../Assets/iIcon.png")}
                //  resizeMode='contain'
                style={styles.logoicon}
              />
            </TouchableOpacity>
            <View style={styles.rightSecondImageWrapper}>
              <Image
                source={require("../Assets/PencilIcon.png")}
                //  resizeMode='contain'
                style={styles.logoicon}
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", backgroundColor: "#f7f2fa" }}>
          <Text
            style={{
              color: "purple",
              paddingTop: 5,
              fontFamily: "Poppins-Regular",
            }}
          >
            Frequently Used Filters
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f7f2fa",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: Primary == "Primary" ? "#fff" : "#2F5597",
              },
            ]}
            onPress={() => {
              //  dispatch(GetQuickData());
              FetchDetail("Primary");
            }}
          >
            {/* // onPress={() => setPrimaryFun()} style={[styles.subjectsWrapper, { backgroundColor: Primary == 'Primary' ? '#fff' : '#2F5597' }]} */}
            <Text
              style={[
                styles.subjectText,
                { color: Primary == "Primary" ? "#2F5597" : "#fff" },
              ]}
            >
              Primary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSeconadyFun()}
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: Secondary == "Secondary" ? "#fff" : "#2F5597",
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: Secondary == "Secondary" ? "#2F5597" : "#fff" },
              ]}
            >
              Secondary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setJCFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: JCPre == "JC" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: JCPre == "JC" ? "#2F5597" : "#fff" },
              ]}
            >
              JC/Pre-U
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIBFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: IB == "IB" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: IB == "IB" ? "#2F5597" : "#fff" },
              ]}
            >
              IB (Diploma)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAEISFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: AEIS == "AEIS" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: AEIS == "AEIS" ? "#2F5597" : "#fff" },
              ]}
            >
              AEIS
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f7f2fa",
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setEnglishFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: English == "English" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: English == "English" ? "#2F5597" : "#fff" },
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMathFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: Math == "Math" ? "#2F5597" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: Math == "Math" ? "#fff" : "#2F5597" },
              ]}
            >
              Math
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScienceFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: Science == "Science" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: Science == "Science" ? "#2F5597" : "#fff" },
              ]}
            >
              Science
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChineseFun()}
            style={[
              styles.subjectsWrapper,
              { backgroundColor: Chinese == "Chinese" ? "#fff" : "#2F5597" },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: Chinese == "Chinese" ? "#2F5597" : "#fff" },
              ]}
            >
              Chinese
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEconimicsFun()}
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: Economics == "Economics" ? "#fff" : "#2F5597",
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                { color: Economics == "Economics" ? "#2F5597" : "#fff" },
              ]}
            >
              Economics
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ marginLeft: wp(2.5), }}>
                <FlatList
                    data={Level}
                    numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => setSelectedSubject(item.code)} style={[styles.subjectsWrapper, { backgroundColor: selectedSubject == item.code ? '#2F5597' : '#fff' }]}>
                            <Text style={[styles.subjectText, { color: selectedSubject == item.code ? '#fff' : '#2F5597' }]}>{item.code}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View> */}
        {/* <View style={{ marginLeft: wp(2.5), marginTop: 10 }}>


                <FlatList
                    data={subjects}
                    numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => setSelectedSubject(item.code)} style={[styles.subjectsWrapper, { backgroundColor: selectedSubject == item.code ? '#2F5597' : '#fff' }]}>
                            <Text style={[styles.subjectText, { color: selectedSubject == item.code ? '#fff' : '#2F5597' }]}>{item.code}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View> */}
        <View style={styles.frequentlyWrapper}>
          <View>
            {/* <Text style={styles.frequentlyText}>Frequently Used</Text> */}
          </View>
          <View style={styles.sortFilterWRapper}>
            <TouchableOpacity
              onPress={() => setPickerServices(true)}
              style={styles.sortWrapper}
            >
              <Image
                source={require("../Assets/sortIcon.png")}
                style={styles.sortImage}
              />
              <Text style={styles.sortText}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilterServices(true)}
              style={styles.filterWrapper}
            >
              <Image
                source={require("../Assets/filterIcon.png")}
                style={styles.filterImage}
              />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* {GET_FILTER_DATA.length > 0 ? ( */}
        <FlatList
          data={postaldata}
          numColumns={1}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return <ItemBox data={item} index={index} props />;
          }}
        />
        {/* ) : (
          <FlatList
            data={allTutor}
            numColumns={1}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return <ItemBox data={item} props />; 
            }}
          />
        )} */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={pickerServices}
          onRequestClose={() => {
            setPickerServices(false);
          }}
        >
          <View style={styles.modalWrapper2}>
            <View style={styles.modalWrapp}>
              <View style={styles.crossWRapper}>
                <TouchableOpacity
                  onPress={() => setPickerServices(false)}
                  style={styles.crossImageWrapper}
                >
                  <Image
                    source={require("../Assets/closeingray.png")}
                    style={styles.crossImage}
                  />
                </TouchableOpacity>
                <View style={styles.tickWrapper}>
                  <TouchableOpacity onPress={() => setPickerServices(false)}>
                    <Image
                      source={require("../Assets/right.png")}
                      style={styles.tickImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.sortByWrapper}>
                <Text style={styles.sortByText}>Sort By</Text>

                <TouchableOpacity
                  onPress={() => setSelectedSort("Tutor living closest to me")}
                  style={{
                    backgroundColor:
                      selctedSort == "Tutor living closest to me"
                        ? "#2F5597"
                        : "#fff",
                    paddingVertical: hp(0.5),
                    paddingLeft: wp(5),
                    marginTop: hp(2),
                  }}
                >
                  <Text
                    style={{
                      color:
                        selctedSort == "Tutor living closest to me"
                          ? "#fff"
                          : "#000",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    Tutor living closest to me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedSort("Tutor living furthest from me")
                  }
                  style={{
                    backgroundColor:
                      selctedSort == "Tutor living furthest from me"
                        ? "#2F5597"
                        : "#fff",
                    paddingVertical: hp(0.5),
                    paddingLeft: wp(5),
                  }}
                >
                  <Text
                    style={{
                      color:
                        selctedSort == "Tutor living furthest from me"
                          ? "#fff"
                          : "#000",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    Tutor living furthest from me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedSort("Highest to Lowest rating")}
                  style={{
                    backgroundColor:
                      selctedSort == "Highest to Lowest rating"
                        ? "#2F5597"
                        : "#fff",
                    paddingVertical: hp(0.5),
                    paddingLeft: wp(5),
                  }}
                >
                  <Text
                    style={{
                      color:
                        selctedSort == "Highest to Lowest rating"
                          ? "#fff"
                          : "#000",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    Highest to Lowest rating
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedSort("Lowest to Highest rating")}
                  style={{
                    backgroundColor:
                      selctedSort == "Lowest to Highest rating"
                        ? "#2F5597"
                        : "#fff",
                    paddingVertical: hp(0.5),
                    paddingLeft: wp(5),
                  }}
                >
                  <Text
                    style={{
                      color:
                        selctedSort == "Lowest to Highest rating"
                          ? "#fff"
                          : "#000",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    Lowest to Highest rating
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={filterServices}
          onRequestClose={() => {
            setFilterServices(false);
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.modalWrapper3}>
                <View style={styles.modalSecondWRapper}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginHorizontal: wp(5),
                      marginTop: hp(2),
                    }}
                  >
                    <TouchableOpacity
                      style={{ width: wp(30) }}
                      onPress={() => setFilterServices(false)}
                    >
                      <Image
                        source={require("../Assets/backgrey.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        width: wp(30),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: "800",
                        }}
                      >
                        Filter
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp(30),
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "800" }}>
                        Reset
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#E5E6ED",
                      height: hp(7),
                      width: wp(100),
                      marginTop: hp(3),
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 14, fontWeight: "800" }}
                    >
                      Tutoring Details
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: "800",
                        }}
                      >
                        Add
                      </Text>
                      <TouchableOpacity
                        style={{
                          height: hp(4),
                          width: wp(8),
                          borderRadius: 50,
                          backgroundColor: "#000",
                          marginLeft: wp(3),
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../Assets/backgrey.png")}
                          style={{ height: hp(3), width: wp(6) }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(2),
                      marginLeft: wp(5),
                    }}
                  >
                    <Text style={{ color: "grey", fontSize: 14 }}>Level:</Text>
                  </View>
                  <View style={styles.MainContainer}>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && { borderColor: "black" },
                      ]}
                      placeholderStyle={{ fontSize: 16, color: "#2F5597" }}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={{ color: "#2F5597" }}
                      iconStyle={styles.iconStyle}
                      data={LEVEL_LIST?.Level_list}
                      labelField="school_level_name"
                      valueField="school_level_name"
                      allowFontScaling={false}
                      //   maxHeight={100}
                      placeholder="Select Level"
                      value={selectListTutor}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        onSelectedlevel(item.school_level_name);
                        // setSelectListTutor(item.school_level_name);
                        setIsFocus(false);
                      }}
                    />
                    {/* <MultiSelect
                      items={LEVEL_LIST?.Level_list}
                      uniqueKey="school_level_name"
                      onSelectedItemsChange={onSelectedlevel}
                      selectedItems={selectedlevel}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="school_level_name"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      styleItemsContainer={{ height: 150 }}
                    /> */}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: wp(5),
                    }}
                  >
                    <Text style={{ color: "grey", fontSize: 14 }}>Grade:</Text>
                  </View>
                  <View style={styles.MainContainer}>
                    <MultiSelect
                      items={GRADE_LIST?.Grade_List}
                      uniqueKey="grade_name"
                      onSelectedItemsChange={onSelectedGrade}
                      selectedItems={SelectedGrade}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="grade_name"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      //  styleItemsContainer={{ height: 150, }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: wp(5),
                    }}
                  >
                    <Text style={{ color: "grey", fontSize: 14 }}>Stream:</Text>
                  </View>
                  <View style={styles.MainContainer}>
                    <MultiSelect
                      items={Stream_list}
                      uniqueKey="label"
                      onSelectedItemsChange={onSelectedStream}
                      selectedItems={SelectedStream}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="label"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      //   styleItemsContainer={{ height: 150, }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: wp(5),
                    }}
                  >
                    <Text style={{ color: "grey", fontSize: 14 }}>
                      Subject:
                    </Text>
                  </View>
                  <View style={styles.MainContainer}>
                    <MultiSelect
                      items={SUBJECT_LIST?.Subject_List}
                      uniqueKey="subjects_name"
                      onSelectedItemsChange={onSelectedSubject}
                      selectedItems={selectedSubject}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="subjects_name"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      //    styleItemsContainer={{ height: 150, }}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: "#E5E6ED",
                      height: hp(7),
                      width: wp(100),
                      marginTop: hp(3),
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 14, fontWeight: "800" }}
                    >
                      Tutor’s Qualification
                    </Text>
                  </View>
                  <View style={styles.MainContainer}>
                    <MultiSelect
                      items={state_list2}
                      uniqueKey="label"
                      onSelectedItemsChange={onSelectedQualChange}
                      selectedItems={selectedQual}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="label"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      styleItemsContainer={{ height: 150 }}
                    />
                  </View>

                  <View
                    style={{
                      backgroundColor: "#E5E6ED",
                      height: hp(7),
                      width: wp(100),
                      marginTop: hp(3),
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 14, fontWeight: "800" }}
                    >
                      Tutor's Gender
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                        layout="row"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#E5E6ED",
                      height: hp(7),
                      width: wp(100),
                      marginTop: hp(3),
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 14, fontWeight: "800" }}
                    >
                      Tutor’s Status
                    </Text>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioGroup
                        radioButtons={statusradioButtons}
                        onPress={onPressstatusRadioButton}
                        layout="row"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#E5E6ED",
                      height: hp(7),
                      width: wp(100),
                      marginTop: hp(3),
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: wp(5),
                    }}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 14, fontWeight: "800" }}
                    >
                      Tutor’s Nationality
                    </Text>
                  </View>

                  <View style={styles.MainContainer}>
                    <MultiSelect
                      items={items}
                      uniqueKey="country"
                      onSelectedItemsChange={onSelectedItemsChange}
                      selectedItems={selectedItems}
                      selectText="Select one or more"
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) =>
                        console.log("SSSSSSSSSSSSSS", text)
                      }
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="country"
                      searchInputStyle={{ color: "#CCC" }}
                      // submitButtonColor="#000"
                      //submitButtonText="Submit"
                      styleDropdownMenu={{}}
                      hideSubmitButton
                      styleItemsContainer={{ height: 150, paddingBottom: 10 }}
                    />
                  </View>
                </View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2), marginLeft: wp(5) }}>
                                    <Text style={{ color: 'grey', fontSize: 14, }}>Level:</Text>



                                </View> */}
                {/* <MultiSelect
                                    items={state_list}
                                    uniqueKey="label"
                                    onSelectedItemsChange={onSelectedlevel}
                                    selectedItems={selectedlevel}
                                    selectText="Select one or more"
                                    searchInputPlaceholderText="Search Items..."
                                    onChangeInput={(text) => console.log('SSSSSSSSSSSSSS', text)}
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="label"
                                    searchInputStyle={{ color: '#CCC' }}
                                    // submitButtonColor="#000"
                                    //submitButtonText="Submit"
                                    styleDropdownMenu={{ backgroundColor: "red" }}
                                    hideSubmitButton
                                    styleItemsContainer={{ height: 150, paddingBottom: 10 }}

                                /> */}

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2), marginLeft: wp(5) }}>
                                    <Text style={{ color: 'grey', fontSize: 14, }}>Grade:</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#fff', marginLeft: wp(3), paddingVertical: hp(1), width: wp(60), }}>
                                        <RNPickerSelect
                                            onValueChange={(value) => setState(value)}
                                            items={state_list}
                                            value={state}
                                            placeholder={{}}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                                                {state_list.map(
                                                    (item) =>
                                                        item.value === state && (
                                                            <Text
                                                                key={item.value}
                                                                style={{ fontSize: 13, color: '#000', }}>
                                                                {item.label}
                                                            </Text>
                                                        )
                                                )}
                                                <Image source={require('../Assets/downbutton.png')} style={{ height: hp(3), width: wp(6) }} />

                                            </View>
                                        </RNPickerSelect>

                                    </TouchableOpacity>
                                </View> */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2), marginLeft: wp(5) }}>
                                    <Text style={{ color: 'grey', fontSize: 14, }}>Subject:</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#fff', marginLeft: wp(3), paddingVertical: hp(1), width: wp(60), }}>
                                        <RNPickerSelect
                                            onValueChange={(value) => setState(value)}
                                            items={state_list}
                                            value={state}
                                            placeholder={{}}
                                        >
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                                                {state_list.map(
                                                    (item) =>
                                                        item.value === state && (
                                                            <Text
                                                                key={item.value}
                                                                style={{ fontSize: 13, color: '#000', }}>
                                                                {item.label}
                                                            </Text>
                                                        )
                                                )}
                                                <Image source={require('../Assets/downbutton.png')} style={{ height: hp(3), width: wp(6) }} />

                                            </View>
                                        </RNPickerSelect>

                                    </TouchableOpacity>
                                </View> */}
                {/* <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', width: wp(53), marginLeft: wp(21), marginTop: -hp(1.5) }} /> */}
                {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={{ height: hp(4), width: wp(13), backgroundColor: '#E5E6ED', elevation: 6, alignItems: 'center', justifyContent: 'center', marginRight: wp(6), marginTop: hp(2) }}>
                                        <Text style={{ color: '#000' }}>Done</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ backgroundColor: '#E5E6ED', height: hp(7), width: wp(100), marginTop: hp(3), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: wp(5) }}>

                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '800' }}>Tutor’s Qualification</Text>


                                </View> */}
                {/* <SafeAreaView style={{ flex: 1 }}>

                                    <View style={styles.MainContainer}>

                                        <MultiSelect
                                            items={state_list2}
                                            uniqueKey="label"
                                            onSelectedItemsChange={onSelectedQualChange}
                                            selectedItems={selectedQual}
                                            selectText="Select one or more"
                                            searchInputPlaceholderText="Search Items..."
                                            onChangeInput={(text) => console.log('SSSSSSSSSSSSSS', text)}
                                            tagRemoveIconColor="#CCC"
                                            tagBorderColor="#CCC"
                                            tagTextColor="#CCC"
                                            selectedItemTextColor="#CCC"
                                            selectedItemIconColor="#CCC"
                                            itemTextColor="#000"
                                            displayKey="label"
                                            searchInputStyle={{ color: '#CCC' }}
                                            // submitButtonColor="#000"
                                            //submitButtonText="Submit"
                                            styleDropdownMenu={{ backgroundColor: "red" }}
                                            hideSubmitButton
                                        //  styleItemsContainer={{ height: 150, paddingBottom: 10 }}

                                        />
                                    </View>
                                </SafeAreaView> */}
                {/* <View style={{ backgroundColor: '#E5E6ED', height: hp(7), width: wp(100), marginTop: hp(3), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: wp(5) }}>

                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '800' }}>Tutor's Gender</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioGroup
                                            radioButtons={radioButtons}
                                            onPress={onPressRadioButton}
                                            layout='row'

                                        />


                                        {/* <View style={{ width: wp(28), height: hp(4), backgroundColor: '#000', borderRadius: 20, marginLeft: wp(1), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', }}>Female</Text>
                                        <TouchableOpacity onPress={() => setToggleCheckBox(true)} style={{ height: hp(2), width: wp(4), borderRadius: 50, backgroundColor: '#fff', marginLeft: wp(2), alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                toggleCheckBox == true &&
                                                <View style={{ height: hp(1), width: wp(2), borderRadius: 50, backgroundColor: '#8B8000', }} />


                                            }
                                        </TouchableOpacity>


                                    </View> */}
                {/* <View style={{ width: wp(28), height: hp(4), backgroundColor: '#000', borderRadius: 20, marginLeft: wp(1), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', }}>Male</Text>
                                        <TouchableOpacity onPress={() => setToggleCheckBox2(true)} style={{ height: hp(2), width: wp(4), borderRadius: 50, backgroundColor: '#fff', marginLeft: wp(2), alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                toggleCheckBox2 == true &&
                                                <View style={{ height: hp(1), width: wp(2), borderRadius: 50, backgroundColor: '#8B8000', }} />
                                            }
                                        </TouchableOpacity>


                                    </View> */}

                {/* 
                                    </View>
                                </View> */}

                {/* <View style={{ backgroundColor: '#E5E6ED', height: hp(7), width: wp(100), marginTop: hp(3), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: wp(5) }}>

                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '800' }}>Tutor’s Status</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioGroup
                                            radioButtons={statusradioButtons}
                                            onPress={onPressstatusRadioButton}
                                            layout='row'

                                        />


                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: wp(28), height: hp(4), backgroundColor: '#000', borderRadius: 20, marginLeft: wp(1), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', }}>Full Time</Text>
                                        <TouchableOpacity onPress={() => setToggleCheckBox3(true)} style={{ height: hp(2), width: wp(4), borderRadius: 50, backgroundColor: '#fff', marginLeft: wp(2), alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                toggleCheckBox3 == true &&
                                                <View style={{ height: hp(1), width: wp(2), borderRadius: 50, backgroundColor: '#8B8000', }} />


                                            }
                                        </TouchableOpacity>


                                    </View>
                                    <View style={{ width: wp(28), height: hp(4), backgroundColor: '#000', borderRadius: 20, marginLeft: wp(1), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', }}>Part Time</Text>
                                        <TouchableOpacity onPress={() => setToggleCheckBox4(true)} style={{ height: hp(2), width: wp(4), borderRadius: 50, backgroundColor: '#fff', marginLeft: wp(2), alignItems: 'center', justifyContent: 'center' }}>
                                            {
                                                toggleCheckBox4 == true &&
                                                <View style={{ height: hp(1), width: wp(2), borderRadius: 50, backgroundColor: '#8B8000', }} />
                                            }
                                        </TouchableOpacity>


                                    </View>


                                </View> 
                            </View>
                        </View> */}
                {/* <View>
                                    <MultiSelect
                                        items={items}
                                        uniqueKey="name"
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={selectedItems}
                                        selectText="Select one or more"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={(text) => console.log('SSSSSSSSSSSSSS', text)}
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: '#CCC' }}
                                        // submitButtonColor="#000"
                                        //submitButtonText="Submit"
                                        styleDropdownMenu={{ backgroundColor: "red" }}
                                        hideSubmitButton
                                        styleItemsContainer={{ height: 150, paddingBottom: 10 }}

                                    />

                                    {/* <View style={{ width: wp(40) }}>
                                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '800' }}>Tutor’s Nationality</Text>

                                </View> 
                            </View>*/}
                {/* <View>

                                    {/* <TouchableOpacity style={{ backgroundColor: '#000', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginLeft: wp(3), paddingVertical: hp(1), width: wp(50), borderRadius: 20 }}>
                                    <Text style={{ color: '#fff', fontSize: 13 }}>Select one or more</Text>
                                    <Image source={require('../Assets/Searchh.png')} style={{ height: hp(3), width: wp(6), marginLeft: wp(2) }} />
                                </TouchableOpacity> 
                                </View> 

                            </View>
                            {/* <View style={{ flex: 0.1 }}>
                            <View style={{ backgroundColor: '#000', height: hp(7), width: wp(100), alignItems: 'center', justifyContent: 'center', marginTop: hp(3), flexDirection: 'row', paddingHorizontal: wp(5) }}>

                                <Text style={{ color: 'yellow', fontSize: 14, fontWeight: '800' }}>Show 545 Results</Text>

                            </View>
                        </View> 

                        </View>*/}
              </View>
              <TouchableOpacity
                onPress={() => setFilterServices(false)}
                style={{
                  height: hp(10),
                  justifyContent: "center",
                  backgroundColor: "#000",
                }}
              >
                <Text
                  style={{ color: "yellow", fontSize: 16, textAlign: "center" }}
                >
                  Show {GET_FILTER_DATA.length} Results
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {/* <View style={{ height: hp(20) }}></View> */}
          </SafeAreaView>
        </Modal>
      </View>
    </>
  );
};

export default OurTutor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'pink'
    // padding: 10,
  },
  whitebox: {
    height: hp(20),
    width: wp(30),
    borderRadius: 20,
    backgroundColor: "lightgrey",
    top: 20,
    marginRight: 10,
    zIndex: 99999,
  },

  MainContainer: {
    // flex: 1,
    padding: 12,
    backgroundColor: "white",
  },

  text: {
    padding: 12,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },

  LittlemoreContainer: {
    height: hp(15),
    width: wp(100),
    //  backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  LittlLeft: {
    height: hp(15),
    width: wp(50),
    justifyContent: "center",

    // backgroundColor: 'red'
  },
  LittlRight: {
    height: hp(15),
    width: wp(40),
    justifyContent: "center",
    //  backgroundColor: "yellow",
    alignItems: "center",
    flexDirection: "row",
  },
  rightImageWrapper: {
    backgroundColor: "#fff",
    height: hp(6),
    width: wp(12),
    elevation: 5,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  rightSecondImageWrapper: {
    backgroundColor: "#fff",
    height: hp(6),
    marginLeft: wp(2),
    width: wp(12),
    elevation: 5,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "",
  },

  logoicon: {
    height: hp(5),
    width: wp(10),
  },

  Headers: {
    // backgroundColor: "red",
    height: hp(3),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },

  Text1: {
    color: "#2F5597",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
  },

  Text2: {
    // color: 'grey',
    color: "#2F5597",
    fontSize: 16,
    fontFamily: "Poppins-Light",
  },

  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
  },

  HeadLeft: {
    width: wp(45),
    height: hp(3),
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(3),
    // backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  subjectsWrapper: {
    backgroundColor: "#fff",
    paddingVertical: hp(1),
    elevation: 5,
    borderRadius: 4,
    marginLeft: wp(1.5),
    marginTop: hp(2),
  },
  subjectText: {
    color: "#2F5597",
    paddingHorizontal: wp(2),
    fontSize: 12,
    fontFamily: "Poppins-Light",
  },
  frequentlyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
    marginLeft: wp(3.7),
    marginBottom: 10,
  },
  frequentlyText: {
    color: "grey",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  sortFilterWRapper: { flexDirection: "row", marginRight: wp(3) },
  sortWrapper: {
    height: hp(5),
    width: wp(21),
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  sortImage: { height: hp(3.5), width: wp(5), marginRight: 5 },
  sortText: { color: "#fff", fontSize: 13 },
  filterWrapper: {
    height: hp(5),
    width: wp(21),
    marginLeft: wp(2),
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  filterImage: { height: hp(3), width: wp(4), marginRight: 5 },
  filterText: { color: "#000", fontSize: 13 },
  modalWrapper2: {
    flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalWrapp: { height: hp(45), width: wp(100), backgroundColor: "#fff" },
  crossWRapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  crossImageWrapper: {
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
  sortByWrapper: { marginHorizontal: wp(5), marginTop: hp(3) },
  sortByText: { color: "#000", fontSize: 15, fontWeight: "800" },
  modalSecondWRapper: {
    /// height: hp(100),
    width: wp(100),
    flex: 1,
    backgroundColor: "#fff",
  },
  modalWrapper3: {
    // flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
    //  height: hp(50),
  },
  dropdown: {
    height: 30,
    width: "95%",
    borderColor: "black",

    alignSelf: "center",
    backgroundColor: "#fff",
  },
  selectedTextStyle: {
    fontSize: 13,
    color: "#000",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
