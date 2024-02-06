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
  Dimensions,
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
const SCREEN_WIDTH = Dimensions.get("window").width;
import {
  GetfilterSubject,
  GetfilterQualification,
  GetQuickData,
} from "../Redux/Actions/TutorSearchAction";
import { GetBookedTutorList } from "../Redux/Actions/TutorBooking";

import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import ReadMore from "react-native-read-more-text";
import { Loader } from "../common/Loader";

var selectArray = [];
var selectFilter = [];

var level = [];

const MyBookings = ({ props, route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Tutor, setTutor] = useState([]);

  const [Primary, setPrimary] = useState("Primary");
  const [Secondary, setSecondary] = useState("Secondary");
  const [Tabs, setTabs] = useState("InProgress");
  const [JCPre, setJCPre] = useState("JC");
  const [IB, setIB] = useState("IB");

  const [AEIS, setAEIS] = useState("AEIS");
  const [allBookedTutor, setAllBookedTutor] = useState([]);
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
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { All_Booked_Tutor } = useSelector((state) => state.TutorBooingReducer);
  console.log(
    All_Booked_Tutor,
    "All_Booked_TutorAll_Booked_TutorAll_Booked_TutorAll_Booked_Tutor"
  );
  // tutor_tution_offer_amount_type
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedQual, setSelectedQual] = useState([]);
  const [selectedlevel, setSelectedlevel] = useState([]);
  const [SelectedGrade, setSelectedGrade] = useState([]);
  const [SelectedStream, setSelectedStream] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loader, setLoader] = useState(false);

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
      data.forEach((element, index) => {
        // console.log('""""""""""""""', element);
        obj3["Levels_search"] = element;
        // setSelectedQual(element)
      });
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
    setSelectedlevel(selectedItemslevel);
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
    // name key is must. It is to show the text in front
    { id: 1, name: "India" },
    { id: 2, name: "Singapore" },
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
    console.log("KKKKKKKKKKKKKKKKKKKKK", Login_Data);

    dispatch(GetBookedTutorList(Login_Data, navigation));
  }, []);

  useEffect(() => {
    console.log("!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>> ", All_Booked_Tutor);

    setAllBookedTutor(All_Booked_Tutor);
  }, [All_Booked_Tutor]);

  useEffect(() => {
    setUserdata(GET_FILTER_DATA);
    setPostaldata(GET_POSTAL_DATA);
    setQuickdata(GET_QUICK_DATA);
  }, [GET_FILTER_DATA, GET_POSTAL_DATA, GET_QUICK_DATA]);

  useEffect(() => {
    setLoader(true);
    setAllBookedTutor(All_Booked_Tutor);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [All_Booked_Tutor]);

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

  const setTabFunc = (val) => {
    setTabs(val);
  };
  console.log(
    All_Booked_Tutor[0]?.tutor_booking_status,
    All_Booked_Tutor[0]?.offer_status,
    "tutorBookingStatus,offerStatus"
  );
  console.log(
    All_Booked_Tutor[0]?.tutor_tution_offer_amount_type,
    All_Booked_Tutor[0]?.tutor_tution_fees,
    "jkk"
  );
  return (
    <>
      <View style={styles.container}>
        <Loader flag={loader} />
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
            <Text style={styles.Text1}>My Booking</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#C5C5C5",
            width: wp(100),
          }}
        >
          <TouchableOpacity
            style={{
              width: wp(30),
              alignContent: "center",
              height: hp(8),
              justifyContent: "center",
              borderRightWidth: 1,
              borderColor: "puple",
              borderStyle: "dotted",
            }}
            onPress={() => setTabFunc("InProgress")}
          >
            <Text
              style={{
                textAlign: "center",
                color: "purple",
                fontFamily: "Poppins-Light",
              }}
            >
              In Progress
            </Text>
            {Tabs == "InProgress" ? (
              <View
                style={{
                  width: wp(20),
                  borderBottomColor: "red",
                  borderBottomWidth: 3,
                  alignSelf: "center",
                  paddingVertical: hp(0.5),
                }}
              ></View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTabFunc("Completed")}
            style={{
              width: wp(30),
              alignContent: "center",
              height: hp(8),
              justifyContent: "center",
              borderRightWidth: 1,
              borderColor: "puple",
              borderStyle: "dotted",
            }}
          >
            <Text style={{ textAlign: "center", fontFamily: "Poppins-Light" }}>
              Completed
            </Text>
            {Tabs == "Completed" ? (
              <View
                style={{
                  width: wp(20),
                  borderBottomColor: "red",
                  borderBottomWidth: 3,
                  alignSelf: "center",
                  paddingVertical: hp(0.5),
                }}
              ></View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTabFunc("BookAgain")}
            style={{
              width: wp(30),
              alignContent: "center",
              height: hp(8),
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontFamily: "Poppins-Light" }}>
              Book Again
            </Text>

            {Tabs == "BookAgain" ? (
              <View
                style={{
                  width: wp(20),
                  borderBottomColor: "red",
                  borderBottomWidth: 3,
                  alignSelf: "center",
                  paddingVertical: hp(0.5),
                }}
              ></View>
            ) : (
              <View />
            )}
          </TouchableOpacity>
        </View>

        {Tabs == "InProgress" ? (
          <>
            <View style={{ backgroundColor: "purple", height: hp(5) }}>
              <Text
                style={{
                  color: "#fff",

                  fontSize: 14,
                  marginLeft: 4,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {`You have made a ${All_Booked_Tutor[0]?.tutor_tution_offer_amount_type} offer `}
              </Text>
            </View>
            <View
              style={{
                height: hp(7),
                width: "100%",
                //justifyContent: "center",
                // alignItems: "center",
                backgroundColor: "#F2F2F2",
                marginLeft: 5,
                //paddingRight: 5
                // flexDirection: 'row',
              }}
            >
              <Text style={styles.BookText3}>
                Instructions:
                <Text style={styles.BookText4}>
                  You have placed an offer, tutor will be informed you will be
                  recieve an app notification when the tutor has responded.
                </Text>
              </Text>
            </View>

            <FlatList
              // style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true}
              // scrollEnabled={false}
              data={allBookedTutor}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              //renderItem={renderItem}

              renderItem={({ item, index }) => (
                <View style={{}}>
                  <View style={styles.swipperWrapper}>
                    <View style={styles.leftImageWrapper}>
                    <Image
                        source={{
                          uri: `https://colwithfarmchips.co.uk/projects/tutorapp/UPLOAD_file/${item?.profile_image}`,
                        }}
                        style={styles.leftImage}
                      />
                    </View>

                    {/* {Tutor && Tutor.map((item) => { */}

                    <View style={styles.widthWrapper}>
                      <View>
                        <View style={styles.wrraper}>
                          <Text style={styles.userIdWrapper}>
                            {" "}
                            {item.student_tution_type}
                          </Text>
                          <Image
                            source={require("../Assets/flag.png")}
                            style={styles.flagImage}
                          />

                          <TouchableOpacity
                            style={{ alignItems: "flex-end", width: wp(50) }}
                          >
                            <Image
                              source={require("../Assets/HomeTution.png")}
                              style={{ height: 20, width: 20 }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            height: 20,
                            width: "100%",
                            marginLeft: 10,
                          }}
                        >
                          <View style={{}}>
                            <View>
                              {item.tutor_qualification &&
                                item.tutor_qualification.map((item) => {
                                  return (
                                    <View>
                                      <Text key={item} style={{ fontSize: 10 }}>
                                        {item.Tutor_Qualification}
                                      </Text>
                                    </View>
                                  );
                                })}
                            </View>
                            <StarRating
                              fullStarColor="orange"
                              disabled={false}
                              maxStars={5}
                              rating={4}
                              starSize={15}
                              // selectedStar={(rating) => setStrCount(rating)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp(100),
                      flexDirection: "row",
                      backgroundColor: "#ADD8E6",
                      paddingBottom: 15,
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Poppins-Regular",
                        width: wp(70),
                        fontSize: 12,
                      }}
                    >
                      {item.postal_address}
                    </Text>
                    <Image
                      source={require("../Assets/Map.jpeg")}
                      style={{ height: 20, width: 20, marginLeft: 10 }}
                    />
                  </View>
                  <View
                    style={{
                      height: 50,
                      // marginTop: 10,
                      width: "100%",
                      //position: 'absolute',
                      //bottom: 30,
                      //padding:10,
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: "100%",
                        width: "10%",
                        backgroundColor: "green",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                      }}
                    >
                      <Image
                        source={require("../Assets/UserWhite.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => navigation.navigate('')}
                      style={{
                        height: "100%",
                        width: "45%",
                        backgroundColor: "#C0C0C0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                      }}
                    >
                      <Text style={styles.BookText5}>Cancel Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          item
                            ?.student_date_time_offer_confirmation ===
                          "Confirmed"
                        ) {
                          navigation.navigate("MakePayment");
                        } else {
                          if (
                            item?.offer_status === "Accept" &&
                            item
                              ?.student_date_time_offer_confirmation === ""
                          ) {
                            navigation.navigate("StartDT", {
                              Amount_type:
                              item
                                  ?.tutor_tution_offer_amount_type,
                              fees: item?.tutor_tution_fees,
                              tutorBookingStatus:
                              item?.tutor_booking_status,
                              offerStatus: item?.offer_status,
                              tutorBookingProcessId:
                              item?.tutor_booking_process_id,
                              student_id: item?.student_id,
                              student_offer_time:
                              item?.student_offer_time,
                              student_offer_date:
                              item?.student_offer_date,
                              // amount: offerAmount,
                              // youramount: youroffer
                            });
                          } else if (
                            item?.amount_negotiate_by_tutor !=
                            "0.00"
                          ) {
                            navigation.navigate("AcceptNegotiate", {
                              amount_negotiate_by_tutor:
                              item?.amount_negotiate_by_tutor,
                            });
                          } else {
                            navigation.navigate("MakeOffer", {
                              Amount_type:
                              item
                                  ?.tutor_tution_offer_amount_type,
                              fees: item?.tutor_tution_fees,
                              tutorBookingStatus:
                              item?.tutor_booking_status,
                              offerStatus: item?.offer_status,
                              tutorBookingProcessId:
                              item?.tutor_booking_process_id,
                              student_id: item?.student_id,
                              student_offer_time:
                              item?.student_offer_time,
                              student_offer_date:
                              item?.student_offer_date,
                              // amount: offerAmount,
                              // youramount: youroffer
                            });
                          }
                        }
                      }}
                      style={{
                        height: "100%",
                        width: "45%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          route?.params?.proceed === true
                            ? "purple"
                            : "#F6BE00",
                        borderRadius: 3,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            route?.params?.proceed === true ? "white" : "black",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {route?.params?.proceed === true
                          ? "Proceed"
                          : "View Details"}{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        ) : Tabs == "BookAgain" ? (
          <>
            <View
              style={{
                backgroundColor: "#ADD8E6",
                height: hp(25),
                marginTop: 5,
              }}
            >
              <View style={styles.swipperWrapper}>
                <View style={styles.leftImageWrapper}>
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.leftImage}
                  />
                </View>
                <View style={styles.widthWrapper}>
                  <View>
                    <View style={styles.wrraper}>
                      <Text style={styles.userIdWrapper}>Bryan Wong</Text>
                      <Image
                        source={require("../Assets/flag.png")}
                        style={styles.flagImage}
                      />

                      <TouchableOpacity
                        style={{ alignItems: "flex-end", width: wp(50) }}
                      >
                        <Text>24 July 2022</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                        width: "100%",
                        marginLeft: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          88888888
                        </Text>
                        <StarRating
                          fullStarColor="orange"
                          disabled={false}
                          maxStars={5}
                          rating={4}
                          starSize={15}
                          // selectedStar={(rating) => setStrCount(rating)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: "17%",

                  width: "90%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "35%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AcceptNonTutor", {
                        amount: offerAmount,
                        youramount: youroffer,
                      })
                    }
                    style={{
                      height: "100%",
                      borderColor: "red",
                      justifyContent: "center",
                      // alignItems: 'center',
                      // backgroundColor: 'purple',
                      //  borderRadius: 5,
                      borderWidth: 1,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.SuccessText}>Success</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: wp(50), flexDirection: "row" }}>
                  <View
                    style={{
                      width: wp(50),
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Duration.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Frequency Duration
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Time.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Tution Schedule
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Student.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Student Profile
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: "20%",
                  // marginTop: 10,
                  width: "100%",
                  //position: 'absolute',
                  //bottom: 30,
                  marginTop: 30,
                  //padding:10,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  // onPress={() => navigation.navigate('')}
                  style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: "#F6BE00",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                  }}
                >
                  <Text style={styles.BookText5}>Book This Tutor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() =>

                  //   navigation.navigate('AcceptNonTutor', {
                  //     amount: offerAmount,
                  //     youramount: youroffer
                  //   })
                  // }
                  style={{
                    height: "100%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "purple",
                    borderRadius: 3,
                  }}
                >
                  <Text style={styles.infoText1}>Book A New Tutor</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#ADD8E6",
                height: hp(25),
                marginTop: 5,
              }}
            >
              <View style={styles.swipperWrapper}>
                <View style={styles.leftImageWrapper}>
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.leftImage}
                  />
                </View>
                <View style={styles.widthWrapper}>
                  <View>
                    <View style={styles.wrraper}>
                      <Text style={styles.userIdWrapper}>Bryan Wong</Text>
                      <Image
                        source={require("../Assets/flag.png")}
                        style={styles.flagImage}
                      />

                      <TouchableOpacity
                        style={{ alignItems: "flex-end", width: wp(50) }}
                      >
                        <Text>24 July 2022</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                        width: "100%",
                        marginLeft: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          88888888
                        </Text>
                        <StarRating
                          fullStarColor="orange"
                          disabled={false}
                          maxStars={5}
                          rating={4}
                          starSize={15}
                          // selectedStar={(rating) => setStrCount(rating)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: "17%",

                  width: "90%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "35%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AcceptNonTutor", {
                        amount: offerAmount,
                        youramount: youroffer,
                      })
                    }
                    style={{
                      height: "100%",
                      borderColor: "red",
                      justifyContent: "center",
                      // alignItems: 'center',
                      // backgroundColor: 'purple',
                      //  borderRadius: 5,
                      borderWidth: 1,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.SuccessText}>You Cancelled</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: wp(50), flexDirection: "row" }}>
                  <View
                    style={{
                      width: wp(50),
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Duration.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Frequency Duration
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Time.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Tution Schedule
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Student.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Student Profile
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: "20%",
                  // marginTop: 10,
                  width: "100%",
                  //position: 'absolute',
                  //bottom: 30,
                  marginTop: 30,
                  //padding:10,
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  // onPress={() => navigation.navigate('')}
                  style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: "#F6BE00",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                  }}
                >
                  <Text style={styles.BookText5}>Book This Tutor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() =>

                  //   navigation.navigate('AcceptNonTutor', {
                  //     amount: offerAmount,
                  //     youramount: youroffer
                  //   })
                  // }
                  style={{
                    height: "100%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "purple",
                    borderRadius: 3,
                  }}
                >
                  <Text style={styles.infoText1}>Book A New Tutor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "#ADD8E6",
                height: hp(20),
                marginTop: 5,
              }}
            >
              <View style={styles.swipperWrapper}>
                <View style={styles.leftImageWrapper}>
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.leftImage}
                  />
                </View>
                <View style={styles.widthWrapper}>
                  <View>
                    <View style={styles.wrraper}>
                      <Text style={styles.userIdWrapper}>Bryan Wong</Text>
                      <Image
                        source={require("../Assets/flag.png")}
                        style={styles.flagImage}
                      />

                      <TouchableOpacity
                        style={{ alignItems: "flex-end", width: wp(50) }}
                      >
                        <Text>24 July 2022</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                        width: "100%",
                        marginLeft: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          88888888
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: "17%",

                  width: "90%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "35%",
                  }}
                >
                  <TouchableOpacity
                    // onPress={() =>

                    //   navigation.navigate('AcceptNonTutor', {
                    //     amount: offerAmount,
                    //     youramount: youroffer
                    //   })
                    // }
                    style={{
                      height: "100%",

                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "purple",
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.ReviewText}>Leave Me a Review</Text>
                  </TouchableOpacity>

                  <StarRating
                    fullStarColor="orange"
                    disabled={false}
                    maxStars={5}
                    rating={4}
                    starSize={15}
                    // selectedStar={(rating) => setStrCount(rating)}
                  />
                </View>

                <View style={{ width: wp(50), flexDirection: "row" }}>
                  <View
                    style={{
                      width: wp(50),
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Duration.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Frequency Duration
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Time.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Tution Schedule
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Student.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Student Profile
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ADD8E6",
                height: hp(20),
                marginTop: 5,
              }}
            >
              <View style={styles.swipperWrapper}>
                <View style={styles.leftImageWrapper}>
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.leftImage}
                  />
                </View>
                <View style={styles.widthWrapper}>
                  <View>
                    <View style={styles.wrraper}>
                      <Text style={styles.userIdWrapper}>Bryan Wong</Text>
                      <Image
                        source={require("../Assets/flag.png")}
                        style={styles.flagImage}
                      />

                      <TouchableOpacity
                        style={{ alignItems: "flex-end", width: wp(50) }}
                      >
                        <Text>24 July 2022</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                        width: "100%",
                        marginLeft: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          88888888
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: "17%",

                  width: "90%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "35%",
                  }}
                >
                  <TouchableOpacity
                    // onPress={() =>

                    //   navigation.navigate('AcceptNonTutor', {
                    //     amount: offerAmount,
                    //     youramount: youroffer
                    //   })
                    // }
                    style={{
                      height: "100%",

                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "purple",
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.ReviewText}>Leave Me a Review</Text>
                  </TouchableOpacity>

                  <StarRating
                    fullStarColor="orange"
                    disabled={false}
                    maxStars={5}
                    rating={4}
                    starSize={15}
                    // selectedStar={(rating) => setStrCount(rating)}
                  />
                </View>

                <View style={{ width: wp(50), flexDirection: "row" }}>
                  <View
                    style={{
                      width: wp(50),
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Duration.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Frequency Duration
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Time.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Tution Schedule
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Student.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Student Profile
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ADD8E6",
                height: hp(20),
                marginTop: 5,
              }}
            >
              <View style={styles.swipperWrapper}>
                <View style={styles.leftImageWrapper}>
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.leftImage}
                  />
                </View>
                <View style={styles.widthWrapper}>
                  <View>
                    <View style={styles.wrraper}>
                      <Text style={styles.userIdWrapper}>Bryan Wong</Text>
                      <Image
                        source={require("../Assets/flag.png")}
                        style={styles.flagImage}
                      />

                      <TouchableOpacity
                        style={{ alignItems: "flex-end", width: wp(50) }}
                      >
                        <Text>24 July 2022</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 20,
                        width: "100%",
                        marginLeft: 10,
                      }}
                    >
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          88888888
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: "17%",

                  width: "90%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "35%",
                  }}
                >
                  <TouchableOpacity
                    // onPress={() =>

                    //   navigation.navigate('AcceptNonTutor', {
                    //     amount: offerAmount,
                    //     youramount: youroffer
                    //   })
                    // }
                    style={{
                      height: "100%",

                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "purple",
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.ReviewText}>Leave Me a Review</Text>
                  </TouchableOpacity>

                  <StarRating
                    fullStarColor="orange"
                    disabled={false}
                    maxStars={5}
                    rating={4}
                    starSize={15}
                    // selectedStar={(rating) => setStrCount(rating)}
                  />
                </View>

                <View style={{ width: wp(50), flexDirection: "row" }}>
                  <View
                    style={{
                      width: wp(50),
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Duration.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Frequency Duration
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Time.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Tution Schedule
                      </Text>
                    </View>

                    <View style={{ width: wp(15), alignItems: "center" }}>
                      <Image
                        source={require("../Assets/Student.png")}
                        style={styles.icons}
                      />
                      <Text style={{ fontSize: 10, textAlign: "center" }}>
                        Student Profile
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'pink'
    // padding: 10,
  },

  deleteBox: {
    backgroundColor: "#fff",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    top: 20,
  },
  BookText4: {
    fontSize: 12,
    color: "grey",

    fontFamily: "Poppins-Light",
  },
  swipperWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(100),
    // marginBottom: hp(1),
    alignSelf: "center",
    // marginLeft: wp(5),
    //elevation: 5,
    // paddingVertical: hp(1),
    //borderRadius: 4,
    // marginTop: hp(1),
    backgroundColor: "#ADD8E6",
  },
  BookText3: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    color: "red",
  },
  leftImageWrapper: {
    width: wp(16),
    // backgroundColor:"yellow",
    alignItems: "center",
    paddingTop: 10,
    // justifyContent: 'center'
  },
  leftImage: {
    height: 40,
    width: 40,
    marginLeft: wp(5),
  },
  widthWrapper: {
    height: 80,
    width: wp(84),
    // backgroundColor:'red'
  },
  wrraper: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    width: "90%",
    marginLeft: 10,
    marginTop: 10,
  },
  infoText1: {
    color: "#000",
  },
  whiteColor: {
    color: " #fff",
  },
  ReviewText: {
    color: "#fff",
    fontSize: 12,
  },
  SuccessText: {
    color: "red",
    marginLeft: 5,
    fontSize: 12,
  },
  BookText5: {
    color: "#fff",

    fontFamily: "Poppins-Regular",
  },
  userIdWrapper: {
    color: "#000",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "Poppins-SemiBold",
  },
  flagImage: {
    height: hp(2),
    width: wp(6),
    marginLeft: wp(2),
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
    height: hp(10),
    width: wp(100),
    // backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: 'center',
    //alignItems: 'center',
  },
  LittlLeft: {
    height: hp(10),
    width: wp(50),
    marginLeft: 10,
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
  },

  logoicon: {
    height: hp(5),
    width: wp(11),
    // height: 100,
    // width: 100,

    // borderRadius: 100 / 2
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
  subjectText: { color: "#2F5597", paddingHorizontal: wp(2), fontSize: 12 },
  frequentlyWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
    marginLeft: wp(3.7),
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
  sortImage: { height: hp(4), width: wp(8) },
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
  filterImage: { height: hp(4), width: wp(8) },
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
});
