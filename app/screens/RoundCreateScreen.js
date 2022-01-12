import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { mainStyles } from "../styles/mainStyles";

import SelectionModal from "./modals/SelectionModal";


function RoundCreateScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [modalParams, setModalParams] = React.useState({ visible: false, path: '', search_param: '', qs_params: {}, setSelectedItem: null});
  const [selectedCourse, setSelectedCourse] = React.useState({});
  const [selectedScorecard, setSelectedScorecard] = React.useState({id: '', title: ''});

  return (
    <SafeAreaView style={mainStyles.containerCenter}>

      <SelectionModal modalParams={modalParams} setModalParams={setModalParams} />

      <TouchableOpacity style={mainStyles.actionBtn} onPress={() => setModalParams({visible: true, path: 'courses', search_param: 'name', setSelectedItem: setSelectedCourse})}>
        <Text style={mainStyles.actionBtnText}>{selectedCourse.id ? 'CHANGE COURSE' : 'SELECT COURSE'}</Text>
      </TouchableOpacity>
      {selectedCourse.id ?
        <>
          <View style={mainStyles.listItem} >
            <Text style={mainStyles.title} >{selectedCourse.name}</Text>
          </View> 
          <TouchableOpacity style={mainStyles.actionBtn} onPress={() => setModalParams({visible: true, path: 'scorecards', search_param: '', qs_params: {'course': selectedCourse.id}, setSelectedItem: setSelectedScorecard})}>
            <Text style={mainStyles.actionBtnText}>{selectedScorecard.id ? 'CHANGE SCORECARD' : 'SELECT SCORECARD'}</Text>
          </TouchableOpacity>
          {selectedScorecard.id ? 
            <>
              <View style={mainStyles.listItem} >
                <Text style={mainStyles.title} >{selectedScorecard.title}</Text>
              </View>
              <TouchableOpacity style={mainStyles.actionBtn}>
                <Text style={mainStyles.actionBtnText}>NEXT</Text>
              </TouchableOpacity>
            </> : null
          }
        </> : null
      }
      
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default RoundCreateScreen;