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
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const TutorSearch = () => {
  const navigation = useNavigation();

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

      <View style={styles.LittlemoreContainer}>
        <View style={styles.LittlLeft}>
          <Text style={styles.Text1}>A little more....</Text>
          <Text style={styles.Text2}>This will help us,help you</Text>
        </View>
        <View style={styles.LittlRight}>
          <Image
            source={require("../Assets/logogrey.png")}
            //  resizeMode='contain'
            style={styles.logoicon}
          />
        </View>
      </View>
      <View style={styles.blueContiner}>
        <Text style={{ color: "#fff", fontSize: 20, padding: 10 }}>
          Select Tution Service
        </Text>
        <View style={styles.blueContiner1}>
          <View style={styles.whitebox}>
            <Image
              source={require("../Assets/hometutIcon.png")}
              style={styles.bicons}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "800",
                fontSize: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Home Tution
            </Text>
            <View
              style={{
                alignSelf: "center",
                height: 20,
                width: 20,
                borderRadius: 50,
                borderColor: "#000",
                borderWidth: 1,
              }}
            ></View>
          </View>
          <View style={styles.whitebox}>
            <Image
              source={require("../Assets/onlinetutIcon.png")}
              style={styles.bicons}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "800",
                fontSize: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Online Tution
            </Text>
            <View
              style={{
                alignSelf: "center",
                height: 20,
                width: 20,
                borderRadius: 50,
                borderColor: "#000",
                borderWidth: 1,
              }}
            ></View>
          </View>
          <View style={styles.whitebox}>
            <Image
              source={require("../Assets/helptutIcon.png")}
              style={styles.bicons}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "800",
                fontSize: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Homework Help
            </Text>
            <View
              style={{
                alignSelf: "center",
                height: 20,
                width: 20,
                borderRadius: 50,
                borderColor: "#000",
                borderWidth: 1,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TutorSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 10,
  },
  whitebox: {
    height: hp(20),
    width: wp(30),
    borderRadius: 20,
    backgroundColor: "lightgrey",
    top: 20,
    marginRight: 10,
  },

  LittlemoreContainer: {
    height: hp(15),
    width: wp(100),
    //  backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LittlLeft: {
    height: hp(15),
    width: wp(50),
    justifyContent: "center",

    // backgroundColor: 'red'
  },
  LittlRight: {
    height: hp(15),
    width: wp(40),
    justifyContent: "center",
    //  backgroundColor: "yellow",
    alignItems: "flex-end",
  },
  logoicon: {
    height: 100,
    width: 100,

    borderRadius: 100 / 2,
  },

  Headers: {
    // backgroundColor: "red",
    height: hp(10),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
  },

  Text1: {
    color: "#2F5597",
    fontSize: 24,
    fontWeight: "700",
  },
  blueContiner: {
    backgroundColor: "#2F5597",
    height: hp(15),
    // flexDirection: "row",

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  blueContiner1: {
    //   backgroundColor: "#2F5597",
    //  height: hp(15),
    flexDirection: "row",
    justifyContent: "center",
  },
  Text2: {
    color: "grey",
    fontSize: 16,
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
  bicons: {
    height: 40,
    width: 40,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 20,
  },
  posticons: {
    height: 110,
    width: 110,
    alignSelf: "center",
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
});
