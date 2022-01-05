import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function UserListScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState('');
  const [params, setParams] = React.useState({ search: '', page: '1', next: null });

  const _handleGetMore = () => {
    if (params.next) {
      setParams({ ...params, page: (parseInt(params.page) + 1).toString()});
    }
  };

  const _handleSearch = (input) => {
    setParams({ ...params, search: input, page: '1' });
  }

  React.useEffect(() => {
    fetch(base_url + 'api/users/?search=' + params.search + '&page=' + params.page, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.ok ? response.json() : null)
      .then(json => {
        if (json) {
          console.log(json);
          let new_users = users;
          if (users && parseInt(params.page) > 1) {
            new_users.push(...json.results);
          } else {
            new_users = json.results;
          }
          setUsers(new_users);
          setParams({ ...params, next: json.next });
        }
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, [params.search, params.page]);

  return (
    <SafeAreaView style={styles.flcontainer}>
      
      <SearchBar
        lightTheme="true"
        // style={styles.inputView}
        placeholder="Search"
        onChangeText={_handleSearch}
        value={params.search}
      />

      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.title}>{item.email}</Text>
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


export default UserListScreen;