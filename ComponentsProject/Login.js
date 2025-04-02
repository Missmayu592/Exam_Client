import React, { useState, useEffect, } from "react";
import { useNavigation } from '@react-navigation/native';  // Ensure this is the correct import

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  BackHandler
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import Student from "../Modals/Student";
import Common, { requestPermissions } from "../Helper/Common";
import styles from "../Helper/styles";

const Login = () => {
  const [collegeValue, setCollegeValue] = useState(null); 
  const [examValue, setExamValue] = useState(null); 
  const [paperValue, setPaperValue] = useState(null); 
  const [colleges, setColleges] = useState([]); 
  const [examData, setExamData] = useState([]); 
  const [paperData, setPaperData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [seatNo, setSeatNo] = useState('');
  const [invigilatorSignature, setInvigilatorSignature] = useState('');
  const [seatNoError, setSeatNoError] = useState(false);
  const [examDetails, setExamDetails] = useState(null);
  const navigation = useNavigation(); // Use useNavigation hook properl

  //call create table method
  Common.createTable();
  const displayLoader = () => {
    setLoading(true)

  }
  const handleFocus = () => {
    // Seat number validation: checks if seat number is 7 digits and only contains numbers
    if (seatNo === '' || seatNo.length !== 7 || isNaN(seatNo)) {
      setSeatNoError(true);
    } else {
      setSeatNoError(false);
    }
  };

  // Validation for the Login button
  const isFormValid = seatNo !== '' && seatNo.length === 7 && invigilatorSignature.trim() !== '';

  // Fetch college data on component mount
  useEffect(() => {
    const getCollegesFromApiAsync = async () => {
      try {
        const response = await fetch(
          "https://test.mh-ssc.ac.in/Exam/Student_Login/getCollegeName"
        );
        const json = await response.json();
        console.log("Fetched Colleges:", json); // Debugging the fetched colleges
        setColleges(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCollegesFromApiAsync();
  }, []);

  // Fetch exam data based on selected college index
  const getExamNamesFromApiAsync = async (index) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://test.mh-ssc.ac.in/Exam/Student_Login/getExamName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: index,
          }),
        }
      );

      const json = await response.json();
      console.log("Exam Names:", json); // Debugging the fetched exam names
      setExamData(json); // Update state with received exam data
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "There was an error fetching exam names.");
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)

    }
  };

  const getPaperNamesFromApiAsync = async (Exam_ID) => {
    console.log("Exam_ID:", Exam_ID);
    setLoading(true);
    try {
      const response = await fetch(
        "https://test.mh-ssc.ac.in/Exam/Student_Login/Get_Paper_Name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Exam_ID: Exam_ID,
          }),
        }
      );

      const json = await response.json();
      console.log("Paper Names:", json); // Debugging the fetched paper names

      setPaperData(json); // Update state with received paper data
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "There was an error fetching paper names.");
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  };




  const handleCollegeSelection = (item) => {
    if (item) {
      console.log("Dropdown Item:", item);
      if (item.Value) {
        setCollegeValue(item.Value);
        setExamValue(null); // Reset selected exam when changing college
        setPaperValue(null); // Reset selected paper when changing college
        setPaperData([]); // Clear the paper data
        displayLoader(); // Show loader
        getExamNamesFromApiAsync(item.Value); // Fetch exam names based on selected college
      } else {
        console.error("Item does not have a valid 'Value' property:", item);
      }
    } else {
      console.error("Dropdown item is undefined:", item);
    }
  };


  const handleExamSelection = (item) => {
    if (item) {
      console.log("Dropdown Item of Exam:", item);
      if (item.Value) {
        setExamValue(item.Value);
        setPaperValue(null); // Reset selected paper when changing exam
        setPaperData([]); // Clear the paper data
        displayLoader(); // Show loader
        getPaperNamesFromApiAsync(item.Value); // Fetch paper names based on selected exam
      } else {
        console.error("Item does not have a valid 'Value' property:", item);
      }
    } else {
      console.error("Dropdown item is undefined:", item);
    }
  };


  const handleSubmit = async () => {
    console.log("Handle Submit call");

    const student = new Student(
      0,
      collegeValue,
      null,
      null,
      seatNo,
      null,
      null,
      null,
      invigilatorSignature,
      null,
      new Date().toISOString(),
      null,
      null,
      examValue,
      paperValue
    );

    const studentData = JSON.stringify(student);
    console.log("Student Data:", studentData);

    try {
      const response = await fetch('https://test.mh-ssc.ac.in/Exam/Student_Login/Student_Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: studentData,
      });

      const contentType = response.headers.get("Content-Type");
      // Safely parse JSON response
      let responseData = null;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        throw new Error("Unexpected content type");
      }

      console.log('Response Data:', responseData);

      // Check if the Data field is valid JSON
      let examDetailsInstance = null;
      try {
        examDetailsInstance = responseData.Data ? JSON.parse(responseData.Data) : null;
        console.log("Exam data details:", examDetailsInstance);
      } catch (err) {
        console.error("Error parsing responseData.Data:", err);
      }

      // Handle successful submission
      if (response.ok && responseData.Result) {
        console.log("Result:", responseData.Result);
        Alert.alert('Success', 'Student data submitted successfully');
        requestPermissions();
        Common.insertUser("Login students", studentData, 101, 0)

        setExamDetails(examDetailsInstance);
        setSeatNo("");
        setInvigilatorSignature("");
        setPaperValue("");
        setExamValue("");
        setCollegeValue("");

        setTimeout(() => {
          Common.getAllUsers(),
            navigation.replace('Next', { examDetailsInstance }); // Replace current screen with 'Next' screen
        }, 2000);
      } else {
        // Display the error message from the response
        const errorMessage = responseData.Response || 'An unexpected error occurred';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while submitting data');
    }
  };

  const handleExit = () => {
    Alert.alert(
      "Exit App",
      "Do you really want to close the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => BackHandler.exitApp()
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for different platforms
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.main}>

            {loading && ( // Conditionally render the loader
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="70" color="navy" />
              </View>
            )}
            <View>
              <View style={{ padding: 20 }}>
                <Text style={{ padding: 20, fontSize: 30, }}>Welcome back</Text>
                <Text style={{ marginLeft: 40, fontSize: 20 }}>
                  Date: 20/12/2024
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.inputBox}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={colleges}
                  maxHeight={300}
                  labelField="Text"
                  valueField="Value"
                  placeholder="Select College Index No"
                  value={collegeValue}
                  onChange={(item) => handleCollegeSelection(item)}
                />

                <Dropdown
                  style={styles.inputBox}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={examData}
                  maxHeight={300}
                  labelField="Text"
                  valueField="Value"
                  placeholder="Select Exam Name"
                  value={examValue}
                  onChange={(item) => handleExamSelection(item)}
                  disabled={!collegeValue}
                />

                <Dropdown
                  style={styles.inputBox}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={paperData}
                  maxHeight={300}
                  labelField="Text"
                  valueField="Value"
                  placeholder="Select Paper Name"
                  value={paperValue}
                  onChange={(item) => setPaperValue(item.Value)}
                  disabled={!examValue}
                />

                <TextInput placeholder="Enter Seat No" style={styles.inputBox} value={seatNo}
                  onChangeText={setSeatNo} onFocus={handleFocus} maxLength={7} keyboardShouldPersistTaps="handled" />
                {seatNoError && (
                  <Text style={styles.errorText}>
                    Please enter a valid seat number.
                  </Text>
                )}

                <TextInput
                  placeholder="Invigilator Signature"
                  style={styles.inputBox}
                  value={invigilatorSignature}
                  onChangeText={setInvigilatorSignature}
                  maxLength={10}
                />
                <Text style={{ color: "red" }}>
                  (Invigilator Should Check all the data filled by Student)
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={isFormValid ? handleSubmit : () => Alert.alert("Please fill data!")} // Call handleSubmit only if form is valid
                    disabled={!isFormValid}
                  >
                    <Text style={styles.login}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={handleExit}>
                    <Text
                      style={styles.exit}

                    >
                      Exit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;
