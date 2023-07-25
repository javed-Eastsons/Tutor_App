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
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tution_Type } from "../Redux/Actions/types";

const HomeTution = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [FirstName, setFirstName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [mapData, setMapData] = useState();
  const dispatch = useDispatch();
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

  console.log(FirstName, "postalcode");
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
        //   console.log(jj, "PPPPPPPPPPPPPPPPPP");
        setMapData(jj);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(
      mapData?.formatted_address,
      FirstName,
      "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"
    );

    let obj = {
      Postal_Code: FirstName,
      TutionType: "Home Tuition",
      address: mapData?.formatted_address,
    };
    dispatch({
      type: Tution_Type,
      payload: obj,
    });

    console.log(obj, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
  };
  if (mapData) {
    // console.log(mapData?.geometry?.location, "latlong");
  }

  useEffect(() => {
    onRegionCHange();
  }, [mapData]);

  const onRegionCHange = (reg) => {
    // console.log(reg, "DDDDDDDDDDDDDDDDDDDDDDDDD");
    mapRef?.current?.animateToRegion({
      latitude: mapData ? mapData?.geometry?.location?.lat : 28.621,
      longitude: mapData ? mapData?.geometry?.location?.lng : 77.3812,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // if(mapData){
  //     console.log(mapData,'Address')

  // }

  return (
    <View style={styles.container}>
      <View style={styles.tutorWrapper}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.tutorText}>Your Postal Code</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={(text) => {
                  setFirstName(text);
                }}
                value={FirstName}
                placeholder="510208"
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
          <TouchableOpacity
            onPress={() => navigation.navigate("YourProfle")}
            style={styles.crossImageWrapper}
          >
            <Image
              source={require("../Assets/closeingray.png")}
              style={styles.crossImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forwardArrowWrapper}>
          <Text style={styles.forwardArrowTextWrapper}>
            {mapData?.formatted_address}
          </Text>
        </View>
      </View>
      <View></View>
      <MapView
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
          latitude: mapData ? mapData?.geometry?.location?.lat : 28.621,
          longitude: mapData ? mapData?.geometry?.location?.lng : 77.3812,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // mapType={'standard'}
      >
        <Marker
          coordinate={{
            latitude: mapData ? mapData?.geometry?.location?.lat : 28.621,
            longitude: mapData ? mapData?.geometry?.location?.lng : 77.3812,
          }}
          onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
          //  onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          // title={'Your Location'}
          // description={mapData?.formatted_address}
        />
      </MapView>
    </View>
  );
};

export default HomeTution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'pink'
    // padding: 10,
  },
  map: {
    height: hp(70),
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
  tickImage: { height: hp(2), width: wp(7) },
  forwardArrowWrapper: {
    borderWidth: 0.6,
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
