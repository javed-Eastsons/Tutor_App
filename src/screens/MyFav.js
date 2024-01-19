import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
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
import Modal from "react-native-modal";
import {
  GetAllFavTutor,
  Interested_Tutor,
  Get_Filter_Tutor,
} from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import { Loader } from "../common/Loader";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { Dropdown } from "react-native-element-dropdown";
// import AntDesign from "@expo/vector-icons/AntDesign";

const MyFav = () => {
  const [strCount, setStrCount] = useState(1);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { ALL_FAV_TUTORS } = useSelector((state) => state.TutorReducer);
  const { INTERESTED_TUTOR } = useSelector((state) => state.TutorReducer);
  const { INTERESTED_TUTORALL } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const navigation = useNavigation();
  const [activeSections, setActiveSections] = useState([]);
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [expand, setExpand] = useState(false);
  const [Tutor, setTutor] = useState([]);
  const [interestedTutor, setInterestedTutor] = useState([]);
  const [interestedTutorAll, setInterestedTutorAll] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Search");
  const [postID, setPostid] = useState("");
  const [address, setAddress] = useState("");
  const [weeks, setWeeks] = useState("");
  const [hours, setHours] = useState("");
  const [amount, setAmount] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [studentDetail, setStudent_Detail] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [detail_view, setDetail_View] = useState("List");
  const [currentTab, setCurrentTab] = useState("tutiontype");
  const [OfferType, setOfferType] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [filterTutor, setFilterTutor] = useState([]);

  // console.log(
  //   ALL_FAV_TUTORS,
  //   "ALL_FAV_TUTORSALL_FAV_TUTORSALL_FAV_TUTORSALL_FAV_TUTORSALL_FAV_TUTORS",
  //   Login_Data
  // );
console.log(Tutor,'TUTUTUT')
  console.log(value, "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            isFocus && {
              fontSize: 12,
              fontWeight: "500",
              color: "black",
              color: "blue",
            },
          ]}
        >
          Post ID:
        </Text>
      );
    }
    return (
      <Text
        style={[
          isFocus && {
            fontSize: 12,
            fontWeight: "500",
            color: "black",
            color: "blue",
          },
        ]}
      >
        Post ID:
      </Text>
    );
  };

  const toggleModal = () => {
    console.log("sddddddddd");
    setModalVisible(!isModalVisible);
  };

  const SelectTab = (selectedval) => {
    console.log(selectedval);
    setCurrentTab(selectedval);
  };
  const expandToggleModal = () => {
    console.log("@@@@", expandToggleModal);
    setExpandModalVisible(!isExpandModalVisible);
  };

  useEffect(() => {
    dispatch(GetAllFavTutor(Login_Data.userid));
    dispatch(Interested_Tutor(Login_Data.userid));
  }, []);

  useEffect(() => {
    setLoader(true);
    setTutor(ALL_FAV_TUTORS);
    setInterestedTutor(INTERESTED_TUTOR);
    setInterestedTutorAll(INTERESTED_TUTORALL);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [ALL_FAV_TUTORS, Tutor, INTERESTED_TUTOR, INTERESTED_TUTORALL]);

  useEffect(() => {}, [
    ALL_FAV_TUTORS,
    Tutor,
    INTERESTED_TUTOR,
    INTERESTED_TUTORALL,
  ]);

  // console.log("tutors", Tutor);
  const handleExpand = () => {
    setExpand(true);
  };

  const handleExpandOPen = (i) => {
    setActiveSections(i);
    setExpand(false);
  };

  const renderHeader = (section, index, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        style={[
          styles.List,
          {
            backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF",
          },
        ]}
      >
        {/* <TouchableOpacity
          style={[
            styles.List,
            {
              backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={styles.List1}>
                {Login_Data.profilepic == "" ||
                Login_Data.profilepic == null ? (
                  <Image
                    source={require("../Assets/user.png")}
                    style={styles.usericons}
                  />
                ) : (
                  <Image
                    source={{
                      uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${section.profile_image}`,
                    }}
                    style={styles.usericons}
                  />
                )}

                <View style={{ height: 60, width: "70%", marginLeft: 10 }}>
                  <View
                    style={{
                      height: 20,
                      width: "70%",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.LIstText}>{section.tutor_code}</Text>
                    <Image
                      source={{
                        uri: `https://refuel.site/projects/tutorapp/flags-medium/ao.png`,
                      }}
                      style={styles.Flagicons}
                    />
                  </View>
                  <View
                    style={{
                      height: 20,
                      width: "70%",
                    }}
                  >
                    <Text style={styles.LIstText}>{section.qualification}</Text>
                  </View>
                  <View style={{ width: 40, margin: 3 }}>
                    <StarRating
                      fullStarColor="orange"
                      disabled={false}
                      maxStars={5}
                      // rating={item.Average_rating}
                      rating={4}
                      starSize={14}
                      // selectedStar={(rating) => setStrCount(rating)}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "80%",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.LIstText1}>
                  {section.personal_statement}...
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.LIstText1, { color: "#2F5597" }]}>
                    ReadMore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
        {/* <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#fff", textAlign: "center", marginTop: 4 }}
        >
          Search Requirements
        </Animatable.Text> */}
        <View style={{ flexDirection: "row" }}>
          <View>
            <View style={styles.List1}>
              {Login_Data.profilepic == "" || Login_Data.profilepic == null ? (
                <Image
                  source={require("../Assets/user.png")}
                  style={styles.usericons}
                />
              ) : (
                <Image
                  source={{
                    uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${section.profile_image}`,
                  }}
                  style={styles.usericons}
                />
              )}

              <View style={{ height: 60, width: "70%", marginLeft: 10 }}>
                <View
                  style={{
                    height: 20,
                    width: "70%",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.LIstText}>{section.tutor_code}</Text>
                  <Image
                    source={{
                      uri: `https://refuel.site/projects/tutorapp/flags-medium/ao.png`,
                    }}
                    style={styles.Flagicons}
                  />
                </View>
                <View
                  style={{
                    height: 20,
                    width: "70%",
                  }}
                >
                  <Text style={styles.LIstText}>{section.qualification}</Text>
                </View>
                <View style={{ width: 40, margin: 3 }}>
                  <StarRating
                    fullStarColor="orange"
                    disabled={false}
                    maxStars={5}
                    // rating={item.Average_rating}
                    rating={4}
                    starSize={14}
                    // selectedStar={(rating) => setStrCount(rating)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: "80%",
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text style={styles.LIstText1}>
                {section.personal_statement}...
              </Text>
              <TouchableOpacity>
                <Text style={[styles.LIstText1, { color: "#2F5597" }]}>
                  ReadMore
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* {isActive == true ? (
            <View
              style={{ marginTop: 40 }}
              onPress={() => {
                handleExpandOPen(index);
              }}
            >
              <Image
                source={require("../Assets/PopDown.png")}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "cover",
                }}

                // style={styles.usericons}
              />
            </View>
          ) : (
            <View
              style={{ marginTop: 40 }}
              onPress={() => {
                handleExpand();
              }}
            >
              <Image
                source={require("../Assets/popIcon.png")}
                // style={styles.usericons}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: "cover",
                }}
              />
            </View>
          )} */}
        </View>
      </Animatable.View>
    );
  };
  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.content,
          isActive ? styles.active : styles.inactive,
          {
            width: wp(95),
            alignSelf: "center",
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            opacity: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            elevation: 10,
          },
        ]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 4,
            paddingTop: 3,
            backgroundColor: "#2F5597",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: wp(7),
            fontSize: 12,
            fontWeight: "700",
            justifyContent: "center",
          }}
        >
          Search Requirements
        </Animatable.Text>
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.tuition_type}
        </Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.postal_code}
        </Animatable.Text>
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.location}
        </Animatable.Text>
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000" }}
        ></Animatable.Text>

        <Animatable.View>
          {section.tutoring_detail_arr &&
            section.tutoring_detail_arr.map((item) => {
              return (
                <Animatable.View>
                  <Animatable.View>
                    <Animatable.Text style={{ color: "#000", fontSize: 12 }}>
                      <Animatable.Text key={item} style={{ fontSize: 10 }}>
                        {item.TutoringLevel} , {item.Tutoring_Grade}
                      </Animatable.Text>
                    </Animatable.Text>
                  </Animatable.View>
                  <Animatable.View style={{ marginBottom: 10 }}>
                    <Animatable.Text style={{ color: "#000", fontSize: 12 }}>
                      <Animatable.Text key={item} style={{ fontSize: 10 }}>
                        {item.Tutoring_ALL_Subjects}
                      </Animatable.Text>
                    </Animatable.Text>
                  </Animatable.View>
                </Animatable.View>
              );
            })}
        </Animatable.View>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000" }}
        ></Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.qualification}
        </Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        ></Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.name_of_school}
        </Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.gender}
        </Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.tutor_status}
        </Animatable.Text>

        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ color: "#000", fontSize: 12 }}
        >
          {section.nationality}
        </Animatable.Text>
      </Animatable.View>
    );
  };
  const setSections = (sections) => {
    //setting up a active section state
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
    console.log(sections, "PPPPPPPPPPPPPPPPPPPP");
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const chooseTab = (tab) => {
    setSelectedTab(tab);
  };

  const Assignment_Detail = (
    student_post_requirements_id,
    student_postal_address,
    tutor_duration_weeks,
    tutor_duration_hours,
    tutor_tution_offer_amount,
    tutor_tution_offer_amount_type,
    booked_date,
    student_level_grade_subjects,
    tutor_qualification,
    tutor_schedule_and_slot_times
  ) => {
    setDetail_View("DetailView");
    setPostid(student_post_requirements_id),
      setAddress(student_postal_address),
      setWeeks(tutor_duration_weeks),
      setHours(tutor_duration_hours),
      setAmount(tutor_tution_offer_amount),
      setOfferType(tutor_tution_offer_amount_type),
      setBookDate(booked_date),
      setStudent_Detail(student_level_grade_subjects),
      setQualification(tutor_qualification),
      setSchedule(tutor_schedule_and_slot_times);
  };

  const UpdateRecord = (ss) => {
    setValue(ss);
    setLoader(true);
    dispatch(
      Get_Filter_Tutor(Login_Data.userid, ss.student_post_requirements_id)
    );
    //  setFilterTutor(ss);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    setIsFocus(false);
  };

  console.log(filterTutor, "IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

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

      <View>
        <View style={styles.SearchContainer}>
          <Text
            style={{
              color: "#2F5597",
              fontWeight: "700",
              fontSize: 20,
              marginTop: 15,
            }}
          >
            My Favs
          </Text>
        </View>

        {/* <View style={{ width: wp(100), flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => chooseTab("Post")}
            style={{
              height: wp(10),
              width: wp(50),
              justifyContent: "center",
              backgroundColor: selectedTab == "Post" ? "#2F5597" : "#fff",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: selectedTab == "Post" ? "#fff" : "#000",
              }}
            >
              Interested Tutors
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => chooseTab("Search")}
            style={{
              height: wp(10),
              width: wp(50),
              justifyContent: "center",
              backgroundColor: selectedTab == "Search" ? "#2F5597" : "#fff",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: selectedTab == "Search" ? "#fff" : "#000",
              }}
            >
              My Fav
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* 
        {loader == true ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator style={{ alignSelf: "center" }} size={"small"} />
          </View>
        ) : ( */}

        {selectedTab == "Post" ? (
          <View>
            <View
              style={{
                width: wp(90),
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                marginBottom: -20,
              }}
            >
              <View style={{ width: wp(20), justifyContent: "center" }}>
                {renderLabel()}
              </View>

              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={interestedTutorAll}
                search
                maxHeight={300}
                labelField="student_post_requirements_id"
                valueField="student_post_requirements_id"
                placeholder={!isFocus ? "Select Post" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  UpdateRecord(item);
                  // setValue(item);
                  // setInterestedTutor(item);
                  // setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? "blue" : "black"}
                //     name="Safety"
                //     size={20}
                //   />
                // )}
              />
            </View>
            {detail_view == "List" ? (
              <ScrollView style={{ height: hp(65) }}>
                <FlatList
                  // style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}
                  scrollEnabled={true}
                  data={interestedTutor}
                  keyExtractor={(item, index) => index}
                  //  showsVerticalScrollIndicator={false}
                  //renderItem={renderItem}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={{}}>
                      <TouchableOpacity style={styles.List}>
                        <View style={{ width: "100%", marginLeft: 10 }}>
                          {/* <View style={{ width: "70%", flexDirection: "row" }}>
                          <Text style={styles.LIstText}>
                            Post ID {item.student_post_requirements_id}
                          </Text>
                        </View> */}
                          <View
                            style={
                              {
                                // height: 20,
                                //width: "70%",
                                //backgroundColor: "white",
                              }
                            }
                          >
                            <View>
                              {item.student_level_grade_subjects &&
                                item.student_level_grade_subjects.map(
                                  (item) => {
                                    return (
                                      <View>
                                        <View>
                                          <Text
                                            style={{
                                              color: "#000",
                                              fontSize: 12,
                                            }}
                                          >
                                            {" "}
                                            Level :{" "}
                                            <Text
                                              key={item}
                                              style={{ fontSize: 10 }}
                                            >
                                              {item.Level} , {item.Grade}
                                            </Text>
                                          </Text>
                                        </View>
                                        <View style={{ marginBottom: 10 }}>
                                          <Text
                                            style={{
                                              color: "#000",
                                              fontSize: 12,
                                            }}
                                          >
                                            {" "}
                                            Subjects :{" "}
                                            <Text
                                              key={item}
                                              style={{ fontSize: 10 }}
                                            >
                                              {item.ALL_Subjects}
                                            </Text>
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  }
                                )}
                            </View>
                          </View>

                          <View></View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          Assignment_Detail(
                            item.student_post_requirements_id,
                            item.student_tution_type,
                            item.tutor_duration_weeks,
                            item.tutor_duration_hours,
                            item.tutor_tution_fees,
                            item.tutor_tution_offer_amount_type,
                            item.booked_date,
                            item.student_level_grade_subjects,
                            item.tutor_qualification,
                            item.tutor_schedule_and_slot_times
                          )
                        }
                        style={{
                          height: 40,
                          width: 40,
                          position: "absolute",
                          right: 20,
                          marginTop: 30,
                        }}
                      >
                        <Image
                          source={require("../Assets/TutorD.png")}
                          style={{ height: 50, width: 50 }}
                        />
                      </TouchableOpacity>

                      {item.tutor_details &&
                        item.tutor_details.map((item1, index1) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor:
                                  index1 % 2 == 0 ? "#f2f2f2" : "#FFFFFF",
                                marginBottom: 10,
                                padding: 5,
                              }}
                            >
                              <View>
                                <View style={styles.List1}>
                                  {Login_Data.profilepic == "" ||
                                  Login_Data.profilepic == null ? (
                                    <Image
                                      source={require("../Assets/user.png")}
                                      style={styles.usericons}
                                    />
                                  ) : (
                                    <Image
                                      source={{
                                        uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${item1.profile_image}`,
                                      }}
                                      style={styles.usericons}
                                    />
                                  )}

                                  <View
                                    style={{
                                      height: 60,
                                      width: "70%",
                                      marginLeft: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        height: 20,
                                        width: "70%",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <Text style={styles.LIstText}>
                                        {item1.tutor_code}
                                      </Text>
                                      <Image
                                        source={{
                                          uri: `https://refuel.site/projects/tutorapp/flags-medium/ao.png`,
                                        }}
                                        style={styles.Flagicons}
                                      />
                                    </View>
                                    <View
                                      style={{
                                        height: 20,
                                        width: "70%",
                                      }}
                                    >
                                      <Text style={styles.LIstText}>
                                        {item1.qualification}
                                      </Text>
                                    </View>
                                    <View style={{ width: 40, margin: 3 }}>
                                      <StarRating
                                        fullStarColor="orange"
                                        disabled={false}
                                        maxStars={5}
                                        // rating={item.Average_rating}
                                        rating={4}
                                        starSize={14}
                                        // selectedStar={(rating) => setStrCount(rating)}
                                      />
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    // alignSelf: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      width: "80%",
                                      // flexDirection: "row",
                                      // alignSelf: "center",
                                    }}
                                  >
                                    <Text
                                      style={styles.LIstText1}
                                      numberOfLines={2}
                                    >
                                      {item1.personal_statement}...
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      width: "20%",
                                      alignSelf: "flex-end",
                                      // flexDirection: "row",
                                      // alignSelf: "center",
                                    }}
                                  >
                                    <TouchableOpacity>
                                      <Text
                                        style={[
                                          styles.LIstText1,
                                          { color: "#2F5597" },
                                        ]}
                                      >
                                        ReadMore
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            ) : (
              <View style={{ height: hp(65) }}>
                <View
                  style={{
                    width: wp(100),
                    flexDirection: "row",
                    justifyContent: "center",

                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      width: wp(48),
                      flexDirection: "row",

                      alignItems: "flex-start",
                    }}
                  >
                    <Image
                      source={require("../Assets/user.png")}
                      style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                      }}
                    />
                    <View style={{ alignSelf: "center", marginLeft: wp(2) }}>
                      <StarRating
                        fullStarColor="orange"
                        disabled={false}
                        maxStars={5}
                        rating={4}
                        starSize={13}
                        // selectedStar={(rating) => setStrCount(rating)}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                      width: wp(48),
                    }}
                  >
                    <Text style={styles.Information}>Post ID: {postID}</Text>
                    <Text style={styles.Information}> {bookDate}</Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.Information, { alignSelf: "center" }]}>
                    {address}
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => SelectTab("tutiontype")}
                    style={[
                      currentTab == "tutiontype"
                        ? styles.cardFourBoxes1Active
                        : styles.cardFourBoxes,
                      styles.shadowPropFourBoxes,
                    ]}
                  >
                    <Image
                      source={require("../Assets/Student.png")}
                      style={styles.TypeImage3}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SelectTab("qualification")}
                    style={[
                      currentTab == "qualification"
                        ? styles.cardFourBoxes1Active
                        : styles.cardFourBoxes1,
                      styles.shadowPropFourBoxes1,
                    ]}
                  >
                    <Image
                      source={require("../Assets/Qualification.png")}
                      style={styles.TypeImage3}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SelectTab("duration")}
                    style={[
                      currentTab == "duration"
                        ? styles.cardFourBoxes1Active
                        : styles.cardFourBoxes1,
                      styles.shadowPropFourBoxes1,
                    ]}
                  >
                    <Image
                      source={require("../Assets/Duration.png")}
                      style={styles.TypeImage3}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SelectTab("doller")}
                    style={[
                      currentTab == "doller"
                        ? styles.cardFourBoxes1Active
                        : styles.cardFourBoxes1,
                      styles.shadowPropFourBoxes1,
                    ]}
                  >
                    <Image
                      source={require("../Assets/Dollar.png")}
                      style={styles.TypeImage3}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => SelectTab("time")}
                    style={[
                      currentTab == "time"
                        ? styles.cardFourBoxes1Active
                        : styles.cardFourBoxes1,
                      styles.shadowPropFourBoxes1,
                    ]}
                  >
                    <Image
                      source={require("../Assets/Time.png")}
                      style={styles.TypeImage3}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View style={{ paddingBottom: 10 }}>
                    {currentTab == "tutiontype" ? (
                      studentDetail &&
                      studentDetail.map((student) => (
                        <View
                          // key={item.Id}
                          style={{
                            width: wp(100),
                            flexDirection: "row",
                            marginBottom: 15,
                            elevation: 2,
                            backgroundColor: "#fff",
                            borderBottomColor: "#000",
                            borderBottomWidth: 1.1,
                            borderStyle: "dashed",
                          }}
                        >
                          <View
                            style={{
                              width: wp(10),
                              backgroundColor: "purple",
                              elevation: 3,
                            }}
                          />

                          <View
                            key={student.ID}
                            style={{
                              marginBottom: 10,
                              padding: 10,
                              width: wp(70),
                              backgroundColor: "#fff",
                            }}
                          >
                            <Text style={styles.Information}>
                              {student.Grade}
                            </Text>
                            <Text style={styles.Information}>
                              {student.Level}
                            </Text>
                            <Text style={styles.Information}>
                              {student.ALL_Subjects}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : currentTab == "qualification" ? (
                      <View
                        // key={item.Id}
                        style={{
                          width: wp(100),
                          flexDirection: "row",

                          elevation: 2,
                          backgroundColor: "#fff",
                          borderBottomColor: "#000",
                          borderBottomWidth: 1.1,
                          borderStyle: "dashed",
                        }}
                      >
                        <View
                          style={{
                            width: wp(10),
                            backgroundColor: "purple",
                            elevation: 3,
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            paddingBottom: 10,
                            paddingTop: 10,
                            width: wp(60),
                          }}
                        >
                          {qualification &&
                            qualification.map((item, index) => (
                              <Text key={index} style={[styles.Information]}>
                                {item.Tutor_Qualification}
                              </Text>
                            ))}
                        </View>
                      </View>
                    ) : currentTab == "duration" ? (
                      <View
                        // key={item.Id}
                        style={{
                          height: 90,
                          width: wp(100),
                          flexDirection: "row",
                          marginBottom: 15,
                          elevation: 2,
                          backgroundColor: "#fff",
                          borderBottomColor: "#000",
                          borderBottomWidth: 1.1,
                          borderStyle: "dashed",
                        }}
                      >
                        <View
                          style={{
                            height: 90,
                            width: wp(10),
                            backgroundColor: "purple",
                            elevation: 3,
                          }}
                        />

                        <View
                          style={{
                            marginBottom: 10,
                            padding: 10,
                            width: wp(60),
                            backgroundColor: "#fff",
                          }}
                        >
                          {/* <Text style={styles.Information}>
                         Student ID: {student.Id}
                       </Text> */}
                          <Text style={styles.Information}>{weeks}</Text>
                          <Text style={styles.Information}>{hours}</Text>
                        </View>
                      </View>
                    ) : currentTab == "doller" ? (
                      <View
                        // key={item.Id}
                        style={{
                          height: 90,
                          width: wp(100),
                          flexDirection: "row",
                          marginBottom: 15,
                          elevation: 2,
                          backgroundColor: "#fff",
                          borderBottomColor: "#000",
                          borderBottomWidth: 1.1,
                          borderStyle: "dashed",
                        }}
                      >
                        <View
                          style={{
                            height: 90,
                            width: wp(10),
                            backgroundColor: "purple",
                            elevation: 3,
                          }}
                        />

                        <View
                          style={{
                            marginBottom: 10,
                            padding: 10,
                            width: wp(60),
                            backgroundColor: "#fff",
                          }}
                        >
                          {/* <Text style={styles.Information}>
                         Student ID: {student.Id}
                       </Text> */}
                          <Text style={styles.Information}>
                            SGD {amount}.00
                          </Text>
                          <Text style={styles.Information}>{OfferType}</Text>
                        </View>
                      </View>
                    ) : (
                      schedule &&
                      schedule.map((item, index) => (
                        <View
                          // key={item.Id}
                          style={{
                            height: 90,
                            width: "100%",
                            flexDirection: "row",
                            marginBottom: 15,
                            elevation: 2,
                            backgroundColor: "#fff",
                            borderBottomColor: "#000",
                            borderBottomWidth: 1.1,
                            borderStyle: "dashed",
                          }}
                        >
                          <View
                            style={{
                              height: 90,
                              width: "10%",
                              backgroundColor: "purple",
                              elevation: 3,
                            }}
                          />

                          <View
                            style={{
                              marginBottom: 10,
                              padding: 10,
                              width: wp(60),
                              backgroundColor: "#fff",
                            }}
                          >
                            {/* <Text style={styles.Information}>
                         Student ID: {student.Id}
                       </Text> */}
                            {/* {item.slot_time.map((item1, index1) => ( */}
                            <View style={{ flexDirection: "row" }} key={{}}>
                              <Text style={styles.Information}>
                                {item.tutor_schedule}
                              </Text>
                              <Text> </Text>
                              <Text style={styles.Information}>
                                {item.slot_times + " "}
                              </Text>
                            </View>
                            {/* ))} */}
                          </View>
                        </View>
                      ))
                    )}
                  </View>
                  <View style={{ height: hp(5) }}></View>
                </ScrollView>
                <View
                  style={{
                    height: hp(6),
                    width: "100%",
                    marginTop: 10,
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setDetail_View("List")}
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "#C0C0C0",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 3,
                    }}
                  >
                    <Text style={styles.BookText5}>Go Back</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() =>
                      ApplyAssignment(postID, Login_Data.userid, false)
                    }
                    //  onPress={() => navigation.navigate("MakeOffer")}
                    style={{
                      height: "100%",
                      width: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#000",
                      borderRadius: 3,
                    }}
                  >
                    <Text style={styles.infoText1}>Withdraw Application</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            )}
          </View>
        ) : (
          <ScrollView style={{ height: hp(70), marginTop: 10 }}>
            {/* <Accordion
              activeSections={activeSections}
              sections={ALL_FAV_TUTORS}
              //title and content of accordion
              touchableComponent={TouchableOpacity}
              //which type of touchable component you want
              //It can be the following Touchables
              //TouchableHighlight, TouchableNativeFeedback
              //TouchableOpacity , TouchableWithoutFeedback
              // expandMultiple={multipleSelect}
              //Do you want to expand mutiple at a time or single at a time
              // renderHeader={renderContent}
              renderHeader={renderHeader}
              //Header Component(View) to render
              renderContent={renderContent}
              //Content Component(View) to render
              duration={400}
              //Duration for Collapse and expand
              onChange={setSections}
            /> */}
            {
              Tutor  != 'No record found.'?
              <FlatList
              scrollEnabled={true}
              data={Tutor}
              keyExtractor={(item, index) => index}
              //  showsVerticalScrollIndicator={false}
              //renderItem={renderItem}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TutorSearchProfile", {
                      data: item,
                    })
                  }
                  style={[
                    styles.List,
                    {
                      backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF",
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <View style={styles.List1}>
                        {item.profile_image == "" ||
                        item.profile_image == null ? (
                          <Image
                            source={require("../Assets/user.png")}
                            style={styles.usericons}
                          />
                        ) : (
                          <Image
                            source={{
                              uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${item.profile_image}`,
                            }}
                            style={styles.usericons}
                          />
                        )}

                        <View
                          style={{ height: 60, width: "70%", marginLeft: 10 }}
                        >
                          <View
                            style={{
                              height: 20,
                              width: "70%",
                              flexDirection: "row",
                            }}
                          >
                            <Text style={styles.LIstText}>
                              {item.tutor_code}
                            </Text>
                            <Image
                              source={{
                                uri: `https://refuel.site/projects/tutorapp/flags-medium/ao.png`,
                              }}
                              style={styles.Flagicons}
                            />
                          </View>
                          <View
                            style={{
                              height: 20,
                              width: "70%",
                            }}
                          >
                            <Text style={styles.LIstText}>
                              {item.qualification}
                            </Text>
                          </View>
                          <View style={{ width: 40, margin: 3 }}>
                            <StarRating
                              fullStarColor="orange"
                              disabled={false}
                              maxStars={5}
                              // rating={item.Average_rating}
                              rating={4}
                              starSize={14}
                              // selectedStar={(rating) => setStrCount(rating)}
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: "98%",
                          flexDirection: "row",
                          //  backgroundColor: "green",
                          // alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "68%",
                            // backgroundColor: "yellow",
                            // alignSelf: "center",
                          }}
                        >
                          <Text style={styles.LIstText1} numberOfLines={2}>
                            {item.personal_statement}...
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "30%",
                            justifyContent: "flex-end",
                            // backgroundColor: "red",
                            // alignSelf: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("TutorSearchProfile", {
                                data: item,
                              })
                            }
                            style={{
                              alignSelf: "flex-end",

                              // alignSelf: "center",
                            }}
                          >
                            <Text
                              style={[styles.LIstText1, { color: "#2F5597" }]}
                            >
                              See more
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/* {isActive == true ? (
              <View
                style={{ marginTop: 40 }}
                onPress={() => {
                  handleExpandOPen(index);
                }}
              >
                <Image
                  source={require("../Assets/PopDown.png")}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: "cover",
                  }}
  
                  // style={styles.usericons}
                />
              </View>
            ) : (
              <View
                style={{ marginTop: 40 }}
                onPress={() => {
                  handleExpand();
                }}
              >
                <Image
                  source={require("../Assets/popIcon.png")}
                  // style={styles.usericons}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: "cover",
                  }}
                />
              </View>
            )} */}
                  </View>
                </TouchableOpacity>
              )}
            />
              :
              <Text style={styles.noData}>No Record Found</Text>

            }
            
          </ScrollView>
        )}
      </View>

      {/* Expand model */}
    </View>
  );
};

export default MyFav;

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
    padding: 10,
    //   flexDirection: "row",
    alignItems: "center",

    //  backgroundColor: "white",
    justifyContent: "center",
    width: wp(100),
    height: wp(30),
    alignSelf: "center",
    shadowColor: "grey",
    // borderWidth:1,
    // elevation: 10,
    shadowOffset: { width: 8, height: 10 },
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    //  borderWidth: 0.5,
    fontSize: "12",
    width: wp(30),

    alignContent: "flex-end",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    width: wp(40),
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },

  List1: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",

    // backgroundColor: "white",
    borderRadius: 10,
    width: wp(90),
    height: wp(15),
    alignSelf: "center",
    // shadowColor: "grey",
    // borderWidth:1,
    // elevation: 10,
    // shadowOffset: { width: 8, height: 10 },
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
    fontWeight: "500",
    color: "black",
  },

  LIstText2: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    marginVertical: 5,
    width: "100%",
    alignSelf: "center",
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
  BookText5: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    color: "grey",
  },
  infoText1: {
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
    fontWeight: "700",
  },
  Information: {
    fontSize: 12,
    color: "black",
    fontFamily: "Poppins-Regular",
    marginLeft: 10,
  },
  cardFourBoxes: {
    height: 70,
    width: "18%",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft:3
  },
  shadowPropFourBoxes: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardFourBoxes1: {
    height: 70,
    width: "18%",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  shadowPropFourBoxes1: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardFourBoxes1Active: {
    height: 70,
    width: "18%",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderBottomWidth: 2,
    borderColor: "#000",
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
    marginBottom: 10,
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
    width: wp(44),
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
    fontWeight: "700",
    color: "#2F5597",
    alignSelf: "center",
  },
  sliderText: {
    fontSize: 12,
    color: "#000",
    alignSelf: "center",
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
  },
  Flagicons: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  BlueText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    width: wp(85),
    alignSelf: "center",
    marginTop: 15,
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
    height: hp(55),
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
    height: 77,
    width: 77,
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
    width: wp(35),
    height: hp(10),
    flexDirection: "row",
    alignItems: "center",
  },
  UserRight: {
    width: wp(50),
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
    paddingTop: 10,
    fontStyle: "italic",
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
  noData:{
    alignSelf:'center',
    fontSize:20,
    marginTop:150
  }
});
