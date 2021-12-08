import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, TextInput, Text, FlatList } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function CourseListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState('');

  // * NOTE * SWR for async api fetching

  React.useEffect(() => {
    fetch(base_url + 'api/courses/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setCourses(json);
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error("Error:", error);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>COURSE LIST</Text>
      <FlatList data={courses} renderItem={({ item }) => <Text>{item.name}</Text>} />
      <Button title="Add Course" />
    </SafeAreaView>
  );
}

export default CourseListScreen;