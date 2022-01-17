import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Alert, ScrollView } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";
import { mainStyles } from "../styles/mainStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

function RoundMainScreen({ navigation, route }) {
  const { userToken } = React.useContext(AuthContext);

  const round = route.params.round_details;
  console.log("HHHHHEEEEEERRRRRRREEEEEEEE");
  console.log(round);


  return (
    <SafeAreaView style={mainStyles.flcontainer}>

      <View style={styles.titleWrap}>
        <Text style={[mainStyles.title, {marginVertical: 25}]}>{round.title ? round.title : ''}</Text>
      </View>

      <View style={styles.titleWrap}>
        <Text style={mainStyles.title}>{round.course.name} @ {round.tee_time}</Text>
      </View>
      
      <View>
        <Text style={mainStyles.subtitle}>{round.scorecard.title}</Text>
        <ScrollView horizontal>
          <View>
            <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Hole</Text></View>
            <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Par</Text></View>
            <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Distance</Text></View>
            <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Handicap</Text></View>
          </View>
          {round.scorecard.scorecard_holes.map((data) => (
            <View>
              <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.number}</Text></View>
              <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.par}</Text></View>
              <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.distance}</Text></View>
              <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.handicap}</Text></View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={mainStyles.addBtnWrap}>
        <TouchableOpacity style={mainStyles.addBtn}>
          <Text style={mainStyles.actionBtnText}>PREV</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={mainStyles.addBtn}>
          <Text style={mainStyles.actionBtnText}>NEXT</Text>
        </TouchableOpacity>            
      </View>
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

});

export default RoundMainScreen;