import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetUserProfile } from "../Redux/Actions/Tutors";
import { editProfile } from "../Redux/Actions/Tutors";
import { PersonalInfo_Data } from "../Redux/Actions/types";

import { useEffect } from "react";

const PersonalInfo = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showemail, setShowEmail] = React.useState("Year of Birth");
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  console.log(
    SINGLE_USER,
    "SINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USER"
  );

  console.log(GET_USER_ID, "Pika");
  const [pickerServices, setPickerServices] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [Age, setAge] = useState(0);
  const [userDetail, setUserDetail] = useState([]);
  const [loader, setLoader] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log("dddddddddddddddd");
    const currentDate = selectedDate || date;
    console.log("d..........>>>>>>");

    setShow(Platform.OS === "ios");
    setDate(currentDate);
    //  setDataShow()

    console.log("LLLLLLLLLLLLLLLL", moment(currentDate).format("YYYY"));
    console.log("LLLLLLLLLLLLLLLL", moment(date).format("YYYY"));
    //   console.log('PPPPPPPPPPPPPP', date)
    var yourage =
      moment(date).format("YYYY") - moment(currentDate).format("YYYY");
    console.log(yourage);
    setAge(yourage);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  console.log("!!!!!!!");
  const [nationality, setNationality] = useState([
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
  ]);
  const [selectnational, setSelectNational] = useState("");
  const [selectflag, setSelectFlag] = useState("");
  const [national, setNational] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [withoutfilter, setWithoutFilter] = useState("");

  const SearchFilterFunction = (text) => {
    const searchWord = text;
    const newFilter = nationality.filter((value) => {
      const itemData = value.country
        ? value.country.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    console.log("search word================>", searchWord, newFilter);
    setWithoutFilter(searchWord);
    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const [markGender, setMarkGender] = useState("");
  const [increateTime, setincreseTime] = useState(new Date());

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
    setAge(userDetail[0]?.Extra_info[0]?.age);
    setMarkGender(userDetail[0]?.Extra_info[0]?.gender);
    setNational(userDetail[0]?.Extra_info[0]?.nationality);
  }, [SINGLE_USER, setAge]);

  // useEffect(() => {
  //   console.log(userDetail[0]?.Extra_info[0]?.age, "WWWWWWWWWWWWWWWWWW");
  //   setAge(userDetail[0]?.Extra_info[0] && userDetail[0]?.Extra_info[0]?.age);
  //   setMarkGender(userDetail[0]?.Extra_info[0]?.gender);
  //   setNational(userDetail[0]?.Extra_info[0]?.nationality);
  // }, []);

  var date1 = moment(new Date()).format("MM-YYYY");
  var date2 = moment(date).format("YYYY");

  // console.log(Age, "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  var Difference_In_Time = date1 - date2;
  //console.log('datesssssssssss', date2);
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // console.log('Difference_In_Days', Difference_In_Days)
  //var valueDayas = Math.trunc(Difference_In_Days)
  // console.log('valueDayas', valueDayas)
  //   console.log("Total number of days between dates  <br>"
  //            + date1 + "<br> and <br>"
  //            + date2 + " is: <br> "
  //            + Difference_In_Days);

  const personalinfofun = () => {
    console.log(Age, markGender, selectnational, "????????????????");
    let obj = {
      Age: Age,
      markGender: markGender,
      selectnational: selectnational,
    };

    dispatch({
      type: PersonalInfo_Data,
      payload: obj,
    });

    // dispatch(editProfile(Age, markGender,selectnational, GET_USER_ID));

    navigation.navigate("YourProfle", {
      Age: Age,
      markGender: markGender,
      selectnational: selectnational,
      GET_USER_ID: GET_USER_ID,
    });
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
          <Image source={require("../Assets/bell.png")} style={styles.icons} />

          <Image
            source={require("../Assets/search.png")}
            style={styles.icons}
          />
          <Image source={require("../Assets/chat.png")} style={styles.icons} />
        </View>
      </View>

      <View style={styles.moblieSec}>
        <TouchableOpacity
          style={[
            styles.mobiletoch,
            {
              backgroundColor:
                showemail == "Year of Birth" ? "#2F5597" : "lightgrey",
            },
          ]}
          onPress={() => setShowEmail("Year of Birth")}
        >
          <Text
            style={[
              styles.ButtonText,
              { color: showemail == "Year of Birth" ? "#fff" : "#000" },
            ]}
          >
            Year of Birth
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.emailtoch,
            {
              backgroundColor: showemail == "Gender" ? "#2F5597" : "lightgrey",
            },
          ]}
          onPress={() => setShowEmail("Gender")}
        >
          <Text
            style={[
              styles.ButtonText,
              { color: showemail == "Gender" ? "#fff" : "#000" },
            ]}
          >
            Gender
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nationaltoch,
            {
              backgroundColor:
                showemail == "Nationality" ? "#2F5597" : "lightgrey",
            },
          ]}
          onPress={() => {
            setShowEmail("Nationality");
            // setPickerServices(true);
          }}
        >
          <Text
            style={[
              styles.ButtonText,
              { color: showemail == "Nationality" ? "#fff" : "#000" },
            ]}
          >
            Nationality
          </Text>
        </TouchableOpacity>
      </View>

      {showemail == "Year of Birth" && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            {console.log(
              moment(new Date()).format("YYYY"),
              moment(date).format("YYYY")
            )}

            <TouchableOpacity
              onPress={() => showDatepicker()}
              style={{
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: "lightgrey",
                height: hp(5),
                width: wp(80),
                marginTop: hp(2),
                marginLeft: wp(5),
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingLeft: wp(3) }}>
                {moment(date).format("YYYY")}
              </Text>

              <View
                style={{
                  height: hp(5),
                  width: wp(13),
                  backgroundColor: "#2F5597",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../Assets/CalendarWhite.png")}
                  style={{ height: hp(4), width: wp(6) }}
                />
              </View>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}

            <View
              style={{
                marginTop: hp(10),
                marginLeft: wp(5),
                marginLeft: wp(15),
              }}
            >
              <Text style={{ fontSize: 15, color: "#000" }}>
                Your Age {Age}
              </Text>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  elevation: 1,
                  marginTop: hp(1),
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: "lightgrey",
                  height: hp(6),
                  width: wp(35),
                  flexDirection: "row",
                }}
              >
                {/* <TextInput 
                          placeholder='2'
                          placeholderTextColor={'#000'}
                          style={{fontSize:13,color:'#000', paddingLeft:wp(4)}}
                         /> */}
                {console.log("yourage", Age)}
                <TextInput
                  style={{
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "800",
                    marginLeft: wp(3),
                  }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder={"Enter age"}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  value={Age}
                  // onChangeText={(text) => setAge(text)}
                />
                {/* <Text
                  style={{ fontSize: 15, color: "#000", paddingLeft: wp(4) }}
                >
                  {Age}
                </Text> */}
                <View
                  style={{
                    height: hp(5),
                    width: wp(13),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../Assets/assests.png")}
                    style={{ height: hp(4), width: wp(6) }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.circleArrow}>
              <Image source={require("../Assets/circleArrow.png")} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showemail == "Gender" && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <Text style={{ fontSize: 20, padding: 10, color: "black" }}>
              {markGender}
            </Text>
            <TouchableOpacity onPress={() => setMarkGender("Male")}>
              <View
                style={{
                  backgroundColor: "white",
                  height: hp(8),
                  width: wp(16),
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: hp(10),
                  marginLeft: wp(15),
                }}
              >
                <Image
                  source={require("../Assets/Male.png")}
                  style={{ height: hp(5), width: wp(10) }}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "grey",
                  alignItems: "center",
                  backgroundColor: markGender == "Male" ? "#2F5597" : "#fff",
                  height: hp(4),
                  width: wp(15),
                  marginLeft: wp(3),
                  marginTop: hp(3),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: markGender == "Male" ? "#fff" : "grey",
                  }}
                >
                  Male
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMarkGender("Female")}>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "grey",
                    alignItems: "center",
                    backgroundColor:
                      markGender == "Female" ? "#2F5597" : "#fff",
                    height: hp(4),
                    marginRight: wp(3),
                    width: wp(19),
                    marginLeft: wp(3),
                    marginTop: hp(3),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: markGender == "Female" ? "#fff" : "grey",
                      fontSize: 16,
                    }}
                  >
                    Female
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    height: hp(8),
                    marginRight: wp(20),
                    width: wp(16),
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: hp(3),
                    marginLeft: wp(15),
                  }}
                >
                  <Image
                    source={require("../Assets/Female.png")}
                    style={{ height: hp(5), width: wp(10) }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.circleArrow}>
              <Image source={require("../Assets/circleArrow.png")} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showemail == "Nationality" && (
        <>
          <View style={{ flex: 0.9 }}>
            <TouchableOpacity
              onPress={() => setPickerServices(true)}
              style={{
                height: hp(6),
                borderWidth: 1,
                borderColor: "lightgrey",
                marginLeft: wp(5),
                alignItems: "center",
                justifyContent: "space-between",
                width: wp(90),
                flexDirection: "row",
                backgroundColor: "#fff",
                marginTop: hp(2),
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={selectflag}
                  style={{ height: hp(3), width: wp(6), marginLeft: wp(5) }}
                />
                <Text
                  style={{ color: "#000", fontSize: 13, marginLeft: wp(4) }}
                >
                  {national}
                  {/* {selectnational} */}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "lightblue",
                  height: hp(6),
                  width: wp(15),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../Assets/Pencil.png")}
                  style={{ height: hp(3), width: wp(5) }}
                />
              </View>
            </TouchableOpacity>
          </View>
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
                    <Image
                      source={require("../Assets/right.png")}
                      style={styles.tickImage}
                    />
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "grey", fontSize: 18 }}>
                    Select Nationality
                  </Text>
                </View>
                <View style={{ marginLeft: wp(5), marginTop: hp(2) }}>
                  <Text
                    style={{ color: "#000", fontSize: 18, fontWeight: "800" }}
                  >
                    Select One Option
                  </Text>

                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      paddingHorizontal: wp(4),
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: hp(6),
                      width: wp(90),
                      borderRadius: 9,
                      marginTop: hp(2),
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../Assets/flag.png")}
                        style={{ height: hp(2.5), width: wp(6) }}
                      />

                      <TextInput
                        style={{
                          color: "#000",
                          fontSize: 14,
                          fontWeight: "800",
                          marginLeft: wp(3),
                        }}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder={"Enter the country"}
                        keyboardType="default"
                        returnKeyType="done"
                        autoCapitalize="none"
                        value={filterData}
                        onChangeText={(text) => SearchFilterFunction(text)}
                      />
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={require("../Assets/search.png")}
                        style={{ height: hp(3), width: wp(6) }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {filterData.length > 0 ? (
                  <View style={{ paddingBottom: hp(7) }}>
                    <FlatList
                      data={filterData}
                      numColumns={1}
                      keyExtractor={(item, index) => index}
                      showsVerticalScrollIndicator={true}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectNational(item.country);
                            setSelectFlag(item.countryFlag);
                            setNational(item.country);
                            setPickerServices(false);
                          }}
                          style={{
                            height: hp(4.5),
                            alignItems: "center",
                            width: wp(90),
                            flexDirection: "row",
                            backgroundColor:
                              selectnational == item.country
                                ? "#2F5597"
                                : "#fff",
                            marginTop: hp(2),
                          }}
                        >
                          <Image
                            source={item.countryFlag}
                            style={{
                              height: hp(3),
                              width: wp(6),
                              marginLeft: wp(5),
                            }}
                          />
                          <Text
                            style={{
                              color:
                                selectnational == item.country
                                  ? "#fff"
                                  : "#000",
                              fontSize: 13,
                              marginLeft: wp(4),
                            }}
                          >
                            {item.country}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                ) : withoutfilter != filterData ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ fontSize: 16 }}> No data found</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </Modal>
          <View
            style={{
              flex: 0.1,
              justifyContent: "flex-end",
              marginBottom: hp(2),
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "flex-start",
                paddingLeft: wp(4),
                paddingBottom: hp(2),
              }}
            >
              <Image source={require("../Assets/circleArrow.png")} />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => personalinfofun()}
                //onPress={() => personalinfofun()}
                // onPress={() => navigation.navigate('YourProfle', {
                //     complete: 'complete'
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
                <Text style={{ color: "#fff", fontSize: 14 }}>Save info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {/* </View> */}
      {/* <TouchableOpacity style={styles.circleArrow}>
                    <Image source={require('../Assets/circleArrow.png')} />
                 </TouchableOpacity>
               */}
    </View>
  );
};

export default PersonalInfo;

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
    marginTop: 30,
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
    // backgroundColor:"red",
    alignItems: "center",
  },
  HeadRight: {
    width: wp(45),
    height: hp(10),
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
    // borderColor:"red",
  },
  mobiletoch: {
    backgroundColor: "#2F5597",
    width: wp(28),
    height: hp(6),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(28),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
  },
  nationaltoch: {
    backgroundColor: "lightgray",
    width: wp(28),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
  },
  circleArrow: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(4.5),
    paddingBottom: hp(4),
  },
  modalWrapper2: {
    flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalWrapp: {
    height: hp(45),
    width: wp(100),
    backgroundColor: "#fff",
  },
  crossWRapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  crossImageWrapper: {
    backgroundColor: "red",
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  crossImage: {
    height: hp(4),
    width: wp(8),
  },
  tickWrapper: {
    backgroundColor: "green",
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: {
    height: hp(2),
    width: wp(7),
  },
});
