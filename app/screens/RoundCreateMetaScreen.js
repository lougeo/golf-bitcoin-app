import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Alert } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { mainStyles } from "../styles/mainStyles";
import DateTimePicker from '@react-native-community/datetimepicker';

import SelectionModal from "./modals/SelectionModal";


function RoundCreateMetaScreen({ navigation, route }) {
  const { userToken } = React.useContext(AuthContext);
  const [modalParams, setModalParams] = React.useState({ visible: false, path: '', search_param: '', qs_params: {}, setSelectedItem: null});
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  let d = new Date()
  const [teetime, setTeetime] = React.useState(d);
  const [show, setShow] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const _showTeeTime = () => {
    setShow(!show);
  }

  const _handleDatePicker = (event, selectedDate) => {
    const currentDate = selectedDate || teetime;
    setShow(!show);
    setTeetime(currentDate);
  }
  
  const _handleSubmit = () => {
    if (teetime) {
      fetch(base_url + 'api/rounds/' + route.params.id + '/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tee_time: teetime,
          users: selectedUsers,
          title: title,
          description: description
        })
      })
        .then(response => response.json())
        .then(json => {

          if ('users' in json) {
            Alert.alert(
              "Users Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else if ('tee_time' in json) {
            Alert.alert(
              "Tee Time Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else if ('title' in json) {
            Alert.alert(
              "Title Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else if ('description' in json) {
            Alert.alert(
              "Description Error",
              "Fuck u bitch",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          } else {
            navigation.navigate()
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

      <View style={mainStyles.textInputView}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={mainStyles.textInput}
        />
      </View>
      
      <View style={mainStyles.textInputView}>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={mainStyles.textInput}
        />
      </View>

      <TouchableOpacity style={mainStyles.actionBtn} onPress={_showTeeTime}>
          <Text style={mainStyles.actionBtnText}>Tee Time</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={teetime}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={_handleDatePicker}
        />
      )}

      <Text>{selectedUsers.id}</Text>
      <TouchableOpacity
        style={selectedUsers ? mainStyles.listItem : mainStyles.actionBtn }
        onPress={() => setModalParams({ visible: true, path: 'users', search_param: 'search', setSelectedItem: setSelectedUsers })}>
        <Text style={selectedUsers ? mainStyles.title : mainStyles.actionBtnText } >{selectedUsers.name || 'ADD FRIENDS'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={mainStyles.actionBtn} onPress={_handleSubmit}>
          <Text style={mainStyles.actionBtnText}>NEXT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={mainStyles.actionBtn} onPress={_handleSubmit}>
          <Text style={mainStyles.actionBtnText}>SKIP</Text>
      </TouchableOpacity>
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default RoundCreateMetaScreen;