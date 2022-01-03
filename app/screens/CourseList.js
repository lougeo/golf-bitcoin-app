import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function CourseListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState('');
  const [qs_name, setQSName] = React.useState('');

  React.useEffect(() => {
    fetch(base_url + 'api/courses/?name=' + qs_name, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.json())
      .then(json => {
        setCourses(json);
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, [qs_name]);

  return (
    <SafeAreaView>
      
      <SearchBar
        lightTheme="true"
        // style={styles.inputView}
        placeholder="Search"
        onChangeText={setQSName}
        value={qs_name}
      />

      <FlatList
        data={courses}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("CourseDetail", {id: item.id})} style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    backgroundColor: "#9db802",
    borderRadius: 30,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 32,
  },

  inputView: {
    backgroundColor: "#9db802",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginTop: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  textInput: {
    color: "white",
    flex: 1,
  },
 
  addBtn: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#025b0e",
  },

  actionBtnText: {
    color: "white",
  }
});


export default CourseListScreen;