import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

function Screen({route} ) {
    const { examDetailsInstance } = route.params;
    // console.log("Received examDetailsInstance:", examDetailsInstance);
    

    // console.log("SEAT N:", examDetailsInstance)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

    const navigation = useNavigation();

    const startExam = () => {
        const dataString = JSON.stringify(examDetailsInstance, null, 2);
        Alert.alert('send data', dataString)
        navigation.replace('Exam', {examDetailsInstance});
    };

    return (
        <View style={styles.container}>
            <ScrollView >
                <Image
                    source={require('../assets/Images/Header.jpg')} // Adjusted path
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.seatText}>{examDetailsInstance.Index_No}</Text>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
                <View style={styles.instructionsContainer}>
                    <View style={styles.instructionBlock}>

                        <Text style={styles.instructionText}>Colors and their meanings</Text>
                    </View>
                    <View style={styles.instructionBlock1}>
                        <Text style={styles.instructionB}></Text>
                        <Text style={styles.instructionText}>Answer Submitted.</Text>
                    </View>
                    <View style={styles.instructionBlock11}>
                        <Text style={styles.instructionB2}></Text>
                        <Text style={styles.instructionText}>Answer Not Submitted.</Text>
                    </View>
                    <View style={styles.instructionBlock2}>
                        <Text style={styles.instructionTextLastP}>
                            The paper will display 10 minutes before the exam, but students cannot attempt it.
                            All questions can be viewed by clicking on the top or left panel buttons.
                        </Text>
                    </View>
                    <View style={styles.instructionBlock}>
                        <Text style={styles.instructionTextLastG}>
                            If you submit your answers and re-login, the system will automatically detect and restore answers.
                        </Text>
                    </View>
                    <View style={styles.instructionBlock3}>
                        <Text style={styles.instructionText}>
                            Handicap category shown on the top right
                            HC 0 - No Extra Time
                            HC 1, 4 - 50 minutes extra time.
                            HC 2, 3, 8, 9 - 30 minutes extra time.
                            HC 5 - 2 hours extra time.
                            HC 6, 7 - 1 hour extra time.
                        </Text>
                    </View>
                    <View style={styles.instructionBlock}>
                        <Text style={styles.instructionTextLastS}>
                            Submit each and every question as you solve it.
                            Do not wait to submit until the last minute.
                        </Text>
                    </View>
                    <View style={styles.instructionBlock4}>
                        <Text style={styles.instructionTextLast}>
                            All The Best for Exam!!!!
                        </Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, marginHorizontal: 50, padding: 10 }}>
                    <TouchableOpacity style={styles.button} onPress={startExam}>
                        <Text style={styles.buttonText}>Start Exam</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     marginTop: 0,
    //     paddingTop: 0,
    // },

    image: {
        width: screenWidth,
        height: 100,
        marginTop: 0,
        paddingTop: 0,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    seatText: {
        fontSize: screenWidth * 0.04,
        color: '#e74a3b',
        marginRight: 170,
        fontWeight: 'bold',
    },

    dateText: {
        fontFamily: 'OpenSans-VariableFont_wdth,wght',
        fontSize: screenWidth * 0.04,
        color: '#e74a3b',
        fontWeight: 'bold',
    },
    instructionB: {
        width: 30,
        height: 17,
        backgroundColor: 'green',
        borderRadius: 3,
        marginRight: 20,
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: 'black'

    },
    instructionB2: {
        width: 30,
        height: 17,
        backgroundColor: 'red',
        borderRadius: 3,
        marginRight: 20,
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: 'black',
    },

    instructionsContainer: {
        marginHorizontal: 20,
        padding: 20,
        width: '90%',
        marginTop: 30,
        borderWidth: 1, // Uncommented for visible border
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },

    instructionBlock: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
    },

    instructionBlock11: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
    },
    instructionBlock1: {
        backgroundColor: '#f5f5f7',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'start',
    },

    instructionBlock2: {
        backgroundColor: '#f5f5f7',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
    },

    instructionBlock3: {
        backgroundColor: '#f5f5f7',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
    },

    instructionBlock4: {
        backgroundColor: '#f5f5f7',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginVertical: 1.5,
        elevation: 3,
    },

    instructionText: {
        color: 'grey',
        fontSize: 14,
        fontFamily: 'OpenSans-VariableFont_wdth,wght',
        fontWeight: 'bold',
    },

    instructionTextLastP: {
        color: '#e83e8c',
        fontSize: 14,
        fontFamily: 'OpenSans-VariableFont_wdth,wght',
        fontWeight: 'bold',
    },

    instructionTextLastG: {
        color: '#1cc88a',
        fontSize: 14,
        fontFamily: 'OpenSans-VariableFont_wdth,wght',
        fontWeight: 'bold',
    },

    instructionTextLastS: {
        color: '#e74a3b',
        fontSize: 14,
        fontFamily: 'OpenSans-VariableFont_wdth,wght',
        fontWeight: 'bold',
    },

    instructionTextLast: {
        textAlign: 'center',
        color: '#000',
        fontSize: screenWidth * 0.04,
        fontWeight: '700',
        marginVertical: 10,
    },

    button: {
        backgroundColor: "#1cc88b",
        padding: 10,
        borderRadius: 8,
        shadowColor: "black",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Screen;
