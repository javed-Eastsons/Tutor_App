import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { GetAllTutors } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import {
  notificationListner,
  GetFcmToken,
  requestUserPermission,
} from "../Utils/notificationService";

const ClientLandingBefore = () => {
  const [strCount, setStrCount] = useState(1);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [profileimg, setProfileImg] = useState("");
  const [tutorcode, setTutorCode] = useState("");
  const [qualifications, setQualification] = useState("");
  const [personalstatement, setPersonalStatement] = useState("");
  const dispatch = useDispatch();
  const { GET_ALLTUTORS } = useSelector((state) => state.TutorReducer);
  const navigation = useNavigation();
  const { Login_Data } = useSelector((state) => state.TutorReducer);

  console.log(Login_Data, "Login_DataLogin_DataLogin_DataLogin_Data");
  const [Tutor, setTutor] = useState([]);

  // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", Tutor);

  const toggleModal = () => {
    console.log("sddddddddd");
    setModalVisible(!isModalVisible);
  };

  const expandToggleModal = (
    Pro_mage,
    tutor_code,
    qualification,
    personal_statement
  ) => {
    console.log("@@@@", Pro_mage);
    setProfileImg(Pro_mage);
    setTutorCode(tutor_code);
    setQualification(qualification);
    setPersonalStatement(personal_statement);
    setExpandModalVisible(!isExpandModalVisible);
  };

  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  useEffect(() => {
    dispatch(GetAllTutors());
    // setTutor(GET_ALLTUTORS)
  }, []);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setTutor(GET_ALLTUTORS);
      setLoader(false);
    }, 2000);
  }, [GET_ALLTUTORS]);
  // console.log("tutors", Tutor);

  const ClickONReadMore = (
    profile_image,
    tutor_code,
    qualification,
    personal_statement
  ) => {
    if (Login_Data === "") {
      // navigation.navigate("Register");
      navigation.navigate("Register");
    } else {
      expandToggleModal(
        profile_image,
        tutor_code,
        qualification,
        personal_statement
      );
    }
  };

  return (
    <View style={styles.container}>
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

      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.usercontainer}>
          <View style={styles.UserLeft}>
            <Text style={{ fontSize: 18, fontWeight: "700", paddingLeft: 20 }}>
              Hello
            </Text>
            {/* <Image
              source={require("../Assets/user.png")}
              style={styles.usericons}
            /> */}
            {/* <View style={{ flexDirection: "row" }}>
                            <Image source={require('../Assets/start.png')}
                                style={styles.sicons}
                            />
                            <Image source={require('../Assets/start.png')}
                                style={styles.sicons}
                            />
                            <Image source={require('../Assets/start.png')}
                                style={styles.sicons}
                            />
                            <Image source={require('../Assets/start.png')}
                                style={styles.sicons}
                            />
                        </View> */}
          </View>
          <View style={styles.UserRight}>
            <TouchableOpacity
              //  onPress={() => navigation.navigate('TutorLanding')}
              onPress={() =>
                navigation.navigate("Register", {
                  codeadd: "NO",
                })
              }
              style={styles.SignupButton}
            >
              <Text style={{ color: "#fff" }}>Sign Up/Login</Text>
            </TouchableOpacity>
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
          <View
            style={[styles.cardLeft, styles.shadowPropLeft, { marginLeft: 6, height: hp(21.3) }]}
          //    onPress={() => navigation.navigate('TutorSearch')}
          >
            <View style={styles.cardShadow1}>
              <Image
                source={require("../Assets/searchnow.png")}
                style={styles.posticons}
              />
            </View>

            <Text
              style={{
                textAlign: "center",
                color: "black",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Your Ideal Tutor is{"\n"} waiting
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("TutorSearch")}
              // onPress={() =>
              //   navigation.navigate("Register", {
              //     codeadd: "NO",
              //   })
              // }
              style={[
                styles.SearchButton,
                {
                  marginBottom: 10,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6
                },
              ]}
            >
              <Text
                style={{ color: "#fff", alignSelf: "center", fontSize: 14 }}
              >
                Search Now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[styles.cardLeft, styles.shadowPropLeft, { height: hp(21.3) }]}
          //   style={[styles.cardLeft, styles.shadowPropLeft]}
          >
            {/* <View style={styles.cardShadow1}>
              <Image
                source={require("../Assets/PastedGraphic7.png")}
                style={styles.posticons}
              />
            </View> */}
            <View style={styles.cardShadow1}>
              <Image
                source={require("../Assets/checkin.png")}
                //  style={styles.cardShadow2}
                style={styles.posticons}
              //style={{ height: 35, width: 35, alignSelf: "center" }}
              />
            </View>

            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 5,
                color: "black",
              }}
            >
              {/* Find your student{"\n"} waiting */}
              Find your students{"\n"} here
            </Text>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('TutorLanding')}
              style={styles.checkinButton}>
              <Text
                style={{color: '#2F5597', alignSelf: 'center', fontSize: 14}}>
                Check In
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate("CheckIn")}
              // onPress={() =>
              //   navigation.navigate("Register", {
              //     codeadd: "NO",
              //   })
              // }
              style={[
                styles.SearchButton,
                {
                  marginBottom: 10,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 6
                },
              ]}
            >
              <Text
                style={{ color: "#fff", alignSelf: "center", fontSize: 14 }}
              >
                Check In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.SliderContainer}>
          <ScrollView contentContainerStyle={{ padding: 5 }} horizontal={true}>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}

              onPress={() => navigation.navigate('ChatWithTutors')}
            // onPress={toggleModal}
            >
              <View style={styles.cardShadow}>
                <Image
                  source={require("../Assets/ChatTutors.png")}
                  style={styles.Slidericons}
                />
              </View>
              <View>
                <Text style={styles.postText}>Chat with Tutors</Text>
              </View>
              <View style={{ padding: 5 }}>
                <Text numberOfLines={3} style={styles.sliderText}>
                  Chat with tutors & assess their suitability. Sharing your tuition concerns with …..
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
                  We have an extensive database of competent tutors. They all possess varied …,,,,,,,,,,,,
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
                  source={require("../Assets/MyActivities.png")}
                  style={styles.Slidericons}
                />
              </View>
              {/* <Image source={require('../Assets/MyActivities.png')}
                                style={styles.Slidericons}
                            /> */}
              <Text style={styles.postText}>We are Hiring</Text>
              <View style={{ padding: 5 }}>
                <Text numberOfLines={3} style={styles.sliderText}>
                  Tutors, if you are looking for tuition jobs, look no further. We have hundreds …

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
          </ScrollView>
        </View>

        <View style={styles.SearchContainer}>
          <Text style={{ color: "#000", fontWeight: "700", fontSize: 16 }}>
            Featured Tutors
          </Text>
        </View>
        <View style={{ paddingBottom: 10 }}>
          {loader == false ? (
            <FlatList
              // style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={Tutor}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              //renderItem={renderItem}

              renderItem={({ item, index }) => (
                <View style={{ marginTop: 10 }}>
                  <View
                    style={[
                      styles.List,
                      {
                        backgroundColor: index % 2 == 0 ? "#fff" : "#e2e3e9",
                      },
                    ]}
                  >
                    <View
                      style={{
                        height: 70,
                        width: "15%",
                      }}
                    >
                      <Image
                        source={{
                          uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${item.profile_image}`,
                        }}
                        style={styles.tutorPic}
                      />
                      {/* <Text>
                        {item.profile_image}
                      </Text> */}
                    </View>

                    <View
                      style={{
                        height: 70,
                        width: "75%",
                        marginLeft: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 20,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.LIstText}>{item.tutor_code}</Text>
                        <Image
                          source={{
                            uri: `https://refuel.site/projects/tutorapp/flags-medium/ao.png`,
                          }}
                          style={styles.Flagicons}
                        />
                        {/* <Text style={styles.LIstText}>{item.nationality}</Text> */}
                        {/* <View style={{backgroundColor:"red",height:20,width:30}}>
                                      <Image source={require('../Assets/Expand.png')}
                                   style={{height:20,width:20,}}
                                    />
                                      </View> */}
                      </View>
                      <View
                        style={{
                          height: 20,
                          width: "70%",
                        }}
                      >
                        <Text style={styles.LIstTextL}>
                          {item.qualification}
                        </Text>
                      </View>
                      <View style={{ width: 40, marginLeft: 5 }}>
                        <StarRating
                          fullStarColor="orange"
                          disabled={false}
                          maxStars={5}
                          rating={4}
                          starSize={15}
                        // selectedStar={(rating) => setStrCount(rating)}
                        />
                      </View>

                      <View
                        style={{
                          height: 20,
                          width: "100%",
                          flexDirection: "row",
                          position: "absolute",
                          left: -80,
                          top: 70,
                        }}
                      >
                        <Text
                          style={[
                            styles.LIstText1,
                            { width: wp(70), fontStyle: "italic" },
                          ]}
                        >
                          {item.personal_statement}...
                        </Text>
                        <View
                          style={{ width: wp(25), }}
                        >
                          <TouchableOpacity

                            onPress={() =>
                              navigation.navigate("TutorSearchProfile", {
                                data: item
                              })
                            }
                          >
                            <Text
                              style={{
                                color: "#2F5597",
                                fontSize: 12,
                                fontStyle: "italic",
                                textAlign: "center"

                              }}
                            >
                              View
                            </Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() =>
                      ClickONReadMore(
                        item.profile_image,
                        item.tutor_code,
                        item.qualification,
                        item.personal_statement
                      )
                    }
                    style={{
                      height: 20,
                      width: 30,
                      position: "absolute",
                      right: 20,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={require("../Assets/Expand.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity> */}

                  {/* <View style={{ height: 20, width: "100%", marginHorizontal: 20, flexDirection: "row" }}>
                                  <Text style={styles.LIstText1}>{item.personal_statement}...</Text>
                                  <TouchableOpacity>
                                      <Text style={{ color: "#2F5597" }}>ReadMore</Text>
  
                                  </TouchableOpacity>
                              </View> */}
                </View>
              )}
            />
          ) : (
            <View>
              <ActivityIndicator size="small" />
            </View>
          )}
        </View>
        <View style={{ height: 20, marginTop: 10 }}></View>
      </ScrollView>
      <Modal
        isVisible={isExpandModalVisible}
        onBackdropPress={() => setExpandModalVisible(false)}
      >
        <View style={styles.ExpandBlueContainer}>
          <Text style={styles.BlueText}>Tutor Info</Text>
        </View>

        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            height: hp(70),
            width: wp(95),
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity style={styles.List}>
            <Image
              source={{
                uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${profileimg}`,
              }}
              style={styles.tutorPic}
            />

            <View style={{ height: 60, width: "100%", marginLeft: 10 }}>
              <View
                style={{
                  height: 20,
                  width: "50%",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.LIstText}>{tutorcode}</Text>

                {/* <View style={{backgroundColor:"red",height:20,width:30}}>
                                      <Image source={require('../Assets/Expand.png')}
                                   style={{height:20,width:20,}}
                                    />
                                      </View> */}
              </View>
              <View
                style={{
                  height: 20,
                  width: "50%",
                  backgroundColor: "white",
                }}
              >
                <Text style={styles.LIstText}>{qualifications}</Text>
              </View>
              {/* <View style={{ width: 40, marginLeft: 5 }}>
                <StarRating
                  fullStarColor="orange"
                  disabled={false}
                  maxStars={5}
                  // rating={item.Average_rating}
                  starSize={15}
                  // selectedStar={(rating) => setStrCount(rating)}
                />
              </View> */}
              <Text style={[styles.LIstText2, { width: wp(65) }]}>
                <Text style={styles.LIstText}>{personalstatement}</Text>
              </Text>
              {/* <Text style={styles.LIstText2}>Email: {item.email}</Text> */}
              {/* <Text style={styles.LIstText2}>
                First Name: {item.first_name}
              </Text>
              <Text style={styles.LIstText2}>Last Name: {item.last_name}</Text>
              <Text style={styles.LIstText2}>Mobile: {item.mobile}</Text>
              <Text style={styles.LIstText2}>Address: {item.address1}</Text>
              <Text style={styles.LIstText2}>
                Nationality: {item.nationality}
              </Text>
              <Text style={[styles.LIstText2, { width: wp(65) }]}>
                 <Text style={styles.LIstText}>{personalstatement}</Text>
                School Name: {item.name_of_school}
              </Text>
              <Text style={styles.LIstText2}>
                Tutor Status: {item.tutor_status}
              </Text>
              <Text style={styles.LIstText2}>
                Tutor Type: {item.tuition_type}
              </Text>
              <Text style={[styles.LIstText2, { width: wp(60) }]}>
                Location: {item.location}
              </Text>
              <Text style={styles.LIstText2}>Pin Code: {item.postal_code}</Text>
              <Text style={styles.LIstText2}>
                Travel Distance: {item.travel_distance}
              </Text>
              <Text style={styles.LIstText2}>
                Experience: {item.tutor_tutoring_experience_years}
              </Text>
              <Text style={styles.LIstText2}>
                Tutor Code: {item.tutor_code}
              </Text> */}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        {/* <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'center', position: 'absolute', bottom: 0, height: hp(45), width: wp(100), backgroundColor: '#fff' }}>
         */}
        <View style={styles.BlueContainer}>
          <Text style={styles.BlueText}>Chat with Tutors</Text>
        </View>
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignSelf: "center",
            position: "absolute",
            bottom: 0,
            height: hp(70),
            width: wp(95),
            backgroundColor: "#fff",
          }}
        >
          <View style={styles.blueContiner1}>
            <View style={[styles.whitebox, styles.shadowProp]}>
              <Image
                source={require("../Assets/HomeTution.png")}
                style={styles.bicons}
              />
              <Text
                style={{
                  width: wp(50),
                  textAlign: "center",
                  fontWeight: "800",
                  fontSize: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Home Tution
              </Text>
              {/* <View style={{ alignSelf: "center", height: 20, width: 20, borderRadius: 50, borderColor: '#000', borderWidth: 1 }}></View> */}
            </View>
            <View style={[styles.whitebox, styles.shadowProp]}>
              <Image
                source={require("../Assets/OnlineTution.png")}
                style={styles.bicons}
              />
              <Text
                style={{
                  width: wp(50),
                  textAlign: "center",
                  fontWeight: "800",
                  fontSize: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Online Tution
              </Text>
              {/* <View style={{ alignSelf: "center", height: 20, width: 20, borderRadius: 50, borderColor: '#000', borderWidth: 1 }}></View> */}
            </View>
            <View style={[styles.whitebox, styles.shadowProp]}>
              <Image
                source={require("../Assets/HomeWork.png")}
                style={styles.bicons}
              />
              <Text
                style={{
                  width: wp(50),
                  textAlign: "center",
                  fontWeight: "800",
                  fontSize: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Homework Help
              </Text>
              {/* <View style={{ alignSelf: "center", height: 20, width: 20, borderRadius: 50, borderColor: '#000', borderWidth: 1 }}></View> */}
            </View>
          </View>
        </View>
        {/* </View> */}
      </Modal>

      {/* Expand model */}
    </View>
  );
};

export default ClientLandingBefore;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 10,
  },
  SearchContainer: {
    //  height: hp(3),
    width: wp(90),
    // backgroundColor: "red",
    flexDirection: "row",
    alignSelf: "center",
    // marginBottom: 5,
  },
  whitebox: {
    height: hp(20),
    width: wp(80),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    top: 20,
    // backgroundColor: "red",
    marginBottom: 10,
    marginRight: 10,
  },

  shadowProp: {
    shadowColor: "#000",

    elevation: 10,
    // shadowColor: '#52006A',
  },

  List: {
    // padding: 10,
    paddingTop: 10,
    //   flexDirection: "row",
    // alignItems: "center",
    flexDirection: "row",
    //  backgroundColor: "white",
    justifyContent: "center",
    width: wp(100),
    height: wp(26),

    shadowColor: "grey",
    // borderWidth:1,
    // elevation: 10,
    shadowOffset: { width: 8, height: 10 },
  },
  Boxone: {
    height: hp(15),
    width: wp(30),

    // backgroundColor: "yellow",
    //   alignSelf: "center",
    justifyContent: "center",
  },
  SignupButton: {
    backgroundColor: "#2F5597",
    padding: 10,
    borderRadius: 10,
  },
  LIstText: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "black",
  },
  LIstTextL: {
    marginLeft: 5,
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    color: "black",
  },
  LIstText2: {
    fontSize: 14,
    fontFamily: "Poppins-BoldItalic",
    color: "black",
  },
  LIstTextDynamic: {
    fontSize: 14,
    fontFamily: "Poppins-Light",
    color: "black",
  },
  LIstView: {
    marginLeft: 5,
    fontSize: 14,
    color: "black",
    marginVertical: 5,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    height: 20,
  },
  SearchButton: {
    backgroundColor: "#2F5597",
    padding: 3,
    width: wp(30),
    borderRadius: 20,
    alignSelf: "center",
  },
  Rolecontainer: {
    flexDirection: "row",
    height: hp(8),
    width: wp(90),

    alignSelf: "center",
    alignItems: "center",
  },
  bicons: {
    //width: wp(20)
  },
  checkinButton: {
    // backgroundColor: "#2F5597",

    width: wp(30),
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
  Headers: {
    //height: hp(5),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: wp(100),
  },
  Slidericons: {
    alignSelf: "center",
    height: 30,
    width: 30,
  },
  toggleicons: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  SliderContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 8,
    padding: 10,

    // height: hp(24),
  },
  cardSlider: {
    height: hp(22),
    backgroundColor: "white",
    // backgroundColor:"red",
    width: wp(55),
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 0.2,
  },
  shadowPropSlider: {
    shadowOffset: { width: 8, height: 15 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },

  searchText: {
    textAlign: "center",
    padding: 10,
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
    fontSize: 11,
    textAlign: "center",
    //color: "#a2a2a2",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
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
  },
  tutorPic: {
    height: 50,
    width: 50,
    borderRadius: 30,
    padding: 10,
  },
  Flagicons: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  BlueText: {
    fontSize: 18,
    color: "#fff",
    width: wp(85),
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "Poppins-BoldItalic",
  },

  BlueContainer: {
    height: hp(70),
    backgroundColor: "#2F5597",
    borderTopLeftRadius: 20,
    width: wp(100),
    alignSelf: "center",
    borderTopRightRadius: 20,
  },
  ExpandBlueContainer: {
    height: hp(60),
    backgroundColor: "#2F5597",
    borderTopLeftRadius: 20,
    width: wp(100),
    alignSelf: "center",
    borderTopRightRadius: 20,
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
    alignSelf: "center",
    height: 35,
    width: 35,
  },
  postRighticons: {
    height: 50,
    width: 50,
    // left: -10,
    // alignSelf: 'flex-end'
    alignSelf: "center",
  },
  sicons: {
    height: 20,
    width: 20,
  },
  HeadLeft: {
    width: wp(45),
    // height: hp(10),
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  postContainer: {
    height: hp(20),
    // backgroundColor:"red",
    flexDirection: "row",
    width: wp(90),
    marginTop: 20,
    alignSelf: "center",
  },
  postLeft: {
    height: hp(18),
    backgroundColor: "#fff",
    width: wp(35),
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: wp(6),
    justifyContent: "center",
  },
  postRight: {
    height: hp(20),
    backgroundColor: "lightblue",
    width: wp(42),
    borderRadius: 20,
  },
  UserLeft: {
    width: wp(30),

    height: hp(10),
    flexDirection: "row",
    alignItems: "center",
  },
  UserRight: {
    width: wp(68),
    height: hp(8),

    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  HeadRight: {
    width: wp(45),
    //  height: hp(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  LIstText1: {
    marginLeft: 5,
    fontSize: 12,
    color: "grey",
    // fontWeight: '700'
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
  cardShadow2: {
    height: 55,
    width: 65,
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
  cardLeft: {
    backgroundColor: "#fff",
    //height: hp(18),
    width: wp(40),
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: wp(7),
    // borderWidth: 0.2,
    borderColor: "lightgrey",
  },
  shadowPropLeft: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  circleShadow: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 0.1,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  shadowPropCircle: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
