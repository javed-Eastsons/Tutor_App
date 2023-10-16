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
} from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";
import MultiSelect from "react-native-multiple-select";
import StarRating from "react-native-star-rating";
import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from "@react-native-community/checkbox";
import { BookTutor } from "../Redux/Actions/TutorBooking";
import { indigo100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const BookingInformationConfirmation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { Tutor_Schedule } = useSelector((state) => state.TutorReducer);
  const { Tution_Type } = useSelector((state) => state.TutorReducer);
  const { Student_Detail } = useSelector((state) => state.TutorReducer);
  const { Tutor_Qualification } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { Tutor_Detail } = useSelector((state) => state.TutorReducer);

  const [tutiontype, setTutionType] = useState("tutiontype");
  const [qualification, setQualification] = useState("qualification");
  const [lesson, setLesson] = useState("lesson");
  const [offerprice, setOfferPrice] = useState("offerprice");
  const [timeslots, setTimeSlots] = useState("timeslots");
  const [currentTab, setCurrentTab] = useState("tutiontype");

  const SelectTab = (selectedval) => {
    console.log(selectedval);
    setCurrentTab(selectedval);
  };
  console.log(currentTab, "currentTab");
  // console.log(
  //   Tutor_Schedule,
  //   "Tutor_ScheduleTutor_ScheduleTutor_ScheduleTutor_Schedule",
  //   Tution_Type,
  //   "Tution_Type",
  //   Student_Detail,
  //   "Student_Detail",
  //   Tutor_Qualification,
  //   "Tutor_Qualification",
  //   Tutor_Detail,
  //   "Tutor_Detail"
  // );

  const BookTutorProcess = () => {
    dispatch(
      BookTutor(
        Tution_Type,
        Student_Detail,
        Tutor_Qualification,
        Tutor_Schedule,
        Login_Data,
        Tutor_Detail,
        navigation
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Let's Book!</Text>
      </View>
      <View style={styles.Container}>
        <View style={styles.LeftImageContainer}>
          <Image
            source={require("../Assets/user.png")}
            style={styles.leftImage}
          />
        </View>
        <View style={styles.UserInfoContainer}>
          <View style={styles.UserInfoContainer1}>
            <Text style={styles.infoText}>Hello</Text>
          </View>
          <View style={{ height: 30, width: 200 }}>
            <Text style={styles.infoText}>University Undergraguate</Text>
          </View>
        </View>
      </View>
      <View style={styles.RatingContainer}>
        <View style={{ width: 40, marginLeft: 5 }}>
          <StarRating
            fullStarColor="orange"
            disabled={false}
            maxStars={5}
            // rating={item.Average_rating}
            starSize={15}
            // selectedStar={(rating) => setStrCount(rating)}
          />
        </View>
      </View>
      <View style={[styles.cardLeft, styles.shadowPropLeft]}>
        <Text style={styles.infoText1}>
          Step 1 of 5: Booking Information required
        </Text>
      </View>
      <View style={[styles.Bookcard, styles.BookshadowProp]}>
        <View
          style={{
            height: 100,
            width: "100%",
            padding: 5,
            backgroundColor: "#E0E0E0",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 40,
                width: "70%",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text style={styles.BookText1}>{Tution_Type.TutionType}</Text>
            </View>
            <View
              style={{
                height: 40,
                width: "30%",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Image
                style={styles.TypeImage}
                source={require("../Assets/HomeTution.png")}
              />
            </View>
          </View>
          <View style={{ height: 30, width: "100%", flexDirection: "row" }}>
            <View
              style={{
                height: 50,
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.PostalText}>{Tution_Type.Postal_Code}</Text>
              {/* <Text style={styles.PostalText}>{Tution_Type.PostAddress}</Text> */}
              {/* <Text style={styles.PostalText}>Postal Code Edit Here</Text> */}
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.TypeImage1}
                source={require("../Assets/Edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            //height: 100,
            width: "100%",
            marginTop: 20,
            alignSelf: "center",
            //    justifyContent: "center",
            //   backgroundColor: "red",
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
        <ScrollView>
          <View style={{ paddingBottom: 10 }}>
            {currentTab == "tutiontype" ? (
              // <View
              //   style={{
              //     height: 120,
              //     width: "100%",
              //     marginTop: 90,
              //     padding: 10,
              //   }}
              // >
              Student_Detail.Student_Data.map((student) => (
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
                    key={student.Id}
                    style={{
                      marginBottom: 10,
                      padding: 10,
                      width: wp(70),
                      backgroundColor: "#fff",
                    }}
                  >
                    <Text style={styles.Information}>{student.Grade}</Text>
                    <Text style={styles.Information}>{student.Level}</Text>
                    <Text style={styles.Information}>
                      {student.ALL_Subjects.join(", ")}
                    </Text>
                  </View>
                  <View style={{ height: 80, width: wp(10) }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("StudentBookingInfo")}
                      // onPress={()
                      //   handleEdit(
                      //     item.Id,
                      //     item.Level,
                      //     item.Grade,
                      //     item.ALL_Subjects
                      //   )
                      // }
                      style={{
                        height: 40,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../Assets/Edit.png")}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      onPress={() => deleteRecord(item.Id)}
                      style={{
                        height: 40,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image source={require("../Assets/Deletes.png")} />
                    </TouchableOpacity> */}
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
                  {Tutor_Qualification.TutorQualification.map((item, index) => (
                    <Text key={index} style={[styles.Information]}>
                      {item.qualification}
                    </Text>
                  ))}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TutorQualification")}
                    style={{
                      height: 30,
                      width: wp(30),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/Edit.png")}
                      style={{ height: 20, width: 20, position: "absolute" }}
                    />
                  </TouchableOpacity>
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
                  <Text style={styles.Information}>
                    {Tutor_Qualification.duration}
                  </Text>
                  <Text style={styles.Information}>
                    {Tutor_Qualification.frequency}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TutorQualification")}
                    style={{
                      height: 30,
                      width: wp(30),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/Edit.png")}
                      style={{ height: 20, width: 20, position: "absolute" }}
                    />
                  </TouchableOpacity>
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
                    SGD {Tutor_Qualification.FeeOffer}.00
                  </Text>
                  <Text style={styles.Information}>
                    {Tutor_Qualification.feetype}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("TutorQualification")}
                    style={{
                      height: 30,
                      width: wp(30),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/Edit.png")}
                      style={{ height: 20, width: 20, position: "absolute" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // <View style={{ height: 120, width: "100%", padding: 10 }}>
              //   <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              //     <View
              //       style={{ height: 20, width: "70%", justifyContent: "center" }}
              //     >
              //       <Text style={styles.Information}>
              //         {Tutor_Qualification.FeeOffer}
              //       </Text>
              //     </View>
              //     <TouchableOpacity
              //       style={{
              //         height: 30,
              //         width: "30%",
              //         justifyContent: "center",
              //         alignItems: "center",
              //       }}
              //     >
              //       <Image
              //         source={require("../Assets/Edit.png")}
              //         style={{ height: 20, width: 20, position: "absolute" }}
              //       />
              //     </TouchableOpacity>
              //   </View>
              //   <View style={{ flexDirection: "row", height: 30, width: "100%" }}>
              //     <View
              //       style={{ height: 20, width: "70%", justifyContent: "center" }}
              //     >
              //       <Text style={styles.Information}>
              //         {Tutor_Qualification.feetype}
              //       </Text>
              //     </View>
              //     <TouchableOpacity
              //       style={{
              //         height: 30,
              //         width: "30%",
              //         justifyContent: "center",
              //         alignItems: "center",
              //       }}
              //     >
              //       <Image
              //         source={require("../Assets/Edit.png")}
              //         style={{ height: 20, width: 20, position: "absolute" }}
              //       />
              //     </TouchableOpacity>
              //   </View>

              //   <Text
              //     style={{ color: "#2F5597" }}
              //     ellipsizeMode="clip"
              //     numberOfLines={1}
              //   >
              //     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              //     - -
              //   </Text>
              // </View>
              Tutor_Schedule.Tutor_schedules &&
              Tutor_Schedule.Tutor_schedules.map((item, index) => (
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
                        {item.slot_time + " "}
                      </Text>
                    </View>
                    {/* ))} */}
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("TutionSchedulePicker")
                      }
                      style={{
                        height: 30,
                        width: wp(30),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../Assets/Edit.png")}
                        style={{ height: 20, width: 20, position: "absolute" }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <View
          style={{
            height: "10%",
            width: "100%",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("")}
            style={{
              height: "100%",
              width: "50%",
              backgroundColor: "#C0C0C0",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <Text style={styles.BookText5}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => BookTutorProcess()}
            //  onPress={() => navigation.navigate("MakeOffer")}
            style={{
              height: "100%",
              width: "50%",

              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F6BE00",
              borderRadius: 3,
            }}
          >
            <Text style={styles.infoText1}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default BookingInformationConfirmation;

const styles = StyleSheet.create({
  Headers: {
    height: hp(5),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
    // backgroundColor:'red'
  },
  HeadLeft: {
    width: wp(45),
    height: hp(5),
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  Information: {
    fontSize: 12,
    color: "black",
    fontFamily: "Poppins-Regular",
    marginLeft: 10,
  },
  HeadRight: {
    width: wp(45),
    height: hp(5),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  HeaderContainer: {
    height: 30,
    width: "90%",
    alignSelf: "center",
  },
  HeaderText: {
    fontSize: 20,
    color: "#2F5597",
    fontFamily: "Poppins-Bold",
  },
  Container: {
    height: 70,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  LeftImageContainer: {
    height: 60,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  leftImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  UserInfoContainer: {
    height: 60,
    width: 200,
  },
  UserInfoContainer1: {
    height: 30,
    width: 200,
  },
  RatingContainer: {
    height: 20,
    width: "90%",
    alignSelf: "center",
  },
  cardLeft: {
    height: 30,
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
    // borderRadius: 2,
    borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowPropLeft: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  infoText1: {
    // fontSize: 15,
    color: "black",
    alignSelf: "center",
    fontFamily: "Poppins-SemiBold",
  },
  Bookcard: {
    height: "67.5%",
    width: "100%",
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    // borderWidth: 0.2,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  BookshadowProp: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  BookText1: {
    fontSize: 15,
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  PostalText: {
    // fontSize: 14,
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  BookText5: {
    // fontSize: 15,
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  TypeImage: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
  },
  TypeImage1: {
    width: 20,
    height: 20,
  },
  TypeImage3: {
    width: 50,
    height: 50,
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
  shadowPropFourBoxes1: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  infoText: {
    // fontSize: 15,
    color: "black",
    fontFamily: "Poppins-Regular",
  },
});
