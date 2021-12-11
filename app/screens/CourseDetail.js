import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function CourseDetailScreen({ route, navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [course, setCourse] = React.useState('');
  const course_id = route.params.id;

  React.useEffect(() => {
    fetch(base_url + `api/courses/${course_id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.json())
      .then(json => {
        setCourse(json);
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, [course_id]);

  const update = () => {
    // fetch put name
    //.then
      setCourse()
  }

  return (
    <SafeAreaView>

      <Text style={styles.title}>{course.name || course.id}</Text>

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.actionBtnText}>MODIFY</Text>
      </TouchableOpacity>
          
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.actionBtnText}>DELETE</Text>
      </TouchableOpacity>
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
    // alignSelf: "flex-end",
    // position: "absolute",
    // bottom: 0,
    // right: 10,
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


export default CourseDetailScreen;