import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { Loader } from "../common/Loader";
const Checkout = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Loader flag={loader} />
      <WebView
        source={{
          uri: "http://securecheckout.sandbox.hit-pay.com/payment-request/@test-1/",
        }}
      />
    </View>
  );
};

export default Checkout;
