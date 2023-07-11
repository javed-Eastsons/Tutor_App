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
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const DrawerThird = () => {

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.HeadLeft}>
                    <Image source={require('../Assets/logo.jpg')}
                        style={styles.logoicons}
                    />



                </View>
            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Welcome.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Welcomeaaaaaa</Text>

                </View>
                <View style={styles.menusublist}>
                    <Text style={styles.subText}>Message from our director</Text>
                    <Text style={styles.subText}>About</Text>
                    <Text style={styles.subText}>Our Services</Text>
                    <Text style={styles.subText}>Our Tutors</Text>
                    <Text style={styles.subText}>Promotions</Text>

                </View>
            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Login.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Login</Text>

                </View>
                <View style={styles.menusublist}>
                    {/* <Text style={styles.subText}>My Profile</Text>
                    <Text style={styles.subText}>My Account</Text>
                    <Text style={styles.subText}>My Activities</Text>
                    <Text style={styles.subText}>Favourites</Text>
                    <Text style={styles.subText}>Make Payment</Text> */}

                </View>
            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Help.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Help & Support</Text>

                </View>

            </View>


            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Terms.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Terms & Conditions</Text>

                </View>

            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Privacy.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Privacy Policy</Text>

                </View>

            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Health.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Health Advisory</Text>

                </View>

            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>

                    <Text style={styles.LastText}>The Proof is in the pudding</Text>

                </View>


            </View>

            <View style={styles.SocialMainContainer}>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Fb.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Insta.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Twitter.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/LinkedIn.png')}
                        style={styles.icons}
                    />
                </View>
            </View>

        </View>
    )

}

export default DrawerThird;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // padding: 10,


    },
    head: {
        height: hp(10),
        // backgroundColor: "red"
    },
    subText: {
        color: '#fff'
    },
    logoicons: {
        height: 80,
        width: 80,
    },
    icons: {
        height: 25,
        width: 25,

    },
    MenuLIstContainer: {
        padding: 10,
        marginTop: 10
    },
    LastText: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: '700'
    },
    MenuLIst: {
        flexDirection: "row",
        // padding: 10,
        // marginTop: 20
    },
    menusublist: {
        marginLeft: 50
    },
    MenuHead: {
        padding: 5,
        fontSize: 16,
        color: 'yellow'
    },
    SocialMainContainer: {
        height: 100,
        width: "100%",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row'
    },
    SocialContainer: {
        height: 50,
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
    }
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
    TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TextInput } from 'react-native-gesture-handler';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const DrawerThird = () => {

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.HeadLeft}>
                    <Image source={require('../Assets/logo.jpg')}
                        style={styles.logoicons}
                    />



                </View>
            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Welcome.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Welcomeaaaaaa</Text>

                </View>
                <View style={styles.menusublist}>
                    <Text style={styles.subText}>Message from our director</Text>
                    <Text style={styles.subText}>About</Text>
                    <Text style={styles.subText}>Our Services</Text>
                    <Text style={styles.subText}>Our Tutors</Text>
                    <Text style={styles.subText}>Promotions</Text>

                </View>
            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Login.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Login</Text>

                </View>
                <View style={styles.menusublist}>
                    {/* <Text style={styles.subText}>My Profile</Text>
                    <Text style={styles.subText}>My Account</Text>
                    <Text style={styles.subText}>My Activities</Text>
                    <Text style={styles.subText}>Favourites</Text>
                    <Text style={styles.subText}>Make Payment</Text> */}

                </View>
            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Help.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Help & Support</Text>

                </View>

            </View>


            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Terms.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Terms & Conditions</Text>

                </View>

            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Privacy.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Privacy Policy</Text>

                </View>

            </View>
            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>
                    <Image source={require('../Assets/Health.png')}
                        style={styles.icons}
                    />
                    <Text style={styles.MenuHead}>Health Advisory</Text>

                </View>

            </View>

            <View style={styles.MenuLIstContainer}>
                <View style={styles.MenuLIst}>

                    <Text style={styles.LastText}>The Proof is in the pudding</Text>

                </View>


            </View>

            <View style={styles.SocialMainContainer}>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Fb.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Insta.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/Twitter.png')}
                        style={styles.icons}
                    />
                </View>
                <View style={styles.SocialContainer}>
                    <Image source={require('../Assets/LinkedIn.png')}
                        style={styles.icons}
                    />
                </View>
            </View>

        </View>
    )

}

export default DrawerThird;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // padding: 10,


    },
    head: {
        height: hp(10),
        // backgroundColor: "red"
    },
    subText: {
        color: '#fff'
    },
    logoicons: {
        height: 80,
        width: 80,
    },
    icons: {
        height: 25,
        width: 25,

    },
    MenuLIstContainer: {
        padding: 10,
        marginTop: 10
    },
    LastText: {
        color: '#fff',
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: '700'
    },
    MenuLIst: {
        flexDirection: "row",
        // padding: 10,
        // marginTop: 20
    },
    menusublist: {
        marginLeft: 50
    },
    MenuHead: {
        padding: 5,
        fontSize: 16,
        color: 'yellow'
    },
    SocialMainContainer: {
        height: 100,
        width: "100%",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row'
    },
    SocialContainer: {
        height: 50,
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
    }
>>>>>>> javedcode
})