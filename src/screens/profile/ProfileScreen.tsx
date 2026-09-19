import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";

const ProfileScreen = () => {
  return (
    <AppSafeView>
      <HomeHeader />
      <Text>Profile Screen</Text>
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
