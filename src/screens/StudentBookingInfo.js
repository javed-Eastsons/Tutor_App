import React, { useState } from 'react'
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
    Modal,
    ImageBase
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ItemBox from './ItemBox';
import RNPickerSelect from 'react-native-picker-select';
//import CheckBox from '@react-native-community/checkbox';
import { GetAllTutors } from '../Redux/Actions/Tutors';
import { GetfilterSubject, GetfilterQualification } from '../Redux/Actions/TutorSearchAction'
import { useDispatch, useSelector } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MultiSelect from 'react-native-multiple-select';
import StarRating from 'react-native-star-rating';
import { GetResultAfterPostcode } from '../Redux/Actions/TutorSearchAction'
import { Dropdown } from "react-native-element-dropdown";


const StudentBookingInfo = ({ route }) => {
    const data = route.params.data
    console.log("🚀 ~ file: StudentBookingInfo.js ~ line 37 ~ StudentBookingInfo ~ data", data)

    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    console.log("@@@@@@", value)
    console.log(">>>>>>", value2)
    console.log("!!!!!", value1)

    const [isFocus, setIsFocus] = useState(false);
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);


    const data1 = [
        { label: 'Home Tution', value: 'Home Tution' },
        { label: 'Online Tution', value: 'Online Tution' },
        { label: 'Home Work', value: 'Home Work' },

    ];
    //   const renderLabel = () => {
    //     if (value || isFocus) {
    //       return (
    //         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //           Dropdown label
    //         </Text>
    //       );
    //     }
    //     return null;
    //   };


    const subjects = [
        { label1: 'English', value1: 'English' },
        { label1: 'Math', value1: 'Math' },
        { label1: 'Science', value1: 'Science' },
        { label1: 'Chinese', value1: 'Chinese' },
        { label1: 'Economics', value1: 'Economics' },

    ];

    const grade_list = [
        // { label: 'Select One Option', value: 'Select One Option' },
        { label2: 'P1', value2: 'P1' },
        { label2: 'P2', value2: 'P2' },
        { label2: 'P3', value2: 'P3' },

    ];
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 10, }}>
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
            <View style={{ height: 30, width: "90%", alignSelf: "center", }}>
                <Text style={{ fontSize: 20, color: "#2F5597", fontWeight: "bold" }}>
                    Let's Book!
                </Text>
            </View>
            <View style={{ height: 70, width: "90%", alignSelf: "center", marginTop: 10, flexDirection: "row" }}>
                <View style={{ height: 60, width: 100, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../Assets/user.png')} style={styles.leftImage} />
                </View>
                <View style={{ height: 60, width: 200, }}>
                    <View style={{ height: 30, width: 200, }}>
                        <Text style={styles.infoText}>{data.tutor_code}</Text>
                    </View>
                    <View style={{ height: 30, width: 200, }}>
                        <Text style={styles.infoText}>{data.name_of_school}</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 20, width: "90%", alignSelf: "center" }}>
                <View style={{ width: 40, marginLeft: 5 }}>
                    <StarRating
                        fullStarColor="orange"
                        disabled={false}
                        maxStars={5}
                        rating={data.Average_Rating}
                        starSize={15}
                    // selectedStar={(rating) => setStrCount(rating)}

                    />
                </View>
            </View>
            <View style={[styles.cardLeft, styles.shadowPropLeft,]}>
                <Text style={styles.infoText1}>Step 1 of 5: Booking Information required</Text>

            </View>
            <View style={[styles.Bookcard, styles.BookshadowProp,]}>
                <View style={{ height: 40, width: "100%", padding: 10, flexDirection: 'row' }}>
                    <Text style={styles.BookText1}>Student's Details</Text>
                    <View style={{ position: 'absolute', right: 10 }}>
                        <Image source={require('../Assets/TutionType.png')} style={styles.TypeImage} />
                    </View>
                </View>
                <View style={{ height: 20, width: "93%", alignSelf: "center" }}>
                    <Text style={styles.BookText2}>you can add multiple student's details.One at a time...</Text>

                </View>
                <View style={{ height: "80%", width: "100%", padding: 10, backgroundColor: "white", }}>
                    <View style={{ flexDirection: "row", height: "10%", width: "100%", }}>
                        <View style={{ height: 100, width: "30%", }}>
                            <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>Level :</Text>
                        </View>
                        <View style={{ height: 100, width: "60%", }}>

                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                                placeholderStyle={{ fontSize: 16 }}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{ color: "red" }}

                                data={data1}
                                labelField="label"
                                valueField="value"
                                allowFontScaling={false}
                                placeholder={!isFocus ? " " : "..."}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", height: "10%", width: "100%", marginTop: 10 }}>
                        <View style={{ height: 100, width: "30%", }}>
                            <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>Grade :</Text>
                        </View>
                        <View style={{ height: 100, width: "60%", }}>

                            <Dropdown
                                style={[styles.dropdown, isFocus2 && { borderColor: "black" }]}
                                placeholderStyle={{ fontSize: 16 }}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{ color: "red" }}

                                data={grade_list}
                                labelField="label2"
                                valueField="value2"
                                allowFontScaling={false}
                                placeholder={!isFocus2 ? " " : "..."}
                                value={value2}
                                onFocus={() => setIsFocus2(true)}
                                onBlur={() => setIsFocus2(false)}
                                onChange={item => {
                                    setValue2(item.value2);
                                    setIsFocus2(false);
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", height: "10%", width: "100%", marginTop: 10 }}>
                        <View style={{ height: 100, width: "30%", }}>
                            <Text style={{ marginTop: 10, fontSize: 16, color: "black" }}>Subjects :</Text>
                        </View>
                        <View style={{ height: 100, width: "60%", }}>

                            <Dropdown
                                style={[styles.dropdown, isFocus1 && { borderColor: "black" }]}
                                placeholderStyle={{ fontSize: 16 }}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                itemTextStyle={{ color: "blue" }}

                                data={subjects}
                                labelField="label1"
                                valueField="value1"
                                allowFontScaling={false}
                                placeholder={!isFocus1 ? " " : "..."}
                                value={value1}
                                onFocus={() => setIsFocus1(true)}
                                onBlur={() => setIsFocus1(false)}
                                onChange={item => {
                                    setValue1(item.value1);
                                    setIsFocus1(false);
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('StudentBookingDetails', {
                            value: value,
                            value1: value1,
                            value2: value2,
                            data: data,
                        })}
                        style={{ height: 35, width: 100, backgroundColor: '#F6BE00', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10, position: "relative", right: -230 }}>
                        <Text style={styles.ButtonText}>Done</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ height: "10%", width: "100%", position: "absolute", bottom: 5, flexDirection: "row", alignSelf: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('')}
                        style={{ height: "100%", width: "50%", backgroundColor: "#C0C0C0", justifyContent: "center", alignItems: "center", borderRadius: 3 }}>
                        <Text style={styles.BookText}>Cancel Booking</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                  
                            onPress={() => navigation.navigate('StudentBookingInfo', {
                                value: value,
                                value1: value1,
                                value2: value2,
                                data: data,
                            })
                          //</View></View>  console.log(">hey")
                           // navigation.navigate('StudentBookingInfo')
                        
                        }
                        style={{ height: "100%", width: "50%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6BE00", borderRadius: 3 }}>
                        <Text style={styles.infoText1}>Next</Text>

                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
}
export default StudentBookingInfo;

const styles = StyleSheet.create({
    Headers: {
        height: hp(8),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100)
    },
    HeadLeft: {
        width: wp(45),
        height: hp(10),
        flexDirection: "row",
        alignItems: "center"
    },
    icons: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: "center"
    },
    HeadRight: {
        width: wp(45),
        height: hp(10),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    leftImage: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TypeImage: {
        width: 30,
        height: 30,
        marginTop: 5
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    infoText: {
        fontSize: 15,
        color: 'black',

    },
    infoText1: {
        fontSize: 15,
        color: 'black',
        alignSelf: "center",
        fontWeight: "700"

    },
    BookText: {
        fontSize: 15,
        color: 'white',
        alignSelf: "center",
        fontWeight: "700"
    },
    BookText1: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        color: "grey",
    },
    BookText2: {
        fontSize: 12,
        color: 'white',
        // fontWeight:"bold",
        color: "grey",
    },
    ButtonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: "bold",
    },
    cardLeft: {
        height: 30,
        width: "100%",
        backgroundColor: "white",
        alignSelf: "center",
        // borderRadius: 2,
        borderWidth: 0.2,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    shadowPropLeft: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowRadius: 6,
    },
    Bookcard: {
        height: "60%",
        width: "100%",
        backgroundColor: "#F5F5F5",
        alignSelf: "center",
        // borderRadius: 2,
        borderWidth: 0.2,
        marginTop: 10,
        marginBottom: 10,
        // justifyContent:"center",
        // alignItems:"center",
        padding: 10,
    },
    BookshadowProp: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowRadius: 6,
    },
    dropdown: {
        height: 20,
        width: "70%",
        borderColor: "black",
        // borderWidth: 0.5,
        // borderRadius: 8,
        // paddingHorizontal: 8,
        marginTop: 10,
        // marginLeft:10
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})