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

const DrawerThird = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View>
          <Image
            source={require("../Assets/try-it.png")}
            style={{ marginLeft: 10, marginTop: 10 }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 80, marginTop: 20 }}>
          <Image
            source={require("../Assets/rateAppIcon.png")}
            style={{ width: 35 }}
          />

          <Image
            source={require("../Assets/shareIcon.png")}
            style={{ width: 40 }}
          />
        </View>
      </View>
      <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Image
            source={require("../Assets/Welcome.png")}
            style={styles.icons}
          />
          <Text style={styles.MenuHead}>Welcome</Text>
        </View>
        <View style={[styles.menusublist, { flexDirection: 'row' }]}>
          <View>
            <View style={styles.verticleLine}></View>

          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.subText}>Message from Director</Text>
            <Text style={styles.subText}>About</Text>
            <Text style={styles.subText}>Our Services</Text>
            <Text style={styles.subText}>Our Tutors</Text>
            <Text style={styles.subText}>Promotions</Text>
          </View>
        </View>

      </View>

      <View style={styles.MenuLIstContainer}>
        <TouchableOpacity style={styles.MenuLIst} onPress={() => navigation.navigate("Login")}>

          <Image source={require("../Assets/Login.png")} style={styles.icons} />
          <Text style={styles.MenuHead}>Login</Text>
        </TouchableOpacity>
        <View style={styles.menusublist}>
          {/* <Text style={styles.subText}>My Profile</Text>
                    <Text style={styles.subText}>My Account</Text>
                    <Text style={styles.subText}>My Activities</Text>
                    <Text style={styles.subText}>Favourites</Text>
                    <Text style={styles.subText}>Make Payment</Text> */}
        </View>
      </View>

      <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Image source={require("../Assets/Help.png")} style={styles.icons} />
          <Text style={styles.MenuHead}>Help & Support</Text>
        </View>
      </View>

      <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Image source={require("../Assets/Terms.png")} style={styles.icons} />
          <Text style={styles.MenuHead}>Terms & Conditions</Text>
        </View>
      </View>
      <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Image
            source={require("../Assets/Privacy.png")}
            style={styles.icons}
          />
          <Text style={styles.MenuHead}>Privacy Policy</Text>
        </View>
      </View>
      {/* <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Image
            source={require("../Assets/Health.png")}
            style={styles.icons}
          />
          <Text style={styles.MenuHead}>Health Advisory</Text>
        </View>
      </View> */}
      <View style={styles.SocialMainContainer}>
        <View style={styles.SocialContainer}>
          <Image source={require("../Assets/Fb.png")} style={styles.icons} />
        </View>
        <View style={styles.SocialContainer}>
          <Image source={require("../Assets/Insta.png")} style={styles.icons} />
        </View>
        <View style={styles.SocialContainer}>
          <Image
            source={require("../Assets/Twitter.png")}
            style={[styles.icons,{height:35,width:30}]}
          />
         
        </View>
        <View style={styles.SocialContainer}>
          <Image
            source={require("../Assets/LinkedIn.png")}
            style={styles.icons}
          />
        </View>
        <View style={[styles.SocialContainer,{backgroundColor:'#fff',borderRadius:3,height:24,width:'9%'}]}>
            <Image
              source={require("../Assets/15_2.png")}
              style={[styles.icons,{height:20,width:20}]}
              />
          </View>
          <View style={[styles.SocialContainer,{backgroundColor:'#fff',borderRadius:3,height:24,width:'9%',marginLeft:5}]}>
            <Image
              source={require("../Assets/15_3.png")}
              style={[styles.icons,{height:22,width:20}]}
            />
          </View>
      </View>
      <View style={styles.MenuLIstContainer}>
        <View style={styles.MenuLIst}>
          <Text style={styles.LastText}>The Proof is in the pudding</Text>
        </View>
      </View>
    </View>
  );
};

export default DrawerThird;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // padding: 10,
  },
  head: {
    height: hp(10),
    // backgroundColor: "red"
    flexDirection: 'row'
  },
  subText: {
    color: "#fff",
  },
  logoicons: {
    height: 80,
    width: 80,
  },
  icons: {
    height: 25,
    width: 25,
  },
  MenuLIstContainer: {
    padding: 10,
    marginTop: 10,
  },
  LastText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: 'Poppins-Italic',
    marginLeft: 20
  },
  MenuLIst: {
    flexDirection: "row",
    // padding: 10,
    // marginTop: 20
  },
  menusublist: {
    marginLeft: 50,
  },
  MenuHead: {
    padding: 5,
    fontSize: 16,
    color: "yellow",
  },
  SocialMainContainer: {
    height: 40,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  SocialContainer: {
    height: 30,
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  verticleLine: {
    height: 100,
    width: 2,
    backgroundColor: 'yellow',
  },
});
