import React, { useState } from "react";

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
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";

const TutorLanding = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const cardsData = [
    {
      name: "My Bookings",
      src: require("../Assets/Booking.png"),
      Url: "MyBookingTutor",
    },
    {
      name: "My Posts",
      src: require("../Assets/newPostIcon.png"),
      Url: "",
    },
    {
      name: "Upcomings",
      src: require("../Assets/Upcoming.png"),
      Url: "",
    },
    {
      name: "My Faves",
      src: require("../Assets/newFavIcon.png"),
      Url: "MyFav",
    },
    {
      name: "Payments",
      src: require("../Assets/PayN.png"),
      Url: "",
    },
  ];
  const toggleSwitch = () => {
    MoveToClient();

    setIsEnabled((previousState) => !previousState);
  };

  const MoveToClient = () => {
    console.log(isEnabled, "LLLLLLLLLLLLLLLLLLLL");
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

      <ScrollView>
        <View style={styles.usercontainer}>
          <View style={styles.UserLeft}>
            <Image
              source={require("../Assets/mailuser.png")}
              style={styles.usericons}
            />
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../Assets/start.png")}
                style={styles.sicons}
              />
              <Image
                source={require("../Assets/start.png")}
                style={styles.sicons}
              />
              <Image
                source={require("../Assets/start.png")}
                style={styles.sicons}
              />
              <Image
                source={require("../Assets/start.png")}
                style={styles.sicons}
              />
            </View>
          </View>
          <View style={styles.UserRight}>
            <Text>{console.log(isEnabled)}I want to be a Student</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {/* <TouchableOpacity
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
          <TouchableOpacity style={[styles.cardLeft, styles.shadowPropLeft]}>
            <View style={styles.cardShadowLeft}>
              <Shadow>
                <Image
                  source={require("../Assets/Searching.png")}
                  style={styles.posticons}
                />
              </Shadow>
            </View>

            <Text
              style={{ textAlign: "center", marginTop: 10, marginBottom: 5 }}
            >
              Keep your profile {"\n"}current
            </Text>
            <TouchableOpacity
              //  onPress={() => navigation.navigate('Auth2')}
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
            <View style={styles.cardShadowRight}>
              <Image
                source={require("../Assets/PastedGraphic7.png")}
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
              }}
            >
              Find your students here
            </Text>
            <TouchableOpacity
              // onPress={() => navigation.navigate('Auth2')}
              style={styles.CheckinButton}
            >
              <Text
                style={{ color: "#2F5597", alignSelf: "center", fontSize: 14 }}
              >
                Check in
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
          <ScrollView horizontal={true} contentContainerStyle={{ padding: 10 }}>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}
            >
              <View style={styles.cardShadow}>
                <Image
                  source={require("../Assets/ChatTutors.png")}
                  style={styles.Slidericons}
                />
              </View>
              <Text style={styles.postText}>Chat with Tutors</Text>
              <Text style={styles.sliderText}>
                Chat with tutors and access their suitability.Sharing your
                tutions concerns with potential tutors...
                <TouchableOpacity>
                  <Text style={{ color: "#2F5597" }}>See More</Text>
                </TouchableOpacity>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}
            >
              <View style={styles.cardShadow}>
                <Image
                  source={require("../Assets/OurTutors.png")}
                  style={styles.Slidericons}
                />
              </View>

              <Text style={styles.postText}>Our Tutors</Text>
              <Text style={styles.sliderText}>
                Chat with tutors and access their suitability.Sharing your
                tutions concerns with potential tutors...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}
            >
              <View style={styles.cardShadow}>
                <Image
                  source={require("../Assets/OurService.png")}
                  style={styles.Slidericons}
                />
              </View>

              <Text style={styles.postText}>Our Services</Text>
              <Text style={styles.sliderText}>
                Chat with tutors and access their suitability.Sharing your
                tutions concerns with potential tutors...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}
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
              <Text style={styles.postText}>My Activities</Text>
              <Text style={styles.sliderText}>
                Chat with tutors and access their suitability.Sharing your
                tutions concerns with potential tutors...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardSlider, styles.shadowPropSlider]}
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
              <Text style={styles.sliderText}>
                Chat with tutors and access their suitability.{"\n"}Sharing your
                tutions concerns with {"\n"} potential tutors...
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          style={{ alignSelf: "center" }}
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
    marginBottom: 10,
  },
  SliderContainer: {
    marginTop: 10,
    height: hp(22),
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
  },

  postText: {
    width: "90%",
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    alignSelf: "center",
  },
  sliderText: {
    width: "90%",
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
    marginTop: 15,
    alignItems: "center",
  },
  postContainer: {
    height: hp(20),
    flexDirection: "row",
    width: wp(90),
    marginTop: 20,
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
    justifyContent: "center",
    alignItems: "center",
  },

  HeadRight: {
    width: wp(45),
    height: hp(10),
    marginTop: 15,
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
  },

  shadowProp: {
    shadowOffset: { width: 8, height: 10 },
    shadowColor: "#2F5597",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardShadow: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    // borderWidth: 0.1,
    alignSelf: "center",
    overflow: "hidden",
    padding: 16,
    backgroundColor: "white",
    // backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      // height: 50,
      // width: 50,
      // justifyContent: "center",
      // alignItems: "center",
      // borderRadius: 25,
      // borderWidth: 0.1,
      // alignSelf: "center",
      // overflow: "hidden",
      // padding: 16,
      // backgroundColor: "transparent",
      // // backgroundColor: '#fff',
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5,
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
    shadowOffset: {
      width: 5,
      height: 10,
      width: -5,
      height: -10,
      elevation: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 10,
  },
  cardLeft: {
    backgroundColor: "white",
    justifyContent: "center",
    marginVertical: 0,
    height: hp(18),
    width: wp(40),
    borderRadius: 20,
    alignSelf: "flex-start",
    marginRight: wp(6),
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
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
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
    marginTop: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    // borderWidth: 0.1,
    alignSelf: "center",
    overflow: "hidden",
    padding: 16,
    backgroundColor: "transparent",
    // backgroundColor: '#fff',
  },
  cardShadowRight: {
    marginTop: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 0.1,
    alignSelf: "center",
    overflow: "hidden",
    padding: 16,
    backgroundColor: "transparent",
    // backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5,
  },
  CheckinButton: {
    // backgroundColor: "#2F5597",
    padding: 5,
    width: wp(30),
    // borderRadius: 20,
    alignSelf: "center",
  },
  SearchButton: {
    backgroundColor: "#2F5597",
    padding: 2,
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
