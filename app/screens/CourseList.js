import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Button, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

function CourseListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);

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
      <FlatList
        data={courses}
        renderItem={Item}
        onPress={() => setSelectedId(item.id)}
        renderItem={({ item, onPress, backgroundColor, textColor }) => (
          <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Course" />
    </SafeAreaView>
  );
}

export default CourseListScreen;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});