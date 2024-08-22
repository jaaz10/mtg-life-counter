import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

type OtherScreenProps = {
  path: string;
};

export default function OtherScreen({ path }: OtherScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the Other Screen!</Text>
      <TouchableOpacity>
        <Link href="/">Go back to Home Screen</Link>
      </TouchableOpacity>
    </View>
  );
}
