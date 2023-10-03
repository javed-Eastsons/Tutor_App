import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
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

import {
  GetPostDetail,
  AllPostsByClient,
  ViewAssignment,
  FavouriteAssignment,
} from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";
import { Loader } from "../common/Loader";
import { GetFilterAssignment } from "../Redux/Actions/TutorSearchAction";

const CheckIn = () => {
  const [strCount, setStrCount] = useState(1);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const dispatch = useDispatch();
  const { VIEW_ASSIGNMENT } = useSelector((state) => state.TutorReducer);
  const { POST_DETAIL } = useSelector((state) => state.TutorReducer);
  const navigation = useNavigation();
  const { Login_Data } = useSelector((state) => state.TutorReducer);

  const [assignment, setAssignment] = useState([]);
  const [postCode, setPostalCode] = useState([]);
  const [tuitionType, setTuitionType] = useState([]);
  const [postAdd, setPostalAdd] = useState([]);
  const [Fee, setFee] = useState([]);
  const [OfferType, setOfferType] = useState([]);
  const [selectedlevels, setSelectedLevels] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [loader, setLoader] = useState(false);
  const [dataFrom, setDataFrom] = useState("Postal");
  const { GET_FILTER_ASSIGNMENT } = useSelector(
    (state) => state.TutorsearchReducer
  );

  // console.log(
  //   GET_FILTER_ASSIGNMENT,
  //   "GET_FILTER_ASSIGNMENTGET_FILTER_ASSIGNMENTGET_FILTER_ASSIGNMENTGET_FILTER_ASSIGNMENT"
  // );

  const toggleBookmark = (postid) => {
    setIsBookmarked(!isBookmarked);

    console.log(Login_Data.userid, postid, isBookmarked, "LLLL");
    setLoader(true);
    dispatch(FavouriteAssignment(Login_Data.userid, postid, isBookmarked));
    setTimeout(() => {
      dispatch(ViewAssignment(Login_Data, navigation));
      setLoader(false);
    }, 2000);
  };

  const expandToggleModal = (
    PostID,
    student_tution_type,
    student_postal_code,
    student_postal_address,
    tutor_tution_fees,
    tutor_tution_offer_amount_type
  ) => {
    console.log(
      "@@@@",
      PostID,
      student_tution_type,
      student_postal_code,
      student_postal_address,
      tutor_tution_fees,
      tutor_tution_offer_amount_type
    );

    setPostalCode(student_postal_code);
    setTuitionType(student_tution_type);
    setPostalAdd(student_postal_address);
    setFee(tutor_tution_fees);
    setOfferType(tutor_tution_offer_amount_type);
    setExpandModalVisible(!isExpandModalVisible);
  };

  useEffect(() => {
    dispatch(ViewAssignment(Login_Data, navigation));
    setAssignment(VIEW_ASSIGNMENT);
  }, []);

  useEffect(() => {
    setLoader(true);
    setAssignment(VIEW_ASSIGNMENT);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [VIEW_ASSIGNMENT]);

  useEffect(() => {
    setLoader(true);
    updateFilter();
    setFilterData(GET_FILTER_ASSIGNMENT);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [selectedlevels]);

  useEffect(() => {
    setFilterData(GET_FILTER_ASSIGNMENT);
  }, []);

  useEffect(() => {
    setFilterData(GET_FILTER_ASSIGNMENT);
  }, [filterData, GET_FILTER_ASSIGNMENT]);

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
    setDataFrom("Filter");
    updateFilter();
    // Perform any other necessary actions, such as updating the date
  };

  const updateFilter = () => {
    console.log(
      selectedlevels,
      "selectedlevelsselectedlevelsselectedlevelsselectedlevels"
    );
    setLoader(true);
    if (selectedlevels.length === 0) {
      setDataFrom("Postal");

      dispatch(ViewAssignment(Login_Data, navigation));
      setAssignment(VIEW_ASSIGNMENT);
    } else {
      setDataFrom("Filter");
      dispatch(GetFilterAssignment(selectedlevels));
    }
  };

  console.log(dataFrom, "dataFromdataFromdataFromdataFromdataFromdataFrom");
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

      <ScrollView>
        <View style={styles.SearchContainer}>
          <Text
            style={{
              color: "#2F5597",
              fontWeight: "700",
              fontSize: 26,
              marginTop: 15,
            }}
          >
            View It!
          </Text>
        </View>
        <View style={styles.SearchContainer}>
          <Text
            style={{
              color: "#2F5597",
              // fontWeight: "00",
              fontSize: 14,
            }}
          >
            interested? Click it
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
                backgroundColor: selectedlevels.some((obj) => {
                  return obj.includes("Primary");
                })
                  ? "#2F5597"
                  : "#fff",
                //  backgroundColor: Primary == "Primary" ? "#fff" : "#2F5597",
              },
            ]}
            onPress={() =>
              //  dispatch(GetQuickData());
              FetchDetail("Primary")
            }
          >
            {/* // onPress={() => setPrimaryFun()} style={[styles.subjectsWrapper, { backgroundColor: Primary == 'Primary' ? '#fff' : '#2F5597' }]} */}
            <Text
              style={[
                styles.subjectText,
                {
                  color: selectedlevels.some((obj) => {
                    return obj.includes("Primary");
                  })
                    ? "#fff"
                    : "#2F5597",
                },
              ]}
            >
              Primary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setSeconadyFun()}
            onPress={() => {
              FetchDetail("Secondary");
            }}
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: selectedlevels.some((obj) => {
                  return obj.includes("Secondary");
                })
                  ? "#2F5597"
                  : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                {
                  color: selectedlevels.some((obj) => {
                    return obj.includes("Secondary");
                  })
                    ? "#fff"
                    : "#2F5597",
                },
              ]}
            >
              Secondary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            //   onPress={() => setJCFun()}
            onPress={() => {
              FetchDetail("JC/Pre-U");
            }}
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: selectedlevels.some((obj) => {
                  return obj.includes("JC/Pre-U");
                })
                  ? "#2F5597"
                  : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                {
                  color: selectedlevels.some((obj) => {
                    return obj.includes("JC/Pre-U");
                  })
                    ? "#fff"
                    : "#2F5597",
                },
              ]}
            >
              JC/Pre-U
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              FetchDetail("IB (Diploma)");
            }}
            // onPress={() => setIBFun()}
            style={[
              styles.subjectsWrapper,
              {
                backgroundColor: selectedlevels.some((obj) => {
                  return obj.includes("IB (Diploma)");
                })
                  ? "#2F5597"
                  : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                {
                  color: selectedlevels.some((obj) => {
                    return obj.includes("IB (Diploma)");
                  })
                    ? "#fff"
                    : "#2F5597",
                },
              ]}
            >
              IB (Diploma)
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            // onPress={() => setAEISFun()}
            onPress={() => {
              FetchDetail("AEIS");
            }}
            style={[
              styles.subjectsWrapper,

              {
                backgroundColor: selectedlevels.some((obj) => {
                  return obj.includes("AEIS");
                })
                  ? "#2F5597"
                  : "#fff",
                // backgroundColor: AEIS == "AEIS" ? "#fff" : "#2F5597"
              },
            ]}
          >
            <Text
              style={[
                styles.subjectText,
                {
                  color: selectedlevels.some((obj) => {
                    return obj.includes("AEIS");
                  })
                    ? "#fff"
                    : "#2F5597",
                },
              ]}
            >
              AEIS
            </Text>
          </TouchableOpacity> */}
        </View>
        {dataFrom == "Postal" ? (
          <FlatList
            // style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={true}
            data={assignment}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            //renderItem={renderItem}

            renderItem={({ item, index }) => (
              <View key={item.student_post_requirements_id} style={{}}>
                <TouchableOpacity style={styles.List}>
                  <View
                    style={{
                      width: "22%",
                      marginLeft: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/user.png")}
                      style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        alignSelf: "center",
                      }}
                    />
                    <StarRating
                      fullStarColor="orange"
                      disabled={false}
                      maxStars={5}
                      rating={4}
                      starSize={13}
                      // selectedStar={(rating) => setStrCount(rating)}
                    />
                  </View>

                  <View style={{ width: "75%", marginLeft: 10 }}>
                    <View style={{ width: "70%", flexDirection: "row" }}>
                      {/* <Text style={styles.LIstText}>
                      Post ID {item.student_post_requirements_id}
                    </Text> */}
                    </View>

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
                          item.student_level_grade_subjects.map((item) => {
                            return (
                              <View>
                                <View>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Level :{" "} */}
                                    <Text
                                      key={item}
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "700",
                                      }}
                                    >
                                      {item.Level}
                                    </Text>
                                  </Text>
                                </View>

                                <View>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Level :{" "} */}
                                    <Text key={item} style={{ fontSize: 10 }}>
                                      {item.Grade}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ marginBottom: 5 }}>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Subjects :{" "} */}
                                    <Text key={item} style={{ fontSize: 10 }}>
                                      {item.ALL_Subjects}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                      </View>
                      <View
                        style={{
                          width: "78%",
                          flexDirection: "row",
                          paddingBottom: 10,
                        }}
                      >
                        <Text numberOfLines={1} style={styles.LIstText}>
                          {item.student_postal_address}
                        </Text>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 12,
                            marginLeft: 15,
                          }}
                        >
                          {/* {" "}
                                  Subjects :{" "} */}
                          <Text key={item} style={{ fontSize: 10 }}>
                            {item.booked_date}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View></View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    toggleBookmark(item.student_post_requirements_id)
                  }
                  style={{
                    height: 20,
                    width: 30,
                    position: "absolute",
                    right: 50,
                    marginTop: 50,
                  }}
                >
                  {!isBookmarked ? (
                    <Image
                      source={require("../Assets/fav_Assign.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  ) : (
                    <Image
                      source={require("../Assets/Assign_UnFav.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    expandToggleModal(
                      item.student_post_requirements_id,
                      item.student_tution_type,
                      item.student_postal_code,
                      item.student_postal_address,
                      item.tutor_tution_fees,
                      item.tutor_tution_offer_amount_type
                    )
                  }
                  style={{
                    height: 20,
                    width: 30,
                    position: "absolute",
                    right: 20,
                    marginTop: 50,
                  }}
                >
                  <Image
                    source={require("../Assets/Expand.png")}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>

                <Modal
                  isVisible={isExpandModalVisible}
                  onBackdropPress={() => setExpandModalVisible(false)}
                >
                  <View style={styles.ExpandBlueContainer}>
                    <Text style={styles.BlueText}>Post Detail</Text>
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
                      <View
                        style={{ height: 60, width: "100%", marginLeft: 10 }}
                      >
                        <View
                          style={{
                            height: 20,
                            width: "50%",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={styles.LIstText}>
                            Post ID:{item.student_post_requirements_id}
                          </Text>
                        </View>

                        {/* <Text style={styles.LIstText2}>
                        Student Grade: {item.student_grade}
                      </Text>
                      <Text style={styles.LIstText2}>
                        Student level: {item.student_level}
                      </Text> */}
                        <Text style={styles.LIstText2}>
                          Tuition Type: {tuitionType}
                        </Text>
                        <Text style={styles.LIstText2}>
                          PostCode: {postCode}
                        </Text>
                        <View style={{ marginTop: 20 }}></View>
                        <Text style={styles.LIstText2}>
                          Street Address: {postAdd}
                        </Text>
                        {/* <Text style={styles.LIstText2}>
                        Duration: {item.tutor_duration_weeks}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Hours: {item.tutor_duration_hours}
                      </Text> */}
                        <Text style={styles.LIstText2}>
                          Fee Detail: {OfferType}
                        </Text>
                        <Text style={styles.LIstText2}>
                          Offer Amount: SGD {Fee} per hour
                        </Text>
                        {/* <Text style={styles.LIstText2}>
                        Subjects:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.student_subjects &&
                          ALL_POSTS_BY_CLIENT[0]?.student_subjects.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.Student_Subjects}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Tutor Qualification:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.tutor_qualification &&
                          ALL_POSTS_BY_CLIENT[0]?.tutor_qualification.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.Tutor_Qualification}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Schedule Day:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.tutor_schedule &&
                          ALL_POSTS_BY_CLIENT[0]?.tutor_schedule.map((item) => {
                            return (
                              <Text key={item} style={styles.Information}>
                                {item.tutor_schedule}
                              </Text>
                            );
                          })}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Schedule Time:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.Tutor_slot_time &&
                          ALL_POSTS_BY_CLIENT[0]?.Tutor_slot_time.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.tutor_slot_time}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            )}
          />
        ) : (
          <FlatList
            scrollEnabled={true}
            data={filterData}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <View key={item.student_post_requirements_id} style={{}}>
                <TouchableOpacity style={styles.List}>
                  <View
                    style={{
                      width: "22%",
                      marginLeft: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/user.png")}
                      style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        alignSelf: "center",
                      }}
                    />
                    <StarRating
                      fullStarColor="orange"
                      disabled={false}
                      maxStars={5}
                      rating={4}
                      starSize={13}
                      // selectedStar={(rating) => setStrCount(rating)}
                    />
                  </View>

                  <View style={{ width: "75%", marginLeft: 10 }}>
                    <View style={{ width: "70%", flexDirection: "row" }}>
                      {/* <Text style={styles.LIstText}>
                      Post ID {item.student_post_requirements_id}
                    </Text> */}
                    </View>

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
                          item.student_level_grade_subjects.map((item) => {
                            return (
                              <View>
                                <View>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Level :{" "} */}
                                    <Text
                                      key={item}
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "700",
                                      }}
                                    >
                                      {item.Level}
                                    </Text>
                                  </Text>
                                </View>

                                <View>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Level :{" "} */}
                                    <Text key={item} style={{ fontSize: 10 }}>
                                      {item.Grade}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{ marginBottom: 5 }}>
                                  <Text style={{ color: "#000", fontSize: 12 }}>
                                    {/* {" "}
                                  Subjects :{" "} */}
                                    <Text key={item} style={{ fontSize: 10 }}>
                                      {item.ALL_Subjects}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                      </View>
                      <View
                        style={{
                          width: "78%",
                          flexDirection: "row",
                          paddingBottom: 10,
                        }}
                      >
                        <Text numberOfLines={1} style={styles.LIstText}>
                          {item.student_postal_address}
                        </Text>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 12,
                            marginLeft: 15,
                          }}
                        >
                          {/* {" "}
                                  Subjects :{" "} */}
                          <Text key={item} style={{ fontSize: 10 }}>
                            {item.booked_date}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View></View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    toggleBookmark(item.student_post_requirements_id)
                  }
                  style={{
                    height: 20,
                    width: 30,
                    position: "absolute",
                    right: 50,
                    marginTop: 50,
                  }}
                >
                  {!isBookmarked ? (
                    <Image
                      source={require("../Assets/fav_Assign.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  ) : (
                    <Image
                      source={require("../Assets/Assign_UnFav.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    expandToggleModal(
                      item.student_post_requirements_id,
                      item.student_tution_type,
                      item.student_postal_code,
                      item.student_postal_address,
                      item.tutor_tution_fees,
                      item.tutor_tution_offer_amount_type
                    )
                  }
                  style={{
                    height: 20,
                    width: 30,
                    position: "absolute",
                    right: 20,
                    marginTop: 50,
                  }}
                >
                  <Image
                    source={require("../Assets/Expand.png")}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>

                <Modal
                  isVisible={isExpandModalVisible}
                  onBackdropPress={() => setExpandModalVisible(false)}
                >
                  <View style={styles.ExpandBlueContainer}>
                    <Text style={styles.BlueText}>Post Detail</Text>
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
                      <View
                        style={{ height: 60, width: "100%", marginLeft: 10 }}
                      >
                        <View
                          style={{
                            height: 20,
                            width: "50%",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={styles.LIstText}>
                            Post ID:{item.student_post_requirements_id}
                          </Text>
                        </View>

                        {/* <Text style={styles.LIstText2}>
                        Student Grade: {item.student_grade}
                      </Text>
                      <Text style={styles.LIstText2}>
                        Student level: {item.student_level}
                      </Text> */}
                        <Text style={styles.LIstText2}>
                          Tuition Type: {tuitionType}
                        </Text>
                        <Text style={styles.LIstText2}>
                          PostCode: {postCode}
                        </Text>
                        <View style={{ marginTop: 20 }}></View>
                        <Text style={styles.LIstText2}>
                          Street Address: {postAdd}
                        </Text>
                        {/* <Text style={styles.LIstText2}>
                        Duration: {item.tutor_duration_weeks}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Hours: {item.tutor_duration_hours}
                      </Text> */}
                        <Text style={styles.LIstText2}>
                          Fee Detail: {OfferType}
                        </Text>
                        <Text style={styles.LIstText2}>
                          Offer Amount: SGD {Fee} per hour
                        </Text>
                        {/* <Text style={styles.LIstText2}>
                        Subjects:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.student_subjects &&
                          ALL_POSTS_BY_CLIENT[0]?.student_subjects.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.Student_Subjects}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Tutor Qualification:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.tutor_qualification &&
                          ALL_POSTS_BY_CLIENT[0]?.tutor_qualification.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.Tutor_Qualification}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Schedule Day:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.tutor_schedule &&
                          ALL_POSTS_BY_CLIENT[0]?.tutor_schedule.map((item) => {
                            return (
                              <Text key={item} style={styles.Information}>
                                {item.tutor_schedule}
                              </Text>
                            );
                          })}
                      </Text> */}
                        {/* <Text style={styles.LIstText2}>
                        Schedule Time:{" "}
                        {ALL_POSTS_BY_CLIENT[0]?.Tutor_slot_time &&
                          ALL_POSTS_BY_CLIENT[0]?.Tutor_slot_time.map(
                            (item) => {
                              return (
                                <Text key={item} style={styles.Information}>
                                  {item.tutor_slot_time}
                                </Text>
                              );
                            }
                          )}
                      </Text> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            )}
          />
        )}
      </ScrollView>
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

export default CheckIn;

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    backgroundColor: "white",
    borderRadius: 10,
    width: wp(90),
    //  height: hp(15),
    margin: 20,
    alignSelf: "center",
    shadowColor: "grey",
    elevation: 15,
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
    // marginLeft: 5,
    fontSize: 11,
    //fontWeight: "700",
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
  subjectsWrapper: {
    backgroundColor: "#fff",
    paddingVertical: hp(0.5),
    elevation: 5,
    borderWidth: 1,
    borderColor: "#2F5597",
    borderRadius: 4,
    marginLeft: wp(3.5),
    marginTop: hp(2),
  },
  subjectText: {
    color: "#2F5597",
    paddingHorizontal: wp(2),
    fontSize: 12,
    fontFamily: "Poppins-Light",
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
    fontSize: 15,
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
});
