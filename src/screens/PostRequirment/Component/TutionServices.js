import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Button,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { TextInput } from "react-native-gesture-handler";
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
//import { GetResultAfterPostcode } from "../Redux/Actions/TutorSearchAction";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../common/Loader";
import { Tution_Type, Postal_Code_Address } from "../../../Redux/Actions/types";
import axios from "axios";

const TuitionServices = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [homeTutor, setHomeTutor] = useState(false);
  const [postalcode, setpostalcode] = useState("");
  const [forwardArrrow, setForwardArrow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const geocodinApi = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${postalcode}&key=AIzaSyBe7R2rEvrkKUsLEoiCkLyFr4kd_sQE0Kw`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const jsonData = response.data;
        // console.log(jsonData, "OOOOOOOOOOOOOOOOOOO");
        const jj = jsonData.results[0];

        setLat(jj?.geometry?.location?.lat);
        setLong(jj?.geometry?.location?.lng);

        getAddress(jj?.geometry?.location?.lat, jj?.geometry?.location?.lng);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAddress = (lat, long) => {
    console.log("WERTYUI");
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=` +
        lat +
        `,` +
        long +
        `&sensor=true"&key=AIzaSyBe7R2rEvrkKUsLEoiCkLyFr4kd_sQE0Kw`,
      headers: {},
    };

    axios
      .request(config1)
      .then((response) => {
        const jsonData = response.data;
        // console.log(jsonData, "OOOOOOOOOOOOOOOOOOO");
        const jj = jsonData.results[0];

        setAddress(jj?.formatted_address);

        dispatch({
          type: Postal_Code_Address,
          payload: jj?.formatted_address,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const presspostalcode = () => {
    if (postalcode == "") {
      Alert.alert("Enter postal code");
    } else {
      setLoader(true);

      let obj = {
        Postal_Code: postalcode,
        TutionType: "Home Tuition",
      };

      dispatch({
        type: Tution_Type,
        payload: obj,
      });

      navigation.navigate("StudentBooking", {
        postalcode: postalcode,
      });
      // navigation.navigate("StudentDetail", {
      //   postalcode: postalcode,
      // });
      //   dispatch(GetResultAfterPostcode(postalcode, navigation))
      //     .then((res) => setLoader(false))
      //     .finally(() => setLoader(false));
    }
  };
  const forwardArrowFunc = () => {
    setLoader(true);
    geocodinApi();

    setForwardArrow(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Loader flag={loader} />
      <View style={styles.blueContiner}>
        <Text style={{ color: "#fff", fontSize: 20, padding: 10 }}>
          Select Tuition Service
        </Text>
      </View>
      <View style={styles.blueContiner1}>
        <TouchableOpacity
          onPress={() => setHomeTutor(true)}
          style={[styles.whitebox, { elevation: 5 }]}
        >
          <View style={styles.bicons}>
            <Image source={require("../../../Assets/hometutIcon.png")} />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: 13,
              paddingTop: 10,
              color: "#000",
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
          >
            {homeTutor === true && (
              <View
                style={{
                  alignSelf: "center",
                  height: 10,
                  width: 10,
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "#000",
                  marginTop: hp(0.5),
                }}
              ></View>
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.whitebox, { elevation: 5 }]}>
          <View style={styles.bicons}>
            <Image source={require("../../../Assets/onlinetutIcon.png")} />
          </View>

          <Text
            style={{
              textAlign: "center",
              fontWeight: "800",
              color: "#000",
              fontSize: 13,
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
        <View style={[styles.whitebox, { elevation: 5 }]}>
          <View style={styles.bicons}>
            <Image source={require("../../../Assets/helptutIcon.png")} />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: 13,
              paddingTop: 10,
              color: "#000",
              paddingBottom: 10,
            }}
          >
            Homework{"\n"}Help
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

      <View style={{}}>
        {homeTutor === true && (
          <View style={styles.tutorWrapper}>
            <Text style={styles.tutorText}>Tuition Location Postal Code</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                //placeholder='510208'
                placeholderTextColor={"#000"}
                onChangeText={(text) => {
                  setpostalcode(text);
                }}
                value={postalcode}
                keyboardType="phone-pad"
                style={{ color: "#000", paddingLeft: wp(2), width: wp(28) }}
              />
              <TouchableOpacity onPress={() => forwardArrowFunc()}>
                <Image
                  source={require("../../../Assets/rightArrowCode.png")}
                  style={styles.forwardArrowImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {forwardArrrow === true && (
          <View style={styles.forwardArrowWrapper}>
            <Text style={styles.forwardArrowTextWrapper}>{address}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.circleArrow, { display: !address ? "none" : "flex" }]}
        onPress={() => presspostalcode()}
      >
        {/* //onPress={() => navigation.navigate('OurTutor')}> */}
        {homeTutor === true && (
          <Image source={require("../../../Assets/circleArrow.png")} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TuitionServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // backgroundColor: 'pink',
    // padding: 10,
  },
  whitebox: {
    height: hp(20),
    width: wp(30),
    borderRadius: 20,
    backgroundColor: "#fff",
    //backgroundColor: 'red',
    top: 20,
    marginRight: 10,
    zIndex: 99999,
  },

  LittlemoreContainer: {
    height: hp(15),
    width: wp(100),
    //backgroundColor: 'red',
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
    // height:hp(30),
    // flexDirection: "row",
    // backgroundColor:'red',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  blueContiner1: {
    //   backgroundColor: "#2F5597",

    flexDirection: "row",
    justifyContent: "center",
    marginTop: -hp(8),
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
    alignItems: "center",
    paddingTop: 5,
    elevation: 5,
    // padding:10
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
  circleArrow: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(3.5),
    paddingBottom: hp(2),
  },
  forwardArrowWrapper: {
    borderWidth: 0.2,
    borderColor: "#000",
    width: wp(50),
    alignSelf: "center",
    justifyContent: "center",
    height: hp(5),
    marginTop: hp(2),
  },
  forwardArrowTextWrapper: {
    color: "#000",
    fontSize: 10,
    textAlign: "center",

    marginTop: -hp(2),
  },
  forwardArrowImage: { height: hp(2), width: wp(4), marginLeft: wp(2) },
  inputWrapper: {
    backgroundColor: "#fff",
    height: hp(5),
    width: wp(38),
    elevation: 6,
    marginTop: hp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  tutorWrapper: {
    marginTop: hp(7),
    justifyContent: "center",
    alignItems: "center",
  },
  tutorText: { fontSize: 11, color: "#000" },
});
