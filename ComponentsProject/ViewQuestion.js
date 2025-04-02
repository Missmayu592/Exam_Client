import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function ViewQuestion() {
    const [isClicked, setIsClicked] = useState(false);
    const [apiData, setApiData] = useState([]); // State to store full post data

    const handleButtonPress = () => {
        setIsClicked((prevState) => !prevState);
        getAPIData();
    };

    const data = [1, 2, 3, 4, 5, 6, 7, 8];

    const getAPIData = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
            const json = await response.json();
            setApiData(json); // Store full posts in the state
            console.log(json); // Log the full data to check
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={isClicked ? styles.clickedButton : styles.defaultButton}
                            onPress={handleButtonPress}
                        >
                            <Text style={isClicked ? styles.clickedText : styles.defaultText}>
                                Q{item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.tableContainer}>
                <ScrollView style={styles.table} showsVerticalScrollIndicator={true} >
                    {apiData.map((item, index) => (
                        <View key={item.id} style={styles.tableRow}>
                            <View style={styles.tableCell1}>
                                <Text style={styles.tableCellText}>Q{item.id}</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableCellText}>{item.title}</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableCellText}>{item.body}</Text>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitText}>
                          Submit
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        marginVertical:15,
        backgroundColor: '#f5eefe',
    },
    container: {
        justifyContent: "center",
        flexDirection: 'row',
    
        marginLeft: 24,
        marginRight: 24,
    },
    defaultButton: {
        width: 60,
        padding: 5,
        marginTop: 10,
      
        alignItems: "center",
        // marginLeft: 13,

    },
    clickedButton: {
        width: 60,
        padding: 5,
        marginTop: 10,
        backgroundColor: "white",
        borderTopColor: "#0D98BA",
        borderTopWidth: 1.5,
       
        alignItems: "center",
        // marginLeft: 13,
    },
    defaultText: {
        fontSize: 20,
        fontFamily: "OpenSans-VariableFont_wdth,wght",
        color: 'blue',
    },
    clickedText: {
        fontSize: 20,

        fontFamily: "OpenSans-VariableFont_wdth,wght",

    },
    tableContainer: {
        backgroundColor: '#f5eefe',
        flex: 1,
        marginHorizontal:10
    },
    table: {
        padding: 20,
      marginHorizontal:15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#0D98BA',
        minHeight: screenHeight - 500,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCell1: {
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    tableCell: {
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        flex: 4,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    tableCellText: {
        textAlign: "center",
        fontSize: 16,
    },

    submitBtn:{
        marginVertical:15,
        backgroundColor: "#1cc88b",
        padding: 5,
        borderRadius: 5,
        shadowColor: "black",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    submitText:{
        color:'white',
        fontSize:19,
        textAlign: "center",
    }
});

export default ViewQuestion;
