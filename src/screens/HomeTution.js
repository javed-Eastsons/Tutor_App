import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    Button,
    TouchableOpacity, Modal, FlatList
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import MapView from 'react-native-maps';

const HomeTution = () => {

    const navigation = useNavigation();
    const [FirstName, setFirstName] = React.useState('');

    const personalinfofun = () => {

        console.log(FirstName, '????????????????');
        navigation.navigate('YourProfle')

    }

    return (
        <View style={styles.container}>

            <View style={styles.tutorWrapper}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.tutorText}>Your Postal Code</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                onChangeText={(text) => { setFirstName(text) }}

                                value={FirstName}
                                placeholder='510208'
                                placeholderTextColor={'#000'}
                                keyboardType='phone-pad'
                                style={{ color: '#000', paddingLeft: wp(2), width: wp(28) }} />
                            <TouchableOpacity
                                onPress={() => personalinfofun()}
                                style={{ backgroundColor: '#2F5597', width: wp(8), height: hp(4), alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                <Text style={{ color: '#fff', fontSize: 14 }}>Go</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('YourProfle')} style={styles.crossImageWrapper}>
                        <Image source={require('../Assets/closeingray.png')} style={styles.crossImage} />
                    </TouchableOpacity>
                </View>

                <View style={styles.forwardArrowWrapper}>
                    <Text style={styles.forwardArrowTextWrapper}>404 Choa Chu Kang North Avenue 4</Text>
                </View>
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

export default HomeTution;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor:'pink'
        // padding: 10,
    },
    map: {
        height: hp(70),
        width: wp(90),
        marginLeft: wp(5), marginTop: hp(2)
    },
    crossImageWrapper: { backgroundColor: 'red', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    crossImage: { height: hp(4), width: wp(8) },
    tickWrapper: { backgroundColor: 'green', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    tickImage: { height: hp(2), width: wp(7) },
    forwardArrowWrapper: { borderWidth: 0.6, borderColor: '#000', width: wp(60), height: hp(5), marginTop: hp(2) },
    forwardArrowTextWrapper: { color: '#000', fontSize: 12, marginLeft: wp(1), },
    inputWrapper: { backgroundColor: '#fff', height: hp(5.4), width: wp(38), elevation: 6, marginTop: hp(1), flexDirection: 'row', alignItems: 'center' },
    tutorWrapper: { marginTop: hp(7), marginLeft: wp(5), marginRight: wp(5) },
    tutorText: { fontSize: 11, color: '#000' },

})