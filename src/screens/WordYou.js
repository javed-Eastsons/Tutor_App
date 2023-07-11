<<<<<<< HEAD
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
import RNPickerSelect from 'react-native-picker-select';

const WordYou = () => {
    const navigation = useNavigation();

    const [mark, setmark] = useState('')
    const [yourdata, setYourdata] = useState('')

    const savedata = () => {
        console.log('LLLLLLLLLLLLLLLLLLL', mark, yourdata)
        navigation.navigate('YourProfle')
    }

    return (
        <View style={styles.container}>
            {/* <View style={{flex:0.9}}> */}
            <View style={styles.Headers}>
                <View style={styles.HeadLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={require('../Assets/baricon.png')}
                            style={styles.icons}
                        />

                    </TouchableOpacity>

                </View>
                <View style={styles.HeadRight}>
                    <Image source={require('../Assets/bell.png')}
                        style={styles.icons}
                    />

                    <Image source={require('../Assets/search.png')}
                        style={styles.icons}
                    />
                    <Image source={require('../Assets/chat.png')}
                        style={styles.icons}
                    />
                </View>

            </View>






            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.9 }}>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', backgroundColor: '#fff', width: wp(16), zIndex: 9999, right: wp(13), top: -hp(1) }}>
                        <Image source={require('../Assets/closeingray.png')} style={{ height: hp(6), width: wp(12) }} />
                    </View>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'lightgrey', marginTop: hp(2), height: hp(30), borderRadius: 10, paddingHorizontal: wp(2), width: wp(90), marginLeft: wp(5) }}>

                        <Text style={{ color: '#2F5597', fontSize: 14, paddingTop: hp(1.5), textDecorationLine: 'underline' }}>Terms & Conditions applies</Text>
                        <TextInput
                            placeholder=' Write something about your tutoring experience. Highlight students’ performance under your tutelage (if available)'
                            numberOfLines={5}
                            multiline={true}
                            onChangeText={(text) => { setYourdata(text) }}
                            value={yourdata}
                            style={{ textAlignVertical: 'top' }}
                        />
                        {/* <Text style={{ color: 'lightgrey', fontSize: 14, paddingTop: hp(.5), marginTop: hp(3) }}>
                            Write something about your tutoring experience. Highlight students’ performance under your tutelage (if available)</Text>
                        */}
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: hp(8) }}>
                            <Text style={{ color: 'lightgrey', fontSize: 14, }}>300 words max</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', marginHorizontal: wp(5), marginTop: hp(3), justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setmark('Full Time tutor')} style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, alignItems: 'center', justifyContent: 'center', height: hp(5), width: wp(10) }}>
                                <View style={{ backgroundColor: mark == 'Full Time tutor' ? '#2F5597' : '#fff', borderRadius: 50, height: hp(3), width: wp(6), }}></View>
                            </TouchableOpacity>
                            <Text style={{ marginTop: hp(2), color: 'grey', fontSize: 14 }}>Full Time tutor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setmark('Part Time tutor')} style={{ borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderRadius: 6, height: hp(5), width: wp(10) }}>
                                <View style={{ backgroundColor: mark == 'Part Time tutor' ? '#2F5597' : '#fff', borderRadius: 50, height: hp(3), width: wp(6), }}></View>

                            </TouchableOpacity>
                            <Text style={{ marginTop: hp(2), color: 'grey', fontSize: 14 }}>Part Time tutor</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ flex: 0.1, justifyContent: 'flex-end', paddingBottom: hp(3) }}>
                    <TouchableOpacity style={styles.circleArrow}>
                        <Image source={require('../Assets/circleArrow.png')} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => savedata()}
                            // onPress={() => navigation.navigate('YourProfle',{
                            //             WordYou:'WordYou'
                            //         })} 
                            style={{ backgroundColor: '#2F5597', borderRadius: 25, height: hp(6), width: wp(60), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>

    )
}

export default WordYou;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor:'pink'
        // padding: 10,


    },




    Headers: {
        // backgroundColor: "red",
        height: hp(10),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100)
    },


    Text1: {
        color: '#2F5597',
        fontSize: 24,
        fontWeight: '700'
    },


    icons: {

        height: 30,
        width: 30,
        marginRight: 10
    },


    HeadLeft: {
        width: wp(45),
        height: hp(10),
        flexDirection: "row",

        alignItems: "center"
    },


    HeadRight: {
        width: wp(45),
        height: hp(10),
        // backgroundColor: "pink",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        width: wp(90),
        marginLeft: wp(5)
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(40),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center'
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(40),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30,
        alignItems: 'center'
    },

    circleArrow: { flex: 0.1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: wp(4.5), paddingBottom: hp(4) },
    modalWrapper2: { flex: 1, backgroundColor: '#00000040', alignItems: 'center', justifyContent: 'flex-end' },
    modalWrapp: { height: hp(48), width: wp(100), backgroundColor: '#fff' },
    crossWRapper: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(5), marginTop: hp(2) },
    crossImageWrapper: { backgroundColor: 'red', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    crossImage: { height: hp(4), width: wp(8) },
    tickWrapper: { backgroundColor: 'green', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    tickImage: { height: hp(2), width: wp(7) },

=======
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
import RNPickerSelect from 'react-native-picker-select';

const WordYou = () => {
    const navigation = useNavigation();

    const [mark, setmark] = useState('')
    const [yourdata, setYourdata] = useState('')

    const savedata = () => {
        console.log('LLLLLLLLLLLLLLLLLLL', mark, yourdata)
    }

    return (
        <View style={styles.container}>
            {/* <View style={{flex:0.9}}> */}
            <View style={styles.Headers}>
                <View style={styles.HeadLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={require('../Assets/baricon.png')}
                            style={styles.icons}
                        />

                    </TouchableOpacity>

                </View>
                <View style={styles.HeadRight}>
                    <Image source={require('../Assets/bell.png')}
                        style={styles.icons}
                    />

                    <Image source={require('../Assets/search.png')}
                        style={styles.icons}
                    />
                    <Image source={require('../Assets/chat.png')}
                        style={styles.icons}
                    />
                </View>

            </View>






            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.9 }}>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', backgroundColor: '#fff', width: wp(16), zIndex: 9999, right: wp(13), top: -hp(1) }}>
                        <Image source={require('../Assets/closeingray.png')} style={{ height: hp(6), width: wp(12) }} />
                    </View>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'lightgrey', marginTop: hp(2), height: hp(30), borderRadius: 10, paddingHorizontal: wp(2), width: wp(90), marginLeft: wp(5) }}>

                        <Text style={{ color: '#2F5597', fontSize: 14, paddingTop: hp(1.5), textDecorationLine: 'underline' }}>Terms & Conditions applies</Text>
                        <TextInput
                            placeholder=' Write something about your tutoring experience. Highlight students’ performance under your tutelage (if available)'
                            numberOfLines={5}
                            multiline={true}
                            onChangeText={(text) => { setYourdata(text) }}
                            value={yourdata}
                            style={{ textAlignVertical: 'top' }}
                        />
                        {/* <Text style={{ color: 'lightgrey', fontSize: 14, paddingTop: hp(.5), marginTop: hp(3) }}>
                            Write something about your tutoring experience. Highlight students’ performance under your tutelage (if available)</Text>
                        */}
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: hp(8) }}>
                            <Text style={{ color: 'lightgrey', fontSize: 14, }}>300 words max</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', marginHorizontal: wp(5), marginTop: hp(3), justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setmark('Full Time tutor')} style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, alignItems: 'center', justifyContent: 'center', height: hp(5), width: wp(10) }}>
                                <View style={{ backgroundColor: mark == 'Full Time tutor' ? '#2F5597' : '#fff', borderRadius: 50, height: hp(3), width: wp(6), }}></View>
                            </TouchableOpacity>
                            <Text style={{ marginTop: hp(2), color: 'grey', fontSize: 14 }}>Full Time tutor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setmark('Part Time tutor')} style={{ borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgrey', borderRadius: 6, height: hp(5), width: wp(10) }}>
                                <View style={{ backgroundColor: mark == 'Part Time tutor' ? '#2F5597' : '#fff', borderRadius: 50, height: hp(3), width: wp(6), }}></View>

                            </TouchableOpacity>
                            <Text style={{ marginTop: hp(2), color: 'grey', fontSize: 14 }}>Part Time tutor</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ flex: 0.1, justifyContent: 'flex-end', paddingBottom: hp(3) }}>
                    <TouchableOpacity style={styles.circleArrow}>
                        <Image source={require('../Assets/circleArrow.png')} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => savedata()}
                            // onPress={() => navigation.navigate('YourProfle',{
                            //             WordYou:'WordYou'
                            //         })} 
                            style={{ backgroundColor: '#2F5597', borderRadius: 25, height: hp(6), width: wp(60), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>

    )
}

export default WordYou;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor:'pink'
        // padding: 10,


    },




    Headers: {
        // backgroundColor: "red",
        height: hp(10),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100)
    },


    Text1: {
        color: '#2F5597',
        fontSize: 24,
        fontWeight: '700'
    },


    icons: {

        height: 30,
        width: 30,
        marginRight: 10
    },


    HeadLeft: {
        width: wp(45),
        height: hp(10),
        flexDirection: "row",

        alignItems: "center"
    },


    HeadRight: {
        width: wp(45),
        height: hp(10),
        // backgroundColor: "pink",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(8),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        width: wp(90),
        marginLeft: wp(5)
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(40),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center'
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(40),
        height: hp(6),
        justifyContent: "center",
        borderRadius: 30,
        alignItems: 'center'
    },

    circleArrow: { flex: 0.1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: wp(4.5), paddingBottom: hp(4) },
    modalWrapper2: { flex: 1, backgroundColor: '#00000040', alignItems: 'center', justifyContent: 'flex-end' },
    modalWrapp: { height: hp(48), width: wp(100), backgroundColor: '#fff' },
    crossWRapper: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(5), marginTop: hp(2) },
    crossImageWrapper: { backgroundColor: 'red', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    crossImage: { height: hp(4), width: wp(8) },
    tickWrapper: { backgroundColor: 'green', height: hp(5), width: wp(10), borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
    tickImage: { height: hp(2), width: wp(7) },

>>>>>>> javedcode
})