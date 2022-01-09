import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../providers/AuthContext';
import { base_url } from "../Globals";


function FriendsScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  const [friendRequests, setFriendRequests] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedRequest, setSelectedRequest] = React.useState('');
  const [params, setParams] = React.useState({ search: '', page: '1', next: null });

  const _handleGetMore = () => {
    if (params.next) {
      setParams({ ...params, page: (parseInt(params.page) + 1).toString()});
    }
  };

  const _handleSearch = (input) => {
    setParams({ ...params, search: input, page: '1' });
  };

  const _addFriend = (receiver_id, is_friend, has_pending_request, index) => {
    
    if (!is_friend && !has_pending_request) {
      fetch(base_url + 'api/friendrequests/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiver: receiver_id
        })
      })
        .then(response => {
          if (response.ok) {
            let new_users = users;
            new_users[index].has_pending_request = true;
            setUsers(new_users);
            setSelectedUser(receiver_id);

            console.log("Success");
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          // Network error, server off or similar.
          console.error(error);
        });
    }
  };

  const _updateFriendRequest = (id, accepted, index) => {
      fetch(base_url + 'api/friendrequests/' + id.toString() + '/', {
        method: 'PUT',
        headers: {
          'Authorization': 'Token ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accepted: accepted
        })
      })
        .then(response => {
          if (response.ok) {
            let new_friendrequests = friendRequests;
            new_friendrequests.splice(index, 1);
            setFriendRequests(new_friendrequests);
            setSelectedRequest(selectedRequest + 1);

            console.log("Success");
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          // Network error, server off or similar.
          console.error(error);
        });
  };

  React.useEffect(() => {
    fetch(base_url + 'api/friendrequests/mine/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + userToken
      }
    })
      .then(response => response.ok ? response.json() : null)
      .then(json => {
        if (json) {
          let new_friendrequests = friendRequests;
          if (new_friendrequests) {
            new_friendrequests.push(...json);
          } else {
            new_friendrequests = json;
          }
          setFriendRequests(new_friendrequests);
        }
      })
      .catch((error) => {
        // Network error, server off or similar.
        console.error(error);
      });
  }, []); 

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
          let new_users = users;
          if (new_users && parseInt(params.page) > 1) {
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

      <View>
        <FlatList
          data={friendRequests}
          extraData={selectedRequest}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => {
            
            return (
              <TouchableOpacity style={styles.item}>
                <View style={{ justifyContent: "flex-end" }}>
                  <View>
                    {item.sender_full.first_name ? <Text style={styles.listTitle}>{item.sender_full.first_name} {item.sender_full.last_name}</Text> : null}
                    <Text style={styles.listTitle}>{item.sender_full.email}</Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-evenly", borderTopWidth: 2, marginTop: 10 }}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", justifyContent: "center", borderRightWidth: 1, width:"50%", paddingTop: 5 }}
                      onPress={() => _updateFriendRequest(item.id, false, index)}
                    >
                      <Text style={styles.listTitle}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row", justifyContent: "center", borderLeftWidth: 1, width:"50%", paddingTop: 5 }}
                      onPress={() => _updateFriendRequest(item.id, true, index)}
                    >
                      <Text style={styles.listTitle}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          initialNumToRender={8}
          onEndReachedThreshold={1}
          onEndReached={_handleGetMore}
        />
      </View>
      
      <SearchBar
        lightTheme="true"
        // style={styles.inputView}
        placeholder="Search"
        onChangeText={_handleSearch}
        value={params.search}
      />

      <FlatList
        data={users}
        extraData={selectedUser}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {

          const iconName = item.is_friend ? "checkbox"
            : item.id === selectedUser || item.has_pending_request ? "mail-outline"
            : "person-add";

          return (
            <TouchableOpacity style={styles.item}>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 4 }}>
                  {item.first_name ? <Text style={styles.listTitle}>{item.first_name} {item.last_name}</Text> : null}
                  <Text style={styles.listTitle}>{item.email}</Text>
                </View>

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => _addFriend(item.id, item.is_friend, item.has_pending_request, index)}
                >
                  <Ionicons name={iconName} size={40} color={"white"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
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

  listTitle: {
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


export default FriendsScreen;