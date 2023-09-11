import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating";
import ReadMore from "react-native-read-more-text";
import Swipeable from "react-native-gesture-handler/Swipeable";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { GetAllTutors } from "../Redux/Actions/Tutors";
import { useDispatch, useSelector } from "react-redux";

const ItemBox = (props) => {
  //  console.log("Props.data", props.data);
  const navigation = useNavigation();

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.View
            style={{
              transform: [{ scale: scale }],
              backgroundColor: "#fff",
              height: hp(6),
              width: wp(12),
              borderRadius: 50,
              elevation: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../Assets/redheart.png")}
              style={{ height: hp(5), width: wp(11) }}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.View
            style={{
              transform: [{ scale: scale }],
              backgroundColor: "#fff",
              height: hp(3),
              width: wp(6),
              borderRadius: 50,
              elevation: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../Assets/delete.png")}
              style={{ height: hp(2), width: wp(4) }}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: "blue" }} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: "blue" }} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const _handleTextReady = () => {
    // ...
  };
  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={styles.swipperWrapper}>
        <View style={styles.leftImageWrapper}>
          {/* <Image source={require('../Assets/user.png')} style={styles.leftImage} /> */}
          <Image
            source={{
              uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${props.data.profile_image}`,
            }}
            style={styles.leftImage}
          />
        </View>

        {/* {Tutor && Tutor.map((item) => { */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TutorSearchProfile", {
              data: props.data,
            })
          }
          style={styles.widthWrapper}
        >
          {/* {console.log('tutor', item.first_name)} */}
          <View>
            <View style={styles.wrraper}>
              <Text style={styles.userIdWrapper}>{props.data.tutor_code}</Text>
              <Image
                source={require("../Assets/flag.png")}
                style={styles.flagImage}
              />
              <View style={{ width: 100, marginLeft: 50 }}>
                <StarRating
                  fullStarColor="orange"
                  disabled={false}
                  maxStars={5}
                  rating={props.data.Average_rating}
                  starSize={15}
                  // selectedStar={(rating) => setStrCount(rating)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 20,
                width: "100%",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontWeight: "500",
                  fontSize: 12,
                  fontFamily: "Poppins-Light",
                }}
              >
                {props.data.name_of_school}
              </Text>
              <TouchableOpacity
                style={{ height: 40, width: 30, marginRight: wp(4) }}
              >
                <Image
                  source={require("../Assets/three_dot.png")}
                  style={{ height: 40, width: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 20,
                width: "80%",
                marginHorizontal: 10,
                flexDirection: "row",
                fontFamily: "Poppins-Light",
              }}
            >
              <Text style={{ color: "black" }}>
                {props.data.personal_statement}...
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ color: "#2F5597", fontFamily: "Poppins-Regular" }}
                >
                  ReadMore
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{height:20,width:"80%",marginLeft:10}}>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 12, }}>{props.data.personal_statement}</Text>
                        </View> */}
          </View>
          <View>
            <ReadMore
              numberOfLines={2}
              renderTruncatedFooter={_renderTruncatedFooter()}
              renderRevealedFooter={_renderRevealedFooter()}
              onReady={_handleTextReady()}
            >
              <Text style={{ color: "#000", fontSize: 10 }}>
                {props.data.detail}
              </Text>
            </ReadMore>
          </View>
        </TouchableOpacity>
        {/* })
                } */}
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: "pink",
    // padding: 10,
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    padding: 16,
  },
  deleteBox: {
    backgroundColor: "#fff",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    top: 20,
  },
  swipperWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(95),
    marginBottom: hp(1),
    alignSelf: "center",
    // marginLeft: wp(5),
    elevation: 5,
    paddingVertical: hp(1),
    borderRadius: 4,
    marginTop: hp(1),
    // backgroundColor:"red"
  },
  leftImageWrapper: {
    width: wp(18),
    alignItems: "center",
    justifyContent: "center",
  },
  leftImage: {
    height: 60,
    width: 60,
    marginLeft: wp(2),
  },
  widthWrapper: {
    height: 80,
    width: "80%",
  },
  wrraper: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    width: "90%",
    marginLeft: 10,
    marginTop: 10,
  },
  userIdWrapper: {
    color: "#000",
    fontSize: 12,
    fontWeight: "800",
    fontFamily: "Poppins-SemiBold",
  },
  flagImage: {
    height: hp(2),
    width: wp(6),
    marginLeft: wp(2),
  },
});
