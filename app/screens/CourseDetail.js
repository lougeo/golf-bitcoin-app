import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


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
        console.log(json);
        setCourse(json);
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, [course_id]);

  return (
    <SafeAreaView>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{course.name || course.id}</Text>
      </View>
      
      <FlatList
        data={course.scorecards}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.subtitle}>{item.title}</Text>
            <ScrollView horizontal>
              <View>
                <View style={styles.tableCell}><Text style={styles.tableHeader}>Hole</Text></View>
                <View style={styles.tableCell}><Text style={styles.tableHeader}>Par</Text></View>
                <View style={styles.tableCell}><Text style={styles.tableHeader}>Distance</Text></View>
                <View style={styles.tableCell}><Text style={styles.tableHeader}>Handicap</Text></View>
              </View>
              {item.scorecard_holes.map((data) => (
                <View>
                  <View style={styles.tableCell}><Text style={styles.tableData}>{data.number}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.tableData}>{data.par}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.tableData}>{data.distance}</Text></View>
                  <View style={styles.tableCell}><Text style={styles.tableData}>{data.handicap}</Text></View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      />

      <View style={styles.addBtnWrap}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.actionBtnText}>MODIFY</Text>
        </TouchableOpacity>
            
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.actionBtnText}>DELETE</Text>
        </TouchableOpacity>
      </View>
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

  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 35,
    marginVertical: 25,
  },

  subtitle: {
    fontSize: 28,
    marginVertical: 15,
  },

  tableCell: {
    width: 150,
  },

  tableHeader: {
    fontSize: 20,
  },

  tableData: {
    fontSize: 20,
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

  addBtnWrap: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 150,
    right: 10,
  },
 
  addBtn: {
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