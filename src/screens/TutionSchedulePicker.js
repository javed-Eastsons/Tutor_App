import React, { useState, useEffect } from 'react'
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
import CheckBox from '@react-native-community/checkbox';


const morning = ["12 AM","1 AM","2 AM","3 AM", "4 AM","5 AM", "6 AM"]
const Afternoon = ["6 AM","7 AM","8 AM","9 AM","10 AM", "11 AM","12 PM"]
const Evening = ["12 PM","1 PM","2 PM","3 PM", "4 PM","5 PM", "6 PM"]
const Night = ["6 PM","7 PM","8 PM", "9 PM","10 PM","11 PM","12 PM"]




const TutionSchedulePicker = ({ }) => {

    const [time ,setTime] = useState(morning)
    const navigation = useNavigation();
    const [date, setDate]= useState('')
    const [isExpandModalVisible, setExpandModalVisible] = useState(false);
    const [selected, setSelected] = useState([])
    const handler = (time) => { 
        let picker = selected
        if (selected.includes(time))
        {
          picker =  picker.filter(item=>item!=time)
        }
        else(
            picker.push(time)
        )
        console.log("ABCABC", picker)
        setSelected(picker);
        setDate(new Date())
    }
    console.log("@@@", handler)

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const renderTime = (item) =>{
        console.log("ABCABC 111", selected);
            return(
                <View>
                <TouchableOpacity
                    onPress={()=>handler(item.item)}
                    style={{
                        height: 40,
                        width: 60,
                        backgroundColor: selected.includes(item.item)? "white" : "#2F5597",
                        marginBottom: 2,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{
                        fontSize: 12,
                        color: selected.includes(item.item)?"black" : "white",
                    }}>{item.item}</Text>

                </TouchableOpacity>
                
            </View>
            )
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
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
            <View style={styles.HeaderContainer}>
                <Text style={styles.HeaderText}>
                    Let's Book!
                </Text>
            </View>
            <View style={styles.Container}>
                <View style={styles.LeftImageContainer}>
                    <Image source={require('../Assets/user.png')} style={styles.leftImage} />
                </View>
                <View style={styles.UserInfoContainer}>
                    <View style={styles.UserInfoContainer1}>
                        <Text style={styles.infoText}>Hello</Text>
                    </View>
                    <View style={{ height: 30, width: 200, }}>
                        <Text style={styles.infoText}>University Undergraguate</Text>
                    </View>
                </View>
            </View>
            <View style={styles.RatingContainer}>
                <View style={{ width: 40, marginLeft: 5 }}>
                    <StarRating
                        fullStarColor="orange"
                        disabled={false}
                        maxStars={5}
                        // rating={item.Average_rating}
                        starSize={15}
                    // selectedStar={(rating) => setStrCount(rating)}
                    />
                </View>
            </View>
            <View style={[styles.cardLeft, styles.shadowPropLeft,]}>
                <Text style={styles.infoText1}>Step 1 of 5: Booking Information required</Text>
            </View>
            <View style={[styles.Bookcard, styles.BookshadowProp,]}>
                <View style={{ height: 40, width: "100%", padding: 10, flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.BookText1}>Tution Schedule Picker (Optional)</Text>
                </View>
                <View style={{ height: 40, width: "100%", padding: 10, flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                        <CheckBox
                            value={toggleCheckBox}
                            onValueChange={setToggleCheckBox}
                            style={{height: 20, width: 20, borderColor: "#2F5597", marginRight: 10 ,}}
                        />
                        </View>
                        <Text style={styles.BookText1}>Mon-Fri</Text>

                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#2F5597", marginRight: 10 }}></View>
                        <Text style={styles.BookText1}>Sat-Sun</Text>
                    </View>

                </View>
                <View style={[styles.cardWeek, styles.shadowPropWeek,]}>
                    <View style={{ height: 40, width: 50, backgroundColor: "#2F5597", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.WeekText}>Mon</Text>

                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Tues</Text>
                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Wed</Text>

                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Thu</Text>

                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Fri</Text>

                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Sat</Text>

                    </View>
                    <View style={styles.WeeklyContainer}>
                        <Text style={styles.WeekText}>Sun</Text>

                    </View>

                </View>

                <View style={{ height: 250, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ height: 40, width: "40%", }}>
                        <TouchableOpacity

                            style={[styles.cardMorningContainer, styles.shadowPropMorningContainer]}>
                            <View style={styles.MorningImageContainer}>
                                <Image source={require('../Assets/Morning.png')}
                                    style={styles.icons}
                                />
                            </View>
                            <TouchableOpacity
                            onPress={()=>setTime(morning)} style={{ height: 40, width: "70%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.MorningText}>12 AM to 5:59 AM</Text>

                            </TouchableOpacity>
                        </TouchableOpacity>


                        <View style={[styles.cardMorningContainer, styles.shadowPropMorningContainer]}>
                            <View style={styles.MorningImageContainer}>
                                <Image source={require('../Assets/Afternoon.png')}
                                    style={styles.icons}
                                />
                            </View>
                            <TouchableOpacity
                            onPress={()=>setTime(Afternoon)} style={{ height: 40, width: "70%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.MorningText}>6 AM to 11:59 AM</Text>

                            </TouchableOpacity>
                        </View>

                        <View style={[styles.cardMorningContainer, styles.shadowPropMorningContainer]}>
                            <View style={styles.MorningImageContainer}>
                                <Image source={require('../Assets/Evening.png')}
                                    style={styles.icons}
                                />
                            </View>
                            <TouchableOpacity
                             onPress={()=>setTime(Evening)} 
                             style={{ height: 40, width: "70%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.MorningText}>12 PM to 5:59 PM</Text>

                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity 
                        onPress={()=>setTime(Night)}
                        style={[styles.cardMorningContainer, styles.shadowPropMorningContainer]}>
                            <View style={styles.MorningImageContainer}>
                                <Image source={require('../Assets/Night.png')}
                                    style={styles.icons}
                                />
                            </View>
                            <View style={{ height: 40, width: "70%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.MorningText}>6 PM to 11:59 PM</Text>

                            </View>
                        </TouchableOpacity>
                          </View>
                          <View style={styles.TimeContainer}>
                          <FlatList
                        data={time}
                        key={new Date()}
                        renderItem={(item)=>renderTime(item)}
                        numColumns={3}/>
                          </View>
                        
                      </View>


                <View style={{ height: "10%", width: "100%", position: "absolute", bottom: 5, flexDirection: "row", alignSelf: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('')}
                        style={{ height: "100%", width: "50%", backgroundColor: "#C0C0C0", justifyContent: "center", alignItems: "center", borderRadius: 3 }}>
                        <Text style={styles.BookText5}>Cancel Booking</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BookingInformationConfirmation')}
                        style={{ height: "100%", width: "50%", justifyContent: "center", alignItems: "center", backgroundColor: "#F6BE00", borderRadius: 3 }}>
                        <Text style={styles.infoText1}>Next</Text>

                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}
export default TutionSchedulePicker;
const styles = StyleSheet.create({
    Headers: {
        height: hp(5),
        justifyContent: "center",
        flexDirection: "row",
        width: wp(100),
        // backgroundColor:'red'
    },
    HeadLeft: {
        width: wp(45),
        height: hp(5),
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
        height: hp(5),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    HeaderContainer: {
        height: 30,
        width: "90%",
        alignSelf: "center",
    },
    HeaderText: {
        fontSize: 20,
        color: "#2F5597",
        fontWeight: "bold"
    },
    Container: {
        height: 70,
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row"
    },
    LeftImageContainer: {
        height: 60,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    leftImage: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    UserInfoContainer: {
        height: 60,
        width: 200,
    },
    UserInfoContainer1: {
        height: 30,
        width: 200,
    },
    RatingContainer: {
        height: 20,
        width: "90%",
        alignSelf: "center"
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
    infoText1: {
        fontSize: 15,
        color: 'black',
        alignSelf: "center",
        fontWeight: "700"
    },
    Bookcard: {
        height: "60%",
        width: "100%",
        backgroundColor: "#F5F5F5",
        alignSelf: "center",
        borderWidth: 0.2,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    BookshadowProp: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowRadius: 6,
    },
    BookText1: {
        fontSize: 15,
        color: '#2F5597',
        fontWeight: "bold",
    },
    dropdown: {
        height: 30,
        width: "70%",
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: "#2F5597",
    },
    BookText5: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        color: "grey",
    },
    cardWeek: {
        height: 50, width: "100%",
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 0.2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 5
    },
    shadowPropWeek: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowRadius: 6,
    },
    WeeklyContainer: {
        height: 40,
        width: 48,
        backgroundColor: "#2F5597",
        marginLeft: 4,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    WeekText: {
        fontSize: 14,
        color: 'white',
        // fontWeight: "bold",
    },
    cardMorningContainer: {
        height: 40,
        width: "100%",
        backgroundColor: "white",
        marginTop: 20,
        flexDirection: "row",
        marginLeft: 5
    },
    shadowPropMorningContainer: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#2F5597',
        shadowOpacity: 1.0,
        shadowRadius: 6,
    },
    MorningImageContainer: {
        height: 40,
        width: "25%",
        // backgroundColor:"red",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5
    },
    MorningText: {
        fontSize: 12,
        color: 'black',
        // fontWeight: "bold",
    },

    TimeContainer: {
        height: 175,
        width: "55%",
        // backgroundColor:"green",
        alignSelf: "center",
        marginRight: 5,
        padding: 3,
        flexDirection: "row"
    },
    TimeScheduleColum: {
        height: 40,
        width: 60,
        backgroundColor: "#2F5597",

        marginBottom: 2,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    TimeScheduleRow: {
        height: 40,
        width: 60,
        backgroundColor: "#2F5597",
        marginLeft: 3,
        marginBottom: 2,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    TimeText: {
        fontSize: 12,
        color: 'black',
        // fontWeight: "bold",
    }




})