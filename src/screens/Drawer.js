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
  Switch
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

const Drawer = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    navigation.navigate("Auth4");
    setIsEnabled(false);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
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
              source={require("../Assets/qrIcon.png")}
              style={{ width: 30 }}
            />
            <Image
              source={require("../Assets/shareIcon.png")}
              style={{ width: 40 }}
            />
          </View>

        </View>
        <View style={{flexDirection:'row',marginTop:20,marginLeft:50}}>
          <Text style={{ fontFamily: "Poppins-Light" }}>
            {console.log(isEnabled)}I want to be an Educator..
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
          <View style={[styles.menusublist, { flexDirection: 'row' }]}>
            <View>
              <View style={styles.verticleLine}></View>

            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.subText}>Message from our director</Text>
              <Text style={styles.subText}>About</Text>
              <Text style={styles.subText}>Our Services</Text>
              <Text style={styles.subText}>Our Tutors</Text>
              <Text style={styles.subText}>Promotions</Text>
            </View>
          </View>
        </View>

        <View style={styles.MenuLIstContainer}>
          <View style={styles.MenuLIst}>
            <Image source={require("../Assets/dashIcon.png")} style={{ width: 30, marginTop: 5 }} />
            <Text style={[styles.MenuHead, { marginLeft: 10 }]}>Angel's Dashboard</Text>
          </View>
          <View style={[styles.menusublist, { flexDirection: 'row' }]}>
            <View>
              <View style={styles.verticleLine}></View>

            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.subText}>My Profile</Text>
              <Text style={styles.subText}>My Account</Text>
              <Text style={styles.subText}>My Activities</Text>
              <Text style={styles.subText}>Favourites</Text>
              <Text style={styles.subText}>Make Payment</Text>
            </View>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            navigation.replace("home");
          }}
          style={styles.MenuLIstContainer}
        >
          <View style={styles.MenuLIst}>
            <Image
              source={require("../Assets/logoutIcon.png")}
              style={[styles.icons, { backgroundColor: '#fff', marginTop: 5 }]}
            />
            <Text style={styles.MenuHead}>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("HelpSupport");
        }}>
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image source={require("../Assets/Help.png")} style={styles.icons} />
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
        <TouchableOpacity onPress={() => {
          navigation.navigate("TermsConditions");
        }}>
          <View style={styles.MenuLIstContainer}>
            <View style={styles.MenuLIst}>
              <Image
                source={require("../Assets/Health.png")}
                style={styles.icons}
              />
              <Text style={styles.MenuHead}>Terms & Conditions</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("PrivacyPolicy");
        }}>
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
            <Image source={require("../Assets/Insta.png")} style={styles.icons} />
          </View>
          <View style={styles.SocialContainer}>
            <Image
              source={require("../Assets/Twitter.png")}
              style={styles.icons}
            />
          </View>
          <View style={styles.SocialContainer}>
            <Image
              source={require("../Assets/LinkedIn.png")}
              style={styles.icons}
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
    fontFamily: 'Poppins-Light'
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
    fontFamily: 'Poppins-Italic',
    marginLeft: 10
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
    fontFamily: 'Poppins-SemiBold'
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
    height: 115,
    width: 2,
    backgroundColor: 'yellow',
  },

});
