import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, TextInput, View, Text, Alert, FlatList } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";
import { mainStyles } from "../styles/mainStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "react-native-vector-icons/Ionicons";

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

  const _handleUserSelection = (value) => {
    let existing_users = selectedUsers;
    existing_users.push(value);
    setSelectedUsers(existing_users);
  }

  const _removeFriend = (id) => {
    let existing_users = selectedUsers;
    existing_users = existing_users.filter((obj) => obj.id !== id);
    setSelectedUsers(existing_users);
  }
  
  const _handleSubmit = () => {
    if (teetime) {
      fetch(base_url + 'api/rounds/' + route.params.round_id + '/', {
        method: 'PUT',
        headers: {
          'Authorization': 'Token ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tee_time: teetime,
          set_users: selectedUsers.map(({ id }) => id),
          title: title,
          description: description
        })
      })
        .then(response => response.json().then(json => {
          if (response.ok) {
            navigation.navigate("RoundMain", {"round_details": json})
          } else {
            console.log("VALIDATION ERROR");
          }
        })
        )
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
      <Text>{teetime.toString()}</Text>

      {show && (
        <DateTimePicker
          value={teetime}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={_handleDatePicker}
        />
      )}
      
      <TouchableOpacity
        style={mainStyles.actionBtn}
        onPress={() => setModalParams({
          visible: true, path: 'users', search_param: 'search', qs_params: { 'selected-users': selectedUsers.map(({ id }) => id) }, setSelectedItem: _handleUserSelection
        })}>
        <Text style={mainStyles.actionBtnText} >ADD FRIENDS</Text>
      </TouchableOpacity>
      
      <FlatList
        data={selectedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[mainStyles.listItem]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ }}>
                <Text style={mainStyles.title}>{item.first_name ? item.first_name + ' ' + item.last_name : item.email}</Text>
              </View>

              <TouchableOpacity
                style={{ }}
                onPress={() => _removeFriend(item.id)}
              >
                <Ionicons name={'remove'} size={40} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
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