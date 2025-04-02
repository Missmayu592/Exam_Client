import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#4e73df',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(203, 198, 198, 0.2)", // Semi-transparent background
      zIndex: 10, 
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
    },
  
    scrollContainer: {
      flexGrow: 1, // Ensures the ScrollView adjusts height dynamically
      justifyContent: "center", // Center content vertically
  
    },
    main: {
      backgroundColor: "white",
      width: "93%", // Relative width for responsiveness
      alignSelf: "center", // Center the view horizontally
      borderRadius: 7,
      padding: 20,
  
      // fontFamily:'OpenSans-Italic-VariableFont_wdth,wght',
      shadowColor: "black",
      elevation: 10,
      shadowOpacity: 1,
  
    },
    inputBox: {
      // fontFamily:'OpenSans-Italic-VariableFont_wdth,wght',
      fontSize: 18,
      width: "100%", // Relative width for responsiveness
      borderColor: "black",
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
    },
    button: {
      flex: 1,
      margin: 10,
    },
    login: {
      backgroundColor: "#4e73df",
      color: "white",
      padding: 10,
      fontSize: 15,
      textAlign: "center",
      borderRadius: 5,
      shadowColor: "grey",
      elevation: 10,
      shadowOpacity: 1,
    },
    exit: {
      backgroundColor: "#e02d1b",
      color: "white",
      padding: 10,
      fontSize: 15,
      textAlign: "center",
      borderRadius: 5,
      shadowColor: "grey",
      elevation: 10,
      shadowOpacity: 1,
    },
    examText: {
      fontSize: 18,
      marginTop: 10,
    },
  });

  export default styles;