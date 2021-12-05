import React from "react";
import { StyleSheet, View, Button, TextInput, Text, FlatList } from "react-native";
import { AuthContext } from '../providers/AuthContext';


function CourseListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState('');

  React.useEffect(() => {
    fetch('http://192.168.48.57:8000/api/courses/', {
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
        console.error("Error:", error);
      });
  }, []);

  return (
    <View>
      <Text>COURSE LIST</Text>
      <FlatList data={courses} renderItem={({ item }) => <Text>{item.name}</Text>} />
      <Button title="Add Course" />
    </View>
  );
}

export default CourseListScreen;