import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";
import { mainStyles } from "../styles/mainStyles";


function CourseDetailScreen({ route, navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [course, setCourse] = React.useState({id: "", name: "", scorecards: []});
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

  return (
    <SafeAreaView style={mainStyles.flcontainer}>

      <View style={styles.titleWrap}>
        <Text style={[mainStyles.title, {marginVertical: 25}]}>{course.name || course.id}</Text>
      </View>
      
      <FlatList
        data={course.scorecards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={mainStyles.subtitle}>{item.title}</Text>
            <ScrollView horizontal>
              <View>
                <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Hole</Text></View>
                <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Par</Text></View>
                <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Distance</Text></View>
                <View style={mainStyles.tableCell}><Text style={mainStyles.tableHeader}>Handicap</Text></View>
              </View>
              {item.scorecard_holes.map((data) => (
                <View>
                  <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.number}</Text></View>
                  <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.par}</Text></View>
                  <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.distance}</Text></View>
                  <View style={mainStyles.tableCell}><Text style={mainStyles.tableData}>{data.handicap}</Text></View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      />

      <View style={mainStyles.addBtnWrap}>
        <TouchableOpacity style={mainStyles.addBtn}>
          <Text style={mainStyles.actionBtnText}>MODIFY</Text>
        </TouchableOpacity>
            
        <TouchableOpacity style={mainStyles.addBtnDanger}>
          <Text style={mainStyles.actionBtnText}>DELETE</Text>
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


export default CourseDetailScreen;