import React from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import { AuthContext } from '../../providers/AuthContext';
import { base_url } from "../../Globals";
import { mainStyles } from "../../styles/mainStyles";


function ScoreInputModal(props) {
  const { userToken } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);

  const modalParams = props.modalParams;
  const setModalParams = props.setModalParams;


  const _handleModalClose = () => {
    setData([]);
    setModalParams({visible: !modalParams.visible});
  }

  const _fetchData = (api_params) => {
    // fetch(base_url + 'api/rounds/', {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': 'Token ' + userToken
    //   }
    // })
    //   .then(response => response.ok ? response.json() : null)
    //   .then(json => {
    //     if (json) {
    //       let new_data = data;
    //       if (data && parseInt(state_params.page) > 1) {
    //         new_data.push(...json.results);
    //       } else {
    //         new_data = json.results;
    //       }
    //       setData(new_data);
    //       setParams({ ...state_params, next: json.next });
    //     }
    //   })
    //   .catch((error) => {
    //     // Network error, server off or similar.
    //     console.error(error);
    //   });
  }

  React.useEffect(() => {
    _fetchData(modalParams)
  }, [props]);


  return (
    <Modal
      animationType="slide"
      visible={modalParams.visible}
      onRequestClose={_handleModalClose}
    >
      
      <Pressable
        style={styles.closePressable}
        onPress={_handleModalClose}
      >
        <Text style={styles.closePressableText} >Close</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => (item.id)}
        renderItem={({ item }) => (
          // <TouchableOpacity
          //   style={mainStyles.listItem}
          //   onPress={() => _handleItemSelection(item)}
          // >
          <Text style={mainStyles.title}>{item.name}</Text>
          // </TouchableOpacity>
        )}
      />

    </Modal>
  );
}

const styles = StyleSheet.create({

  closePressable: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 20,

  },

  closePressableText: {
    color: "grey",
  },

});


export default ScoreInputModal;