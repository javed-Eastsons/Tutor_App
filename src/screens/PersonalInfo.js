import React, { useState } from "react";

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
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetUserProfile } from "../Redux/Actions/Tutors";
import { editProfile } from "../Redux/Actions/Tutors";
import { PersonalInfo_Data } from "../Redux/Actions/types";

import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

const PersonalInfo = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showemail, setShowEmail] = React.useState("Year of Birth");
  const { GET_USER_ID } = useSelector((state) => state.TutorReducer);
  const { Login_Data } = useSelector((state) => state.TutorReducer);
  const { SINGLE_USER } = useSelector((state) => state.TutorReducer);
  // console.log(
  //   SINGLE_USER,
  //   "SINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USERSINGLE_USER"
  // );

  console.log(GET_USER_ID, "Pika");
  const [pickerServices, setPickerServices] = useState(false);

  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [Age, setAge] = useState(0);
  const [userDetail, setUserDetail] = useState([]);
  const [loader, setLoader] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   console.log("selectedDateselectedDateselectedDate", selectedDate);
  //   const currentDate = selectedDate || date;
  //   console.log("d..........>>>>>>");

  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  //   //  setDataShow()

  //   console.log("LLLLLLLLLLLLLLLL", moment(currentDate).format("YYYY"));
  //   console.log("LLLLLLLLLLLLLLLL", moment(date).format("YYYY"));
  //   //   console.log('PPPPPPPPPPPPPP', date)
  //   var yourage =
  //     moment(date).format("YYYY") - moment(currentDate).format("YYYY");
  //   console.log(yourage);
  //   setAge(yourage);
  // };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    setDate(currentDate);

    // Calculate age based on birth year
    const birthYear = moment(currentDate).year();
    const currentYear = moment().year();
    const age = currentYear - birthYear;

    console.log("Birth Year:", birthYear);
    console.log("Current Year:", currentYear);
    console.log("Age:", age);

    // Set the age in your component's state
    setAge(age);


  };

  const showMode = (currentMode) => {
    setShow(true);
  };
  const showDatepicker = () => {
    showMode("date");
    setAge("");
  };
  console.log("!!!!!!!");
  const [nationality, setNationality] = useState([
    {
      "countrycode": "ABW",
      "countryname": "Aruba",
      "code": "AW"
    },
    {
      "countrycode": "AFG",
      "countryname": "Afghanistan",
      "code": "AF"
    },
    {
      "countrycode": "AGO",
      "countryname": "Angola",
      "code": "AO"
    },
    {
      "countrycode": "AIA",
      "countryname": "Anguilla",
      "code": "AI"
    },
    {
      "countrycode": "ALA",
      "countryname": "Aland",
      "code": "AX"
    },
    {
      "countrycode": "ALB",
      "countryname": "Albania",
      "code": "AL"
    },
    {
      "countrycode": "AND",
      "countryname": "Andorra",
      "code": "AD"
    },
    {
      "countrycode": "ARE",
      "countryname": "United Arab Emirates",
      "code": "AE"
    },
    {
      "countrycode": "ARG",
      "countryname": "Argentina",
      "code": "AR"
    },
    {
      "countrycode": "ARM",
      "countryname": "Armenia",
      "code": "AM"
    },
    {
      "countrycode": "ASM",
      "countryname": "American Samoa",
      "code": "AS"
    },
    {
      "countrycode": "ATA",
      "countryname": "Antarctica",
      "code": "AQ"
    },
    {
      "countrycode": "ATF",
      "countryname": "French Southern Territories",
      "code": "TF"
    },
    {
      "countrycode": "ATG",
      "countryname": "Antigua and Barbuda",
      "code": "AG"
    },
    {
      "countrycode": "AUS",
      "countryname": "Australia",
      "code": "AU"
    },
    {
      "countrycode": "AUT",
      "countryname": "Austria",
      "code": "AT"
    },
    {
      "countrycode": "AZE",
      "countryname": "Azerbaijan",
      "code": "AZ"
    },
    {
      "countrycode": "BDI",
      "countryname": "Burundi",
      "code": "BI"
    },
    {
      "countrycode": "BEL",
      "countryname": "Belgium",
      "code": "BE"
    },
    {
      "countrycode": "BEN",
      "countryname": "Benin",
      "code": "BJ"
    },
    {
      "countrycode": "BES",
      "countryname": "Bonaire",
      "code": "BQ"
    },
    {
      "countrycode": "BFA",
      "countryname": "Burkina Faso",
      "code": "BF"
    },
    {
      "countrycode": "BGD",
      "countryname": "Bangladesh",
      "code": "BD"
    },
    {
      "countrycode": "BGR",
      "countryname": "Bulgaria",
      "code": "BG"
    },
    {
      "countrycode": "BHR",
      "countryname": "Bahrain",
      "code": "BH"
    },
    {
      "countrycode": "BHS",
      "countryname": "Bahamas",
      "code": "BS"
    },
    {
      "countrycode": "BIH",
      "countryname": "Bosnia and Herzegovina",
      "code": "BA"
    },
    {
      "countrycode": "BLM",
      "countryname": "Saint Barthelemy",
      "code": "BL"
    },
    {
      "countrycode": "BLR",
      "countryname": "Belarus",
      "code": "BY"
    },
    {
      "countrycode": "BLZ",
      "countryname": "Belize",
      "code": "BZ"
    },
    {
      "countrycode": "BMU",
      "countryname": "Bermuda",
      "code": "BM"
    },
    {
      "countrycode": "BOL",
      "countryname": "Bolivia",
      "code": "BO"
    },
    {
      "countrycode": "BRA",
      "countryname": "Brazil",
      "code": "BR"
    },
    {
      "countrycode": "BRB",
      "countryname": "Barbados",
      "code": "BB"
    },
    {
      "countrycode": "BRN",
      "countryname": "Brunei",
      "code": "BN"
    },
    {
      "countrycode": "BTN",
      "countryname": "Bhutan",
      "code": "BT"
    },
    {
      "countrycode": "BVT",
      "countryname": "Bouvet Island",
      "code": "BV"
    },
    {
      "countrycode": "BWA",
      "countryname": "Botswana",
      "code": "BW"
    },
    {
      "countrycode": "CAF",
      "countryname": "Central African Republic",
      "code": "CF"
    },
    {
      "countrycode": "CAN",
      "countryname": "Canada",
      "code": "CA"
    },
    {
      "countrycode": "CCK",
      "countryname": "Cocos [Keeling] Islands",
      "code": "CC"
    },
    {
      "countrycode": "CHE",
      "countryname": "Switzerland",
      "code": "CH"
    },
    {
      "countrycode": "CHL",
      "countryname": "Chile",
      "code": "CL"
    },
    {
      "countrycode": "CHN",
      "countryname": "China",
      "code": "CN"
    },
    {
      "countrycode": "CIV",
      "countryname": "Ivory Coast",
      "code": "CI"
    },
    {
      "countrycode": "CMR",
      "countryname": "Cameroon",
      "code": "CM"
    },
    {
      "countrycode": "COD",
      "countryname": "Democratic Republic of the Congo",
      "code": "CD"
    },
    {
      "countrycode": "COG",
      "countryname": "Republic of the Congo",
      "code": "CG"
    },
    {
      "countrycode": "COK",
      "countryname": "Cook Islands",
      "code": "CK"
    },
    {
      "countrycode": "COL",
      "countryname": "Colombia",
      "code": "CO"
    },
    {
      "countrycode": "COM",
      "countryname": "Comoros",
      "code": "KM"
    },
    {
      "countrycode": "CPV",
      "countryname": "Cape Verde",
      "code": "CV"
    },
    {
      "countrycode": "CRI",
      "countryname": "Costa Rica",
      "code": "CR"
    },
    {
      "countrycode": "CUB",
      "countryname": "Cuba",
      "code": "CU"
    },
    {
      "countrycode": "CUW",
      "countryname": "Curacao",
      "code": "CW"
    },
    {
      "countrycode": "CXR",
      "countryname": "Christmas Island",
      "code": "CX"
    },
    {
      "countrycode": "CYM",
      "countryname": "Cayman Islands",
      "code": "KY"
    },
    {
      "countrycode": "CYP",
      "countryname": "Cyprus",
      "code": "CY"
    },
    {
      "countrycode": "CZE",
      "countryname": "Czech Republic",
      "code": "CZ"
    },
    {
      "countrycode": "DEU",
      "countryname": "Germany",
      "code": "DE"
    },
    {
      "countrycode": "DJI",
      "countryname": "Djibouti",
      "code": "DJ"
    },
    {
      "countrycode": "DMA",
      "countryname": "Dominica",
      "code": "DM"
    },
    {
      "countrycode": "DNK",
      "countryname": "Denmark",
      "code": "DK"
    },
    {
      "countrycode": "DOM",
      "countryname": "Dominican Republic",
      "code": "DO"
    },
    {
      "countrycode": "DZA",
      "countryname": "Algeria",
      "code": "DZ"
    },
    {
      "countrycode": "ECU",
      "countryname": "Ecuador",
      "code": "EC"
    },
    {
      "countrycode": "EGY",
      "countryname": "Egypt",
      "code": "EG"
    },
    {
      "countrycode": "ERI",
      "countryname": "Eritrea",
      "code": "ER"
    },
    {
      "countrycode": "ESH",
      "countryname": "Western Sahara",
      "code": "EH"
    },
    {
      "countrycode": "ESP",
      "countryname": "Spain",
      "code": "ES"
    },
    {
      "countrycode": "EST",
      "countryname": "Estonia",
      "code": "EE"
    },
    {
      "countrycode": "ETH",
      "countryname": "Ethiopia",
      "code": "ET"
    },
    {
      "countrycode": "FIN",
      "countryname": "Finland",
      "code": "FI"
    },
    {
      "countrycode": "FJI",
      "countryname": "Fiji",
      "code": "FJ"
    },
    {
      "countrycode": "FLK",
      "countryname": "Falkland Islands",
      "code": "FK"
    },
    {
      "countrycode": "FRA",
      "countryname": "France",
      "code": "FR"
    },
    {
      "countrycode": "FRO",
      "countryname": "Faroe Islands",
      "code": "FO"
    },
    {
      "countrycode": "FSM",
      "countryname": "Micronesia",
      "code": "FM"
    },
    {
      "countrycode": "GAB",
      "countryname": "Gabon",
      "code": "GA"
    },
    {
      "countrycode": "GBR",
      "countryname": "United Kingdom",
      "code": "GB"
    },
    {
      "countrycode": "GEO",
      "countryname": "Georgia",
      "code": "GE"
    },
    {
      "countrycode": "GGY",
      "countryname": "Guernsey",
      "code": "GG"
    },
    {
      "countrycode": "GHA",
      "countryname": "Ghana",
      "code": "GH"
    },
    {
      "countrycode": "GIB",
      "countryname": "Gibraltar",
      "code": "GI"
    },
    {
      "countrycode": "GIN",
      "countryname": "Guinea",
      "code": "GN"
    },
    {
      "countrycode": "GLP",
      "countryname": "Guadeloupe",
      "code": "GP"
    },
    {
      "countrycode": "GMB",
      "countryname": "Gambia",
      "code": "GM"
    },
    {
      "countrycode": "GNB",
      "countryname": "Guinea-Bissau",
      "code": "GW"
    },
    {
      "countrycode": "GNQ",
      "countryname": "Equatorial Guinea",
      "code": "GQ"
    },
    {
      "countrycode": "GRC",
      "countryname": "Greece",
      "code": "GR"
    },
    {
      "countrycode": "GRD",
      "countryname": "Grenada",
      "code": "GD"
    },
    {
      "countrycode": "GRL",
      "countryname": "Greenland",
      "code": "GL"
    },
    {
      "countrycode": "GTM",
      "countryname": "Guatemala",
      "code": "GT"
    },
    {
      "countrycode": "GUF",
      "countryname": "French Guiana",
      "code": "GF"
    },
    {
      "countrycode": "GUM",
      "countryname": "Guam",
      "code": "GU"
    },
    {
      "countrycode": "GUY",
      "countryname": "Guyana",
      "code": "GY"
    },
    {
      "countrycode": "HKG",
      "countryname": "Hong Kong",
      "code": "HK"
    },
    {
      "countrycode": "HMD",
      "countryname": "Heard Island and McDonald Islands",
      "code": "HM"
    },
    {
      "countrycode": "HND",
      "countryname": "Honduras",
      "code": "HN"
    },
    {
      "countrycode": "HRV",
      "countryname": "Croatia",
      "code": "HR"
    },
    {
      "countrycode": "HTI",
      "countryname": "Haiti",
      "code": "HT"
    },
    {
      "countrycode": "HUN",
      "countryname": "Hungary",
      "code": "HU"
    },
    {
      "countrycode": "IDN",
      "countryname": "Indonesia",
      "code": "ID"
    },
    {
      "countrycode": "IMN",
      "countryname": "Isle of Man",
      "code": "IM"
    },
    {
      "countrycode": "IND",
      "countryname": "India",
      "code": "IN"
    },
    {
      "countrycode": "IOT",
      "countryname": "British Indian Ocean Territory",
      "code": "IO"
    },
    {
      "countrycode": "IRL",
      "countryname": "Ireland",
      "code": "IE"
    },
    {
      "countrycode": "IRN",
      "countryname": "Iran",
      "code": "IR"
    },
    {
      "countrycode": "IRQ",
      "countryname": "Iraq",
      "code": "IQ"
    },
    {
      "countrycode": "ISL",
      "countryname": "Iceland",
      "code": "IS"
    },
    {
      "countrycode": "ISR",
      "countryname": "Israel",
      "code": "IL"
    },
    {
      "countrycode": "ITA",
      "countryname": "Italy",
      "code": "IT"
    },
    {
      "countrycode": "JAM",
      "countryname": "Jamaica",
      "code": "JM"
    },
    {
      "countrycode": "JEY",
      "countryname": "Jersey",
      "code": "JE"
    },
    {
      "countrycode": "JOR",
      "countryname": "Jordan",
      "code": "JO"
    },
    {
      "countrycode": "JPN",
      "countryname": "Japan",
      "code": "JP"
    },
    {
      "countrycode": "KAZ",
      "countryname": "Kazakhstan",
      "code": "KZ"
    },
    {
      "countrycode": "KEN",
      "countryname": "Kenya",
      "code": "KE"
    },
    {
      "countrycode": "KGZ",
      "countryname": "Kyrgyzstan",
      "code": "KG"
    },
    {
      "countrycode": "KHM",
      "countryname": "Cambodia",
      "code": "KH"
    },
    {
      "countrycode": "KIR",
      "countryname": "Kiribati",
      "code": "KI"
    },
    {
      "countrycode": "KNA",
      "countryname": "Saint Kitts and Nevis",
      "code": "KN"
    },
    {
      "countrycode": "KOR",
      "countryname": "South Korea",
      "code": "KR"
    },
    {
      "countrycode": "KWT",
      "countryname": "Kuwait",
      "code": "KW"
    },
    {
      "countrycode": "LAO",
      "countryname": "Laos",
      "code": "LA"
    },
    {
      "countrycode": "LBN",
      "countryname": "Lebanon",
      "code": "LB"
    },
    {
      "countrycode": "LBR",
      "countryname": "Liberia",
      "code": "LR"
    },
    {
      "countrycode": "LBY",
      "countryname": "Libya",
      "code": "LY"
    },
    {
      "countrycode": "LCA",
      "countryname": "Saint Lucia",
      "code": "LC"
    },
    {
      "countrycode": "LIE",
      "countryname": "Liechtenstein",
      "code": "LI"
    },
    {
      "countrycode": "LKA",
      "countryname": "Sri Lanka",
      "code": "LK"
    },
    {
      "countrycode": "LSO",
      "countryname": "Lesotho",
      "code": "LS"
    },
    {
      "countrycode": "LTU",
      "countryname": "Lithuania",
      "code": "LT"
    },
    {
      "countrycode": "LUX",
      "countryname": "Luxembourg",
      "code": "LU"
    },
    {
      "countrycode": "LVA",
      "countryname": "Latvia",
      "code": "LV"
    },
    {
      "countrycode": "MAC",
      "countryname": "Macao",
      "code": "MO"
    },
    {
      "countrycode": "MAF",
      "countryname": "Saint Martin",
      "code": "MF"
    },
    {
      "countrycode": "MAR",
      "countryname": "Morocco",
      "code": "MA"
    },
    {
      "countrycode": "MCO",
      "countryname": "Monaco",
      "code": "MC"
    },
    {
      "countrycode": "MDA",
      "countryname": "Moldova",
      "code": "MD"
    },
    {
      "countrycode": "MDG",
      "countryname": "Madagascar",
      "code": "MG"
    },
    {
      "countrycode": "MDV",
      "countryname": "Maldives",
      "code": "MV"
    },
    {
      "countrycode": "MEX",
      "countryname": "Mexico",
      "code": "MX"
    },
    {
      "countrycode": "MHL",
      "countryname": "Marshall Islands",
      "code": "MH"
    },
    {
      "countrycode": "MKD",
      "countryname": "Macedonia",
      "code": "MK"
    },
    {
      "countrycode": "MLI",
      "countryname": "Mali",
      "code": "ML"
    },
    {
      "countrycode": "MLT",
      "countryname": "Malta",
      "code": "MT"
    },
    {
      "countrycode": "MMR",
      "countryname": "Myanmar [Burma]",
      "code": "MM"
    },
    {
      "countrycode": "MNE",
      "countryname": "Montenegro",
      "code": "ME"
    },
    {
      "countrycode": "MNG",
      "countryname": "Mongolia",
      "code": "MN"
    },
    {
      "countrycode": "MNP",
      "countryname": "Northern Mariana Islands",
      "code": "MP"
    },
    {
      "countrycode": "MOZ",
      "countryname": "Mozambique",
      "code": "MZ"
    },
    {
      "countrycode": "MRT",
      "countryname": "Mauritania",
      "code": "MR"
    },
    {
      "countrycode": "MSR",
      "countryname": "Montserrat",
      "code": "MS"
    },
    {
      "countrycode": "MTQ",
      "countryname": "Martinique",
      "code": "MQ"
    },
    {
      "countrycode": "MUS",
      "countryname": "Mauritius",
      "code": "MU"
    },
    {
      "countrycode": "MWI",
      "countryname": "Malawi",
      "code": "MW"
    },
    {
      "countrycode": "MYS",
      "countryname": "Malaysia",
      "code": "MY"
    },
    {
      "countrycode": "MYT",
      "countryname": "Mayotte",
      "code": "YT"
    },
    {
      "countrycode": "NAM",
      "countryname": "Namibia",
      "code": "NA"
    },
    {
      "countrycode": "NCL",
      "countryname": "New Caledonia",
      "code": "NC"
    },
    {
      "countrycode": "NER",
      "countryname": "Niger",
      "code": "NE"
    },
    {
      "countrycode": "NFK",
      "countryname": "Norfolk Island",
      "code": "NF"
    },
    {
      "countrycode": "NGA",
      "countryname": "Nigeria",
      "code": "NG"
    },
    {
      "countrycode": "NIC",
      "countryname": "Nicaragua",
      "code": "NI"
    },
    {
      "countrycode": "NIU",
      "countryname": "Niue",
      "code": "NU"
    },
    {
      "countrycode": "NLD",
      "countryname": "Netherlands",
      "code": "NL"
    },
    {
      "countrycode": "NOR",
      "countryname": "Norway",
      "code": "NO"
    },
    {
      "countrycode": "NPL",
      "countryname": "Nepal",
      "code": "NP"
    },
    {
      "countrycode": "NRU",
      "countryname": "Nauru",
      "code": "NR"
    },
    {
      "countrycode": "NZL",
      "countryname": "New Zealand",
      "code": "NZ"
    },
    {
      "countrycode": "OMN",
      "countryname": "Oman",
      "code": "OM"
    },
    {
      "countrycode": "PAK",
      "countryname": "Pakistan",
      "code": "PK"
    },
    {
      "countrycode": "PAN",
      "countryname": "Panama",
      "code": "PA"
    },
    {
      "countrycode": "PCN",
      "countryname": "Pitcairn Islands",
      "code": "PN"
    },
    {
      "countrycode": "PER",
      "countryname": "Peru",
      "code": "PE"
    },
    {
      "countrycode": "PHL",
      "countryname": "Philippines",
      "code": "PH"
    },
    {
      "countrycode": "PLW",
      "countryname": "Palau",
      "code": "PW"
    },
    {
      "countrycode": "PNG",
      "countryname": "Papua New Guinea",
      "code": "PG"
    },
    {
      "countrycode": "POL",
      "countryname": "Poland",
      "code": "PL"
    },
    {
      "countrycode": "PRI",
      "countryname": "Puerto Rico",
      "code": "PR"
    },
    {
      "countrycode": "PRK",
      "countryname": "North Korea",
      "code": "KP"
    },
    {
      "countrycode": "PRT",
      "countryname": "Portugal",
      "code": "PT"
    },
    {
      "countrycode": "PRY",
      "countryname": "Paraguay",
      "code": "PY"
    },
    {
      "countrycode": "PSE",
      "countryname": "Palestine",
      "code": "PS"
    },
    {
      "countrycode": "PYF",
      "countryname": "French Polynesia",
      "code": "PF"
    },
    {
      "countrycode": "QAT",
      "countryname": "Qatar",
      "code": "QA"
    },
    {
      "countrycode": "REU",
      "countryname": "Reunion",
      "code": "RE"
    },
    {
      "countrycode": "ROU",
      "countryname": "Romania",
      "code": "RO"
    },
    {
      "countrycode": "RUS",
      "countryname": "Russia",
      "code": "RU"
    },
    {
      "countrycode": "RWA",
      "countryname": "Rwanda",
      "code": "RW"
    },
    {
      "countrycode": "SAU",
      "countryname": "Saudi Arabia",
      "code": "SA"
    },
    {
      "countrycode": "SDN",
      "countryname": "Sudan",
      "code": "SD"
    },
    {
      "countrycode": "SEN",
      "countryname": "Senegal",
      "code": "SN"
    },
    {
      "countrycode": "SGP",
      "countryname": "Singapore",
      "code": "SG"
    },
    {
      "countrycode": "SGS",
      "countryname": "South Georgia and the South Sandwich Islands",
      "code": "GS"
    },
    {
      "countrycode": "SHN",
      "countryname": "Saint Helena",
      "code": "SH"
    },
    {
      "countrycode": "SJM",
      "countryname": "Svalbard and Jan Mayen",
      "code": "SJ"
    },
    {
      "countrycode": "SLB",
      "countryname": "Solomon Islands",
      "code": "SB"
    },
    {
      "countrycode": "SLE",
      "countryname": "Sierra Leone",
      "code": "SL"
    },
    {
      "countrycode": "SLV",
      "countryname": "El Salvador",
      "code": "SV"
    },
    {
      "countrycode": "SMR",
      "countryname": "San Marino",
      "code": "SM"
    },
    {
      "countrycode": "SOM",
      "countryname": "Somalia",
      "code": "SO"
    },
    {
      "countrycode": "SPM",
      "countryname": "Saint Pierre and Miquelon",
      "code": "PM"
    },
    {
      "countrycode": "SRB",
      "countryname": "Serbia",
      "code": "RS"
    },
    {
      "countrycode": "SSD",
      "countryname": "South Sudan",
      "code": "SS"
    },
    {
      "countrycode": "STP",
      "countryname": "Sao Tome and Principe",
      "code": "ST"
    },
    {
      "countrycode": "SUR",
      "countryname": "Suriname",
      "code": "SR"
    },
    {
      "countrycode": "SVK",
      "countryname": "Slovakia",
      "code": "SK"
    },
    {
      "countrycode": "SVN",
      "countryname": "Slovenia",
      "code": "SI"
    },
    {
      "countrycode": "SWE",
      "countryname": "Sweden",
      "code": "SE"
    },
    {
      "countrycode": "SWZ",
      "countryname": "Swaziland",
      "code": "SZ"
    },
    {
      "countrycode": "SXM",
      "countryname": "Sint Maarten",
      "code": "SX"
    },
    {
      "countrycode": "SYC",
      "countryname": "Seychelles",
      "code": "SC"
    },
    {
      "countrycode": "SYR",
      "countryname": "Syria",
      "code": "SY"
    },
    {
      "countrycode": "TCA",
      "countryname": "Turks and Caicos Islands",
      "code": "TC"
    },
    {
      "countrycode": "TCD",
      "countryname": "Chad",
      "code": "TD"
    },
    {
      "countrycode": "TGO",
      "countryname": "Togo",
      "code": "TG"
    },
    {
      "countrycode": "THA",
      "countryname": "Thailand",
      "code": "TH"
    },
    {
      "countrycode": "TJK",
      "countryname": "Tajikistan",
      "code": "TJ"
    },
    {
      "countrycode": "TKL",
      "countryname": "Tokelau",
      "code": "TK"
    },
    {
      "countrycode": "TKM",
      "countryname": "Turkmenistan",
      "code": "TM"
    },
    {
      "countrycode": "TLS",
      "countryname": "East Timor",
      "code": "TL"
    },
    {
      "countrycode": "TON",
      "countryname": "Tonga",
      "code": "TO"
    },
    {
      "countrycode": "TTO",
      "countryname": "Trinidad and Tobago",
      "code": "TT"
    },
    {
      "countrycode": "TUN",
      "countryname": "Tunisia",
      "code": "TN"
    },
    {
      "countrycode": "TUR",
      "countryname": "Turkey",
      "code": "TR"
    },
    {
      "countrycode": "TUV",
      "countryname": "Tuvalu",
      "code": "TV"
    },
    {
      "countrycode": "TWN",
      "countryname": "Taiwan",
      "code": "TW"
    },
    {
      "countrycode": "TZA",
      "countryname": "Tanzania",
      "code": "TZ"
    },
    {
      "countrycode": "UGA",
      "countryname": "Uganda",
      "code": "UG"
    },
    {
      "countrycode": "UKR",
      "countryname": "Ukraine",
      "code": "UA"
    },
    {
      "countrycode": "UMI",
      "countryname": "U.S. Minor Outlying Islands",
      "code": "UM"
    },
    {
      "countrycode": "URY",
      "countryname": "Uruguay",
      "code": "UY"
    },
    {
      "countrycode": "USA",
      "countryname": "United States",
      "code": "US"
    },
    {
      "countrycode": "UZB",
      "countryname": "Uzbekistan",
      "code": "UZ"
    },
    {
      "countrycode": "VAT",
      "countryname": "Vatican City",
      "code": "VA"
    },
    {
      "countrycode": "VCT",
      "countryname": "Saint Vincent and the Grenadines",
      "code": "VC"
    },
    {
      "countrycode": "VEN",
      "countryname": "Venezuela",
      "code": "VE"
    },
    {
      "countrycode": "VGB",
      "countryname": "British Virgin Islands",
      "code": "VG"
    },
    {
      "countrycode": "VIR",
      "countryname": "U.S. Virgin Islands",
      "code": "VI"
    },
    {
      "countrycode": "VNM",
      "countryname": "Vietnam",
      "code": "VN"
    },
    {
      "countrycode": "VUT",
      "countryname": "Vanuatu",
      "code": "VU"
    },
    {
      "countrycode": "WLF",
      "countryname": "Wallis and Futuna",
      "code": "WF"
    },
    {
      "countrycode": "WSM",
      "countryname": "Samoa",
      "code": "WS"
    },
    {
      "countrycode": "XKX",
      "countryname": "Kosovo",
      "code": "XK"
    },
    {
      "countrycode": "YEM",
      "countryname": "Yemen",
      "code": "YE"
    },
    {
      "countrycode": "ZAF",
      "countryname": "South Africa",
      "code": "ZA"
    },
    {
      "countrycode": "ZMB",
      "countryname": "Zambia",
      "code": "ZM"
    },
    {
      "countrycode": "ZWE",
      "countryname": "Zimbabwe",
      "code": "ZW"
    }
  ]);
  const [selectnational, setSelectNational] = useState("");
  const [selectflag, setSelectFlag] = useState("sg");
  const [national, setNational] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [withoutfilter, setWithoutFilter] = useState("");
  const [persSave, setPersSave] = useState(false);

  const SearchFilterFunction = (text) => {
    const searchWord = text.toUpperCase();
    const newFilter = nationality.filter((value) => {
      const itemData = value.countryname
        ? value.countryname.toUpperCase()
        : "".toUpperCase();
      return itemData.indexOf(searchWord) > -1;
    });

    console.log("search word================>", searchWord, newFilter);

    if (text === "") {
      // setFilterData([]);
      setSelectNational("")

    } else {
      setFilterData(newFilter);
      setSelectNational(text)
    }
    //setWithoutFilter(text);
  };

  // const SearchFilterFunction = (text) => {
  //   const searchWord = text;
  //   const newFilter = nationality.filter((value) => {
  //     const itemData = value.countryname
  //       ? value.countryname.toUpperCase()
  //       : "".toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });

  //   console.log("search word================>", searchWord, newFilter);
  //   setWithoutFilter(searchWord);
  //   if (searchWord === "") {
  //     setFilterData([]);
  //   } else {
  //     setFilterData(newFilter);
  //   }
  // };

  const [markGender, setMarkGender] = useState("");
  const [increateTime, setincreseTime] = useState(new Date());

  useEffect(() => {
    dispatch(GetUserProfile(Login_Data.userid));
  }, []);

  useEffect(() => {
    setUserDetail(SINGLE_USER);
  }, [SINGLE_USER]);

  console.log(route.params.PersonalInfo_info.Age, 'AGE', userDetail[0]?.Extra_info[0]?.age);
  console.log(route.params.PersonalInfo_info.markGender, 'MArkGender');
  console.log(route.params.PersonalInfo_info.selectnational, 'selectnational');
  console.log(route.params.PersonalInfo_info.selectflag, 'selectflag');
  console.log(route.params.PersonalInfo_info.year, 'year');
  console.log(route.params.PersonalInfo_info.national, 'national');


  useEffect(() => {
    setLoader(true);
    setUserDetail(SINGLE_USER);

    if (route.params.PersonalInfo_info.selectflag == undefined || route.params.PersonalInfo_info.selectflag == "" && route.params.PersonalInfo_info.selectnational == undefined || route.params.PersonalInfo_info.selectnational == "" && userDetail[0]?.Extra_info[0]?.nationality == "") {
      setNational("Singapore")
      setSelectFlag("sg")


    }

    else if (route.params.PersonalInfo_info.selectnational == undefined || route.params.PersonalInfo_info.selectnational == "" && userDetail[0]?.Extra_info[0]?.nationality != "") {


      setNational(userDetail[0]?.Extra_info[0]?.nationality);
      setSelectFlag(userDetail[0]?.Extra_info[0]?.flag)
    }
    else {
      setNational(route.params.PersonalInfo_info.selectnational)
      setSelectFlag(route.params.PersonalInfo_info.selectflag)


    }


    if (route.params.PersonalInfo_info.Age == undefined && route.params.PersonalInfo_info.markGender == undefined && route.params.PersonalInfo_info.selectnational == undefined && route.params.PersonalInfo_info.selectflag == undefined) {
      setAge(userDetail[0]?.Extra_info[0]?.age);
      setSelectFlag(userDetail[0]?.Extra_info[0]?.flag)
      setMarkGender(userDetail[0]?.Extra_info[0]?.gender);
      //  setNational(userDetail[0]?.Extra_info[0]?.nationality);
      setDate(userDetail[0]?.Extra_info[0]?.date_of_year)
      // setNational(route.params.PersonalInfo_info.selectnational)



    }
    else {
      setAge(route.params.PersonalInfo_info.Age)
      setMarkGender(route.params.PersonalInfo_info.markGender)
      setSelectNational(route.params.PersonalInfo_info.selectnational)
      // setNational(route.params.PersonalInfo_info.selectnational)
      setSelectFlag(route.params.PersonalInfo_info.selectflag)
      setDate(route.params.PersonalInfo_info.year)





    }

    // setMarkGender(route.params.PersonalInfo_info.markGender)
    // setSelectNational(route.params.PersonalInfo_info.selectnational)
    // setNational(route.params.PersonalInfo_info.selectnational)
    // setSelectFlag(route.params.PersonalInfo_info.selectflag)

    // setAge(userDetail[0]?.Extra_info[0]?.age);
    //setMarkGender(userDetail[0]?.Extra_info[0]?.gender);
    //setNational(userDetail[0]?.Extra_info[0]?.nationality);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [SINGLE_USER, setAge]);

  // useEffect(() => {}, [setAge]);

  var date1 = moment(new Date()).format("MM-YYYY");
  var date2 = moment(date).format("YYYY");

  // console.log(Age, "AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  var Difference_In_Time = date1 - date2;
  //console.log('datesssssssssss', date2);
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // console.log('Difference_In_Days', Difference_In_Days)
  //var valueDayas = Math.trunc(Difference_In_Days)
  // console.log('valueDayas', valueDayas)
  //   console.log("Total number of days between dates  <br>"
  //            + date1 + "<br> and <br>"
  //            + date2 + " is: <br> "
  //            + Difference_In_Days);

  console.log(route.params.RouteFrom, 'fromfromfromfrom');
  console.log(route.params.PersonalInfo_info, 'PersonalInfo_infoPersonalInfo_info');
  console.log(selectflag, 'selectflagselectflagselectflagselectflag')

  const personalinfofun = () => {
    // console.log(route.params.RouteFrom, 'fromfromfromfrom');
    // console.log(route.params.PersonalInfo_info, 'PersonalInfo_infoPersonalInfo_info');

    if (Age == "" || Age == undefined) {
      Alert.alert('Data Missing');
    }
    else if (markGender == "" || markGender == undefined) {
      Alert.alert('Data Missing');
    }
    // else if (selectnational == "" || selectnational == undefined) {
    //   Alert.alert('Data Missing');
    // }
    else if (national == "" || national == undefined) {
      Alert.alert('Data Missing');
    }
    else {



      console.log(Age, markGender, selectnational, national, selectflag, "????????????????");

      let obj = {
        Age: Age,
        markGender: markGender,
        //  selectnational: selectnational,
        selectnational: national,
        persSave: persSave,
        selectflag: selectflag == undefined ? "sg" : selectflag.toLowerCase(),
        year: moment(date).format("YYYY")
      };

      dispatch({
        type: PersonalInfo_Data,
        payload: obj,
      });


      console.log(obj, 'KKKKKKKKKKKKKKKK')

      // dispatch(editProfile(Age, markGender,selectnational, GET_USER_ID));

      if (route.params.RouteFrom == "Update") {
        navigation.navigate("UpdateProfile", {
          Age: Age,
          markGender: markGender,
          selectnational: selectnational,
          GET_USER_ID: GET_USER_ID,
        });
      } else {
        navigation.navigate("YourProfle", {
          Age: Age,
          markGender: markGender,
          selectnational: selectnational,
          GET_USER_ID: GET_USER_ID,
          persSave: persSave,
        });
      }

    }
  };


  //console.log(PersonalInfo_Data, 'PersonalInfo_DataPersonalInfo_DataPersonalInfo_Data')

  // if (loader == true) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center" }}>
  //       <ActivityIndicator style={{ alignSelf: "center" }} size={"small"} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* <View style={{flex:0.9}}> */}
      <View style={styles.Headers}>
        <View style={styles.HeadLeft}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../Assets/baricon.png")}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.HeadRight}>

          <View>
            <Image source={require("../Assets/chat.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}>Support</Text>
          </View>

          <View>
            <Image source={require("../Assets/bell.png")} style={styles.icons} />
            <Text style={{ fontSize: 10 }}></Text>
          </View>
          {/* <Image source={require("../Assets/bell.png")} style={styles.icons} /> */}

          {/* <Image
            source={require("../Assets/search.png")}
            style={styles.icons}
          /> */}
          {/* <Image source={require("../Assets/chat.png")} style={styles.icons} /> */}
        </View>
      </View>

      {loader == true ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator style={{ alignSelf: "center" }} size={"small"} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.moblieSec}>
            <TouchableOpacity
              style={[
                styles.mobiletoch,
                {
                  backgroundColor:
                    showemail == "Year of Birth" ? "#2F5597" : "lightgrey",
                },
              ]}
              onPress={() => setShowEmail("Year of Birth")}
            >
              <Text
                style={[
                  styles.ButtonText,
                  { color: showemail == "Year of Birth" ? "#fff" : "#000" },
                ]}
              >
                Year of Birth
              </Text>
            </TouchableOpacity>
            <TouchableOpacity

              disabled={Age == "" || Age == undefined || Age <= 16 ? true : false}
              style={[
                styles.emailtoch,
                {
                  backgroundColor:
                    showemail == "Gender" ? "#2F5597" : "lightgrey",
                },
              ]}
              onPress={() => setShowEmail("Gender")}
            >
              <Text
                style={[
                  styles.ButtonText,
                  { color: showemail == "Gender" ? "#fff" : "#000" },
                ]}
              >
                Gender
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={Age == "" || Age == undefined ? true : false}
              style={[
                styles.nationaltoch,
                {
                  backgroundColor:
                    showemail == "Nationality" ? "#2F5597" : "lightgrey",
                },
              ]}
              onPress={() => {
                setShowEmail("Nationality");
                //  setPickerServices(true);
              }}
            //  onPress={() => setPickerServices(true)}
            >
              <Text
                style={[
                  styles.ButtonText,
                  { color: showemail == "Nationality" ? "#fff" : "#000" },
                ]}
              >
                Nationality
              </Text>
            </TouchableOpacity>
          </View>

          {showemail == "Year of Birth" && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.9 }}>
                {console.log(
                  moment(new Date()).format("YYYY"),
                  moment(date).format("YYYY")
                )}

                <TouchableOpacity
                  onPress={() => showDatepicker()}
                  style={{
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "lightgrey",
                    height: hp(5),
                    width: wp(80),
                    marginTop: hp(2),
                    marginLeft: wp(5),
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ fontSize: 15, color: "#000", paddingLeft: wp(3) }}
                  >

                    {moment(date).format("YYYY")}
                    {/* {Age == "" ?
                      moment(date).add(Age, 'years').format('YYYY')
                      //   moment(date).format("YYYY")
                      :
                      moment(date).subtract(Age, 'years').format('YYYY')
                    } */}
                    {/* } */}
                    {/* {moment(date).subtract(Age, 'years').format('YYYY')} */}
                    {/* {moment(date).format("YYYY")} */}
                  </Text>

                  <View
                    style={{
                      height: hp(5),
                      width: wp(13),
                      backgroundColor: "#2F5597",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/CalendarWhite.png")}
                      style={{ height: hp(4), width: wp(6) }}
                    />
                  </View>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}

                <View
                  style={{
                    marginTop: hp(10),
                    marginLeft: wp(5),
                    marginLeft: wp(15),
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#000" }}>Your Age</Text>

                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      elevation: 1,
                      marginTop: hp(1),
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderColor: "lightgrey",
                      height: hp(6),
                      width: wp(35),
                      flexDirection: "row",
                    }}
                  >
                    {/* <TextInput 
                          placeholder='2'
                          placeholderTextColor={'#000'}
                          style={{fontSize:13,color:'#000', paddingLeft:wp(4)}}
                         /> */}
                    {console.log("yourage", typeof Age, Age)}
                    {/* <TextInput
                  style={{
                    color: "#000",
                    fontSize: 14,
                    height: hp(5),

                    //  backgroundColor: "red",
                    fontWeight: "800",
                    //  marginLeft: wp(3),
                  }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder={"Enter age"}
                  keyboardType="default"
                  returnKeyType="done"
                  autoCapitalize="none"
                  value={Age}
                  // onChangeText={(text) => setAge(text)}
                /> */}
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#000",
                        paddingLeft: wp(4),
                      }}
                    >
                      {Age}
                    </Text>
                    <View
                      style={{
                        height: hp(5),
                        width: wp(13),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../Assets/assests.png")}
                        style={{ height: hp(4), width: wp(6) }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 10 }}>Age should be more than 16.</Text>
                </View>
              </View>
              <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                {/* <TouchableOpacity style={styles.circleArrow}>
                  <Image source={require("../Assets/circleArrow.png")} />
                </TouchableOpacity> */}
              </View>
            </View>
          )}
          {showemail == "Gender" && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.9 }}>

                {console.log(markGender, 'ssssssssssss')}


                {markGender == "Male" ?
                  <View
                    style={{
                      backgroundColor: "White",
                      height: hp(8),
                      width: wp(90),
                      borderRadius: 50,
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: hp(10),

                    }}
                  >
                    <Image
                      source={require("../Assets/Male.png")}
                      style={{ height: hp(20), resizeMode: 'contain' }}
                    />
                  </View>
                  : markGender == "Female" ?
                    <View
                      style={{
                        backgroundColor: "White",
                        height: hp(8),
                        width: wp(90),
                        borderRadius: 50,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: hp(10),

                      }}
                    >
                      <Image
                        source={require("../Assets/Female.png")}
                        style={{ height: hp(20), resizeMode: 'contain' }}
                      />
                    </View>
                    :


                    <View
                      style={{
                        backgroundColor: "White",
                        height: hp(8),
                        width: wp(90),
                        borderRadius: 50,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: hp(10),

                      }}
                    >
                      <Image
                        source={require("../Assets/NoGender.png")}
                        style={{ height: hp(20), resizeMode: 'contain' }}
                      />
                    </View>
                }



                {/* <Text style={{ fontSize: 20, padding: 10, color: "black" }}>
                  {markGender}
                </Text> */}
                <View style={{ marginTop: wp(20), flexDirection: "row", width: wp(90), justifyContent: "space-between", alignSelf: "center" }}>

                  <TouchableOpacity onPress={() => setMarkGender("Male")}>

                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "grey",
                        alignItems: "center",
                        backgroundColor:
                          markGender == "Male" ? "#2F5597" : "#fff",
                        height: hp(4),
                        width: wp(15),
                        marginLeft: wp(3),
                        marginTop: hp(3),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: markGender == "Male" ? "#fff" : "grey",
                        }}
                      >
                        Male
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setMarkGender("Female")}>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "grey",
                          alignItems: "center",
                          backgroundColor:
                            markGender == "Female" ? "#2F5597" : "#fff",
                          height: hp(4),
                          marginRight: wp(3),
                          width: wp(19),
                          marginLeft: wp(3),
                          marginTop: hp(3),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: markGender == "Female" ? "#fff" : "grey",
                            fontSize: 16,
                          }}
                        >
                          Female
                        </Text>
                      </View>


                    </View>
                  </TouchableOpacity>
                </View>

              </View>
              <View style={{ flex: 0.1, justifyContent: "flex-end" }}>
                {/* <TouchableOpacity style={styles.circleArrow}>
                  <Image source={require("../Assets/circleArrow.png")} />
                </TouchableOpacity> */}
              </View>
            </View>
          )}
          {showemail == "Nationality" && (
            <>
              <View style={{ flex: 0.9 }}>
                <TouchableOpacity
                  onPress={() => setPickerServices(true)}
                  style={{
                    height: hp(6),
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    marginLeft: wp(5),
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: wp(90),
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    marginTop: hp(10),
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >

                    {console.log("https://colwithfarmchips.co.uk/projects/tutorapp/flags-medium/" + selectflag + ".png", 'selectflagselectflag')}
                    {selectflag ?

                      <Image
                        source={{ uri: `https://colwithfarmchips.co.uk/projects/tutorapp/flags-medium/${selectflag.toLowerCase()}.png` }}
                        style={{ height: hp(3), width: wp(6), marginLeft: wp(5) }}
                      />

                      :
                      <Image
                        source={require("../Assets/Singapore.png")}
                        style={{ height: hp(3), width: wp(6), marginLeft: wp(5) }}
                      />
                    }

                    {/* {selectflag ?

                      <Image
                        source={{ uri: `https://refuel.site/projects/tutorapp/flags-medium/${selectflag.toLowerCase()}.png` }}
                        style={{ height: hp(3), width: wp(6), marginLeft: wp(5) }}
                      />

                      :
                      // Handle the case where selectflag is undefined or not set
                      null // Or display an error message or default image
                    } */}
                    <Text
                      style={{ color: "#000", fontSize: 13, marginLeft: wp(4) }}
                    >
                      {national}
                      {/* {selectnational} */}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#2F5597",
                      height: hp(6),
                      width: wp(15),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../Assets/Pencil.png")}
                      style={{ height: hp(3), width: wp(5) }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={pickerServices}
                onRequestClose={() => {
                  setPickerServices(false);
                }}
              >
                <View style={styles.modalWrapper2}>
                  <View style={styles.modalWrapp}>
                    <View style={styles.crossWRapper}>
                      <TouchableOpacity
                        onPress={() => setPickerServices(false)}
                        style={styles.crossImageWrapper}
                      >
                        <Image
                          source={require("../Assets/closeingray.png")}
                          style={styles.crossImage}
                        />
                      </TouchableOpacity>
                      {/* <View style={styles.tickWrapper}>
                        <Image
                          source={require("../Assets/right.png")}
                          style={styles.tickImage}
                        />
                      </View> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ color: "grey", fontSize: 18 }}>
                        Select Nationality
                      </Text>
                    </View>
                    <View style={{ marginLeft: wp(5), marginTop: hp(2) }}>
                      {/* <Text
                        style={{
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "800",
                        }}
                      >
                        Select One Option
                      </Text> */}

                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#000",
                          paddingHorizontal: wp(4),
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: hp(6),
                          width: wp(90),
                          borderRadius: 9,
                          marginTop: hp(2),
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                          }}
                        >
                          {selectflag ?

                            <Image
                              source={{ uri: `https://colwithfarmchips.co.uk/projects/tutorapp/flags-medium/${selectflag.toLowerCase()}.png` }}
                              style={{ height: hp(3), width: wp(6), marginLeft: wp(5) }}
                            />

                            :
                            <Image
                              source={require("../Assets/Singapore.png")}
                              style={{ height: hp(2.5), width: wp(6) }}
                            />
                          }

                          <TextInput
                            style={{
                              color: "#000",
                              fontSize: 14,
                              fontWeight: "800",
                              marginLeft: wp(3),
                              //backgroundColor: "red",
                              width: wp(60)
                            }}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder={"Enter the country"}
                            keyboardType="default"
                            returnKeyType="done"
                            autoCapitalize="none"
                            value={selectnational}
                            onChangeText={(text) => SearchFilterFunction(text)}
                          />
                        </View>
                        <TouchableOpacity>
                          <Image
                            source={require("../Assets/search.png")}
                            style={{ height: hp(3), width: wp(6) }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {filterData.length > 0 ? (
                      <View style={{ paddingBottom: hp(7) }}>
                        <FlatList
                          data={filterData}
                          numColumns={1}
                          keyExtractor={(item, index) => index}
                          showsVerticalScrollIndicator={true}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectNational(item.countryname);
                                setSelectFlag(item.code);
                                setNational(item.countryname);
                                setPickerServices(false);
                              }}
                              style={{
                                height: hp(4.5),
                                alignItems: "center",
                                width: wp(90),
                                flexDirection: "row",
                                backgroundColor:
                                  selectnational == item.countryname
                                    ? "#2F5597"
                                    : "#fff",
                                marginTop: hp(2),
                                marginLeft:20
                              }}
                            >
                              <Image
                                source={{ uri: "https://colwithfarmchips.co.uk/projects/tutorapp/flags-medium/" + item.code.toLowerCase() + ".png" }}
                                style={{
                                  resizeMode: 'cover',
                                  height: 30,
                                  width: 30,
                                  marginLeft: wp(8),
                                }}
                              />
                              <Text
                                style={{
                                  color:
                                    selectnational == item.countryname
                                      ? "#fff"
                                      : "#000",
                                  fontSize: 13,
                                  marginLeft: wp(4),
                                }}
                              >
                                {item.countryname}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    ) : withoutfilter != filterData ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 16 }}> No data found</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "flex-end",
                  marginBottom: hp(2),
                }}
              >
                {/* <TouchableOpacity
                  style={{
                    justifyContent: "flex-start",
                    paddingLeft: wp(4),
                    paddingBottom: hp(2),
                  }}
                >
                  <Image source={require("../Assets/circleArrow.png")} />
                </TouchableOpacity> */}
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setPersSave(true);
                      personalinfofun();
                    }}
                    //onPress={() => personalinfofun()}
                    // onPress={() => navigation.navigate('YourProfle', {
                    //     complete: 'complete'
                    // })}

                    style={{
                      backgroundColor: "#2F5597",
                      borderRadius: 25,
                      height: hp(6),
                      width: wp(60),
                      alignItems: "center",
                      justifyContent: "center",
                      elevation: 10,
                      color: "#000"
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      )}
      {/* </View> */}
      {/* <TouchableOpacity style={styles.circleArrow}>
                    <Image source={require('../Assets/circleArrow.png')} />
                 </TouchableOpacity>
               */}
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor:'pink'
    // padding: 10,
  },

  Headers: {
    // backgroundColor: "red",
    height: hp(10),
    justifyContent: "center",
    flexDirection: "row",
    width: wp(100),
    marginTop: 30,
  },
  Text1: {
    color: "#2F5597",
    fontSize: 24,
    fontWeight: "700",
  },
  icons: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  HeadLeft: {
    width: wp(45),
    height: hp(10),
    flexDirection: "row",
    // backgroundColor:"red",
    alignItems: "center",
  },
  HeadRight: {
    width: wp(45),
    height: hp(10),
    // backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
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
    marginLeft: wp(5),
    // borderColor:"red",
  },
  mobiletoch: {
    backgroundColor: "#2F5597",
    width: wp(28),
    height: hp(6),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  emailtoch: {
    backgroundColor: "lightgray",
    width: wp(28),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
  },
  nationaltoch: {
    backgroundColor: "lightgray",
    width: wp(28),
    height: hp(6),
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
  },
  circleArrow: {
    flex: 0.1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: wp(4.5),
    paddingBottom: hp(4),
  },
  modalWrapper2: {
    flex: 1,
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalWrapp: {
    height: hp(45),
    width: wp(100),
    backgroundColor: "#fff",
  },
  crossWRapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
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
  crossImage: {
    height: hp(4),
    width: wp(8),
  },
  tickWrapper: {
    backgroundColor: "green",
    height: hp(5),
    width: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tickImage: {
    height: hp(2),
    width: wp(7),
  },
});
