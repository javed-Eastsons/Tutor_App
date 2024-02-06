import React, { useState,useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Login_Data } from "../Redux/Actions/types";
import { GetUserProfile } from "../Redux/Actions/Tutors";

const Drawer = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const { Login_Data } = useSelector((state) => state.TutorReducer);

  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    navigation.navigate("Auth4");
    setIsEnabled(false);
  };
  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);
  console.log(SINGLE_USER,'jkk')
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={require("../Assets/try-it.png")}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
          </View>

          <View style={{ flexDirection: "row", marginLeft: 80, marginTop: 20 }}>
            <Image
              source={require("../Assets/rateAppIcon.png")}
              style={{ width: 35 }}
            />

            <Image
              source={require("../Assets/qrIcon.png")}
              style={{ width: 30,marginTop:5 }}
            />
            <Image
              source={require("../Assets/shareIcon.png")}
              style={{ width: 40,marginTop:6 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 50 }}>
          <Text style={{ fontFamily: "Poppins-Light" ,color:'#fff',marginTop:3}}>
            {console.log(isEnabled)}I want to be an Educator
          </Text>
          <TouchableOpacity
          //onPress={() => navigation.navigate('TutorLanding')}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.MenuLIstContainer}>
          <View style={styles.MenuLIst}>
            <Image
              source={require("../Assets/Welcome.png")}
              style={styles.icons}
            />
            <Text style={[styles.MenuHead, { marginLeft: 10 }]}>Welcome</Text>
          </View>
          <View style={[styles.menusublist, { flexDirection: "row" }]}>
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
          <View style={styles.MenuLIst}>
            <Image
              source={require("../Assets/dashIcon.png")}
              style={{ width: 30, marginTop: 5 }}
            />
            <Text style={[styles.MenuHead, { marginLeft: 10 }]}>
              {SINGLE_USER[0]?.first_name}'s Dashboard
            </Text>
          </View>
          <View style={[styles.menusublist, { flexDirection: "row" }]}>
            <View>
              <View style={styles.verticleLine}></View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.subText}>My Profile</Text>
              <Text style={styles.subText}>My Account</Text>
              <Text style={styles.subText}>My Booking</Text>
              <Text style={styles.subText}>My Posts</Text>
              <Text style={styles.subText}>My Faves</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            let obj = "";
            dispatch({
              type: Login_Data,
              payload: obj,
            });
            navigation.replace("home");
          }}
          style={styles.MenuLIstContainer}
        >
          <View style={styles.MenuLIst}>
            <Image
              source={require("../Assets/logoutIcon.png")}
              style={[styles.icons, { backgroundColor: "#fff", marginTop: 5 }]}
            />
            <Text style={styles.MenuHead}>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HelpSupport");
          }}
        >
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image
                source={require("../Assets/Help.png")}
                style={styles.icons}
              />
              <Text style={styles.MenuHead}>Help & Support</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {
          navigation.navigate("Faq");
        }}>
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image source={require("../Assets/bell.png")} style={styles.icons} />
              <Text style={styles.MenuHead}>FAQ</Text>
            </View>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TermsConditions");
          }}
        >
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image
                source={require("../Assets/helpSideMenu.png")}
                style={[styles.icons,{marginTop:4}]}
              />
              <Text style={styles.MenuHead}>Terms & Conditions</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}
        >
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image
                source={require("../Assets/Privacy.png")}
                style={styles.icons}
              />
              <Text style={styles.MenuHead}>Privacy Policy</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.SocialMainContainer}>
          <View style={styles.SocialContainer}>
            <Image source={require("../Assets/Fb.png")} style={styles.icons} />
          </View>
          <View style={styles.SocialContainer}>
            <Image
              source={require("../Assets/Insta.png")}
              style={styles.icons}
            />
          </View>
          <View style={styles.SocialContainer}>
          {/* <View style={{backgroundColor:'#fff'}}> */}
          <Image
            source={require("../Assets/Twitter.png")}
            style={[styles.icons,{height:35,width:30}]}
          />
          {/* </View> */}
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
    </ScrollView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // padding: 10,
  },
  head: {
    height: hp(10),
    // backgroundColor: "red"
  },
  subText: {
    color: "#fff",
    fontFamily: "Poppins-Light",
  },

  icons: {
    height: 25,
    width: 25,
  },
  MenuLIstContainer: {
    padding: 10,
  },
  LastText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins-Italic",
    marginLeft: 10,
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
    fontFamily: "Poppins-SemiBold",
  },
  SocialMainContainer: {
    height: 40,
    width: "100%",
    // marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  SocialContainer: {
    height: 30,
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  
  verticleLine: {
    height: 115,
    width: 2,
    backgroundColor: "yellow",
  },
});
