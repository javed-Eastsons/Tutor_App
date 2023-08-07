import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const CountdownTimer = ({ initialSeconds }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let secondsLeft = initialSeconds;

    const updateCountdown = () => {
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      setTime({ hours, minutes, seconds });

      if (secondsLeft > 0) {
        secondsLeft--;
      } else {
        clearInterval(timer);
      }
    };

    updateCountdown(); // Initial update to display the starting time.

    const timer = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [initialSeconds]);

  useEffect(() => {
    // You can perform any action when the countdown reaches 0 here.
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      // Your code when the countdown finishes.
      console.log("Countdown finished!");
    }
  }, [time]);

  return (
    <View>
      <Text
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 10,
          margin: 10,
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "700",
        }}
      >{`${time.hours.toString().padStart(2, "0")} : ${time.minutes
        .toString()
        .padStart(2, "0")} : ${time.seconds
        .toString()
        .padStart(2, "0")}`}</Text>
    </View>
  );
};

export default CountdownTimer;
