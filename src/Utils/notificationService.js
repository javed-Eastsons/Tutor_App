import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-community/async-storage";
import { cos } from "react-native-reanimated";
import { err } from "react-native-svg/lib/typescript/xml";

export async function requestUserPermission() {
  console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMM");
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    GetFcmToken();
  }
}

const GetFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  console.log(fcmToken, "oldToken");
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, "the new token");
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log(error, "err in fcm");
    }
  }
};

export const notificationListner = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );

    messaging().onMessage(async (remoteMessage) => {
      console.log("reeived in Foreground", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
  });
};
