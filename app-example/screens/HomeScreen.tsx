import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <TouchableOpacity>
        <Link href="/other">Go to Other Screen</Link>
      </TouchableOpacity>
    </View>
  );
}
