import React from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import { SearchBar } from "react-native-elements";
import { AuthContext } from '../../providers/AuthContext';
import { base_url } from "../../Globals";
import { mainStyles } from "../../styles/mainStyles";


function SelectionModal(props) {
  const { userToken } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [params, setParams] = React.useState({ search: '', page: '1', next: null });

  const modalParams = props.modalParams;
  const setModalParams = props.setModalParams;
  const setSelectedItem = modalParams.setSelectedItem;
  const defaultParams = { search: '', page: '1', next: null };

  const _handleGetMore = () => {
    if (params.next) {
      setParams({ ...params, page: (parseInt(params.page) + 1).toString()});
    }
  };

  const _handleSearch = (input) => {
    setParams({ ...params, search: input, page: '1' });
  }

  const _handleModalClose = () => {
    setData([]);
    setParams(defaultParams);
    setModalParams({visible: !modalParams.visible, path: '', search_param: ''});
  }
  
  const _handleItemSelection = (item) => {
    setData([]);
    setParams(defaultParams);
    setSelectedItem(item);
    setModalParams({visible: !modalParams.visible, path: '', search_param: ''});
  }

  React.useEffect(() => {
    if (modalParams.path) {
      // Build url
      let url = base_url + 'api/' + modalParams.path + '/?page=' + params.page;

      if (modalParams.search_param) {
        url = url + '&' + modalParams.search_param + '=' + params.search;
      }

      for (const obj in modalParams.qs_params) {
        url = url + '&' + obj + '=' + modalParams.qs_params[obj];
      }
      console.log("API");
      console.log(url);
      // Hit api
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Token ' + userToken
        }
      })
        .then(response => response.ok ? response.json() : null)
        .then(json => {
          if (json) {
            let new_data = data;
            if (data && parseInt(params.page) > 1) {
              new_data.push(...json.results);
            } else {
              new_data = json.results;
            }
            setData(new_data);
            setParams({ ...params, next: json.next });
          }
        })
        .catch((error) => {
          // Network error, server off or similar.
          console.error(error);
        });

    }
  }, [params.search, params.page, props]);


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

      <SearchBar
        lightTheme="true"
        // style={mainStyles.inputView}
        placeholder="Search"
        onChangeText={_handleSearch}
        value={params.search}
      />

      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={mainStyles.listItem}
            onPress={() => _handleItemSelection(item)}
          >
            <Text style={mainStyles.title}>{item.name ? item.name : item.title}</Text>
          </TouchableOpacity>
        )}
        initialNumToRender={8}
        onEndReachedThreshold={1}
        onEndReached={_handleGetMore}
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


export default SelectionModal;