import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Alert, FlatList } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";
import { mainStyles } from "../styles/mainStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "react-native-vector-icons/Ionicons";

function RoundMainScreen({ navigation, route }) {
  const { userToken } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={mainStyles.containerCenter}>

      <Text>MAIN COURSE SCREEN</Text>
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default RoundMainScreen;