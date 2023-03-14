import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
    FlatList,
    TouchableHighlight,
    Modal
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';


const MapScreen = (props) => {
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
            <View style={styles.LittlRight}>
                {/* <View style={styles.rightImageWrapper}>
                    <Image source={require('../Assets/logogrey.png')}
                        //  resizeMode='contain'
                        style={styles.logoicon}
                    />
                    </View> */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} style={styles.rightSecondImageWrapper}>
                    <Image source={require('../Assets/logogrey.png')}
                        //  resizeMode='contain'
                        style={styles.logoicon}
                    />
                    </TouchableOpacity>
                    <View style={styles.rightSecondImageWrapper}>
                    <Image source={require('../Assets/logogrey.png')}
                        //  resizeMode='contain'
                        style={styles.logoicon}
                    />
                    </View> */}

            </View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />

        </View>

    )
}

export default MapScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // backgroundColor:'pink'
        // padding: 10,


    },
    map: {
        flex: 1,
        height: hp(100),
        width: wp(100)
    },
    LittlRight: {
        height: hp(15),
        width: wp(40),
        justifyContent: "center",
        //  backgroundColor: "yellow",
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        right: 20,

    },
    rightImageWrapper: { backgroundColor: '#fff', height: hp(5), width: wp(10), elevation: 5, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
    rightSecondImageWrapper: { backgroundColor: '#fff', height: hp(5), marginLeft: wp(2), width: wp(8), elevation: 5, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },



})