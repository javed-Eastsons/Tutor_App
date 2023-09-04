import React, { useState, useEffect, useRef } from "react";

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
import moment from "moment";
import MapView, { MapContainer, Circle, Marker } from "react-native-maps";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tution_Type } from "../Redux/Actions/types";
import { GetUserProfile } from "../Redux/Actions/Tutors";
import Slider from "@react-native-community/slider";

const HomeTution = () => {
  const circleCenter = { latitude: 37.78825, longitude: -122.4324 };
  const circleRadius = 1000; // in meters
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [FirstName, setFirstName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [mapData, setMapData] = useState();
  mapData?.geometry?.location?.lat;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [userDetail, setUserDetail] = useState([]);
  const dispatch = useDispatch();
  const [slideStartingValue, setSlideStartingValue] = useState(20);
  const [slideStartingCount, setSlideStartingCount] = useState(0);

  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);

  const [state, setstate] = useState({
    coordinate: {
      latitude: mapData ? mapData?.geometry?.location?.lat : 28.621,
      longitude: mapData ? mapData?.geometry?.location?.lng : 77.3812,
      // latitude: 28.58364,
      // longitude: 77.3147,
    },
    marginBottom: 1,
  });
  const personalinfofun = () => {
    console.log(FirstName, "????????????????");
    navigation.navigate("YourProfle");
  };
  console.log(mapData, "mapData");

  // console.log(FirstName, slideStartingValue.toFixed(0), "postalcode");
  const geocodinApi = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${FirstName}&key=AIzaSyBe7R2rEvrkKUsLEoiCkLyFr4kd_sQE0Kw`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const jsonData = response.data;
        // console.log(jsonData, "OOOOOOOOOOOOOOOOOOO");
        const jj = jsonData.results[0];
        //  console.log(jj, "PPPPPPPPPPPPPPPPPP");
        setMapData(jj);
        setLatitude(jj?.geometry?.location?.lat);
        setLongitude(jj?.geometry?.location?.lng);
        getAddress(jj?.geometry?.location?.lat, jj?.geometry?.location?.lng);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(
      mapData?.formatted_address,
      FirstName,
      "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"
    );
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

  if (mapData) {
    // console.log(mapData?.geometry?.location, "latlong");
  }

  useEffect(() => {
    onRegionCHange();
  }, [mapData]);

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
    setFirstName(userDetail[0]?.Extra_info[0]?.postal_code);
    setAddress(userDetail[0]?.Extra_info[0]?.location);
    setLatitude(userDetail[0]?.Extra_info[0]?.lettitude);
    setLongitude(userDetail[0]?.Extra_info[0]?.longitude);
    // setRecords(userDetail[0]?.history_academy_arr);
  }, [SINGLE_USER, setFirstName]);
  console.log(
    typeof slideStartingValue,
    "userDetail[0]?.Extra_info[0]?.travel_distance"
  );

  const onRegionCHange = (reg) => {
    // console.log(reg, "DDDDDDDDDDDDDDDDDDDDDDDDD");
    mapRef?.current?.animateToRegion({
      latitude: mapData ? mapData?.geometry?.location?.lat : 28.621,
      longitude: mapData ? mapData?.geometry?.location?.lng : 77.3812,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    //   setAddress(mapData?.formatted_address);
  };

  const GetPostDetail = () => {
    let obj = {
      Postal_Code: FirstName,
      TutionType: "Home Tuition",
      address: address,
      Distance: slideStartingValue.toFixed(0),
      latitude: latitude,
      longitude: longitude,

      //Distance: slideStartingValue,
    };

    dispatch({
      type: Tution_Type,
      payload: obj,
    });

    console.log(obj, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    navigation.navigate("YourProfle");
  };

  // if(mapData){
  //     console.log(mapData,'Address')

  // }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tutorWrapper}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.tutorText}>Your Postal Code</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                  value={FirstName}
                  //  placeholder="510208"
                  placeholderTextColor={"#000"}
                  keyboardType="phone-pad"
                  style={{ color: "#000", paddingLeft: wp(2), width: wp(28) }}
                />
                <TouchableOpacity
                  onPress={() => geocodinApi()}
                  style={{
                    backgroundColor: "#2F5597",
                    width: wp(8),
                    height: hp(4),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>Go</Text>
                </TouchableOpacity>
              </View>
            </View>
            {address ? (
              <TouchableOpacity
                onPress={() => GetPostDetail()}
                //onPress={() => navigation.navigate("YourProfle")}
                style={styles.tickWrapper}
              >
                <Image
                  source={require("../Assets/right.png")}
                  style={styles.tickImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("YourProfle")}
                style={styles.crossImageWrapper}
              >
                <Image
                  source={require("../Assets/closeingray.png")}
                  style={styles.crossImage}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.forwardArrowWrapper}>
            <Text style={styles.forwardArrowTextWrapper}>
              {/* {mapData?.formatted_address} */}
              {address}
            </Text>
          </View>
        </View>
        <View></View>
        {address != "" ? (
          <View style={{}}>
            <MapView
              defaultZoom={20}
              defaultCenter={30}
              ref={mapRef}
              style={styles.map}
              zoomEnabled={true}
              onRegionChangeComplete={onRegionCHange}
              onMapReady={() => {
                setstate({ marginBottom: 0 });
              }}
              zoomControlEnabled={true}
              showsUserLocation={true}
              showsMyLocationButton={true}
              userInterfaceStyle="dark"
              initialRegion={{
                latitude: mapData ? latitude : 28.621,
                longitude: mapData ? longitude : 77.3812,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              // mapType={'standard'}
            >
              <Circle
                center={{
                  latitude: mapData ? latitude : 28.621,
                  longitude: mapData ? longitude : 77.3812,
                }}
                radius={slideStartingValue.toFixed(0) * 80}
                // radius={slideStartingValue * 80}
                fillColor="rgba(0, 0, 255, 0.1)"
                strokeColor="blue"
                strokeWidth={1}
              />
              <Marker
                coordinate={{
                  latitude: mapData ? latitude : 28.621,
                  longitude: mapData ? longitude : 77.3812,
                }}
                onDragEnd={(e) =>
                  this.setState({ x: e.nativeEvent.coordinate })
                }
              />
            </MapView>

            <Text
              style={{
                width: wp(90),
                textAlign: "center",

                marginLeft: wp(5),
                marginTop: hp(1),
                fontSize: 12,
              }}
            >
              Select the furthest distance you are willing to travel from your
              location for home tuition{" "}
            </Text>
            <Slider
              style={{
                width: wp(90),
                height: 40,
                alignSelf: "center",
                marginTop: 10,
              }}
              onSlidingComplete={
                (value) => setSlideStartingValue(value)
                // setSlideStartingCount((prev) => prev + 1);
              }
              minimumValue={1}
              value={25}
              maximumValue={50}
              minimumTrackTintColor="#000000"
              maximumT
              rackTintColor="#000000"
            />
            <View
              style={{
                width: wp(90),
                textAlign: "center",
                marginLeft: wp(5),
                flexDirection: "row",
                fontSize: 12,
              }}
            >
              <Text style={{ width: wp(30) }}>100m</Text>
              <Text style={{ width: wp(30), textAlign: "center" }}>
                {/* {slideStartingValue.toFixed(0)}km */}
                {slideStartingValue.toFixed(0)}km
              </Text>
              <Text style={{ width: wp(30), textAlign: "right" }}>50km</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View style={{ height: wp(10) }}></View>
      </ScrollView>
      {/* <Text>Starts: Value: {slideStartingValue.toFixed(0)}</Text> */}
    </View>
  );
};

export default HomeTution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    //  backgroundColor: "pink",
    //padding: 10,
  },
  map: {
    height: hp(55),
    width: wp(90),
    marginLeft: wp(5),
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
  crossImage: { height: hp(4), width: wp(8) },
  tickWrapper: {
    backgroundColor: "green",
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: { height: hp(2), width: wp(5) },
  forwardArrowWrapper: {
    //  borderWidth: 0.6,
    borderColor: "#000",
    width: wp(60),
    height: hp(5),
    marginTop: hp(2),
  },
  forwardArrowTextWrapper: { color: "#000", fontSize: 12, marginLeft: wp(1) },
  inputWrapper: {
    backgroundColor: "#fff",
    height: hp(5.4),
    width: wp(38),
    elevation: 6,
    marginTop: hp(1),
    flexDirection: "row",
    alignItems: "center",
  },
  tutorWrapper: { marginTop: hp(7), marginLeft: wp(5), marginRight: wp(5) },
  tutorText: { fontSize: 11, color: "#000" },
});
