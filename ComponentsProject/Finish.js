import React, { useState, useEffect } from "react";
import {
    AppState,
    BackHandler,
    Alert,
    Platform,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import RNExitApp from "react-native-exit-app"; // Import the package
import CustomAlert from "./CustomAlert";
import Common from "../Helper/Common";

function Finish(props) {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    console.log("------------------>",props.data, "<----------------- finish")

    useEffect(() => {
        const appStateListener = AppState.addEventListener(
            "change",
            handleAppStateChange
        );

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackPress
        );

        return () => {
            appStateListener.remove();
            backHandler.remove();
        };
    }, []);

    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === "background") {
            console.log("App is in the background");
            exitApp(); // Close the app completely
        }
        setAppState(nextAppState);
    };

    const finish = async(ans) => {
        setAlertVisible(true);
        // Alert.alert("Answer Data Modal", JSON.stringify(ans, null, 2));



        try {
            const response = await fetch("https://test.mh-ssc.ac.in/Exam/Moblie_Api/Finish_Exam", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(ans),

            })

            const contentType = response.headers.get("Content-Type");
            console.log("Content type: ", contentType);


            const responseData = await response.json();
            // console.log("Dta:", responseData)
            Alert.alert("Success", JSON.stringify(responseData.Response));
            Common.insertUser("Exam Data",JSON.stringify(ans, null, 2),101,0)
            // Common.getAllUsers()


        } catch (error) {
            console.error("Failed")
        }
       
    };

    const handleConfirm = () => {
        setAlertVisible(false);
        console.log("Exam finished!");
        exitApp();
    };

    const handleClose = () => {
        setAlertVisible(false);
    };

    const handleBackPress = () => {
        Alert.alert(
            "Exit App",
            "Are you sure you want to exit the app?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => exitApp() },
            ],
            { cancelable: true }
        );
        return true;
    };

    const exitApp = () => {
        if (Platform.OS === "android") {
            console.log("Exiting app on Android...");
            RNExitApp.exitApp();
        } else {
            console.log("App exit not supported on this platform.");
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={()=>finish(props.data)}  >
                <Text style={styles.text}>Finish Exam</Text>
            </TouchableOpacity>

            <CustomAlert
                visible={isAlertVisible}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#3944BC",
        padding: 5,
        margin: 5,
        marginHorizontal: 20,
        borderRadius: 5,
        marginTop: 25,
        marginBottom: 13,
    },
    text: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});

export default Finish;
