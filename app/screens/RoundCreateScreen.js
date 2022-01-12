import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Alert } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";
import { mainStyles } from "../styles/mainStyles";

import SelectionModal from "./modals/SelectionModal";


function RoundCreateScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [modalParams, setModalParams] = React.useState({ visible: false, path: '', search_param: '', qs_params: {}, setSelectedItem: null});
  const [selectedCourse, setSelectedCourse] = React.useState({id: '', name: ''});
  const [selectedScorecard, setSelectedScorecard] = React.useState({ id: '', title: '' });
  
  const _handleSubmit = () => {
    if (selectedCourse.id && selectedScorecard.id) {
      fetch(base_url + 'api/rounds/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          set_course: selectedCourse.id,
          set_scorecard: selectedScorecard.id
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          console.log('set_course' in json);
          console.log('set_scorecard' in json);

          if ('set_course' in json) {
            Alert.alert(
              "Course Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else if ('set_scorecard' in json) {
            Alert.alert(
              "Scorecard Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else {
            navigation.navigate("RoundCreateMeta", {round_id: json.id});
          }
        })
        .catch((error) => {
          // Network error, server off or similar.
          console.error(error);
        });
    }
  }

  return (
    <SafeAreaView style={mainStyles.containerCenter}>

      <SelectionModal modalParams={modalParams} setModalParams={setModalParams} />
      <Text>{selectedCourse.id}</Text>
      <Text>{selectedCourse.name}</Text>
      <Text>{selectedScorecard.id}</Text>
      <Text>{selectedScorecard.title}</Text>
      <TouchableOpacity
        style={selectedCourse.id ? mainStyles.listItem : mainStyles.actionBtn }
        onPress={() => setModalParams({ visible: true, path: 'courses', search_param: 'name', setSelectedItem: setSelectedCourse })}>
        <Text style={selectedCourse.id ? mainStyles.title : mainStyles.actionBtnText } >{selectedCourse.name || 'SELECT COURSE'}</Text>
      </TouchableOpacity>
      {selectedCourse.id ?
        <TouchableOpacity
          style={selectedScorecard.id ? mainStyles.listItem : mainStyles.actionBtn }
          onPress={() => setModalParams({
            visible: true, path: 'scorecards', search_param: '', qs_params: { 'course': selectedCourse.id }, setSelectedItem: setSelectedScorecard
          })}>
          <Text style={selectedScorecard.id ? mainStyles.title : mainStyles.actionBtnText } >{selectedScorecard.title || 'SELECT SCORECARD'}</Text>
        </TouchableOpacity>
        : null
      }
      {
        selectedCourse.id && selectedScorecard.id ?
        <TouchableOpacity style={mainStyles.actionBtn} onPress={_handleSubmit}>
          <Text style={mainStyles.actionBtnText}>NEXT</Text>
        </TouchableOpacity>
        : null
      }
      
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default RoundCreateScreen;