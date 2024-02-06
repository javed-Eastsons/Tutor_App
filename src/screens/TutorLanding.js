import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Button,
  Switch,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { PersonalInfo_Data, AcademicHistory_Data, Tution_Type, Tutoring_Data, TutionStatus_Data } from "../Redux/Actions/types";
import { GetUserProfile } from "../Redux/Actions/Tutors";
import { Loader } from "../common/Loader";
const TutorLanding = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState([]);
  const [Age, setAge] = useState(0);
  const [markGender, setMarkGender] = useState("");
  const [selectnational, setSelectNational] = useState("");
  const [selectflag, setSelectFlag] = useState("");
  const [national, setNational] = useState("");
  const [qualification, setQualification] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [school1, setSchool1] = useState("");
  const [courses, setCourses] = useState("");
  const [records, setRecords] = useState([]);
  const [records1, setRecords1] = useState([]);

  const [FirstName, setFirstName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mark, setmark] = useState("");
  const [loader, setLoader] = useState(false);

  const [yourdata, setYourdata] = useState("");



  const [slideStartingValue, setSlideStartingValue] = useState(20);
  console.log(Login_Data, "Login_DataLogin_DataLogin_Data");



  console.log(userDetail[0]?.Extra_info[0], 'SINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USER')

  useEffect(() => {
    setLoader(true)
    dispatch(GetUserProfile(Login_Data.userid));
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);



  useEffect(() => {

    setUserDetail(SINGLE_USER);

  }, [SINGLE_USER]);





  useEffect(() => {
    setUserDetail(SINGLE_USER);
    setAge(userDetail[0]?.Extra_info[0].age);
    setMarkGender(userDetail[0]?.Extra_info[0].gender);
    setNational(userDetail[0]?.Extra_info[0].nationality);
    setSelectNational(userDetail[0]?.Extra_info[0].nationality);
    setQualification(userDetail[0]?.Extra_info[0].qualification);
    setSchool1(userDetail[0]?.Extra_info[0].name_of_school);
    setCourses(userDetail[0]?.Extra_info[0].Course_Exam);
    setGradYear(userDetail[0]?.Extra_info[0].gra_year);
    setRecords(userDetail[0]?.history_academy_arr);
    setFirstName(userDetail[0]?.Extra_info[0].postal_code);
    setAddress(userDetail[0]?.Extra_info[0].location);
    setLatitude(Number(userDetail[0]?.Extra_info[0].lettitude))
    setLongitude(Number(userDetail[0]?.Extra_info[0].longitude))
    setSlideStartingValue(Number(userDetail[0]?.Extra_info[0].travel_distance));

    setRecords1(userDetail[0]?.tutoring_detail_arr);
    setYourdata(userDetail[0]?.Extra_info[0]?.personal_statement);
    setmark(userDetail[0]?.Extra_info[0]?.tutor_status);
  }, [SINGLE_USER]);



  // useEffect(() => {
  //   setUserDetail(SINGLE_USER);
  //   setAge(userDetail[0]?.Extra_info[0]?.age);
  //   setMarkGender(userDetail[0]?.Extra_info[0]?.gender);
  //   setNational(userDetail[0]?.Extra_info[0]?.nationality);
  //   setSelectNational(userDetail[0]?.Extra_info[0]?.nationality);
  //   setQualification(userDetail[0]?.Extra_info[0]?.qualification);
  //   setSchool1(userDetail[0]?.Extra_info[0]?.name_of_school);
  //   setCourses(userDetail[0]?.Extra_info[0]?.Course_Exam);
  //   setGradYear(userDetail[0]?.Extra_info[0]?.gra_year);
  //   setRecords(userDetail[0]?.history_academy_arr);
  //   setFirstName(userDetail[0]?.Extra_info[0]?.postal_code);
  //   setAddress(userDetail[0]?.Extra_info[0]?.location);
  //   setLatitude(Number(userDetail[0]?.Extra_info[0]?.lettitude))
  //   setLongitude(Number(userDetail[0]?.Extra_info[0]?.longitude))
  //   setSlideStartingValue(Number(userDetail[0]?.Extra_info[0]?.travel_distance));

  //   setRecords1(userDetail[0]?.tutoring_detail_arr);
  //   setYourdata(userDetail[0]?.Extra_info[0]?.personal_statement);
  //   setmark(userDetail[0]?.Extra_info[0]?.tutor_status);
  // }, [SINGLE_USER]);







  // console.log('AGE', userDetail[0]?.Extra_info[0]?.age);
  // console.log('gender', userDetail[0]?.Extra_info[0]?.gender);
  // console.log('nationality', userDetail[0]?.Extra_info[0]?.nationality);
  // console.log('PersonalInfo_Data', PersonalInfo_Data);

  console.log(userDetail[0]?.Extra_info[0].flag, 'profile_imageprofile_imageprofile_imageprofile_imageprofile_image')
  console.log(userDetail[0]?.Extra_info[0].date_of_year, 'profile_imageprofile_imageprofile_imageprofile_imageprofile_image')


  const UpdateSection = () => {


    console.log(userDetail[0]?.Extra_info[0].profile_image, 'profile_imageprofile_imageprofile_imageprofile_imageprofile_image')
    console.log(userDetail[0]?.Extra_info[0].flag, 'profile_imageprofile_imageprofile_imageprofile_imageprofile_image')
    console.log(userDetail[0]?.Extra_info[0].date_of_year, 'profile_imageprofile_imageprofile_imageprofile_imageprofile_image')

    let obj = {
      Age: userDetail[0]?.Extra_info[0].age,
      markGender: userDetail[0]?.Extra_info[0].gender,
      selectnational: userDetail[0]?.Extra_info[0].nationality,
      selectflag: userDetail[0]?.Extra_info[0].flag,
      year: userDetail[0]?.Extra_info[0].date_of_year,
      //  persSave: persSave,

    };

    dispatch({
      type: PersonalInfo_Data,
      payload: obj,
    });

    let obj1 = {
      qualification: userDetail[0]?.Extra_info[0].qualification,
      //  Experience: Experience,
      school: userDetail[0]?.Extra_info[0].name_of_school,
      Course: userDetail[0]?.Extra_info[0].Course_Exam,
      // subject: subject,
      //exam: state == "Others" ? otherExam : state,
      gra_year: userDetail[0]?.Extra_info[0].gra_year,
      History: userDetail[0]?.history_academy_arr,
      //GET_USER_ID: GET_USER_ID,
      //acadSave: acadSave,
    };
    dispatch({
      type: AcademicHistory_Data,
      payload: obj1,
    });


    let obj2 = {
      Postal_Code: userDetail[0]?.Extra_info[0].postal_code,
      TutionType: "Home Tuition",
      address: userDetail[0]?.Extra_info[0].location,
      Distance: Number(userDetail[0]?.Extra_info[0].travel_distance),
      latitude: Number(userDetail[0]?.Extra_info[0].lettitude),
      longitude: Number(userDetail[0]?.Extra_info[0].longitude),

      //Distance: slideStartingValue,
    };

    dispatch({
      type: Tution_Type,
      payload: obj2,
    });



    let obj3 = {

      selectArray: userDetail[0]?.tutoring_detail_arr,

    };
    dispatch({
      type: Tutoring_Data,
      payload: obj3,
    });


    console.log(obj3, 'Tutoring_DataTutoring_DataTutoring_DataTutoring_DataTutoring_Data')

    let obj4 = {
      WorkAs: userDetail[0]?.Extra_info[0].tutor_status,
      statement: userDetail[0]?.Extra_info[0].personal_statement,
      //  wordSave: wordSave,
    };

    dispatch({
      type: TutionStatus_Data,
      payload: obj4,
    });


    navigation.navigate("UpdateProfile")


  }

  const cardsData = [
    {
      name: "My Bookings",
      src: require("../Assets/Booking.png"),
      Url: "MyBookingTutor",
    },

    {
      name: "My Applied",
      src: require("../Assets/myapplied.png"),
      Url: "MyApplied",
    },

    {
      name: "Upcoming",
      src: require("../Assets/Upcoming.png"),
      Url: "",
    },

    {
      name: "My Faves",
      src: require("../Assets/newFavIcon.png"),
      Url: "MyFavAssignment",
    },

    // {
    //   name: "Payments",
    //   src: require("../Assets/PayN.png"),
    //   Url: "",
    // },
  ];
  const toggleSwitch = () => {
    MoveToClient();
    setIsEnabled((previousState) => !previousState);
    navigation.navigate("ClientLanding");
    setIsEnabled(false);
  };

  const MoveToClient = () => {
    console.log(isEnabled, "LLLLLLLLLLLLLLLLLLLL");
  };

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.usercontainer}>
          <View style={styles.UserLeft}>

            <View style={{ flexDirection: "row" }}>
              {userDetail[0]?.Extra_info[0].profile_image == "" || userDetail[0]?.Extra_info[0].profile_image == null ? (
                <Image
                  source={require("../Assets/profileImg.png")}
                  style={styles.usericons}
                />
              ) : (
                <Image
                  source={{
                    uri:
                      "https://colwithfarmchips.co.uk/projects/tutorapp/UPLOAD_file/" +
                      userDetail[0]?.Extra_info[0].profile_image,
                  }}
                  style={styles.usericons}
                />
              )}

              <View style={{ width: 40, marginLeft: 5, marginTop: 30 }}>
                <StarRating
                  fullStarColor="orange"
                  disabled={false}
                  maxStars={5}
                  rating={0}
                  starSize={12}
                  emptyStarColor='yellow'                  
                // selectedStar={(rating) => setStrCount(rating)}
                />
              </View>
            </View>
          </View>

          <View style={styles.UserRight}>
            {/* <Text style={{ color: "#000", fontFamily: "Poppins-Light" }}>
              {console.log(isEnabled)}I want to find a Tutor
            </Text>

            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ClientLanding')}>
              <Image
                source={require('../Assets/togglebb.png')}
                style={styles.toggleicons}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            height: 50,
            width: "100%",
            backgroundColor: "#2F5597",
            marginBottom: -40,
          }}
        ></View>

        <View style={styles.postContainer}>
          <View style={{ alignSelf: 'center', justifyContent: "space-between", width: wp(95), flexDirection: "row" }}>
            <TouchableOpacity style={[styles.cardLeft, styles.shadowPropLeft]}>
              <View style={styles.cardShadowLeft}>


                <Image
                  source={require("../Assets/Searching.png")}
                  style={styles.postRighticons}
                />

              </View>

              <Text
                style={{ textAlign: "center", marginTop: 10, marginBottom: 5 ,color:'gray'}}
              >
                Keep your profile {"\n"}current
              </Text>
              <TouchableOpacity
                // onPress={() => navigation.navigate("Auth2")}
                onPress={() => UpdateSection()}
                style={styles.SearchButton}
              >
                <Text
                  style={{ color: "#fff", alignSelf: "center", fontSize: 14 }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cardLeft, styles.shadowPropLeft]}>

              <View style={styles.cardShadow1}>
                <Image
                  source={require("../Assets/checkin.png")}
                  style={styles.postRighticons}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 5,
                  width: "90%",
                  alignSelf: "center",
                  color:'gray'
                }}
              >
                Find your students {"\n"}here
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("CheckIn")}
                style={styles.CheckinButton}
              >
                <Text
                  style={{ color: "#fff", alignSelf: "center", fontSize: 14 }}
                >
                  Check in
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

        </View>

        {/* <View style={styles.postContainer}>
                    <View style={styles.postLeft}>
                        <Image source={require('../Assets/tutionsjobs.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Tution Jobs</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Auth2')}
                        style={styles.postLeft}>
                        <Image source={require('../Assets/post.png')}
                            style={styles.posticons}
                        />
                        <Text style={styles.postText}>Edit Profile</Text>
                    </TouchableOpacity>

                </View> */}

        <View style={styles.SliderContainer}>

          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 5 }} horizontal={true}
          >
            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>


              <TouchableOpacity
                style={[styles.cardSlider, styles.shadowPropSlider]}

                onPress={() => navigation.navigate('ChatWithTutors')}
              // onPress={toggleModal}
              >
                <View style={styles.cardShadow}>
                  <Image
                    source={require("../Assets/code.png")}
                    style={styles.Slidericons}
                  />
                </View>
                <View>
                  <Text style={styles.postText}>Code of Conduct</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Text numberOfLines={3} style={styles.sliderText}>
                    Tutors should be familiar with the code of conduct of required of Educators. …..

                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardSlider, styles.shadowPropSlider]}
                onPress={() => navigation.navigate('OurTutorPop')}
              //  onPress={toggleModal}
              >
                <View style={styles.cardShadow}>
                  <Image
                    source={require("../Assets/OurTutors.png")}
                    style={styles.Slidericons}
                  />
                </View>
                {/* <Image source={require('../Assets/OurTutors.png')}
                                style={styles.Slidericons}
                            /> */}
                <Text style={styles.postText}>Our Tutors</Text>
                <View style={{ padding: 5 }}>
                  <Text numberOfLines={3} style={styles.sliderText}>
                    See how you fit in within our tutor categories. Academic Qualification …

                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardSlider, styles.shadowPropSlider]}
                onPress={() => navigation.navigate('OurServices')}
              //  onPress={toggleModal}
              >
                <View style={styles.cardShadow}>
                  <Image
                    source={require("../Assets/OurService.png")}
                    style={styles.Slidericons}
                  />
                </View>
                {/* <Image source={require('../Assets/OurService.png')}
                                style={styles.Slidericons}
                            /> */}
                <Text style={styles.postText}>Our Services</Text>
                <View style={{ padding: 5 }}>
                  <Text numberOfLines={3} style={styles.sliderText}>
                    We provide Home Tuition, Online Tuition & Homework Help for all levels & …
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardSlider, styles.shadowPropSlider]}
                onPress={() => navigation.navigate('MyActivityPop')}
              //  onPress={toggleModal}
              >
                <View style={styles.cardShadow}>
                  <Image
                    source={require("../Assets/Booki.png")}
                    style={styles.Slidericons}
                  />
                </View>
                {/* <Image source={require('../Assets/MyActivities.png')}
                                style={styles.Slidericons}
                            /> */}
                <Text style={styles.postText}>My Bookings</Text>
                <View style={{ padding: 5 }}>
                  <Text numberOfLines={3} style={styles.sliderText}>
                    Everything of significance that you do on during the booking process. …
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cardSlider, styles.shadowPropSlider]}
                onPress={() => navigation.navigate('Promotions')}
              //  onPress={toggleModal}
              >
                <View style={styles.cardShadow}>
                  <Image
                    source={require("../Assets/Promotion.png")}
                    style={styles.Slidericons}
                  />
                </View>
                {/* <Image source={require('../Assets/Promotion.png')}
                                style={styles.Slidericons}
                            /> */}
                <Text style={styles.postText}>Promotions</Text>
                <View style={{ padding: 5 }}>
                  <Text numberOfLines={3} style={styles.sliderText}>
                    We value all our users. As a token of our appreciation, we have special offers …
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View>
          <FlatList
            style={{ alignSelf: "center" }}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            // data={["My Bookings","My Posts","Upcomings" ,"My Faves","Payments"]}
            data={cardsData}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={[styles.card, styles.shadowProp]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.Url)}
                  style={styles.Boxtwo}
                >
                  <View style={styles.cardShadow}>
                    <Image source={item?.src} style={styles.postRighticons} />
                  </View>
                  <Text style={styles.searchText}>{item?.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TutorLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  SearchContainer: {
    height: hp(15),
    width: wp(95),
    // alignItems: 'flex-end',
    marginRight: 0,
  },
  Boxtwo: {
    height: hp(11),
    width: wp(23),
    justifyContent: "center",
    alignItems: "center",
  },
  Boxone: {
    height: hp(15),
    width: wp(30),
    justifyContent: "center",
  },

  Headers: {
    height: hp(10),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },

  Slidericons: {
    alignSelf: "center",
    height: 30,
    width: 30,
    // marginBottom: 10,
  },
  SliderContainer: {
    marginTop: 10,
    height: hp(22),
    // backgroundColor: "red",
    width: "100%",
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
    marginTop: 5,
    color: "black",
    fontFamily: "Poppins-Light",
  },

  postText: {
    fontSize: 16,
    // fontWeight: "700",
    // color: "#2F5597",
    color: "#1f3864",
    marginTop: 10,
    alignSelf: "center",
    // fontFamily: "Poppins-Regular",
  },
  sliderText: {
    fontSize: 12,
    // color: "#a2a2a2",
    // color: '#000',
    alignSelf: "center",
    color:'gray'
    // fontFamily: "Poppins-Light",
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
    width: wp(100),
    flexDirection: "row",
    justifyContent: "center",
  },
  usericons: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
    //alignSelf: "center",
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
    height: 30,
    width: 30,
    alignSelf: "center",
  },
  posticonsU: {
    height: 30,
    width: 30,
    alignSelf: "center",
  },
  postRighticons: {
    alignSelf: "center",
    height: 30,
    width: 30,
  },
  sicons: {
    height: 20,
    width: 20,
  },
  HeadLeft: {
    width: wp(45),
    height: hp(10),
    flexDirection: "row",
    // marginTop: 15,
    alignItems: "center",
  },
  postContainer: {
    height: hp(20),
    // flexDirection: 'row',
    // justifyContent: "space-between",
    width: wp(100),
    // backgroundColor: "red",
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
  },
  postLeft: {
    height: hp(20),
    backgroundColor: "#fbe5d6",
    width: wp(42),
    paddingTop: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: wp(6),
  },
  postRight: {
    height: hp(20),
    backgroundColor: "lightblue",
    width: wp(42),
    borderRadius: 20,
  },

  UserLeft: {
    width: wp(35),
    height: hp(10),
    justifyContent: "center",
    // backgroundColor: "red"
  },

  toggleicons: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },

  UserRight: {
    width: wp(65),
    height: hp(8),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(10),
    // marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },

  card: {
    backgroundColor: "white",
    height: hp(13),
    width: wp(25),
    justifyContent: "center",
    alignItems: "center",
    margin: 10,

    // backgroundColor:"red",
  },
  shadowProp: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "#2F5597",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  cardShadow: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    alignSelf: "center",
    // overflow: 'hidden',
    backgroundColor: "white",
    // backgroundColor: 'red',
    shadowColor: "#000",
    // shadowOffset: {
    //     width: 5,
    //     height: 10,
    //     width: -5,
    //     height: -10,

    // },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  // cardShadow1: {
  //   height: 50,
  //   width: 50,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 40,
  //   alignSelf: "center",
  //   // overflow: 'hidden',
  //   backgroundColor: "white",
  //   marginTop: 10,
  //   // backgroundColor: 'red',
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 5,
  //     height: 10,
  //     width: -5,
  //     height: -10,
  //     elevation: 10,
  //   },
  //   shadowOpacity: 0.18,
  //   shadowRadius: 5,
  //   elevation: 10,
  // },
  cardLeft: {
    backgroundColor: "white",
    justifyContent: "center",
    //marginVertical: 0,
    height: hp(21),
    width: wp(45),
    borderRadius: 20,
    // alignSelf: "flex-start",
    // marginRight: wp(6),
    // borderWidth: 0.2,
  },
  shadowPropLeft: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },

  cardRight: {
    backgroundColor: "white",
    justifyContent: "center",
    marginVertical: 0,
    height: hp(18),
    width: wp(40),
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: wp(8),
    borderWidth: 0.2,
  },

  shadowPropRight: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  cardSlider: {
    backgroundColor: "white",
    width: wp(55),
    marginLeft: 10,
    marginRight: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // padding: 5,
    // alignSelf: "flex-start",
    // borderWidth: 0.2,
    // height: hp(18),
    // backgroundColor: "#F9F9F9",
    // width: wp(55),
    // marginLeft: 15,
    // marginRight: 10,
    // borderRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  shadowPropSlider: {
    shadowOffset: { width: 8, height: 12 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  cardShadowLeft: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    alignSelf: "center",
    // overflow: 'hidden',
    backgroundColor: "white",
    marginTop: 10,
    // backgroundColor: 'red',
    shadowColor: "#000",

    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardShadow1: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    alignSelf: "center",
    // overflow: 'hidden',
    backgroundColor: "white",
    marginTop: 10,
    // backgroundColor: 'red',
    shadowColor: "#000",
    // shadowOffset: {
    //     width: 5,
    //     height: 10,
    //     width: -5,
    //     height: -10,

    // },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardShadowRight: {
    marginTop: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 0.1,
    alignSelf: "center",
    overflow: "hidden",
    padding: 16,
    //backgroundColor: "transparent",
    backgroundColor: '#fff',
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //shadowOpacity: 0.18,
    shadowRadius: 5,
    //elevation: 5,
  },
  CheckinButton: {
    backgroundColor: "#2F5597",
    padding: 5,
    width: wp(30),

    borderRadius: 20,
    alignSelf: "center",
  },
  SearchButton: {
    backgroundColor: "#2F5597",
    padding: 5,
    width: wp(30),
    borderRadius: 20,
    alignSelf: "center",
  },

  SearchContainer1: {
    height: hp(15),
    width: wp(100),
    //  backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: "center",
    justifyContent: "space-around",
  },
});
