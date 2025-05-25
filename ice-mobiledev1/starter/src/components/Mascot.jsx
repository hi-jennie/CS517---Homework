import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";

import CS571 from "@cs571/mobile-client";

// TODO: Display the bio data from https://cs571.org/rest/f24/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571.org/rest/f24/ice/mascot-messages
export default function Mascot(props) {
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [image, setImage] = useState();

  function speak() {
    fetch("https://cs571.org/rest/f24/ice/mascot-messages", {
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert("Message received !", data.msg);
      });
  }

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/ice/mascot", {
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setSlogan(data.quote);
        setImage(data.imgSrc);
      });
  }, []);

  return (
    <View>
      <Pressable onPress={speak}>
        <Text style={{ fontSize: 28 }}>{name}</Text>
        <Text style={{ fontSize: 18 }}>{slogan}</Text>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
