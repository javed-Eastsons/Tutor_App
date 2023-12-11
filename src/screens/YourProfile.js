import React, { useState, useMemo } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { RNCamera, FaceDetector } from "react-native-camera";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  saveProfile,
  GetUserProfile,
} from "../Redux/Actions/Tutors";

import { Loader } from "../common/Loader";

const YourProfle = ({ props, route }) => {
  const [imageSource, setImageSource] = useState(null);
  const [imageSource1, setImageSource1] = useState(null);
  const [userDetail, setUserDetail] = useState([]);
  const [newImg, setNewImg] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { PersonalInfo_Data } = useSelector((state) => state.TutorReducer);
  const { Tution_Type } = useSelector((state) => state.TutorReducer);
  const { AcademicHistory_Data } = useSelector((state) => state.TutorReducer);
  const { Tutoring_Data } = useSelector((state) => state.TutorReducer);
  const { TutionStatus_Data } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  const [Age, setAge] = useState(0);
  const [showPers, setShowPers] = useState(false);
  const [showAcad, setShowAcad] = useState(false);
  const [showTut, setShowTut] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [loader, setLoader] = useState(false);

  console.log(
    //  SINGLE_USER.Extra_info[0],
    "SINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USER",
    Login_Data
  );
  console.log(showPers, "showpers");
  if (route.params) {
    const {
      Age,
      markGender,
      selectnational,
      GET_USER_ID,
      selectedCourse,
      school,
      grade,
      subject,
      courses,
      selectListTutor,
      state,
      state2,
      selectArray,
      mark,
    } = route.params;
  }

  useEffect(() => {
    setUserDetail(SINGLE_USER);
    setAge(userDetail[0]?.Extra_info[0]?.age);
  }, [SINGLE_USER, setAge]);

  console.log(userDetail, "chika", Age);
  // console.log(PersonalInfo_Data, 'PersonalInfo_Data')
  // console.log(AcademicHistory_Data, 'AcademicHistory_Data')
  // console.log(Tutoring_Data, 'Tutoring_Data')
  // console.log(TutionStatus_Data, 'TutionStatus_Data')

  const [btnP, setBtnP] = useState(false);
  const dispatch = useDispatch();
  //  console.log(imageSource, "imageSource0");
  const requestPermission = () => {
    openCamera();
    // request(PERMISSIONS.IOS.CAMERA).then((result) => {
    //   // console.log("requestPermission -> result", result);
    //   if (result === "granted") openCamera();
    // });
  };
  const openImageLibrary = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // console.log(response.assets[0].uri);
        setNewImg(response.assets[0].uri);
        AsyncStorage.setItem("profileImage", response.assets[0].uri);
      }
      setShowPopup(false);
    });
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  toDataURL(newImg).then((dataUrl) => {
    var base64result = dataUrl.split(",")[1];

    // console.log("RESULT:", base64result);
    setImageSource(base64result);
    setImageSource1(dataUrl);
  });

  const openCamera = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        Alert.alert("You did not select any image");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // console.log(response);
        setNewImg(response.assets[0].uri);
        AsyncStorage.setItem("profileImage", response.assets[0].uri);
      }
      setShowPopup(false);
    });
  };


  const showSelectionPopup = () => (
    <TouchableOpacity
      onPress={() => setShowPopup(false)}
      style={{
        // position: "absolute",
        // top: 2,
        justifyContent: "center",
        alignItems: "center",
        //right: 0,

        // backgroundColor: 'rgba(0,0,0,0.2)',
        //zIndex: 10,
        //height: "100%",
        //width: "40%",
      }}
    >
      <View
        style={{
          height: 70,
          width: 200,
          // backgroundColor: 'red',
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={openImageLibrary}
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../Assets/gallery.png")}
            style={styles.icons1}
          />
        </TouchableOpacity>

        <View style={{ height: 0, width: "50%", backgroundColor: "grey" }} />
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Image
            source={require("../Assets/camra.png")}
            style={styles.icons1}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  // const showSelectionPopup = () => (
  //   <TouchableOpacity
  //     onPress={() => setShowPopup(false)}
  //     style={{
  //       position: "absolute",
  //       top: 50,
  //       justifyContent: "center",
  //       alignItems: "center",
  //       // backgroundColor: 'rgba(0,0,0,0.2)',
  //       zIndex: 10,
  //       height: "100%",
  //       width: "100%",
  //     }}
  //   >
  //     <View
  //       style={{
  //         height: 100,
  //         width: 200,
  //         //   backgroundColor: 'red',
  //         alignItems: "center",
  //         justifyContent: "center",
  //         marginTop: 20,
  //       }}
  //     >
  //       <TouchableOpacity
  //         onPress={requestPermission}
  //         style={{
  //           height: 50,
  //           width: "100%",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >

  //         <Text>Camera</Text>

  //       </TouchableOpacity>

  //       <View style={{ height: 1, width: "100%", backgroundColor: "grey" }} />
  //       <TouchableOpacity
  //         onPress={openImageLibrary}
  //         style={{
  //           height: 50,
  //           width: "100%",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text>Gallery Options</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </TouchableOpacity>
  // );

  useEffect(async () => {
    const img = await AsyncStorage.getItem("profileImage");
    setNewImg(img);
  }, []);


  let options = {
    title: "You can choose one image",
    maxWidth: 256,
    maxHeight: 256,
    storageOptions: {
      skipBackup: true,
    },
  };

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);

  useEffect(
    () => {
      setUserDetail(SINGLE_USER);
      setImageSource1(
        "https://refuel.site/projects/tutorapp/UPLOAD_file/" +
        userDetail[0]?.Extra_info[0]?.profile_image
      );
    },
    [SINGLE_USER],
    setImageSource1
  );

  useEffect(
    () => {
      setImageSource1(
        "https://refuel.site/projects/tutorapp/UPLOAD_file/" +
        userDetail[0]?.Extra_info[0]?.profile_image
      );
    },
    [SINGLE_USER],
    setImageSource1
  );

  console.log(
    // imageSource,
    "LLLLLLLLLLLLLLLLLLLLLLLL",
    userDetail[0]?.Extra_info[0]?.profile_image
    //imageSource1
  );
  // console.log('route.params', route.params)
  // const[Personal, setPersonal] = useState('');
  // const[Academic, setAcademic] = useState('');

  // useEffect(() => {
  //     setPersonal(route?.params?.complete)
  //     setAcademic(route?.params?.Academiccomplete)
  // },[Personal, Academic])

  // console.log('route?.params?.complete', route?.params?.complete)
  // console.log('route?.params?.Academiccomplete', route?.params?.Academiccomplete)
  // console.log(PersonalInfo_Data, "PersonalInfo_Data from your profile");
  //console.log(AcademicHistory_Data, "AcademicHistory_DataAcademicHistory_Data from your profile");
  console.log(Tution_Type, "Tution_TypeTution_TypeTution_Type from your profile");
  const UpdateProfile = () => {
    console.log(
      Tution_Type,
      "Tutoring_TypeTutoring_TypeTutoring_Type",
      PersonalInfo_Data
    );
    setBtnP(true);
    dispatch(
      editProfile(
        Login_Data,
        imageSource,
        PersonalInfo_Data,
        Tution_Type,
        AcademicHistory_Data,
        TutionStatus_Data,
        Tutoring_Data,
        navigation
      )
    );
    //Alert.alert("Save Profile Successfully");
    // console.log("save Profile");
  };

  const saveprofile = () => {
    console.log(
      Login_Data,
      imageSource,
      PersonalInfo_Data,
      Tution_Type,
      AcademicHistory_Data,
      TutionStatus_Data,
      Tutoring_Data
    );
    setBtnP(true);
    setLoader(true);
    dispatch(
      saveProfile(
        GET_USER_ID,
        imageSource,
        PersonalInfo_Data,
        Tution_Type,
        AcademicHistory_Data,
        TutionStatus_Data,
        Tutoring_Data,
        navigation
      )
    );
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    //Alert.alert("Save Profile Successfully");
    // console.log("save Profile");
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <View style={styles.Headers}>
        <View style={styles.HeadLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../Assets/baricon.png")}
              style={styles.icons}
            />
            <Text style={{ fontSize: 10 }}></Text>



          </TouchableOpacity>
          {/* <Image source={require("../Assets/bell.png")} style={styles.icons} /> */}
        </View>
        <View style={styles.HeadRight}>
          {/* <View>
            <Image source={require("../Assets/bell.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}></Text>

          </View> */}
          {/* <View>
            <Image
              source={require("../Assets/search.png")}
              style={styles.icons}
            />
            <Text style={{ fontSize: 10 }}></Text>

          </View> */}

          <View>
            <Image source={require("../Assets/chat.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}>Support</Text>
          </View>
          <View>
            <Image source={require("../Assets/bell.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}></Text>

          </View>

        </View>
      </View>

      <ScrollView>
        <View style={styles.usercontainer}>
          {/* {showPopup && showSelectionPopup()} */}
          <View style={styles.UserLeft}>
            <Text style={styles.text1}>Your Profile</Text>
            <Text style={styles.text2}>
              Complete your profile to access ALL Features
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", width: wp(90), justifyContent: "center", alignSelf: "center" }}
        >
          <View style={styles.usercontainer1}>
            {showPopup && showSelectionPopup()}
          </View>


          <TouchableOpacity
            style={{
              width: "30%",
              height: 100,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              //  marginTop: 65,
            }}
            onPress={() => setShowPopup(true)}
          >

            {imageSource1 == "https://refuel.site/projects/tutorapp/UPLOAD_file/undefined" || imageSource1 == "" || imageSource1 == undefined ?

              // <Image
              //   source={require("../Assets/Profile.png")}
              //   style={{
              //     width: 100,
              //     height: 100,

              //     //  backgroundColor: "grey",
              //   }}
              // />
              <View />

              :

              <View
                style={{
                  width: 25,
                  position: "relative",
                  top: 18,
                  left: wp(10),
                  //padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  //  borderColor: '#000',
                  borderRadius: 20,
                  //   borderWidth: 2,
                  height: 25,
                }}
              >
                <Image
                  source={require("../Assets/pencilEdit.png")}
                  style={{
                    width: 15,
                    height: 15,

                    //  backgroundColor: "grey",
                  }}
                />
              </View>
            }


            {console.log(imageSource1, 'imageSource1imageSource1imageSource1imageSource1imageSource1')}
            {imageSource1 == "https://refuel.site/projects/tutorapp/UPLOAD_file/undefined" || imageSource1 == "" || imageSource1 == undefined ?

              <Image
                source={require("../Assets/Profile.png")}
                style={{
                  width: 100,
                  height: 100,

                  //  backgroundColor: "grey",
                }}
              />
              :
              <Image
                source={{ uri: imageSource1 }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "grey",
                }}
              />
            }
          </TouchableOpacity>
          <View
            style={{
              width: "30%",
            }}
          >
            {imageSource1 == "https://refuel.site/projects/tutorapp/UPLOAD_file/undefined" || imageSource1 == "" || imageSource1 == undefined ?
              <View />

              :
              <View style={styles.tickWrapper}>
                <Image
                  source={require("../Assets/right.png")}
                  style={styles.tickImage}
                />
              </View>
            }
          </View>
        </View>



        <View style={styles.postContainer}>
          {route?.params?.complete === "complete" ? (
            <View
              style={[styles.postLeft, { justifyContent: "space-between" }]}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../Assets/Personal.png")}
                  style={styles.posticons}
                />
                <Text style={styles.postText}>Personal Information</Text>
              </View>
              <Image
                source={require("../Assets/tutionsjobs.png")}
                style={styles.tickIcon}
              />
            </View>
          ) : (
            <View style={styles.postLeft}>
              <View>
                <Image
                  source={require("../Assets/Personal.png")}
                  style={styles.posticons}
                />
              </View>
              <View
                onPress={() => {
                  setShowPers(true);
                }}
              >
                <Text style={styles.postText}>Personal Information</Text>
                <Text style={styles.postSemiText}>
                  First, let’s get some information about yourself
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {/* {showPers == true ? ( */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PersonalInfo", {
                        RouteFrom: "Create",
                        PersonalInfo_info: PersonalInfo_Data
                      })
                    }
                    style={styles.infoWrapper}
                  >
                    {PersonalInfo_Data.Age == "" || PersonalInfo_Data.Age == undefined && PersonalInfo_Data.markGender == undefined && PersonalInfo_Data.selectnational == undefined ?

                      <Text style={styles.infoWrapperText}>
                        Enter Personal Information
                      </Text>
                      :
                      <Text style={styles.infoWrapperText}>
                        Edit Personal Information
                      </Text>
                    }

                  </TouchableOpacity>
                  {PersonalInfo_Data.Age == "" || PersonalInfo_Data.Age == undefined && PersonalInfo_Data.markGender == undefined && PersonalInfo_Data.selectnational == undefined ?

                    <View />
                    :

                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>

                  }

                  {/* // ) : null} */}
                  {/* {PersonalInfo_Data.persSave == false ? ( */}
                  {/* <View style={styles.tickWrapper}>
                    <Image
                      source={require("../Assets/right.png")}
                      style={styles.tickImage}
                    />
                  </View> */}
                  {/* // ) : ( */}
                  {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PersonalInfo", {
                        RouteFrom: "Create",
                      })
                    }
                    style={styles.infoWrapper}
                  >
                    <Text style={styles.infoWrapperText}>
                      Enter Personal Information
                    </Text>
                  </TouchableOpacity> */}
                  {/* // )} */}
                </View>
              </View>
            </View>
          )}

          {route?.params?.complete === "Academiccomplete" ? (
            <View
              style={[styles.postLeft, { justifyContent: "space-between" }]}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../Assets/tutionsjobs.png")}
                  style={styles.posticons}
                />
                <Text style={styles.postText}>Academic History</Text>
              </View>
              <Image
                source={require("../Assets/tutionsjobs.png")}
                style={styles.tickIcon}
              />
            </View>
          ) : (
            <View style={styles.postLeft}>
              <View>
                <Image
                  source={require("../Assets/Academic.png")}
                  style={styles.posticons}
                />
              </View>
              <View
                onPress={() => {
                  setShowAcad(true);
                }}
              >
                <Text style={styles.postText}>Academic History</Text>
                <Text style={styles.postSemiText}>
                  Now we need to know something about your academic background
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {/* {showAcad == true ? ( */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AcademicInfo", {
                        RouteFrom: "Create",
                        AcademicHistory_Info: AcademicHistory_Data
                      })
                    }
                    style={styles.infoWrapper}
                  >

                    {console.log(AcademicHistory_Data, '7777777777777777777')}
                    {AcademicHistory_Data == "" || AcademicHistory_Data.Course == undefined || AcademicHistory_Data.Course == "" || AcademicHistory_Data.gra_year == undefined || AcademicHistory_Data.gra_year == ""
                      || AcademicHistory_Data.qualification == undefined || AcademicHistory_Data.qualification == ""
                      ?
                      <Text style={styles.infoWrapperText}>
                        Enter Academic History
                      </Text>
                      :
                      <Text style={styles.infoWrapperText}>
                        Edit Academic History
                      </Text>
                    }

                  </TouchableOpacity>

                  {AcademicHistory_Data == "" || AcademicHistory_Data.Course == undefined || AcademicHistory_Data.Course == "" || AcademicHistory_Data.gra_year == undefined || AcademicHistory_Data.gra_year == ""
                    || AcademicHistory_Data.qualification == undefined || AcademicHistory_Data.qualification == ""
                    ?
                    <View />
                    :
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>

                  }
                  {/* ) : null} */}
                  {/* {AcademicHistory_Data.acadSave == false ? (
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AcademicInfo", {
                          RouteFrom: "Create",
                        })
                      }
                      style={styles.infoWrapper}
                    >
                      <Text style={styles.infoWrapperText}>
                        Enter Academic History
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </View>
              </View>
            </View>
          )}
          {/* <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tution Type</Text>
                    </View> */}
          <View style={styles.postLeft2}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../Assets/TutionTypes.png")}
                style={styles.posticons}
              />
              <View>
                {/* <Text style={styles.postText}>Tution Type</Text>Select the Tuition Services you would like to provide */}
                <Text style={styles.postText}>Select the Tuition Services you would like {"\n"}to provide</Text>
                <Text style={styles.postSemiText}>
                  We have a few tuition services. What are your preferences?
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", width: wp(86), justifyContent: "space-between", alignSelf: "center" }}>
              <View
                onPress={() => navigation.navigate('OnlineTuition')}
                style={{
                  height: hp(20),
                  marginTop: hp(2),
                  alignItems: "center",
                  // marginLeft: wp(3),
                  width: wp(27),
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    height: hp(7),
                    width: wp(14),
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../Assets/onlinetutIcon.png")}
                    style={{ height: hp(4), width: wp(6) }}
                  />
                </View>

                <Text style={{ color: "#000", fontSize: 12, marginTop: hp(2) }}>
                  Online Tuition
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('OnlineTuition')}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: "grey",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Image source={require('../Assets/tutionsjobs.png')}
                                        style={{height:hp(3), width:wp(6)}}/> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: hp(20),
                  marginTop: hp(2),
                  alignItems: "center",
                  //  marginLeft: wp(3),
                  width: wp(27),
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    height: hp(7),
                    width: wp(14),
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../Assets/helptutIcon.png")}
                    style={{ height: hp(4), width: wp(6) }}
                  />
                </View>

                <Text style={{ color: "#000", fontSize: 12, marginTop: hp(2) }}>
                  Homework Help
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('HomeworkHelp')}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: "grey",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Image source={require('../Assets/tutionsjobs.png')}
                                        style={{height:hp(3), width:wp(6)}}/> */}
                </TouchableOpacity>
              </View>

              <View
                // onPress={() =>
                //   navigation.navigate("HomeTution", {
                //     RouteFrom: "Create",
                //     Tution_Info: Tution_Type
                //   })
                // }
                style={{
                  height: hp(20),
                  marginTop: hp(2),
                  alignItems: "center",
                  //   marginLeft: wp(3),
                  width: wp(27),
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    height: hp(7),
                    width: wp(14),
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../Assets/8a.png")}
                    style={{ height: hp(4), width: wp(6) }}
                  />
                </View>

                <Text style={{ color: "#000", fontSize: 12, marginTop: hp(2) }}>
                  Home Tuition
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("HomeTution", {
                      RouteFrom: "Create",
                      Tution_Info: Tution_Type
                    })
                  }
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    elevation: 10,
                    marginTop: hp(1),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {
                    Tution_Type == "" || Tution_Type.Postal_Code == undefined && Tution_Type.address == undefined
                      && isNaN(Tution_Type.Distance) && isNaN(Tution_Type.latitude) && isNaN(Tution_Type.longitude)
                      ?
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                      : <View style={styles.tickWrapper}>
                        <Image
                          source={require("../Assets/right.png")}
                          style={styles.tickImage}
                        />
                      </View>
                  }

                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ alignSelf: "center", marginTop: hp(3) }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#2F5597",
                  borderRadius: 25,
                  height: hp(6),
                  width: wp(35),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>Save</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          {route?.params?.Tutorcomplete === "Tutorccomplete" ? (
            <View
              style={[styles.postLeft, { justifyContent: "space-between" }]}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../Assets/tutionsjobs.png")}
                  style={styles.posticons}
                />
                <Text style={styles.postText}>
                  Tutoring Level, Subjects & Experience
                </Text>
              </View>
              <Image
                source={require("../Assets/tutionsjobs.png")}
                style={styles.tickIcon}
              />
            </View>
          ) : (
            <View style={styles.postLeft}>
              <View>
                <Image
                  source={require("../Assets/SubjectExperience.png")}
                  style={styles.posticons}
                />
              </View>
              <View
                onPress={() => {
                  setShowTut(true);
                }}
              >
                <Text style={styles.postText}>
                  Tutoring Level, Subjects & Experience
                </Text>
                <Text style={styles.postSemiText}>
                  Share the subjects you would like to tutor & your tutoring
                  experience
                </Text>

                <View style={{ flexDirection: "row" }}>
                  {/* {showTut == true ? ( */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TutoringDetail", {
                        RouteFrom: "Create",
                        Tutoring_Info: Tutoring_Data
                      })
                    }
                    style={styles.infoWrapper}
                  >

                    {Tutoring_Data == "" || Tutoring_Data.selectArray.length == 0 ?
                      <Text style={styles.infoWrapperText}>
                        Enter Tutoring Details
                      </Text>
                      :
                      <Text style={styles.infoWrapperText}>
                        Edit Tutoring Details
                      </Text>
                    }
                  </TouchableOpacity>
                  {Tutoring_Data == "" || Tutoring_Data.selectArray.length == 0 ?
                    <View />
                    :
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>

                  }
                  {/* ) : null} */}
                  {/* {TutionStatus_Data.tutSave == false ? (
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>
                  ) : ( */}
                  {/* <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TutoringDetail", {
                        RouteFrom: "Create",
                      })
                    }
                    style={styles.infoWrapper}
                  >
                    <Text style={styles.infoWrapperText}>
                      Enter Tutoring Details
                    </Text>
                  </TouchableOpacity> */}
                  {/* )} */}
                </View>
              </View>
            </View>
          )}

          {/* <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Personal Statement</Text>
                    </View> */}

          {route?.params?.WordYou == "WordYou" ? (
            <View
              style={[styles.postLeft, { justifyContent: "space-between" }]}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../Assets/tutionsjobs.png")}
                  style={styles.posticons}
                />
                <Text style={styles.postText}>Personal Statement</Text>
              </View>

              <Image
                source={require("../Assets/tutionsjobs.png")}
                style={styles.tickIcon}
              />
            </View>
          ) : (
            <View style={styles.postLeft}>
              <View>
                <Image
                  source={require("../Assets/WordYou.png")}
                  style={styles.posticons}
                />
              </View>
              <View
                onPress={() => {
                  setShowWord(true);
                }}
              >
                <Text style={styles.postText}>A Word from You</Text>
                <Text style={styles.postSemiText}>
                  A little more about you & your tutoring  achievements
                </Text>

                <View style={{ flexDirection: "row" }}>
                  {/* {showWord == true ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("WordYou", {
                          RouteFrom: "Create",
                        })
                      }
                      style={styles.infoWrapper}
                    >
                      <Text style={styles.infoWrapperText}>
                        A Word from You
                      </Text>
                    </TouchableOpacity>
                  ) : null} */}
                  {/* {TutionStatus_Data.wordSave == false ? (
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>
                  ) : ( */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("WordYou", {
                        RouteFrom: "Create",
                        TutionStatus_Info: TutionStatus_Data
                      })
                    }
                    style={styles.infoWrapper}
                  >
                    {TutionStatus_Data == "" || TutionStatus_Data.WorkAs == undefined && TutionStatus_Data.statement == undefined ?

                      <Text style={styles.infoWrapperText}>Enter Your Bio</Text>

                      :
                      <Text style={styles.infoWrapperText}>Edit Your Bio</Text>


                    }
                  </TouchableOpacity>
                  {TutionStatus_Data == "" || TutionStatus_Data.WorkAs == undefined && TutionStatus_Data.statement == undefined ?

                    <View />
                    :
                    <View style={styles.tickWrapper}>
                      <Image
                        source={require("../Assets/right.png")}
                        style={styles.tickImage}
                      />
                    </View>

                  }
                  {/* )} */}
                </View>
              </View>

            </View>
          )}
        </View>
        {/* {Age == 0 ? ( */}
        <View style={{ height: 10 }}></View>
        {/* 
        {console.log(

          PersonalInfo_Data, AcademicHistory_Data, Tution_Type, TutionStatus_Data, TutionStatus_Data

        )} */}
        {(PersonalInfo_Data.Age == "" || PersonalInfo_Data.Age == undefined && PersonalInfo_Data.markGender == undefined && PersonalInfo_Data.selectnational == undefined)
          || (AcademicHistory_Data == "" || AcademicHistory_Data.Course == undefined || AcademicHistory_Data.Course == "" || AcademicHistory_Data.gra_year == undefined || AcademicHistory_Data.gra_year == ""
            || AcademicHistory_Data.qualification == undefined || AcademicHistory_Data.qualification == "")
          || (Tution_Type == "" || Tution_Type.Postal_Code == undefined && Tution_Type.address == undefined
            || isNaN(Tution_Type.Distance) && isNaN(Tution_Type.latitude) && isNaN(Tution_Type.longitude))

          || (TutionStatus_Data == "" || TutionStatus_Data.WorkAs == undefined && TutionStatus_Data.statement == undefined)
          || (Tutoring_Data == "" || Tutoring_Data.selectArray.length == 0)
          || (imageSource1 == "https://refuel.site/projects/tutorapp/UPLOAD_file/undefined" || imageSource1 == "" || imageSource1 == undefined)

          ?
          <View />
          :
          <TouchableOpacity
            style={styles.RequsertButton}
            // onPress={() => navigation.navigate('TutorLanding')}
            onPress={() => saveprofile()}
          >
            <Text style={styles.ReqButtonText}>Done</Text>
          </TouchableOpacity>

        }



        {/* ) : (
          <TouchableOpacity
            style={styles.RequsertButton}
            // onPress={() => navigation.navigate('TutorLanding')}
            onPress={() => UpdateProfile()}
          >
            <Text style={styles.ReqButtonText}>Update</Text>
          </TouchableOpacity>
        )} */}
      </ScrollView>
    </View>
  );
};

export default YourProfle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F5597",
  },
  text2: {
    fontSize: 15,
    fontWeight: "600",
    color: "grey",
  },
  SearchContainer: {
    height: hp(15),
    width: wp(100),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Boxone: {
    height: hp(15),
    width: wp(30),
    justifyContent: "center",
  },
  ImageSec: {
    height: hp(15),
    backgroundColor: "red",
    justifyContent: "center",
  },
  Profileimage: {
    alignSelf: "center",
  },
  RequsertButton: {
    backgroundColor: "#2F5597",
    height: hp(7),
    borderRadius: 50,
    marginTop: 20,
    width: wp(50),
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 10,
    color: '#000'
  },
  ReqButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  Headers: {
    // backgroundColor: "red",
    height: hp(8),
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: "row",
    width: wp(100),
  },
  Slidericons: {
    alignSelf: "center",
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  SliderContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  Slider: {
    height: hp(30),
    backgroundColor: "#F9F9F9",
    width: wp(70),
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  searchText: {
    textAlign: "center",
    padding: 10,
  },
  postText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2F5597",
    // alignSelf: "center"
  },
  postSemiText: {
    fontSize: 13,
    color: "#2F5597",
    width: wp(70),
  },
  infoWrapper: {
    backgroundColor: "#2F5597",
    height: hp(5),
    width: wp(55),
    alignItems: "center",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: hp(2),
    elevation: 10,
    marginLeft: wp(3),
  },
  icons1: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  infoWrapperText: {
    fontSize: 13,
    color: "#fff",
  },
  sliderText: {
    fontSize: 12,
    lineHeight: 17,
    // fontWeight: '700',
    color: "#000",
    alignSelf: "center",
    textAlign: "center",
  },
  postTextRight: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    bottom: 20,
    left: -10,
    alignSelf: "center",
  },

  usercontainer: {
    height: hp(10),
    // backgroundColor: "red",
    width: wp(90),
    alignSelf: "center",
    flexDirection: "row",
    //justifyContent: "center"
  },
  usercontainer1: {
    height: hp(10),
    marginTop: 10,
    // backgroundColor: "red",
    width: wp(25),
    alignSelf: "center",

    //justifyContent: "center"
  },
  usericons: {
    height: 50,
    width: 50,
  },
  searchicons: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  posticons: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10,
    // alignSelf: "center"
  },
  tickIcon: {
    height: 20,
    width: 20,
    marginRight: 13,
  },
  postRighticons: {
    height: 110,
    width: 110,
    left: -10,
    alignSelf: "flex-end",
  },
  sicons: {
    height: 20,
    width: 20,
  },
  HeadLeft: {
    width: wp(45),
    height: hp(10),
    flexDirection: "row",
    marginTop: hp(2),
    alignItems: "center",
  },
  postContainer: {
    // flexDirection: "row",
    width: wp(90),
    marginTop: 20,
    alignSelf: "center",
  },
  postLeft2: {
    // height: hp(10),
    backgroundColor: "#fff",
    paddingVertical: hp(2.5),
    width: wp(90),
    shadowColor: "#000",
    elevation: 10,
    marginTop: 10,
    // paddingTop: 10,
    borderRadius: 10,
    // flexDirection: "row",
    alignItems: "flex-start",
    // alignSelf: "flex-start",
    // marginRight: wp(6),
    // justifyContent: 'flex-start'
  },
  postLeft: {
    // height: hp(10),
    backgroundColor: "#fff",
    paddingVertical: hp(2.5),
    width: wp(90),
    shadowColor: "#000",
    elevation: 10,
    marginTop: 10,
    // paddingTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    // alignSelf: "flex-start",
    // marginRight: wp(6),
    // justifyContent: 'flex-start'
  },

  postRight: {
    height: hp(20),
    backgroundColor: "lightblue",
    width: wp(42),
    borderRadius: 20,
  },
  UserLeft: {
    //   width: wp(35),
    height: hp(10),
    // flexDirection: "row",

    //alignItems: "center"
  },
  toggleicons: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  UserRight: {
    width: wp(55),
    height: hp(8),
    flexDirection: "row",
    //   backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",

    //alignItems: "center"
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
  tickImage: { height: 15, width: 15 },
  tickWrapper: {
    backgroundColor: "green",
    height: hp(3),
    width: wp(6),
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,

    bottom: 7,
  },
});
