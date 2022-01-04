import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function ProfileScreen({ route, navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({id: "", first_name: "", email: ""});

  React.useEffect(() => {
    fetch(base_url + `api/auth/user/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setUser(json);
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{user.first_name || user.id}</Text>
      </View>


      <View style={styles.container}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Friends</Text>
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

  actionBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#025b0e",
  },

  actionBtnText: {
    color: "white",
  }
});


export default ProfileScreen;