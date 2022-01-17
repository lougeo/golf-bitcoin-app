import { StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "./constants";


const mainStyles = StyleSheet.create({

  flcontainer: {
    flex: 1,
  },

  containerCenter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItem: {
    backgroundColor: secondaryColor,
    borderRadius: 30,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 32,
  },

  subtitle: {
    fontSize: 28,
    marginVertical: 15,
  },

  inputView: {
    backgroundColor: secondaryColor,
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginTop: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  textInputView: {
    backgroundColor: "#9db802",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  textInput: {
    color: "white",
    flex: 1,
  },

  addBtnWrap: {
    // alignSelf: "flex-end",
    // position: "absolute",
    // bottom: 150,
    // right: 10,
    flexDirection: 'row',
    // flex: 2,
    // alignItems: 'baseline',
    justifyContent: 'center',
  },

  addBtn: {
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#025b0e",
  },

  addBtnDanger: {
    width: "50%",
    // borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },

  actionBtnText: {
    color: "white",
  },
 
  actionBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: primaryColor,
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
  
});

export { mainStyles }