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
import { GetPostDetail, AllPostsByClient } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "react-native-star-rating";

const MyPosts = () => {
  const [strCount, setStrCount] = useState(1);
  const [isExpandModalVisible, setExpandModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const dispatch = useDispatch();
  const { ALL_POSTS_BY_CLIENT } = useSelector((state) => state.TutorReducer);
  const { POST_DETAIL } = useSelector((state) => state.TutorReducer);
  const navigation = useNavigation();
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  console.log(Login_Data, "POSTSSSSSSSSSSS");
  const [Tutor, setTutor] = useState([]);
  const [postCode, setPostalCode] = useState([]);
  const [tuitionType, setTuitionType] = useState([]);
  const [postAdd, setPostalAdd] = useState([]);
  const [Fee, setFee] = useState([]);
  const [OfferType, setOfferType] = useState([]);

  const toggleModal = () => {
    console.log("sddddddddd");
    setModalVisible(!isModalVisible);
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
    dispatch(AllPostsByClient(Login_Data, navigation));
    setTutor(ALL_POSTS_BY_CLIENT);
  }, []);

  useEffect(() => {
    setTutor(ALL_POSTS_BY_CLIENT);
  }, [ALL_POSTS_BY_CLIENT, POST_DETAIL]);
  console.log("tutors", Tutor);

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

      <ScrollView>
        <View style={styles.SearchContainer}>
          <Text
            style={{
              color: "#2F5597",
              fontWeight: "700",
              fontSize: 16,
              marginTop: 15,
            }}
          >
            My Posts
          </Text>
        </View>

        <FlatList
          // style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          data={Tutor}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          //renderItem={renderItem}

          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={styles.List}>
                <View style={{ height: 100, width: "100%", marginLeft: 10 }}>
                  <View
                    style={{ height: 20, width: "70%", flexDirection: "row" }}
                  >
                    <Text style={styles.LIstText}>
                      Post ID {item.student_post_requirements_id}
                    </Text>
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
                                  {" "}
                                  Level :{" "}
                                  <Text key={item} style={{ fontSize: 10 }}>
                                    {item.Level} , {item.Grade}
                                  </Text>
                                </Text>
                              </View>
                              <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: "#000", fontSize: 12 }}>
                                  {" "}
                                  Subjects :{" "}
                                  <Text key={item} style={{ fontSize: 10 }}>
                                    {item.ALL_Subjects}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                  <View></View>
                </View>
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
                    <View style={{ height: 60, width: "100%", marginLeft: 10 }}>
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
                        Student tution type: {tuitionType}
                      </Text>
                      <Text style={styles.LIstText2}>PostCode: {postCode}</Text>
                      <Text style={styles.LIstText2}>Address: {postAdd}</Text>
                      {/* <Text style={styles.LIstText2}>
                        Duration: {item.tutor_duration_weeks}
                      </Text> */}
                      {/* <Text style={styles.LIstText2}>
                        Hours: {item.tutor_duration_hours}
                      </Text> */}
                      <Text style={styles.LIstText2}>
                        Offer Amount Type: {OfferType}
                      </Text>
                      <Text style={styles.LIstText2}>Offer Amount: {Fee}</Text>
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

export default MyPosts;

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
    height: hp(15),
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
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "700",
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
