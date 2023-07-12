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
import Collapsible from 'react-native-collapsible';
const TutorSearchProfile = ({ props, route }) => {
    const navigation = useNavigation();
    const [showwhat, setshowwhat] = React.useState('');
    const [collapsed, setCollapsed] = useState(true);
    const data = route.params.data
    console.log("🚀 ~ file: TutorSearchProfile.js ~ line 36 ~ TutorSearchProfile ~ data", data)


    const toggleExpanded = () => {
        // Toggling the state of single Collapsible
        setCollapsed(false);
    };
    //Radio Button//
    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1',
            label: "Experience",
            value: "Experience"
        },
        {
            id: '2',
            label: 'MySchools',
            value: 'MySchools'
        },
        {
            id: '3',
            label: 'Reviews',
            value: 'Reviews'
        },
    ])

    const showwhatfunc = (data) => {

        setshowwhat(data)
        console.log(data)
        // if (showwhat == 'email')
        //     setshowwhat('mobile')
        // else if (showwhat == 'mobile') {
        //     setshowwhat('email')
        // }
        // else {
        //     setshowwhat('scan')
        // }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
            {/* <View style={styles.threeDotContainer}>
                <Image source={require('../Assets/baricon.png')}
                    style={styles.threeDoticons}
                />
            </View> */}
            <View style={[styles.cardCenter, styles.shadowPropCenter,]}>
                <View style={{ height: 60, width: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 40, }}>
                        {/* <Image 
                        source={{uri:`https://refuel.site/projects/tutorapp/UPLOAD_file/${data?.profile_image}`}}
                        style={styles.leftImage}
                        resizeMode={'cover'}
                        /> */}
                        <Image source={{ uri: `https://refuel.site/projects/tutorapp/UPLOAD_file/${data?.profile_image}` }} style={{ resizeMode: 'cover', width: '100%', height: '100%' }} />

                    </View>
                    <View style={{ height: 40, width: 40, position: 'absolute', right: 30 }}>
                        <Image source={require('../Assets/flag.png')} style={styles.flagImage} />
                    </View>
                </View>
                <View style={{ height: 25, width: "100%", flexDirection: 'row', }}>
                    <View style={{ height: 25, width: "100%", }}>
                        <Text style={styles.infoText}>{data.tutor_code}</Text>
                    </View>

                </View>
                <View style={{ height: 25, width: "100%" }}>
                    <Text style={styles.infoText}>{data.name_of_school}</Text>
                </View>
                <View style={{ height: 50, width: "100%", flexDirection: "row", marginTop: 10 }}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{data.Tutor_Age}</Text>
                        <Text style={styles.infoText1}>Age</Text>


                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{data.gender}</Text>
                        <Text style={styles.infoText1}>Gender</Text>


                    </View>
                    <View style={styles.line}></View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>4.5</Text>
                        <Text style={styles.infoText1}>Rating</Text>


                    </View>

                </View>
                {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.FavBooKChat}></View>
                    <View style={styles.FavBooKChat}></View>
                    <View style={styles.FavBooKChat}></View>

                </View> */}
                {/* <View style={{ height: 30, width: "80%", alignSelf: "center", flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
                    <View style={styles.FavBooKChatContainer}>
                        <Text style={{ alignSelf: "center" }}>Favourite</Text>
                    </View>
                    <View style={styles.FavBooKChatContainer}>
                        <Text style={{ alignSelf: "center" }}>Book</Text>
                    </View>
                    <View style={styles.FavBooKChatContainer}>
                        <Text style={{ alignSelf: "center" }}>Chat</Text>
                    </View>
                </View>
                 */}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.FavBooKChat}>
                    <Image source={require('../Assets/heart.png')}
                        style={styles.Bookicons}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('LetsBook', {
                    data: data
                })}
                    style={styles.FavBooKChat}>
                    <Image source={require('../Assets/people.png')}
                        style={styles.Bookicons}
                    />
                </TouchableOpacity>
                <TouchableOpacity

                    style={styles.FavBooKChat}>
                    <Image source={require('../Assets/Bookchat.png')}
                        style={styles.Bookicons}
                    />
                </TouchableOpacity>
                {/* <View style={{ height: 30, width: 50, position: "absolute", right: 10 }}>
                    <Image source={require('../Assets/location.png')}
                        style={styles.Locationicons}
                    />
                    <View style={{ marginTop: 5 }}>
                        <Image source={require('../Assets/share.png')}
                            style={styles.Locationicons}
                        />
                    </View>

                </View> */}

            </View>
            <View style={{ height: 30, width: "50%", alignSelf: "center", flexDirection: "row", marginTop: 5, marginLeft: 10, }}>
                <View style={styles.FavBooKChatContainer}>
                    <Text style={{ alignSelf: "center", color: "grey" }}>Favourite</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LetsBook', {
                        data: data
                    })}
                    style={styles.FavBooKChatContainer}>
                    <Text style={{ alignSelf: "center", color: "grey" }}>Book</Text>
                </TouchableOpacity>
                <View style={styles.FavBooKChatContainer}>
                    <Text style={{ alignSelf: "center", color: "grey" }}>Chat</Text>
                </View>
                {/* <View style={{height:30,width:50,marginLeft:20}}>
                    <Image source={require('../Assets/location.png')}
                            style={styles.Bookicons}
                        />
                        <Image source={require('../Assets/share.png')}
                            style={styles.Bookicons}
                        />
                    </View> */}
            </View>




            <View style={{ height: 30, width: "90%", alignSelf: "center", }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>A bit about me</Text>
                {/* <View style={{height:50,width:"90%",marginTop:20}} >
                <Text style={{fontSize:12,color:"black"}}>I am an excellent tutor but i look kind of odd</Text>
                </View> */}
            </View>
            <View style={{ height: 50, width: "90%",marginBottom: 10, alignSelf: "center" }} >
                <Text style={{ fontSize: 12, color: "black" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</Text>
            </View>
            <View style={{ height: 1, width: "90%", backgroundColor: "grey", alignSelf: "center", marginTop: 10 }}></View>

            {(() => {
                if (showwhat == 'Experience') {
                    return (

                        <View style={styles.moblieSec}>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('Experience')}
                            >
                                <Text style={styles.ButtonText}>Experience</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mobiletoch}
                                onPress={() => showwhatfunc('My Schools')}
                            >
                                <Text style={styles.ButtonText}>My Schools</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('Reviews')}
                            >
                                <Text style={styles.ButtonText}>Reviews</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                else if (showwhat == 'My Schools') {
                    return (

                        <View style={styles.moblieSec}>
                            <TouchableOpacity style={styles.mobiletoch}
                                onPress={() => showwhatfunc('Experience')}
                            >
                                <Text style={styles.ButtonText}>Experience</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('My Schools')}
                            >
                                <Text style={styles.ButtonText}>My Schools</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('Reviews')}
                            >
                                <Text style={styles.ButtonText}>Reviews</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }

                else {
                    return (
                        <View style={styles.moblieSec}>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('Experience')}
                            >
                                <Text style={styles.ButtonText}>Experience</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emailtoch}
                                onPress={() => showwhatfunc('My Schools')}
                            >
                                <Text style={styles.ButtonText}>My Schools</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mobiletoch}
                                onPress={() => showwhatfunc('Reviews')}
                            >
                                <Text style={styles.ButtonText}>Reviews</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }


            })()}

            {(() => {
                if (showwhat == 'Experience') {
                    return (

                        <View>
                            {/* <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}> School</Text>
                                <TextInput
                                        onChangeText={(text) => { setEmail(text) }}
                                        placeholder="Your Name"
                                        // value={Email}

                                        style={styles.input}
                                    />
                            </View> */}
                            <TouchableOpacity onPress={toggleExpanded}>
                                <View style={styles.header}>
                                    <Text style={styles.headerText}>
                                        Single Collapsible
                                    </Text>
                                    {/*Heading of Single Collapsible*/}
                                </View>
                            </TouchableOpacity>
                            <Collapsible
                                collapsed={collapsed}
                                align="center"
                            >
                                <View style={styles.content}>
                                    <Text style={{ textAlign: 'center' }}>
                                        This is a dummy text of Single Collapsible View
                                    </Text>
                                </View>
                            </Collapsible>
                            {/* <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>Primary school</Text>
                                <TextInput
                                        onChangeText={(text) => { setPassword(text) }}
                                        placeholder="Password"
                                        // value={Password}

                                        style={styles.input}
                                    />
                            </View> */}

                        </View>
                    )
                }

                else if (showwhat == 'My Schools') {
                    return (
                        <View>
                            <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>Primary School</Text>
                                {/* <TextInput
                                        onChangeText={(text) => { setMobile(text) }}
                                        placeholder="Mobile"
                                        // value={Mobile}
                                        keyboardType="number-pad"
                                        style={styles.input}
                                    /> */}
                            </View>
                            <View style={styles.searchSection}>
                                <Text style={styles.TextInputText}>Pre School</Text>
                                {/* <TextInput
                                        onChangeText={(text) => { setPassword(text) }}
                                        placeholder="Password"
                                        // value={Password}

                                        style={styles.input}
                                    /> */}
                            </View>

                        </View>
                    )
                }




            })()}

        </SafeAreaView>
    )
}
export default TutorSearchProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },


    Headers: {
        height: hp(10),
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
    HeadRight: {
        width: wp(45),
        height: hp(10),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",

    },
    icons: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: "center"
    },
    Bookicons: {
        height: 30,
        width: 30,
        // marginRight: 10,
        alignSelf: "center"
    },
    Locationicons: {
        height: 20,
        width: 20,
        // marginRight: 10,
        alignSelf: "center"
    },

    cardCenter: {
        // borderWidth: 0.2,
        height: 210,
        width: "60%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 50,
    },
    shadowPropCenter: {
        shadowOffset: { width: 8, height: 10 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    threeDotContainer: {
        height: 40,
        width: 40,
        backgroundColor: "#2F5597",
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    threeDoticons: {
        height: 30,
        width: 30,
        alignSelf: "center"
    },
    flagImage: {
        height: hp(2),
        width: wp(6),
        marginLeft: wp(2),
        alignSelf: "center"
    },
    leftImageWrapper: {
        width: wp(18),
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        height: 50,
        width: "33%",
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        fontSize: 15,
        color: 'black',
        alignSelf: "center"
    },
    infoText1: {
        fontSize: 15,
        color: 'black',
        alignSelf: "center",
        marginTop: 5,
        color: "grey"

    },
    line: {
        height: 40,
        width: 2,
        backgroundColor: "grey",
        marginTop: 5
    },
    FavBooKChat: {
        height: 50,
        width: 50,
        backgroundColor: "black",
        borderRadius: 25,
        marginHorizontal: 5,
        marginTop: -20,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"

    },
    FavBooKChatContainer: {
        height: 30,
        width: "33%",

    },
    moblieSec: {
        backgroundColor: "lightgrey",
        height: hp(7),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
        width: wp(90),
        flexDirection: "row",
        alignSelf: "center"
    },
    emailtoch: {
        backgroundColor: "lightgray",
        width: wp(30),
        height: hp(5),
        justifyContent: "center",
        borderRadius: 30
    },
    ButtonText: {
        color: "#fff",
        textAlign: "center"
    },
    mobiletoch: {
        backgroundColor: "#2F5597",
        width: wp(25),
        height: hp(6),
        borderRadius: 30,
        justifyContent: "center"
    },
    searchSection: {
        justifyContent: 'space-between',
        paddingBottom: 12,
        alignSelf: "center",
        marginTop: 5
    },
    TextInputText: {
        color: '#131313',
        // fontFamily: 'SharpSansDispNo1-Book',
        fontSize: 14,
        lineHeight: 16,
        paddingBottom: 8,
        // backgroundColor:"pink"
    },
})
