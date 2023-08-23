import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";

import VideoPlayer from "react-native-video-player";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { Login_Data } from "../Redux/Actions/types";
import { useDispatch, useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const gotoSignInScreen = async () => {
    let token = await AsyncStorage.getItem("token");
    let userType = await AsyncStorage.getItem("user_type");
    let userID = await AsyncStorage.getItem("user_id");
    setTimeout(function async() {
      console.log(token, "SplashScreen", userType, "USerType", userID);
      if (token && userType == "I am an Educator") {
        let obj = {
          userid: userID,
          userType: userType,
        };

        console.log(obj, "AAAAAAAAAAAAAAaa");
        dispatch({
          type: Login_Data,
          payload: obj,
        });
        navigation.replace("Auth4");
      } else if (token && userType == "I am looking for a Tutor") {
        let obj = {
          userid: userID,
          userType: userType,
        };
        console.log(obj, "BBBBBBBBBBBBBB");
        dispatch({
          type: Login_Data,
          payload: obj,
        });
        navigation.replace("Auth");
        // navigation.replace("Auth2");
      } else {
        //  navigation.replace("YourProfle");
        navigation.replace("IntroScreen");
      }
    }, 3000);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    gotoSignInScreen();
  }, [navigation]);

  let item = {
    key: 1,
    title: "Great first step!",
    text: "Enhance the simplest way to engage a \n  tutor or secure tution assignments \n.........just with a few clicks.Try it",
    image: require("../Assets/slider1.jpg"),
    logo: require("../Assets/logogrey.png"),
    skip: "Skip Introduction",
    backgroundColor: "#F7F8FD",
    VVideo: require("../Assets/first.mp4"),
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        //  alignItems: 'center',
        //paddingTop: hp(10)
      }}
    >
      <VideoPlayer
        video={item.VVideo}
        showDuration={false}
        disableControlsAutoHide={true}
        disableSeek={true}
        style={styles.equipvideo}
        hideControlsOnStart
        loop
        resizeMode="cover"
        //videoHeight={1500}
        //videoWidth={1500}
        autoplay
      />
      <View
        style={{
          backgroundColor: item.backgroundColor,
          height: hp(2),
          bottom: 5,
          height: 100,
        }}
      ></View>

      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          // paddingTop: hp(20),

          // justifyContent: 'space-around',
          //paddingBottom: 200,
        }}
      >
        <View style={{ bottom: 150, alignSelf: "center" }}>
          <Image
            style={[
              styles.intrologoStyle,
              { width: 100, height: 100, borderWidth: 3, alignSelf: "center" },
            ]}
            source={item.logo}
          />
        </View>
        <ActivityIndicator animating={true} size="small" />
      </View>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleStyle: {
    paddingLeft: 20,
    marginTop: 50,
    // fontFamily: 'SharpSansDispNo1-Semibold',
    // fontWeight:'600',
    textAlign: "left",
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
  },
  paragraphStyle: {
    height: hp(10),
    paddingLeft: 20,
    lineHeight: 16,
    paddingTop: 24,
    fontSize: 12,
    color: "#000000",
    // fontFamily: 'SharpSansDispNo1-Book',
    fontWeight: "600",
  },

  introImageStyle: {
    //  width: wp(90),
    height: hp(25),
    resizeMode: "contain",
    marginBottom: 40,
  },

  intrologoStyle: {
    height: hp(20),
    resizeMode: "contain",
    marginBottom: 40,

    //  backgroundColor: 'lightgrey',
    borderRadius: wp(50),
  },

  equipvideo: {
    backgroundColor: "#F7F8FD",
    //  backgroundColor: 'red',
    //zIndex: -999,
    //  marginTop: hp(5),
    height: hp(45),
    width: wp(100),
    alignSelf: "center",
    //  justifyContent: "center"
  },
  introTextStyle: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    lineHeight: 21,
    // fontFamily: 'SharpSansDispNo1-Book',
    paddingVertical: 10,
  },
  introTitleStyle: {
    fontSize: 20,
    color: "#2F5597",
    fontWeight: "700",
    fontFamily: "Sharp Sans Medium",
    textAlign: "center",
    //  backgroundColor: "red"
  },
  skipTextStyle: {
    fontSize: 14,
    color: "#2F5597",
    fontWeight: "700",
    textAlign: "right",
    lineHeight: 21,
    // backgroundColor: "red",
    //  width: wp(90),
    //  alignSelf: "flex-end",
    // fontFamily: 'SharpSansDispNo1-Book',
    paddingVertical: 10,
  },
});
