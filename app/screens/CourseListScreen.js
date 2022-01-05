import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function CourseListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [courses, setCourses] = React.useState('');
  const [params, setParams] = React.useState({ qs_name: '', page: '1', next: null });

  const _handleGetMore = () => {
    if (params.next) {
      setParams({ ...params, page: (parseInt(params.page) + 1).toString()});
    }
  };

  const _handleSearch = (search) => {
    setParams({ ...params, qs_name: search, page: '1' });
  }

  React.useEffect(() => {
    fetch(base_url + 'api/courses/?name=' + params.qs_name + '&page=' + params.page, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.ok ? response.json() : null)
      .then(json => {
        if (json) {
          let new_courses = courses;
          if (courses && parseInt(params.page) > 1) {
            new_courses.push(...json.results);
          } else {
            new_courses = json.results;
          }
          setCourses(new_courses);
          setParams({ ...params, next: json.next });
        }
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, [params.qs_name, params.page]);

  return (
    <SafeAreaView style={styles.flcontainer}>
      
      <SearchBar
        lightTheme="true"
        // style={styles.inputView}
        placeholder="Search"
        onChangeText={_handleSearch}
        value={params.qs_name}
      />

      <FlatList
        data={courses}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("CourseDetail", {id: item.id})} style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        initialNumToRender={8}
        onEndReachedThreshold={1}
        onEndReached={_handleGetMore}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flcontainer: {
    flex: 1,
  },

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